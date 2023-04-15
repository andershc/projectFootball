'use client'

import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../lib/AuthContext";
import { useGuessContext } from "../../lib/GuessContext";
import GuessContainer from "../components/guessContainer/GuessContainer";
import PlayerInput from "../components/playerInput/PlayerInput";
import { Player, DailyPlayer } from "../types";
import { getPlayers, getDailyPlayer, getRandomPlayer } from "./api/fetchPlayers";
import Loading from "./loading";
import Image from "next/image";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Button from "../components/button/Button";

const guessLimit = 5;

export default function Home() {
  const [players, setPlayers] = useState([] as Player[]);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { 
    guessedPlayers,
    setGuessedPlayers,
    correctPlayer,
    setCorrectPlayer,
    transferData,
    setTransferData
   } = useGuessContext();

  useEffect(() => {
    const fetchPlayer = async () => {
      const playersList = await getPlayers() as Player[];
      if(playersList !== undefined){
        setLoading(false);
        setPlayers(playersList);
      }
    };
    const fetchDaily = async () => {
      const dailyPlayer = await getDailyPlayer() as DailyPlayer;
      if(dailyPlayer !== undefined){
        setCorrectPlayer(dailyPlayer.player);
        setTransferData(dailyPlayer.transferData);
      }
    };

    if(user?.email){
      fetchPlayer(), fetchDaily();
    }
  }, [setCorrectPlayer, setTransferData, user]);

  const handlePlayerSelect = (player: Player) => {
    if(guessedPlayers.length >= guessLimit) return;
    if (player.id === correctPlayer.id) {
      setCompleted(true);
      setGuessedPlayers((prev) => [...prev, player]);
    } else {
      setGuessedPlayers((prev) => [...prev, player]);
      if(guessedPlayers.length === guessLimit - 1) setCompleted(true);
    }
  };


  return (
    <div className={styles.mainContainer}>
      {loading ? <Loading /> :
      <div className={styles.mainContent}>
        <h1>Guess the Player</h1>
        <h2>{guessedPlayers.length} / {guessLimit}</h2>
        { completed &&
            <div className={styles.completedRow}>
              <p>{guessedPlayers.length < 5 ? "Congratulations! 🏆\n" : "Tough luck.."}</p>
              <Image
                className={styles.playerPhoto}
                src={correctPlayer.photo}
                alt="player"
                width={60}
                height={60}
              />
              <p className={styles.playerName}>{correctPlayer.name}</p>
            </div>
          }
        {
            transferData && transferData.length > 0 &&
            <div className={styles.transfersContainer}>
                <div className={styles.clubs}>
                  <div className={styles.transfer}>
                    <Image
                      src={transferData[transferData.length-1].teams.out.logo}
                      alt="team logo"
                      width={48}
                      height={48}
                    />
                  </div>
                  {transferData.slice(0).reverse().map((data) => (
                    <div key={transferData.indexOf(data)} className={styles.transfer}>
                      <DoubleArrowIcon className={styles.arrow}/>
                      <div className={styles.club}>
                        <p>{data.type == 'Loan' && data.type}</p>
                        <Image
                          src={data.teams.in.logo}
                          alt="team logo"
                          width={48}
                          height={48}
                        />
                      </div>
                      
                    </div>
                ))}
                </div>
            </div>
          }
        {!completed && <PlayerInput players={players} onSelect={handlePlayerSelect}/>}
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
          <Button
            onClick={() => getRandomPlayer(players).then((player) => {
              if(player === undefined) return;
              setCompleted(false);
              setGuessedPlayers([])
              setCorrectPlayer(player?.player)
              setTransferData(player?.transferData)
              }
            )}
            text="Get new player"
            className={styles.newPlayerButton}
          />
      </div>
      }
        <div className={styles.gamesContainer}>
        <Link className={styles.game} href="/default">
            <p>👤 Standard</p>
        </Link>
      </div>
        
    </div>
  );
}