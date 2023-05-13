import Image from "next/image";
import { useEffect, useState } from "react";
import { getCountryCode } from "../../../lib/CountryCode";
import { type Player } from "../../types";
import styles from "./hint-container.module.css";

export default function HintContainer({
  correctPlayer,
  numberOfGuesses,
  completed,
}: {
  correctPlayer: Player;
  numberOfGuesses: number;
  completed: boolean;
}): JSX.Element {
  const [flagUrl, setFlagUrl] = useState(
    "https://hatscripts.github.io/circle-flags/flags/xx.svg"
  );
  const [player, setPlayer] = useState<Player | null>(null);
  useEffect(() => {
    if (correctPlayer.nationality.length > 0) {
      setFlagUrl(
        "https://hatscripts.github.io/circle-flags/flags/" +
          getCountryCode(correctPlayer.nationality) +
          ".svg"
      );
      setPlayer(correctPlayer);
    }
  }, [correctPlayer]);

  return (
    <div className={styles.hintsRow}>
      {completed && player !== null && (
        <div className={styles.completedRow}>
          <p>
            {numberOfGuesses < 8 ? "Congratulations! 🏆\n" : "Tough luck.."}
          </p>
          <Image
            className={styles.playerPhoto}
            src={player.photo}
            alt="player"
            width={60}
            height={60}
          />
          <p className={styles.playerName}>{correctPlayer.name}</p>
        </div>
      )}
      <div className={styles.header}>
        <p>Nation</p>
        <p>League</p>
        <p>Team</p>
        <p>Age</p>
        <p>Position</p>
      </div>
      <div className={styles.values}>
        {numberOfGuesses > 0 || completed ? (
          <Image src={flagUrl} alt="flag" width={32} height={32} />
        ) : (
          <Image
            src={"https://hatscripts.github.io/circle-flags/flags/xx.svg"}
            alt="flag"
            width={32}
            height={32}
          />
        )}
        {player?.league?.logo != null && (numberOfGuesses > 1 || completed) ? (
          <Image
            src={player.league.logo}
            alt="team logo"
            width={32}
            height={32}
          />
        ) : (
          <Image
            src={"https://hatscripts.github.io/circle-flags/flags/xx.svg"}
            alt="flag"
            width={32}
            height={32}
          />
        )}

        {player?.team?.logo != null && (numberOfGuesses > 2 || completed) ? (
          <Image
            src={player?.team?.logo}
            alt="team logo"
            width={32}
            height={32}
          />
        ) : (
          <Image
            src={"https://hatscripts.github.io/circle-flags/flags/xx.svg"}
            alt="flag"
            width={32}
            height={32}
          />
        )}
        {player?.photo !== null && (numberOfGuesses > 3 || completed) ? (
          <p className={"number"}>{correctPlayer?.age}</p>
        ) : (
          <Image
            src={"https://hatscripts.github.io/circle-flags/flags/xx.svg"}
            alt="flag"
            width={32}
            height={32}
          />
        )}
        {player?.photo !== null && (numberOfGuesses > 4 || completed) ? (
          <p className={"number"}>{correctPlayer?.position}</p>
        ) : (
          <Image
            src={"https://hatscripts.github.io/circle-flags/flags/xx.svg"}
            alt="flag"
            width={32}
            height={32}
          />
        )}
      </div>
    </div>
  );
}
