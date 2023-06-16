import Image from "next/image";
import styles from "./button.module.css";

export default function Button({
  text,
  onClick,
  icon,
  className,
}: {
  text?: string;
  icon?: string | JSX.Element;
  onClick: () => void;
  className?: string;
}): JSX.Element {
  return (
    <button
      className={className !== undefined ? className : styles.button}
      onClick={onClick}
    >
      {icon !== undefined && typeof icon === "string" ? (
        <Image
          src={icon}
          alt="icon"
          width={10}
          height={10}
          className={styles.icon}
        />
      ) : null}
      {icon !== undefined && typeof icon !== "string" ? icon : null}
      {text !== undefined ? <p>{text}</p> : null}
    </button>
  );
}
