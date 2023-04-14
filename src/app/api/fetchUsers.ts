import { UserProfile } from "firebase/auth";
import getAllUsers from "../../../firebase/firestore/getUsers";
import { User } from "../../types";
import { UserType } from "../../../lib/AuthContext";

export async function getUsers(currentUser: UserType | null): Promise<User[] | undefined> {
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