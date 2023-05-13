import { collection, getDocs, getFirestore } from "firebase/firestore";
import { type UserType } from "../../lib/AuthContext";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function getAllUsers(
  currentUser: UserType | null | undefined
): Promise<UserType[] | undefined> {
  if (currentUser == null) {
    console.log("User not authenticated");
    return;
  }

  const docRef = collection(db, "users");
  try {
    const doc = await getDocs(docRef);
    const users: UserType[] = [];
    doc.forEach((user) => {
      users.push(user.data() as UserType);
    });
    return users;
  } catch (e) {
    console.log("Error getting cached document:", e);
  }
}
