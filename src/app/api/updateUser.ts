import {updateDailyScore, setUsername} from "../../../firebase/firestore/updateUser";
import { UserType } from "../../../lib/AuthContext";

export async function updateScore(
    currentUser: UserType | null,
    guesses: number,
    guessLimit: number,
    completed: boolean
) {
    // Calculate score
    const score = Math.round(((guessLimit - guesses + 1) / guessLimit)*10);
    await updateDailyScore(currentUser, score , completed, guesses)
}

export async function updateUsername(
    currentUser: UserType | null,
    username: string
) {
    return await setUsername(currentUser, username)
}