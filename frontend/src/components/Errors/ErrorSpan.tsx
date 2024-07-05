// @ts-ignore
import styles from "./ErrorSpan.module.scss";
import { errorSuffix } from "./utilVars";

export default function ErrorSpan({
  name,
  errorMessage,
}: {
  name: string;
  errorMessage: string;
}) {
  return (
    <span
      className={styles.error}
      id={`${name}${errorSuffix}`}
      hidden={!errorMessage}
    >
      {errorMessage}
    </span>
  );
}
