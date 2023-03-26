import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import css from 'styled-jsx/css'
import ClubsRow from '../components/clubsRow/ClubsRow'
import getAllPlayers from '../lib/getAllPlayers'
import { Player } from './api/schema'

async function main() {
  try {
    const players = await getAllPlayers();
    if(players !== undefined) {
      console.log("Players from PL \n" + players[0].player.name);
    }
  } catch (error) {
    console.error("Error fetching players:", error);
  }
}

main();

const Home: NextPage = () => {
  return (
    <>
        <ClubsRow></ClubsRow>
    </>
  
  )
}

export default Home