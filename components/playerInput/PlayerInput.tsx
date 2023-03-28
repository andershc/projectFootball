import React, { useState, useEffect } from 'react';
import { Player } from '../../app/api/types';
import styles from './player-input.module.css';
import Image from 'next/image';
import { useGuessContext } from '../../lib/GuessContext';

interface PlayerInputProps {
  players: Player[];
  onSelect: (player: Player) => void;
}

const PlayerInput: React.FC<PlayerInputProps> = ({ players, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const filterPlayers = () => {
      const filtered = players.filter((player) =>
        (player.player.firstname + " " + player.player.lastname).toLowerCase().includes(inputValue.toLowerCase())
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
              <p>{player.player.firstname} {player.player.lastname}</p>
              <Image
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

export default PlayerInput;