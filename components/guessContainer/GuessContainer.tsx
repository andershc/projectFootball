import { Player } from "../../app/api/types";
import { useGuessContext } from "../../lib/GuessContext";
import Image from "next/image";

export default function GuessContainer({player}: {player: Player}) {
    return (
        <div>
            <p>{player.player.name}</p>
            <Image
                src={player.player.photo}
                alt={player.player.name}
                width={50}
                height={50}
            />
        </div>
    );
    }