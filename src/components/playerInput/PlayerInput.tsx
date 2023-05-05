/* eslint-disable @typescript-eslint/no-floating-promises */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import accents from "remove-accents";
import { type Player } from "../../types";
import styles from "./player-input.module.css";

interface PlayerInputProps {
  players: Player[];
  onSelect: (player: Player) => void;
}

export default function PlayerInput({
  players,
  onSelect,
}: PlayerInputProps): JSX.Element {
  const [inputValue, setInputValue] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const filterPlayers = async (): Promise<void> => {
      const filtered = players.filter(
        (player) =>
          compareStrings(player.name, inputValue) ||
          compareStrings(player.firstName, inputValue) ||
          compareStrings(player.lastName, inputValue)
      );
      setFilteredPlayers(filtered.slice(0, 10));
    };

    filterPlayers();
  }, [inputValue, players]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value);
  };

  const handleSelect = (player: Player): void => {
    onSelect(player);
    setInputValue("");
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        autoComplete="off"
        placeholder="Guess a player..."
      />
      {inputValue.length > 2 ? (
        <ul className={styles.list}>
          {filteredPlayers.map((player) => (
            <li
              className={styles.listItem}
              key={player.id}
              onClick={() => {
                handleSelect(player);
              }}
            >
              <Image
                className={styles.playerPhoto}
                src={player.photo}
                alt={player.name}
                width={50}
                height={50}
              ></Image>
              <p>{player.name}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function compareStrings(str1: string, str2: string): boolean {
  return accents
    .remove(str1)
    .toLowerCase()
    .includes(accents.remove(str2).toLowerCase());
}
