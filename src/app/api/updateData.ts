import {
  setUsername,
  updateDailyPlayerStats,
  updateDailyScore,
} from "../../../firebase/firestore/setData";
import { type UserType } from "../../../lib/AuthContext";
import { type Player } from "../../types";

export async function updateScore(
  currentUser: UserType | null | undefined,
  guesses: Player[],
  guessLimit: number,
  completed: boolean | null
): Promise<void> {
  // Calculate score
  const score =
    completed === true
      ? Math.round(((guessLimit - guesses.length + 1) / guessLimit) * 10)
      : 0;
  await updateDailyScore(currentUser, score, completed, guesses)
    .then(() => {
      console.log("Score updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
  if (completed !== null) {
    await updateDailyPlayerStats(completed)
      .then(() => {
        console.log("Daily player stats updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export async function updateUsername(
  currentUser: UserType | null,
  username: string
): Promise<boolean | undefined> {
  return await setUsername(currentUser, username);
}
