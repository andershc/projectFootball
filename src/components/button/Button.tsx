import Image from 'next/image';
import styles from './button.module.css';

export default function Button({
    text,
    onClick,
    icon,
    className,
}: {
    text?: string,
    icon?: string,
    onClick: () => void
    className?: string
}) {
    return (
        <button 
            className={className || styles.button}
            onClick={onClick}
        >
            {text ? <p>{text}</p> : null}
            {icon ?
                <Image
                    src={icon}
                    alt="icon"
                    width={10}
                    height={10}
                    className={styles.icon}
                />
                : null
            }
        </button>
    );
}