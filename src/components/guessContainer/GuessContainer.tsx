import { Player } from "../../types";
import { useGuessContext } from "../../../lib/GuessContext";
import Image from "next/image";
import styles from "./guess-container.module.css";

export default function GuessContainer({
    player,
    correct,
    index
}: {
    player: Player,
    correct: boolean,
    index: number
}) {
    return (
        <div className={styles.container}>
            <p className={styles.indexNumber}>{index}</p>
            <div className={styles.player}>
                <Image
                    className={styles.playerPhoto}
                    src={player.photo}
                    alt={player.name}
                    width={50}
                    height={50}
                />
                <p>{player.name}</p>
            </div>
            {
                correct ?
                    <Image
                        src={'/accept.png'}
                        alt="correct"
                        width={32}
                        height={32}
                    />
                :
                <Image
                    src={'/remove.png'}
                    alt="incorrect"
                    width={36}
                    height={36}
                />
            }
            
        </div>
    );
    }