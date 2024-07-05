import ErrorSpan from "../Errors/ErrorSpan";
import { errorSuffix } from "../Errors/utilVars";
// @ts-ignore
import styles from "./Input.module.scss";
import { TextInputProps, TextInputTypes } from "./InputType";

export default function TextInput({
  value,
  onChange,
  onBlur,
  name,
  label,
  placeholder,
  required,
  type,
  minLength,
  maxLength = 1000,
  disabled,
  inputMode,
  errorMessage,
  displayError = true,
  initialStyle,
}: TextInputProps) {
  let remainingChars;
  let showCounter = false;

  if (value !== undefined) {
    remainingChars = maxLength - value.length;
    showCounter = remainingChars <= 9 && remainingChars > 0 && maxLength > 10;
  }
  const notification =
    errorMessage ||
    (showCounter && remainingChars) ||
    (remainingChars === 0 && "Limit znaków wyczerpany") ||
    "";

  return (
    <label
      className={`${styles.inputContainer} ${styles.textInputContainer} ${
        initialStyle ?? ""
      }`}
    >
      <span>{label}</span>
      <input
        className={`${styles.textInput} ${initialStyle ?? ""}`}
        type={type || TextInputTypes.TEXT}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        disabled={disabled}
        inputMode={inputMode}
        onBlur={onBlur}
        aria-invalid={errorMessage ? !!errorMessage : undefined}
        aria-describedby={`${name}-text_input${errorSuffix}`}
      />
      {notification !== "" && displayError && (
        <ErrorSpan
          errorMessage={`${notification}`}
          name={`${name}-text_input`}
        />
      )}
    </label>
  );
}
