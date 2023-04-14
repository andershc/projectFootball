'use client'

import { Metadata } from "next";
import { getUsers } from "../api/fetchUsers";
import { DailyPlayer, Player, User } from "../../types";
import Image from 'next/image';
import { useAuthContext } from "../../../lib/AuthContext";
import { useEffect, useState } from "react";

export default async function UsersPage() {
    const [users, setUsers] = useState([] as User[]);
    const {user} = useAuthContext()
    useEffect( () => {
        const fetchUsers = async () => {
            if(user === undefined || user === null) return;
            // Fetch all users from getUsers
            const req: Promise<User[] | undefined> = getUsers(user);
            const users: User[] | undefined = await req;
            if(users === undefined) return;
            // Sort users by points
            users.sort((a, b) => b.points - a.points);
            // Set the users state
            setUsers(users);
        }
        fetchUsers();
    }, [user]);
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