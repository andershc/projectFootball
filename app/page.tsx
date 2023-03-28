'use client'

import { DailyPlayer, Player } from './api/types'
import { useEffect, useState } from 'react'
import { getDailyPlayer, getPlayers}  from './api/fetchPlayers'
import PlayerInput from '../components/playerInput/PlayerInput'
import styles from '../styles/Home.module.css'
import HintContainer from '../components/hintContainer/HintContainer'
import { useGuessContext } from '../lib/GuessContext'
import GuessContainer from '../components/guessContainer/GuessContainer'

export default function Home() {
  const [players, setPlayers] = useState([] as Player[]);
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


    fetchPlayer(), fetchDaily();
  }, []);

  const handlePlayerSelect = (player: Player) => {
    if (player.player.id === correctPlayer.player.id) {
      setGuessedPlayers((prev) => [...prev, player]);
    } else {
      setGuessedPlayers((prev) => [...prev, player]);
    }
  };


  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContent}>
        <h1>Guess the Player</h1>
        <div className={styles.guesses}>
          {guessedPlayers.map((guessedPlayer) => (
              <GuessContainer
                    key={guessedPlayer.player.id} 
                    player={guessedPlayer}
                    correct={guessedPlayer.player.id === correctPlayer.player.id}
                    index={guessedPlayers.indexOf(guessedPlayer) + 1}
                />
            ))}
          </div>
        <PlayerInput players={players} onSelect={handlePlayerSelect} />
        <HintContainer correctPlayer={correctPlayer} transferData={transferData}/>
      </div>
    </div>
  );
}