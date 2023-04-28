import { UserProfile } from "firebase/auth";
import getAllUsers from "../../../firebase/firestore/getUsers";
import { User, GuessResult } from "../../types";
import { UserType } from "../../../lib/AuthContext";
import { getUserHistoryFromDate } from "../../../firebase/firestore/getData";
import moment from "moment";

export async function getUsers(currentUser: UserType | null): Promise<UserType[] | undefined> {
    return getAllUsers(currentUser)
      .then((data) => {
        console.log('Data fetched successfully:', data?.length);
        // Remove all duplicate players
        return data;
      })
      .catch((error) => {
        console.log(error);
        return undefined;
      });
}

export async function getUserHistory(date: string | null, user: UserType): Promise<GuessResult | undefined> {
  let fetchDate = moment().tz('America/New_York');
  if(date) {
    fetchDate = moment(date).tz('America/New_York');
  }
  let history: GuessResult | undefined = undefined;
  const formatDate = `${fetchDate.year()}-${fetchDate.date()}-${fetchDate.month() + 1}`;
  await getUserHistoryFromDate(formatDate, user)
    .then((data) => {
      console.log('User history data fetched successfully');
      history = data;
    }
  ).catch((error) => {
    console.log("Error processing history data", error);
    return undefined;
  }
);
return history;
}