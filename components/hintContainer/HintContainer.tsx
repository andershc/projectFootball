import { Player, TransferData } from "../../app/api/types";
import Image from "next/image";
import styles from "./hint-container.module.css";
import { getCountryCode } from "../../lib/CountryCode";
import { useEffect, useState } from "react";

export default function HintContainer({
  correctPlayer,
  transferData,
  numberOfGuesses
}: {
  correctPlayer: Player,
  transferData: TransferData[],
  numberOfGuesses: number
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
              numberOfGuesses > 0 ?
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
            player && player.statistics && player.statistics[0] && player.statistics[0].team && player.statistics[0].team.logo && numberOfGuesses > 1 ?
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
            player && player.statistics && player.statistics[0] && player.statistics[0].team && player.statistics[0].team.logo && numberOfGuesses > 2 ?
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
            player && player.player && player.player.photo && numberOfGuesses > 3 ?
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
            player && player.player && player.player.photo && numberOfGuesses > 4 ?
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
          {/** 
          <div className={styles.transData}>
            {transferData && transferData.map((data) => (
              <Image
                key={transferData.indexOf(data)}
                src={data.teams.in.logo}
                alt="team logo"
                width={32}
                height={32}
              />
            ))}
          </div> */}     
        </div>
    );
}