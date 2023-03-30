import { Player, TransferData } from "../../app/api/types";
import Image from "next/image";
import styles from "./hint-container.module.css";
import { getCountryCode } from "../../lib/CountryCode";
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
        if (correctPlayer && correctPlayer.player) {
          setFlagUrl('https://hatscripts.github.io/circle-flags/flags/' + 
          getCountryCode(correctPlayer.player.nationality) + 
          '.svg');
          setPlayer(correctPlayer);
        }
      }, [correctPlayer]);
    
    return (
        <div className={styles.hintsRow}>
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
            player && player.statistics && player.statistics[0] && player.statistics[0].team && player.statistics[0].team.logo && (numberOfGuesses > 1 || completed) ?
              <Image
                src={player.statistics[0].league.logo}
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
            player && player.statistics && player.statistics[0] && player.statistics[0].team && player.statistics[0].team.logo && (numberOfGuesses > 2 || completed)?
              <Image
                src={player.statistics[0].team.logo}
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
            player && player.player && player.player.photo && (numberOfGuesses > 3 || completed) ?
            <p className={"number"}>{correctPlayer?.player.age}</p>
            :
            <Image
                src={'https://hatscripts.github.io/circle-flags/flags/xx.svg'}
                alt="flag"
                width={32}
                height={32}
              />
          }
          {
            player && player.player && player.player.photo && (numberOfGuesses > 4 || completed)  ?
            <p className={"number"}>{correctPlayer?.statistics[0].games.position}</p>
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
            player && player.player && player.player.photo && transferData.length > 0 && (numberOfGuesses  > 5 || completed) ?
            
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
                  <p>{player?.statistics[0]?.league.season}</p>
                  <Image
                      src={player?.statistics[0]?.team.logo}
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