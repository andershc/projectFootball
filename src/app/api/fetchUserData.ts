import moment from "moment";
import { getUserHistoryFromDate } from "../../../firebase/firestore/getData";
import getAllUsers from "../../../firebase/firestore/getUsers";
import { type UserType } from "../../../lib/AuthContext";
import { type GuessResult } from "../../types";

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
  user: UserType
): Promise<GuessResult | undefined> {
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