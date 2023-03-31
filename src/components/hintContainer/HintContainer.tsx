import { Player, TransferData } from "../../types";
import Image from "next/image";
import styles from "./hint-container.module.css";
import { getCountryCode } from "../../../lib/CountryCode";
import { useEffect, useState } from "react";

export default function HintContainer({
  correctPlayer,
  transferData,
  numberOfGuesses,
  completed,
}: {
  correctPlayer: Player,
  transferData: TransferData[],
  numberOfGuesses: number,
  completed: boolean
}) {
    const [flagUrl, setFlagUrl] = useState('https://hatscripts.github.io/circle-flags/flags/xx.svg');
    const [player, setPlayer] = useState({} as Player);
    useEffect(() => {
        if (correctPlayer && correctPlayer) {
          setFlagUrl('https://hatscripts.github.io/circle-flags/flags/' + 
          getCountryCode(correctPlayer.nationality) + 
          '.svg');
          setPlayer(correctPlayer);
        }
      }, [correctPlayer]);
    
    return (
        <div className={styles.hintsRow}>
          { completed &&
            <div className={styles.completedRow}>
              <p>{numberOfGuesses <= 8 ? "Congratulations! 🏆\n" : "Tough luck.."}</p>
              <Image
                className={styles.playerPhoto}
                src={player.photo}
                alt="player"
                width={60}
                height={60}
              />
              <p className={styles.playerName}>{correctPlayer.name}</p>
            </div>
          }
          <div className={styles.header}>
            <p>Nation</p>
            <p>League</p>
            <p>Team</p>
            <p>Age</p>
            <p>Position</p>
          </div>
          <div className={styles.values}>
            {
              numberOfGuesses > 0 || completed ?
              <Image
                src={flagUrl}
                alt="flag"
                width={32}
                height={32}
              />
              :
              <Image
                src={'https://hatscripts.github.io/circle-flags/flags/xx.svg'}
                alt="flag"
                width={32}
                height={32}
              />
            }
            {
            player  && player.league && player.league.logo && (numberOfGuesses > 1 || completed) ?
              <Image
                src={player.league.logo}
                alt="team logo"
                width={32}
                height={32}
            />
            :
            <Image
                src={'https://hatscripts.github.io/circle-flags/flags/xx.svg'}
                alt="flag"
                width={32}
                height={32}
              />
          }
          
          {
            player && player.team && player.team.logo && (numberOfGuesses > 2 || completed)?
              <Image
                src={player.team.logo}
                alt="team logo"
                width={32}
                height={32}
            />
            :
            <Image
                src={'https://hatscripts.github.io/circle-flags/flags/xx.svg'}
                alt="flag"
                width={32}
                height={32}
              />
          }
          {
            player && player && player.photo && (numberOfGuesses > 3 || completed) ?
            <p className={"number"}>{correctPlayer?.age}</p>
            :
            <Image
                src={'https://hatscripts.github.io/circle-flags/flags/xx.svg'}
                alt="flag"
                width={32}
                height={32}
              />
          }
          {
            player && player.photo && (numberOfGuesses > 4 || completed)  ?
            <p className={"number"}>{correctPlayer?.position}</p>
            :
            <Image
                src={'https://hatscripts.github.io/circle-flags/flags/xx.svg'}
                alt="flag"
                width={32}
                height={32}
              />
          }
          </div>
          {
            player && player.photo && transferData.length > 0 && (numberOfGuesses  > 5 || completed) ?
            
            <div className={styles.transfersContainer}>
              <p>Club history</p>
                <div className={styles.clubs}>
                  {transferData.slice(0).reverse().map((data) => (
                    <div key={transferData.indexOf(data)} className={styles.club}>
                      <p>{data.date.split('-')[0]}</p>
                      <Image
                        src={data.teams.in.logo}
                        alt="team logo"
                        width={32}
                        height={32}
                      />
                    </div>
                ))}
                <div  className={styles.club}>
                  <p>{player?.season}</p>
                  <Image
                      src={player?.team.logo}
                      alt="team logo"
                      width={32}
                      height={32}
                    />
                    </div>
                  </div>
            </div>
            :
            null
        }  
        </div>
    );
}