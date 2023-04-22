import {updateDailyScore, setUsername, updateDailyPlayerStats} from "../../../firebase/firestore/setData";
import { UserType } from "../../../lib/AuthContext";
import { Player } from "../../types";

export async function updateScore(
    currentUser: UserType | null,
    guesses: Player[],
    guessLimit: number,
    completed: boolean
) {
    // Calculate score
    const score = completed ? Math.round(((guessLimit - guesses.length + 1) / guessLimit)*10) : 0;
    await updateDailyScore(currentUser, score , completed, guesses).then(() => {
        console.log('Score updated successfully');
    }).catch((error) => {
        console.log(error);
    });
    if(completed){
        await updateDailyPlayerStats(completed).then(() => {
            console.log('Daily player stats updated successfully');
        }).catch((error) => {
            console.log(error);
        });
    }
}

export async function updateUsername(
    currentUser: UserType | null,
    username: string
) {
    return await setUsername(currentUser, username)
}