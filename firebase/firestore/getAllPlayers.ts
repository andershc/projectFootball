import { Player } from '../../app/api/types';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);
const leagues = ['premierLeague', 'laLiga', 'bundesliga', 'serieA', 'ligue1'];

export default async function getAllPlayers(): Promise<Player[] | undefined> {
  const players: Player[] = [];
  for (let i = 0; i < 5; i++) {
    for(let j = 0; j < 2; j++) {
      const docRef = doc(db, "players", leagues[i] + "-" + j);
      
      try {
        const doc  = await getDoc(docRef);
        const playerData: Player[] | undefined = doc.data()?.players;

        if(playerData !== undefined) {
          playerData.forEach((player) => {
            players.push(player);
          });
        }
      } catch (e) {
        console.log('Error getting cached document:', e);
      }
    }
  }
  return players;
};