import Image from 'next/image';
import styles from './button.module.css';

export default function Button({
    text,
    onClick,
    icon
}: {
    text?: string,
    icon?: string,
    onClick: () => void
}) {
    return (
        <button 
            className={styles.button}
            onClick={onClick}
        >
            {text ? <p>{text}</p> : null}
            {icon ?
                <Image
                    src={icon}
                    alt="icon"
                    width={32}
                    height={32}
                />
                : null
            }
        </button>
    );
}