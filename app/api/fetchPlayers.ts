import getAllPlayers from "../../firebase/firestore/getAllPlayers";
import { Player } from "./types";

export default async function fetchPlayers(): Promise<Player[] | undefined> {
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
  