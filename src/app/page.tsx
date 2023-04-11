import Link from "next/link";
import { Player } from "../types";
import { getPlayers } from "./api/fetchPlayers"
import styles from "../styles/Home.module.css";

export default async function Home() {
    const req: Promise<Player[] | undefined> = getPlayers();
    const players: Player[] | undefined = await req;

    return (
        <main className={styles.mainContainer}>
            <div className={styles.mainContent}>
                <h1>Games</h1>
                <div className={styles.gamesContainer}>
                    <Link className={styles.game} href="/default">
                        <p>👤 Default</p>
                    </Link>
                    <Link className={styles.game} href="/career">
                        <p>📝 Career</p>
                    </Link>
                </div>
            </div>
        </main>
    )
}