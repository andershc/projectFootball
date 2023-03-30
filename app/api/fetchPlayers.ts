import { DocumentData } from "firebase-admin/firestore";
import getAllPlayers from "../../firebase/firestore/getAllPlayers";
import getData from "../../firebase/firestore/getData";
import { DailyPlayer, Player, TransferData } from "./types";
import moment from "moment";
import "moment-timezone";
import axios from "axios";

const APIKey = process.env.API_KEY;

async function callApi(endpoint: string, params = {}) {
  const url = `https://v3.football.api-sports.io/${endpoint}`;
  const apiKey = APIKey;

  try {
    const response = await axios.get(url, {
      params,
      headers: {
        "x-rapidapi-key": apiKey,
      },
    });
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error calling API:", error);
    return null;
  }
}


export async function getPlayers(): Promise<Player[] | undefined> {
    return getAllPlayers()
      .then((data) => {
        console.log('Data fetched successfully:', data?.length);
        // Remove all duplicate players
        const players: Player[] = [];
        data?.forEach((player) => {
          if(!players.some((p) => p.player.id === player.player.id)) {
            players.push(player);
          }
        });
        return players;
      })
      .catch((error) => {
        console.log(error);
        return undefined;
      });
}

// Fetch the daily players from firestore
export async function getDailyPlayer(): Promise<DailyPlayer | undefined> {
    const date = moment().tz('America/New_York');
    const formatCurrentDate = `${date.date()}-${date.month() + 1}-${date.year()}`;
    console.log(date)
    let dailyPlayer: DailyPlayer | undefined;
    await getData('dailyPlayer', formatCurrentDate)
      .then((data) => {
        console.log('Data fetched successfully:', data);
        dailyPlayer = data as DailyPlayer;
        return dailyPlayer;
      })
      .catch((error) => {
        console.log(error);
        return undefined;
      }
    );
    return dailyPlayer;
}

// Fetch one random player from firestore
export async function getRandomPlayer(players: Player[]): Promise<DailyPlayer | undefined> {
    
    try{
      let majorTeam = false;
      let calls = 0;
      let randomPlayer = players[Math.floor(Math.random() * players.length)];
      console.log("PLayer " + randomPlayer.player.id)
      while(!majorTeam && calls <= 10) {
        calls++;
        randomPlayer = players[Math.floor(Math.random() * players.length)];
        const transfers = await callApi('transfers', {player: randomPlayer.player.id})
        const transferData = transfers.response[0].transfers as TransferData[];  
        majorTeam = checkMajorTeam(transferData, randomPlayer)
        console.log('Data fetched successfully:', transferData);
        const dailyPlayer: DailyPlayer = {
          player: randomPlayer,
          transferData: transferData,
        };
        return dailyPlayer;
          
      }
    } catch (error) {
      console.log("ERROR");
      console.log(error);
      return undefined;
    }
}

/** Function for checking if a player has played for a major team
 * @param {transferData}  transferData to check
 * @param {player}  player to check
 * @return {boolean}  true if player has played for a major team
 * */
function checkMajorTeam(transferData: TransferData[], player: Player): boolean {
  return transferData.some((transfer: TransferData) => {
    return (
      Object.values(majorTeams).includes(transfer.teams.in.id) ||
      Object.values(majorTeams).includes(transfer.teams.out.id) ||
      Object.values(majorTeams).includes(player.statistics[0].team.id)
    );
  });
}

// Dictionary of top teams in Europe and their IDs
const majorTeams = {
  "Manchester United": 33,
  "Manchester City": 50,
  "Liverpool": 40,
  "Chelsea": 49,
  "Arsenal": 521,
  "Tottenham": 47,
  "Barcelona": 529,
  "Real Madrid": 541,
  "Atletico Madrid": 530,
  "Sevilla": 536,
  "Inter Milan": 505,
  "Juventus": 496,
  "AC Milan": 489,
  "Napoli": 492,
  "Roma": 497,
  "Bayern Munich": 157,
  "Borussia Dortmund": 165,
  "Bayer Leverkusen": 168,
  "RB Leipzig": 173,
  "Paris Saint-Germain": 85,
  "Lyon": 80,
  "Lille": 79,
  "Monaco": 79,
};