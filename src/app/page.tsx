import { Player } from "../types";
import { getPlayers } from "./api/fetchPlayers"

export default async function Home() {
    const req: Promise<Player[] | undefined> = getPlayers();
    const players: Player[] | undefined = await req;

    return (
        <main>
            <h1>Players</h1>
            {players?.slice(0, 10).map((player) => (
                <div key={player.id}>
                    <h2>{player.name}</h2>
                    <p>{player.position}</p>
                </div>
            ))}
        </main>
    )
    
  }