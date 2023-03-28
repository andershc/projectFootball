import { DocumentData } from "firebase-admin/firestore";
import getAllPlayers from "../../firebase/firestore/getAllPlayers";
import getData from "../../firebase/firestore/getData";
import { DailyPlayer, Player } from "./types";
import moment from "moment";
import "moment-timezone";

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
  