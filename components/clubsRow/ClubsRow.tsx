import Link from "next/link";

export default function ClubsRow() {
    return (
        <div>
            <h2>Clubs:</h2>
            <div>
                <Link href={'/club/40'}>
                    <img src="https://media.api-sports.io/football/teams/40.png" alt="Manchester United" />
                </Link>
                <Link href={'/club/41'}>
                    <img src="https://media.api-sports.io/football/teams/41.png" alt="Manchester City" />
                </Link>
                <Link href={'/club/42'}>
                    <img src="https://media.api-sports.io/football/teams/42.png" alt="Liverpool" />
                </Link>
                <Link href={'/club/43'}>
                    <img src="https://media.api-sports.io/football/teams/43.png" alt="Chelsea" />
                </Link>
                <Link href={'/club/44'}>
                    <img src="https://media.api-sports.io/football/teams/44.png" alt="Tottenham" />
                </Link>
                <Link href={'/club/45'}>
                    <img src="https://media.api-sports.io/football/teams/45.png" alt="Arsenal" />
                </Link>
                <Link href={'/club/46'}>
                    <img src="https://media.api-sports.io/football/teams/46.png" alt="Leicester" />
                </Link>
                <Link href={'/club/47'}>
                    <img src="https://media.api-sports.io/football/teams/47.png" alt="Wolves" />
                </Link>
            </div>
        </div>
    )
}