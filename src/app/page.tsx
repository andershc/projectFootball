import Link from "next/link";
import styles from "../styles/Home.module.css";

export default async function Home() {

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