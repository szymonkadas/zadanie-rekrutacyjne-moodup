import styles from "./Icon.module.scss";

export default function Icon({
  src,
  className,
  alt,
  id,
  onClick,
}: {
  src: string;
  className?: string;
  alt?: string;
  id?: string;
  onClick?: () => void;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.icon} ${className}`}
      id={id}
      onClick={onClick}
    />
  );
}
