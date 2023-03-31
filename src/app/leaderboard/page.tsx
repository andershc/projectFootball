import { Metadata } from "next";
import { getDailyPlayer, getPlayers } from "../api/fetchPlayers";
import { DailyPlayer, Player } from "../../types";
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Leaderboard',
    description: 'Leaderboard page',
}

export default async function UsersPage() {
    const dailyPlayer: Promise<DailyPlayer | undefined> = getDailyPlayer();
    const player = await dailyPlayer;

    return (
        <div>
        <h1>Daily player</h1>
        {player !== undefined && 
        <Image
            src={player?.player.photo}
            alt={player?.player.name}
            width={32}
            height={32}
        />
        }
        </div>
    );
}