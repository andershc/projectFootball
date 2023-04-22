import { Player } from "../../types";
import { useGuessContext } from "../../../lib/GuessContext";
import Image from "next/image";
import styles from "./guess-container.module.css";
import CheckMarkIcon from "../../../public/static/images/accept.png";
import CrossIcon from "../../../public/static/images/remove.png";
import Lottie from 'react-lottie';
import checkmark from '../../../public/static/lotti/checkmark.json';
import cross from '../../../public/static/lotti/red-cross.json';

export default function GuessContainer({
    player,
    correct,
    index
}: {
    player: Player,
    correct: boolean,
    index: number
}) {
    const checkmarkOptions = {
        loop: false,
        autoplay: true,
        animationData: checkmark,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const crossOptions = {
        loop: false,
        autoplay: true,
        animationData: cross,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
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
                    <Lottie
                        options={checkmarkOptions}
                        height={50}
                        width={50}
                    ></Lottie>
                :
                <Lottie
                    options={crossOptions}
                    height={50}
                    width={50}
                ></Lottie>
            }
            
        </div>
    );
    }