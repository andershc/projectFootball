import { Metadata } from "next";
import { getUsers } from "../api/fetchUsers";
import { DailyPlayer, Player, User } from "../../types";
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Leaderboard',
    description: 'Leaderboard page',
}

export default async function UsersPage() {
    const users = await getUsers() as User[];
    console.log("Users " + users);

    return (
        <main>
            <h1>Leaderboard</h1>
            {users === undefined ? <p>Loading...</p> :
            <table>
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
                            <td>{user.username}</td>
                            <td>{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </main>
    );
}