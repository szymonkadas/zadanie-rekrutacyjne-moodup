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
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    apiClient.fetchCategories(auth).then((categories) => {
      setCategories(categories);
    });
  }, []);

  const fetchJoke = async () => {
    setIsLoading(true);
    try {
      const newJoke = await apiClient.fetchRandomJoke(
        auth,
        categoryIndex ? categories[categoryIndex] : undefined
      );
      setJoke(newJoke.value);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const saveJoke = () => {
    console.log("save!");
  };

  return (
    <div className={styles.pageWrapper}>
      <img
        src={"/img/chuck.jpg"}
        alt={"Chuck Norris"}
        loading={"lazy"}
        className={styles.chuckImage}
      ></img>
      <header>
        <h1>Get your random joke</h1>
        <blockquote className={styles.quote}>
          {impersonate
            ? joke.replace(new RegExp("Chuck Norris", "g"), impersonate)
            : joke}
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
        <button onClick={fetchJoke} disabled={isLoading}>
          Draw a random {impersonate ? impersonate : "Chuck Norris"} joke
        </button>
        <button
          className={styles.altButton}
          onClick={saveJoke}
          disabled={isLoading}
        >
          Save this joke
        </button>
      </div>
    </div>
  );
}
