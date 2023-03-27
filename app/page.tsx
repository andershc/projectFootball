'use client'

import { Player } from './api/types'
import { useEffect, useState } from 'react'
import fetchPlayers from './api/fetchPlayers'
import PlayerInput from '../components/playerInput/PlayerInput'
import styles from '../styles/Home.module.css'
import HintContainer from '../components/hintContainer/HintContainer'

export default function Home() {
  const [randomPlayer, setRandomPlayer] = useState({
  } as Player);
  const [players, setPlayers] = useState([] as Player[]);

  useEffect(() => {
    const fetchPlayer = async () => {
      const playersList = await fetchPlayers() as Player[];
      if(playersList !== undefined){
        setPlayers(playersList);
        const randomPlayerIndex = Math.floor(Math.random() * playersList.length);
        setRandomPlayer(playersList[randomPlayerIndex]);
      }
    };

    fetchPlayer();
  }, []);

  const handlePlayerSelect = (player: Player) => {
    if (player.player.id === randomPlayer.player.id) {
      alert('Correct! The player is ' + randomPlayer?.player.name + '.');
    } else {
      alert('Incorrect. Try again.');
    }
  };


  return (
    <div className={styles.mainContainer}>
      <h1>Guess the Player</h1>
      <HintContainer correctPlayer={randomPlayer}/>
      <PlayerInput players={players} onSelect={handlePlayerSelect} />
      <p>Correct Player: {randomPlayer?.player?.name}</p>
    </div>
  );
}