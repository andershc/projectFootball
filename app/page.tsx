'use client'

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import css from 'styled-jsx/css'
import ClubsRow from '../components/clubsRow/ClubsRow'
import getAllPlayers from './api/getAllPlayers'
import { Player, PlayerMetaData } from './api/types'
import { SetStateAction, useEffect, useState } from 'react'
import fetchPlayers from './api/fetchPlayers'
import PlayerInput from '../components/playerInput/PlayerInput'

const Home: NextPage = () => {
  const [randomPlayer, setRandomPlayer] = useState({} as Player);
  const [players, setPlayers] = useState([] as Player[]);

  useEffect(() => {
    const fetchPlayer = async () => {
      const playersList = await fetchPlayers() as Player[];
      if(playersList !== undefined){
        setPlayers(playersList);
        const randomPlayerIndex = Math.floor(Math.random() * players.length);
        setRandomPlayer(playersList[randomPlayerIndex]);

      }
    };

    fetchPlayer();
  }, []);

  const handlePlayerSelect = (player: Player) => {
    if (player.player.id === randomPlayer.player.id) {
      alert('Correct! The player is ' + randomPlayer.player.name + '.');
    } else {
      alert('Incorrect. Try again.');
    }
  };


  return (
    <div>
      <h1>Guess the Player</h1>
      <PlayerInput players={players} onSelect={handlePlayerSelect} />
      <p>Correct Player: {randomPlayer.player?.name}</p>
    </div>
  );
}

export default Home