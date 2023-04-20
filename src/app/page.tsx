'use client'

import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../lib/AuthContext";
import { useGuessContext } from "../../lib/GuessContext";
import GuessContainer from "../components/guessContainer/GuessContainer";
import PlayerInput from "../components/playerInput/PlayerInput";
import { Player, DailyPlayer, Team, TransferData } from "../types";
import { getPlayers, getDailyPlayer, getRandomPlayer } from "./api/fetchPlayers";
import Loading from "./loading";
import Image from "next/image";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Button from "../components/button/Button";
import { useRouter } from "next/navigation";
import { usePlayersContext } from "../../lib/PlayersContext";
import { updateScore } from "./api/updateUser";
import moment from "moment";

interface Transfer extends Team {
  type: string;
  year: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isDailyPlayer, setIsDailyPlayer] = useState(true);
  const [clubs, setClubs] = useState<Transfer[]>([]);
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
        setClubs(getTransferClubs(dailyPlayer.transferData, dailyPlayer.player.team));
      }
    };

    if(user?.email){
      fetchPlayer(), fetchDaily();
    } else {
      router.push('/signIn');
    }
  }, [setCorrectPlayer, setTransferData, user, router, players.length, setPlayers]);

  const guessLimit = clubs?.length || 0;

  const handlePlayerSelect = (player: Player) => {
    if(guessedPlayers.length >= guessLimit) return;
    if (player.id === correctPlayer.id) {
      setCompleted(true);
      setGuessedPlayers((prev) => [...prev, player]);
      if(isDailyPlayer) {
        updateScore(user, guessedPlayers, guessLimit, true)
      }
    } else {
      setGuessedPlayers((prev) => [...prev, player]);
      if(guessedPlayers.length === guessLimit) {
        updateScore(user, guessedPlayers, guessLimit, false)
      };
    }
  };

  return (
    <div className={styles.mainContainer}>
      {loading ? <Loading /> :
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Guess the Player</h1>
        <h2>{guessedPlayers.length} / {guessLimit}</h2>
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
        {
            transferData && transferData.length > 0 &&
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
          }
        {!completed && <PlayerInput players={players} onSelect={handlePlayerSelect}/>}
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
          </div>}
          
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

function getTransferClubs(transferData: TransferData[], currentTeam: Team): Transfer[] {
  // reverse the transfer data so the last club is first
  transferData = transferData.slice(0).reverse();
  const currentYear = new Date().getFullYear();
  // If the transfer is a loan, dont include the parent club and skip next transfer
  const clubs = transferData.map((data) => {
    // If the previous transfer is a loan, skip it
      return {
        type: data.type,
        year: data.date.split('-')[0],
        ...data.teams.in
      }
  });
  // Add the first out club to first spot in the list
  clubs.unshift({...transferData[0].teams.out, type: 'First', year: transferData[0].date.split('-')[0],});
  // If the last club in is not the current club, add it to the list
  if(transferData[transferData.length-1].teams.in.id !== currentTeam.id){
    clubs.push({
      ...currentTeam,
      type: 'Current',
      year: currentYear.toString()
    });
  }
  // Remove undefined values
  for(let i = 0; i < clubs.length; i++){
    if(clubs[i] === undefined) clubs.splice(i, 1);
  }
  return clubs as Transfer[];
}