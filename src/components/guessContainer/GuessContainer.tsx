import Image from "next/image";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { getCountryCode } from "../../../lib/CountryCode";
import { getPositionAcronym } from "../../../lib/GetPosition";
import checkmark from '../../../public/static/lotti/checkmark.json';
import cross from '../../../public/static/lotti/red-cross.json';
import { Player } from "../../types";
import styles from "./guess-container.module.css";

export default function GuessContainer({
    player,
    correctPlayer,
    correct,
    index
}: {
    player: Player,
    correctPlayer: Player,
    correct: boolean,
    index: number
}) {
    const [flagUrl, setFlagUrl] = useState('https://hatscripts.github.io/circle-flags/flags/xx.svg');
    useEffect(() => {
        if (player && player.nationality) {
          setFlagUrl('https://hatscripts.github.io/circle-flags/flags/' + 
          getCountryCode(player.nationality) + 
          '.svg');
        }
      }, [correctPlayer, player]);
    const checkmarkOptions = {
        loop: false,
        autoplay: false,
        animationData: checkmark,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
        delay: 2500
    };
    const crossOptions = {
        loop: false,
        autoplay: false,
        animationData: cross,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
        delay: 2500
    };
    return (
        <div className={styles.container}>
            <p className={styles.indexNumber}>{index}</p>
            <div className={styles.content}>
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
                
                <div className={styles.hints}>
                    {/* Nationality of guessed player */}
                    <div className={`${styles.hint} ${player.nationality === correctPlayer.nationality ? styles.correct : styles.wrong}`}>
                        <Image
                        src={flagUrl}
                        alt="flag"
                        width={28}
                        height={28}
                        />
                    </div>
                    {/* League of guessed player */}
                    <div className={`${styles.hint} ${player.league.id === correctPlayer.league.id ? styles.correct : styles.wrong}`}>
                        <Image
                        src={player.league.logo}
                        alt="league"
                        width={24}
                        height={24}
                        />
                    </div>
                    {/* Club of guessed player */}
                    <div className={`${styles.hint} ${player.team.id === correctPlayer.team.id ? styles.correct : styles.wrong}`}>
                        <Image
                        src={player.team.logo}
                        alt="flag"
                        width={28}
                        height={28}
                        />
                    </div>
                    {/* Position of guessed player */}
                    <div className={`${styles.hint} ${styles.position} ${player.position === correctPlayer.position ? styles.correct : styles.wrong}`}>
                        <p>{getPositionAcronym(player.position)}</p>
                    </div>
                </div>
            </div>
            <div className={styles.lottieAnimation}>
                {correct ? (  
                        <Lottie
                            options={checkmarkOptions}
                            height={50}
                            width={50}
                        />
                    ) : (
                        <Lottie
                            options={crossOptions}
                            height={50}
                            width={50}
                        />
                    )
                }
            </div>
        </div>
    );
    }