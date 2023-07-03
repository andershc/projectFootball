import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import HistoryIcon from "@mui/icons-material/History";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { type Player, type Team } from "../../types";
import Button from "../button/Button";
import GuessContainer from "../guessContainer/GuessContainer";
import PlayerInput from "../playerInput/PlayerInput";
import styles from "./careerpath-game.module.css";

interface Transfer extends Team {
  type: string;
  year: string;
}

interface CareerPathGameProps {
  guessedPlayers: Player[];
  completed: boolean | null;
  clubs: Transfer[];
  correctPlayer: Player | undefined;
  players: Player[] | undefined;
  handlePlayerSelect: (player: Player) => void;
  stats: Record<string, number>;
}

export default function CareerPathGame({
  guessedPlayers,
  completed,
  clubs,
  correctPlayer,
  players,
  handlePlayerSelect,
  stats,
}: CareerPathGameProps): JSX.Element {
  const guessLimit = clubs.length;
  const searchParams = useSearchParams();
  const fetchDate = searchParams.get("date");
  const router = useRouter();

  return (
    <div className={styles.mainContent}>
      <div>
        <h1 className={styles.title}>Guess the Player</h1>
      </div>

      <h2>
        {guessedPlayers.length} / {guessLimit}
      </h2>
      {completed === true || guessedPlayers.length === guessLimit ? (
        <div className={styles.completedRow}>
          {completed === true ? (
            <h2>Congratulations! 🏆</h2>
          ) : (
            <>
              <h2>Tough luck...😞</h2>
              <p>The correct player was:</p>
            </>
          )}
          <Image
            className={styles.playerPhoto}
            src={
              correctPlayer?.photo ??
              "https://hatscripts.github.io/circle-flags/flags/xx.svg"
            }
            alt="player"
            width={60}
            height={60}
          />
          <p className={styles.playerName}>{correctPlayer?.name}</p>
          <p className={styles.comeback}>
            Come back tomorrow for a new challenge!
          </p>
        </div>
      ) : null}

      <div className={styles.transfersContainer}>
        <div className={styles.clubs}>
          {clubs.map((data) => (
            <div key={clubs.indexOf(data)} className={styles.transfer}>
              {clubs.indexOf(data) !== 0 && (
                <DoubleArrowIcon className={styles.arrow} />
              )}
              <div className={styles.club}>
                {clubs.indexOf(data) <= guessedPlayers.length ||
                (completed ?? false) ? (
                  <>
                    <p>{data.type === "Loan" && data.type}</p>
                    <Image
                      src={data.logo}
                      alt={data.name}
                      width={48}
                      height={48}
                    />
                  </>
                ) : (
                  <Image
                    src={
                      "https://hatscripts.github.io/circle-flags/flags/xx.svg"
                    }
                    alt="flag"
                    width={32}
                    height={32}
                  />
                )}
                <p>{data.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {completed === null && players !== undefined && (
        <PlayerInput players={players} onSelect={handlePlayerSelect} />
      )}
      {guessedPlayers.length > 0 && correctPlayer !== undefined && (
        <div className={styles.guesses}>
          <p>Guessed players:</p>
          {guessedPlayers.map((guessedPlayer) => (
            <GuessContainer
              key={guessedPlayer.id}
              player={guessedPlayer}
              correct={guessedPlayer.id === correctPlayer?.id}
              index={guessedPlayers.indexOf(guessedPlayer) + 1}
              correctPlayer={correctPlayer}
            />
          ))}
        </div>
      )}
      {(stats.totalCorrect === undefined || stats.totalCorrect === 0) &&
      completed !== null ? null : (
        <div className={styles.stats}>
          <WhatshotIcon className={styles.statsIcon} />
          <p>
            {stats.totalCorrect !== undefined && stats.totalCorrect !== 0
              ? stats.totalAttempts > 1
                ? `${stats.totalCorrect} people have guessed the correct player today`
                : `${stats.totalCorrect} person has guessed the correct player today`
              : "You can be the first to guess the correct player!"}
          </p>
        </div>
      )}
      <h3>Want to play more?</h3>
      <Button
        onClick={() => {
          // Set the date to yesterday if fetchdate has a value, otherwise set it to the day before fetchdate
          const date =
            fetchDate != null
              ? new Date(fetchDate)
              : new Date(new Date().setDate(new Date().getDate() - 1));
          date.setDate(date.getDate() - 1);
          router.push(`/?date=${date.toISOString().split("T")[0]}`);
        }}
        text="Get yesterday's player"
        className={styles.newPlayerButton}
        icon={<HistoryIcon />}
      />
    </div>
  );
}
