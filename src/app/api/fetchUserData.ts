import moment from "moment";
import { getUserHistoryFromDate } from "../../../firebase/firestore/getData";
import getAllUsers from "../../../firebase/firestore/getUsers";
import { type UserType } from "../../../lib/AuthContext";
import { type GuessResult, type Player } from "../../types";

export async function getUsers(
  currentUser: UserType | undefined | null
): Promise<UserType[] | undefined> {
  return await getAllUsers(currentUser)
    .then((data) => {
      console.log("Data fetched successfully:", data?.length);
      // Remove all duplicate players
      return data;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
}

export async function getUserHistory(
  date: string | null,
  user: UserType | undefined | null
): Promise<GuessResult | undefined> {
  if (user === undefined || user === null) {
    return getLocalStorageData();
  }
  let fetchDate = moment().tz("America/New_York");
  if (date !== null) {
    fetchDate = moment(date).tz("America/New_York");
  }
  let history: GuessResult | undefined;
  const formatDate = `${fetchDate.year()}-${fetchDate.date()}-${
    fetchDate.month() + 1
  }`;
  await getUserHistoryFromDate(formatDate, user)
    .then((data) => {
      console.log("User history data fetched successfully");
      history = data;
    })
    .catch((error) => {
      console.log("Error processing history data", error);
      return undefined;
    });
  return history;
}

// Method for getting local storage data and returning it as a GuessResult object
function getLocalStorageData(): GuessResult {
  const completed: boolean | null =
    localStorage.getItem("completed") === "true"
      ? !(localStorage.getItem("completed") == null)
      : null;
  const guessedPlayers: Player[] | null = convertToPlayerList(
    localStorage.getItem("guesses")
  );
  return {
    completed,
    guessedPlayers: guessedPlayers !== null ? guessedPlayers : [],
    guesses: guessedPlayers !== null ? guessedPlayers.length : 0,
    points: 0,
  } satisfies GuessResult;
}

// Method for converting JSON string to Player list object
function convertToPlayerList(json: string | null): Player[] | null {
  if (json === null || json === undefined) {
    return null;
  }
  const playerList: Player[] = JSON.parse(json);
  return playerList;
}
