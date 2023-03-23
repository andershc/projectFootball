import Link from 'next/link'
import { Player } from '../../pages/api/schema'
import PlayerCard from '../playerCard'
import css from './home-page.module.css'

function getManagers() {
    return [
        {
            id: 1,
            name: 'Pep Guardiola',
            club: 'Manchester City',
            nationality: 'Spain',
            flag: 'https://media.api-sports.io/flags/es.svg'
        },
        {
            id: 2,
            name: 'Jürgen Klopp',
            club: 'Liverpool',
            nationality: 'Germany',
            flag: 'https://media.api-sports.io/flags/de.svg'
        }
    ]
}

export default function HomePage() {
    
    const managers: Player[] = getManagers()

    return (
        <div>
            <h2>Leagues:</h2>
            <div className={css.iconsContainer}>
            <Link href={'/league/39'}>
                <img src="https://media.api-sports.io/football/leagues/39.png" alt="English Premier League"/>
            </Link>
            <Link href={'/league/140'}>
                <img src="https://media.api-sports.io/football/leagues/140.png" alt="Spanish La Liga" />
            </Link>
            <Link href={'/league/135'}>
                <img src="https://media.api-sports.io/football/leagues/135.png" alt="Spanish La Liga" />
            </Link>
            <Link href={'/league/78'}>
                <img src="https://media.api-sports.io/football/leagues/78.png" alt="Spanish La Liga" />
            </Link>
            <Link href={'/league/61'}>
                <img src="https://media.api-sports.io/football/leagues/61.png" alt="Spanish La Liga" />
            </Link>
            <Link href={'/league/2'}>
                <img src="https://media.api-sports.io/football/leagues/2.png" alt="Spanish La Liga" />
            </Link>
            </div>

            <div>
                <h2>Hair Ratings</h2>
                {managers?.map(manager => 
                    <div key={manager.id} className={css.list}>
                        <PlayerCard player={manager}></PlayerCard>
                    </div>)}
                
            </div>
        </div>
    )
}