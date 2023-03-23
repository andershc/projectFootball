import { useState } from "react";
import { Player } from "../../pages/api/schema";
import css from './player-card.module.css'

export default function PlayerCard({player}: {player: Player}) {
    const [playerData, setPlayerData] = useState<Player>(player);

    return(
        <div className={css.card}>
            <h2>{playerData.name}</h2>
            <img src={playerData.flag} alt={playerData.nationality} />
            <p>{playerData.club}</p>
        </div>
    )
}