'use client'

import { useState } from "react";
import LeagueTable from "../../components/leagueTable";
import { LeagueData } from "../api/types";
import useSWR from 'swr';
import css from './league.module.css'
import Head from "next/head";


const apiKey = process.env.API_SPORTS_KEY;

/**export async function getServerSideProps(context: any) {
    const seasonId = 2022;
    const leagueId = context.params.league;
    
    let url: string = `http://localhost:3000/api/leagueData?leagueId=${leagueId}&seasonId=${seasonId}`;
    const res = await fetch(url)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { data, leagueId }, // will be passed to the page component as props
    }      
}**/

export default function LeaguePage() {
  const leagueId = 39;
  const seasonId = 2022;
  fetch( `http://localhost:3000/api/leagueData?leagueId=${leagueId}&seasonId=${seasonId}`)


  return (
      <div>
        <Head>
          <title>Football Standings</title>
          <meta name="description" content="Football Standings" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main>
          {/**<LeagueTable standings={leagueData.league.standings[0]} />**/}
        </main>
      </div>
    );

}