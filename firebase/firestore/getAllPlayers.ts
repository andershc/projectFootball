import { doc, getDoc, getFirestore } from "firebase/firestore";
import { type Player } from "../../src/types";
import firebase_app from "../config";

const db = getFirestore(firebase_app);
const leagues = ["premierLeague", "laLiga", "bundesliga", "serieA", "ligue1"];

export default async function getAllPlayers(): Promise<Player[] | undefined> {
  const players: Player[] = [];
  for (let i = 0; i < 5; i++) {
    const docRef = doc(db, "players", leagues[i]);

    try {
      const doc = await getDoc(docRef);
      const playerData: Player[] | undefined = doc.data()?.players;

      if (playerData !== undefined) {
        playerData.forEach((player) => {
          players.push(player);
        });
      }
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  }
  return players;
}
