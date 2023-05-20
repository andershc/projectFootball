/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext, type UserType } from "../../../lib/AuthContext";
import { getUsers } from "../api/fetchUserData";
import styles from "./leaderboard.module.css";

export default function UsersPage(): JSX.Element {
  const [users, setUsers] = useState([] as UserType[]);
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user?.email == null) router.push("/signIn");
    const fetchUsers = async (): Promise<void> => {
      // Fetch all users from getUsers
      const users = (await getUsers(user)) as UserType[];
      if (users === undefined) return;
      // Sort users by points
      users.sort((a, b) => b.points - a.points);
      // Set the users state
      setUsers(users);
    };
    fetchUsers();
  }, [user, setUsers]);

  return (
    <main className={styles.leaderboard}>
      <h1 className={styles.header}>Leaderboard</h1>
      {users.length === 0 ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.uid}>
                <td>{index + 1}</td>
                <td>
                  {user?.username === ""
                    ? user?.displayName?.split(" ")[0] !== undefined
                      ? user?.displayName.split(" ")[0]
                      : user.email?.split("@")[0]
                    : user.username}
                </td>
                <td>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
