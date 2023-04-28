import GuessContainer from "../guessContainer/GuessContainer";
import PlayerInput from "../playerInput/PlayerInput";
import styles from "./careerpath-game.module.css";
import Image from "next/image";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Player, Team } from "../../types";

interface Transfer extends Team {
    type: string;
    year: string;
}

interface CareerPathGameProps {
    guessedPlayers: Player[];
    completed: boolean | null;
    clubs: Transfer[];
    correctPlayer: Player;
    players: Player[];
    handlePlayerSelect: (player: Player) => void;
    stats: { [key: string]: number };
}

export default function CareerPathGame({
    guessedPlayers,
    completed,
    clubs,
    correctPlayer,
    players,
    handlePlayerSelect,
    stats,
}: CareerPathGameProps) {
    const guessLimit = clubs.length;
    return (
        <div className={styles.mainContent}>
        <h1 className={styles.title}>Guess the Player</h1>
        <h2>{guessedPlayers.length} / {guessLimit}</h2>
        <p className={styles.comeback}>{completed && "Come back tomorrow for a new challenge!"}</p>
        { completed || guessedPlayers.length === guessLimit ?
        <div className={styles.completedRow}>
            {completed ? 
            (
                <h2>Congratulations! 🏆</h2>
            ):(
                <>
                <h2>Tough luck...😞</h2>
                <p>The correct player was:</p>
                </>
            )
            }

            <Image
            className={styles.playerPhoto}
            src={correctPlayer.photo}
            alt="player"
            width={60}
            height={60}
            />
            <p className={styles.playerName}>{correctPlayer.name}</p>
        </div> : null
        }
    
        <div className={styles.transfersContainer}>
            <div className={styles.clubs}>
                {clubs.map((data) => (
                <div key={clubs.indexOf(data)} className={styles.transfer}>
                    {clubs.indexOf(data) !== 0 && <DoubleArrowIcon className={styles.arrow}/>}
                    <div className={styles.club}>
                    
                    {clubs.indexOf(data) <= guessedPlayers.length || completed ?
                    (
                        <>
                        <p>{data.type == 'Loan' && data.type}</p>
                        <Image
                            src={data.logo}
                            alt={data.name}
                            width={48}
                            height={48}
                        />
                        </>
                        
                    ):(
                        <Image
                        src={'https://hatscripts.github.io/circle-flags/flags/xx.svg'}
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
        {completed === null && <PlayerInput players={players} onSelect={handlePlayerSelect}/>}
        { guessedPlayers.length > 0 &&
          <div className={styles.guesses}>
            <p>Guessed players:</p>
            {guessedPlayers.map((guessedPlayer) => (
              <GuessContainer
                key={guessedPlayer.id} 
                player={guessedPlayer}
                correct={guessedPlayer.id === correctPlayer.id}
                index={guessedPlayers.indexOf(guessedPlayer) + 1}
              />
            ))}
          </div>
        }
        {(stats.totalCorrect === undefined || stats.totalCorrect === 0) && completed !== null ? 
        null : 
        <div className={styles.stats}>
          <WhatshotIcon
            className={styles.statsIcon}
          />
          <p>{stats.totalCorrect !== undefined && stats.totalCorrect !== 0 ? 
          (stats.totalAttempts > 1 ?
            (
              `${stats.totalCorrect} people have guessed the correct player today`
            ) : (
              `${stats.totalCorrect} person has guessed the correct player today`
            )
          ) : (
            "You can be the first to guess the correct player!"
          )
          }
          </p>
        </div>}
        
        
    </div>
    )
}