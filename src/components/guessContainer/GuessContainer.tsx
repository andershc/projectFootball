import Image from "next/image";
import { useEffect, useState } from "react";
import Lottie from 'react-lottie';
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
      }, [correctPlayer]);
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
            <div className={styles.hints}>
            {/* Nationality of guessed player */}
            {
                player.nationality === correctPlayer.nationality ?
                <div className={`${styles.correctFlag} ${styles.flag}`}>
                    <Image   
                        src={flagUrl}
                        alt="flag"
                        width={32}
                        height={32}
                    />
                </div>
                :
                <div className={`${styles.wrongFlag} ${styles.flag}`}>
                    <Image
                        src={flagUrl}
                        alt="flag"
                        width={32}
                        height={32}
                    />
                </div>
                
            }
            {/* League of guessed player */}
            {
                player.league.id === correctPlayer.league.id ?
                <div className={`${styles.correctFlag} ${styles.flag}`}>
                    <Image   
                        src={player.league.logo}
                        alt="league"
                        width={32}
                        height={32}
                    />
                </div>
                :
                <div className={`${styles.wrongFlag} ${styles.flag}`}>
                    <Image
                        src={player.league.logo}
                        alt="league"
                        width={32}
                        height={32}
                    />
                </div>
                
            }
            {/* Club of guessed player */}
            {
                player.team.id === correctPlayer.team.id ?
                <div className={`${styles.correctFlag} ${styles.flag}`}>
                    <Image   
                        src={player.team.logo}
                        alt="flag"
                        width={32}
                        height={32}
                    />
                </div>
                :
                <div className={`${styles.wrongFlag} ${styles.flag}`}>
                    <Image
                        src={player.team.logo}
                        alt="flag"
                        width={32}
                        height={32}
                    />
                </div>
                
            }
            {/* Position of guessed player */}
            {
                player.nationality === correctPlayer.nationality ?
                <div className={styles.position} id={styles.correctPosition}>
                    <p>{getPositionAcronym(player.position)}</p>
                </div>
                :
                <div className={styles.position} id={styles.wrongPosition}>
                    <p>{getPositionAcronym(player.position)}</p>
                </div>
                
            }
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
        </div>
    );
    }