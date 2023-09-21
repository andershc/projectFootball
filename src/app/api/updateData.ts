import moment from "moment";
import {
  setUsername,
  updateDailyPlayerStats,
  updateDailyScore,
} from "../../../firebase/firestore/setData";
import { type UserType } from "../../../lib/AuthContext";
import { type GuessResult, type Player } from "../../types";

/**
 * Calculate the score for the current game
 * @param completed - Whether the game was completed
 * @param guessLimit - The number of guesses allowed
 * @param guesses - The guesses made by the user
 * @returns The score for the current game
 * */
const calculateScore = (
  completed: boolean | null,
  guessLimit: number,
  guesses: Player[]
): number => {
  return completed ?? false
    ? Math.round(((guessLimit - guesses.length + 1) / guessLimit) * 10)
    : 0;
};

/**
 * Update the local storage with the current game data
 * @param date - The date of the current game
 * @param guesses - The guesses made by the user
 * @param score - The score for the current game
 * @param completed - Whether the game was completed
 * @returns void
 * */
const updateLocalStorage = (
  date: string,
  guesses: Player[],
  score: number,
  completed: boolean | null
): void => {
  const gameData: GuessResult = {
    guessedPlayers: guesses,
    guesses: guesses.length,
    points: score,
    completed,
  };
  localStorage.setItem(date, JSON.stringify(gameData));
};

/**
 * Update the user's score
 * @param currentUser - The current user
 * @param guesses - The guesses made by the user
 * @param guessLimit - The number of guesses allowed
 * @param completed - Whether the game was completed
 * @param date - The date of the current game
 * @returns void
 * */
export async function updateScore(
  currentUser: UserType | null | undefined,
  guesses: Player[],
  guessLimit: number,
  completed: boolean | null,
  date: string | null = null
): Promise<void> {
  // Set default date if not provided
  if (date == null) {
    date = moment().tz("America/New_York").format("YYYY-MM-DD");
  }

  const score = calculateScore(completed, guessLimit, guesses);

  // Update Daily Player Stats
  if (completed !== null) {
    try {
      await updateDailyPlayerStats(completed);
      console.log("Daily player stats updated successfully");
    } catch (error) {
      console.log(error);
    }
  }

  // Check if user is logged in
  if (currentUser == null) {
    console.log("User is not logged in");
    updateLocalStorage(date, guesses, score, completed);
    return;
  }

  console.log("User is logged in");

  // Update Daily Score
  try {
    await updateDailyScore(currentUser, score, completed, guesses);
    console.log("Score updated successfully");
  } catch (error) {
    console.log(error);
  }
}

/**
 * Update the user's username
 * @param currentUser - The current user
 * @param username - The user's username
 * @returns void
 * */
export async function updateUsername(
  currentUser: UserType | null,
  username: string
): Promise<boolean | undefined> {
  return await setUsername(currentUser, username);
}
