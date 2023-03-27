import { Player } from "./types";
import getData from "../../firebase/firestore/getData";

export default async function getAllPlayers(): Promise<Player[] | undefined> {
    return getData('players', 'premierLeague')
      .then((data) => {
        return data?.players;
      })
      .catch((error) => {
        console.log(error);
        return undefined;
      });
}