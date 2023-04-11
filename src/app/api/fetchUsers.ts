import getAllUsers from "../../../firebase/firestore/getUsers";
import { User } from "../../types";

export async function getUsers(): Promise<User[] | undefined> {
    return getAllUsers()
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