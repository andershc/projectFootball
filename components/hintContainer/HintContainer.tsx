import { Player, TransferData } from "../../app/api/types";
import Image from "next/image";
import styles from "./hint-container.module.css";
import { getCountryCode } from "../../lib/CountryCode";
import { useEffect, useState } from "react";

export default function HintContainer({correctPlayer, transferData}: {correctPlayer: Player, transferData: TransferData[]}) {
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
            <p>Team</p>
            <p>Age</p>
          </div>
          <div className={styles.values}>
          <Image
            src={flagUrl}
            alt="flag"
            width={32}
            height={32}
          />
          {
            player && player.statistics && player.statistics[0] && player.statistics[0].team && player.statistics[0].team.logo &&
              <Image
                src={player.statistics[0].team.logo}
                alt="team logo"
                width={32}
                height={32}
            />
          }
          {
            player && player.player && player.player.photo &&
            <p className={"number"}>{correctPlayer?.player.age}</p>
          }
          </div>
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
          </div>      
        </div>
    );
}