import { Player } from "../../app/api/types";
import Image from "next/image";
import styles from "./HintContainer.module.css";
import { getCountryCode } from "../../lib/CountryCode";
import { useEffect, useState } from "react";

export default function HintContainer({correctPlayer}: {correctPlayer: Player}) {
    const [flagUrl, setFlagUrl] = useState('https://hatscripts.github.io/circle-flags/flags/xx.svg');

    useEffect(() => {
        if (correctPlayer && correctPlayer.player) {
          setFlagUrl('https://hatscripts.github.io/circle-flags/flags/' + 
          getCountryCode(correctPlayer.player.nationality) + 
          '.svg');
        }
      }, [correctPlayer]);
    
    return (
        <div>
        <Image
            src={flagUrl}
            alt="flag"
            width={32}
            height={32}
        />
        </div>
    );
}