import { useEffect, useState } from "react";
import Select from "../../components/Inputs/Select.tsx";
import TextInput from "../../components/Inputs/TextInput.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import apiClient from "../../lib/apiClient.ts";
import styles from "./RandomJoke.module.scss";

export default function RandomJoke() {
  const { auth } = useAuth();
  const [impersonate, setImpersonate] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryIndex, setCategoryIndex] = useState<number | null>(null);
  const [joke, setJoke] = useState(
    "If Chuck Norris were to travel to an alternate dimension in which there was another Chuck Norris and they " +
      "both fight, they would both win"
  );
  useEffect(() => {
    apiClient.fetchCategories(auth).then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <div>
      <img src={"/img/chuck.jpg"} alt={"Chuck Norris"} loading={"lazy"}></img>
      <header>
        <h1>Get your random joke</h1>
        <blockquote className={styles.quote}>
          “{impersonate ? joke.replace("Chuck Norris", impersonate) : joke}”
        </blockquote>
      </header>
      <div className={styles.controls}>
        <TextInput
          value={impersonate}
          name={"impersonate"}
          onChange={(e) => {
            setImpersonate(e.target.value);
          }}
          label={"Impersonate"}
          placeholder={"Impersonate Chuck Norris"}
        ></TextInput>
        <Select
          value={categoryIndex !== null ? categories[categoryIndex] : ""}
          name={"category"}
          onChange={(e) => {
            setCategoryIndex(e.target.selectedIndex - 1);
          }}
          label={"Categories"}
          placeholder={"Select a category"}
          options={categories}
        />
        <button>Draw a random {impersonate ? impersonate : "Chuck Norris"} joke</button>
        <button className={styles.altButton}>Save this joke</button>
      </div>
    </div>
  );
}
