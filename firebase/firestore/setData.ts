import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import moment from "moment";
import { type UserType } from "../../lib/AuthContext";
import { type DailyPlayerStats, type Player } from "../../src/types";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export async function updateDailyScore(
  currentUser: UserType | null | undefined,
  points: number,
  completed: boolean | null,
  guessedPlayers: Player[]
): Promise<void> {
  // Update the user's score in DB
  if (currentUser != null) {
    const date = moment().tz("America/New_York");
    const formatCurrentDate = `${date.year()}-${date.date()}-${
      date.month() + 1
    }`;
    const userRef = doc(
      db,
      "users",
      currentUser.uid,
      "history",
      formatCurrentDate
    );
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists() && userDoc.data()?.completed === true) {
        console.log("User already completed a puzzle today.");
        return;
      }
      await setDoc(
        userRef,
        {
          completed,
          points,
          guesses: guessedPlayers.length,
          guessedPlayers,
        },
        { merge: true }
      );
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          points: currentUser.points + points,
        },
        { merge: true }
      );
    } catch (e) {
      console.log(e);
    }
  }
}

export async function setUsername(
  currentUser: UserType | null,
  username: string
): Promise<boolean | undefined> {
  // Update the user's score in DB
  if (currentUser != null) {
    const userRef = doc(db, "users", currentUser.uid);
    try {
      // Check if username is already taken (exists in usernames)
      const usernamesRef = collection(db, "usernames");
      const usernamesSnapshot = await getDocs(usernamesRef);
      const usernames = usernamesSnapshot.docs.map((doc) => doc.id);
      if (usernames.includes(username)) {
        console.log("Username already taken");
        return false;
      } else {
        // Delete old username from usernames
        if (
          currentUser.username != null &&
          currentUser.username !== undefined
        ) {
          await deleteDoc(doc(db, "usernames", currentUser.username));
        }
        await setDoc(
          userRef,
          {
            username,
          },
          { merge: true }
        );
        await setDoc(doc(db, "usernames", username), {
          uid: currentUser.uid,
        });
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

// Update the stats of the daily player in DB
export async function updateDailyPlayerStats(
  completed: boolean
): Promise<void> {
  const date = moment().tz("America/New_York");
  const formatCurrentDate = `${date.year()}-${date.month() + 1}-${date.date()}`;
  const dailyPlayerStatsRef = doc(db, "dailyPlayerStats", formatCurrentDate);
  try {
    const dailyPlayerStatsDoc = await getDoc(dailyPlayerStatsRef);
    if (dailyPlayerStatsDoc.exists()) {
      const dailyPlayerStats = dailyPlayerStatsDoc.data() as DailyPlayerStats;
      await setDoc(
        doc(db, "dailyPlayerStats", formatCurrentDate),
        {
          totalCorrect:
            (dailyPlayerStats.totalCorrect !== null &&
            dailyPlayerStats.totalCorrect !== undefined
              ? dailyPlayerStats.totalCorrect
              : 0) + (completed ? 1 : 0),
          totalAttempts:
            (dailyPlayerStats.totalAttempts !== null &&
            dailyPlayerStats.totalAttempts !== undefined
              ? dailyPlayerStats.totalAttempts
              : 0) + 1,
        },
        { merge: true }
      );
    } else {
      console.log("Daily player not found for " + formatCurrentDate);
    }
  } catch (e) {
    console.log(e);
  }
}
