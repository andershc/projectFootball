import { Player, PlayersResponse } from "../app/api/schema";
import getData from "../firebase/firestore/getData";

export default async function getAllPlayers(): Promise<Player[] | undefined> {
    return getData('players', "data")
      .then((data) => {
        return data?.players.response;
      })
      .catch((error) => {
        console.log(error);
        return undefined;
      });
}