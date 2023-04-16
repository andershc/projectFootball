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
import { useRouter } from "next/navigation";
import { usePlayersContext } from "../../lib/PlayersContext";
import { updateScore } from "./api/updateScore";

const guessLimit = 5;


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isDailyPlayer, setIsDailyPlayer] = useState(true);
  const { user } = useAuthContext();
  const router = useRouter();

  const { 
    guessedPlayers,
    setGuessedPlayers,
    correctPlayer,
    setCorrectPlayer,
    transferData,
    setTransferData,
    completed,
    setCompleted,
   } = useGuessContext();

   const {players, setPlayers} = usePlayersContext();

  useEffect(() => {
    const fetchPlayer = async () => {
      if(players.length > 0) return setLoading(false);;
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
    } else {
      router.push('/signIn');
    }
  }, [setCorrectPlayer, setTransferData, user, router, players.length, setPlayers]);

  const handlePlayerSelect = (player: Player) => {
    if(guessedPlayers.length >= guessLimit) return;
    if (player.id === correctPlayer.id) {
      setCompleted(true);
      setGuessedPlayers((prev) => [...prev, player]);
      if(isDailyPlayer) {
        updateScore(user, guessedPlayers.length + 1, guessLimit, true)
      }
    } else {
      setGuessedPlayers((prev) => [...prev, player]);
      if(guessedPlayers.length === guessLimit) {
        setCompleted(true)
        updateScore(user, guessedPlayers.length + 1, guessLimit, false)
      };
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
                 {
                    transferData[transferData.length-1].teams.in.id !== correctPlayer.team.id &&
                    <div className={styles.transfer}>
                    <DoubleArrowIcon className={styles.arrow}/>
                    <div className={styles.club}>
                      <Image
                        src={correctPlayer.team.logo}
                        alt="team logo"
                        width={48}
                        height={48}
                      />
                    </div>
                    </div>
                 }
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
          
    </div>
      }
      { process.env.NODE_ENV === 'development' &&
        <div className={styles.gamesContainer}>
        <Button
          onClick={() => getRandomPlayer(players).then((player) => {
            if(player === undefined) return;
            setIsDailyPlayer(false);
            setCompleted(false);
            setGuessedPlayers([])
            setCorrectPlayer(player?.player)
            setTransferData(player?.transferData)
            }
          )}
          text="Get new player"
          className={styles.newPlayerButton}
        />
        <Link className={styles.game} href="/default">
            <p>👤 Standard</p>
        </Link>
      </div>}
        
    </div>
  );
}