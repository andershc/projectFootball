import updateDailyScore from "../../../firebase/firestore/updateUser";
import { UserType } from "../../../lib/AuthContext";

export async function updateScore(
    currentUser: UserType | null,
    guesses: number,
    guessLimit: number,
    completed: boolean
) {
    await updateDailyScore(currentUser, guessLimit-guesses+1 , completed, guesses)
}