import { useMemo } from "react";
import styles from "./Input.module.scss";

type SelectProps = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  label: string;
  initialStyle?: string;
  required?: boolean;
  placeholder?: string;
};

export default function Select({
                                 name,
                                 value,
                                 onChange,
                                 options,
                                 label,
                                 initialStyle,
                                 required,
                                 placeholder,
                               }: SelectProps) {
  const mappedOptions = useMemo(() =>
    options.map((option, index) =>
      <option value={option} key={`${name}${option}${index}`}>
        {option}
      </option>
    ), [name, options]);

  return (
    <label className={`${styles.inputContainer} ${initialStyle ?? ""}`}>
      <span className={styles.label}>{label}</span>
      <select
        name={name}
        className={`${styles.selectElement} ${styles.selectElementOnDefault} ${initialStyle ? initialStyle : ""}`}
        onChange={onChange}
        value={value}
        required={required}
      >
        { !value && <option value="" disabled selected>{placeholder ?? "Select Option"}</option> }
        {mappedOptions}
      </select>
    </label>
  );
}