import { DocumentData } from "firebase-admin/firestore";
import getAllPlayers from "../../firebase/firestore/getAllPlayers";
import getData from "../../firebase/firestore/getData";
import { DailyPlayer, Player } from "./types";

export async function getPlayers(): Promise<Player[] | undefined> {
    return getAllPlayers()
      .then((data) => {
        console.log('Data fetched successfully:', data?.length);
        return data;
      })
      .catch((error) => {
        console.log(error);
        return undefined;
      });
}

// Fetch the daily players from firestore
export async function getDailyPlayer(): Promise<DailyPlayer | undefined> {
    const date = new Date();
    const formatCurrentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
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
  