import Link from "next/link";
import { Player } from "../types";
import { getPlayers } from "./api/fetchPlayers"

export default async function Home() {
    const req: Promise<Player[] | undefined> = getPlayers();
    const players: Player[] | undefined = await req;

    return (
        <main>
            <h1>Games</h1>
            <ul>
                <li>
                    <Link href="/default">
                        <div>Default</div>
                    </Link>
                </li>
                <li>
                    <Link href="/career">
                        <div>Career</div>
                    </Link>
                </li>
            </ul>
        </main>
    )
    
  }