import {updateDailyScore, setUsername} from "../../../firebase/firestore/updateUser";
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
    await updateDailyScore(currentUser, score , completed, guesses)
}

export async function updateUsername(
    currentUser: UserType | null,
    username: string
) {
    return await setUsername(currentUser, username)
}