import React, { useState, useEffect } from 'react';
import { Player } from '../../app/api/types';
import styles from './player-input.module.css';
import Image from 'next/image';
import { useGuessContext } from '../../lib/GuessContext';
import accents from 'remove-accents';

interface PlayerInputProps {
  players: Player[];
  onSelect: (player: Player) => void;
}

export default function PlayerInput({ players, onSelect }: PlayerInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const filterPlayers = () => {
      const filtered = players.filter((player) =>
        compareStrings(player.player.name, inputValue)
        || compareStrings(player.player.firstname, inputValue)
        || compareStrings(player.player.lastname, inputValue)
      );
      setFilteredPlayers(filtered);
    };

    filterPlayers();
  }, [inputValue, players]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelect = (player: Player) => {
    onSelect(player);
    setInputValue('');
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        autoComplete="off"
      />
      {inputValue.length > 2 ? (
        <ul className={styles.list}>
          {filteredPlayers.map((player) => (
            <li className={styles.listItem} key={player.player.id} onClick={() => handleSelect(player)}>
              <Image
                
                src={player.statistics[0].team.logo}
                alt={player.player.name}
                width={50}
                height={50}
              ></Image>
              <p>{player.player.name}</p>
              <Image
                className={styles.playerPhoto}
                src={player.player.photo}
                alt={player.player.name}
                width={50}
                height={50}
              ></Image>
            </li>
          ))}
        </ul>
      ): null}
    </div>
  );
};



function compareStrings(str1: string, str2: string) {
  return accents.remove(str1).toLowerCase().includes(accents.remove(str2).toLowerCase());
}