import Image from "next/image";
import styles from "./button.module.css";

export default function Button({
  text,
  onClick,
  icon,
  className,
}: {
  text?: string;
  icon?: string;
  onClick: () => void;
  className?: string;
}): JSX.Element {
  return (
    <button
      className={className !== undefined ? className : styles.button}
      onClick={onClick}
    >
      {text !== undefined ? <p>{text}</p> : null}
      {icon !== undefined ? (
        <Image
          src={icon}
          alt="icon"
          width={10}
          height={10}
          className={styles.icon}
        />
      ) : null}
    </button>
  );
}
