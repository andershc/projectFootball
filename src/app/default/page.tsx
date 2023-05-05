/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "../../../lib/AuthContext";
import { usePlayersContext } from "../../../lib/PlayersContext";
import Button from "../../components/button/Button";
import GuessContainer from "../../components/guessContainer/GuessContainer";
import HintContainer from "../../components/hintContainer/HintContainer";
import PlayerInput from "../../components/playerInput/PlayerInput";
import styles from "../../styles/Home.module.css";
import { type DailyPlayer, type Player } from "../../types";
import { getRandomPlayer } from "../api/fetchPlayers";
import Loading from "../loading";

const guessLimit = 5;

export default function Default(): JSX.Element {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [correctPlayer, setCorrectPlayer] = useState<DailyPlayer>();
  const [guessedPlayers, setGuessedPlayers] = useState([] as Player[]);
  const { user } = useAuthContext();
  const { players } = usePlayersContext();

  useEffect(() => {
    const fetchDaily = async (): Promise<void> => {
      if (guessedPlayers.length > 0) {
        setLoading(false);
        return;
      }
      await getRandomPlayer(players).then((player) => {
        if (player === undefined) return;
        setCorrectPlayer(player);
        setLoading(false);
      });
    };

    if (user?.email !== undefined) {
      fetchDaily().catch((error) => {
        console.error("Error occurred while fetching daily data:", error);
      });
    }
  }, [guessedPlayers.length, players, setCorrectPlayer, user]);

  const handlePlayerSelect = (player: Player): void => {
    if (guessedPlayers.length >= guessLimit) return;
    if (player.id === correctPlayer?.player.id) {
      setCompleted(true);
      setGuessedPlayers((prev) => [...prev, player]);
    } else {
      setGuessedPlayers((prev) => [...prev, player]);
      if (guessedPlayers.length === guessLimit - 1) setCompleted(true);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.mainContent}>
          <h1>Guess the Player</h1>
          <h2>
            {guessedPlayers.length} / {guessLimit}
          </h2>
          {correctPlayer !== undefined && (
            <HintContainer
              correctPlayer={correctPlayer?.player}
              numberOfGuesses={guessedPlayers.length}
              completed={completed}
            />
          )}
          {!completed && (
            <PlayerInput players={players} onSelect={handlePlayerSelect} />
          )}
          <div className={styles.guesses}>
            <p>Guessed players:</p>
            {guessedPlayers.map((guessedPlayer) => (
              <GuessContainer
                key={guessedPlayer.id}
                player={guessedPlayer}
                correct={guessedPlayer.id === correctPlayer?.player.id}
                index={guessedPlayers.indexOf(guessedPlayer) + 1}
              />
            ))}
          </div>
          <Button
            onClick={async () => {
              await getRandomPlayer(players).then((player) => {
                if (player === undefined) return;
                setCompleted(false);
                setGuessedPlayers([]);
                setCorrectPlayer(player);
              });
            }}
            text="Get new player"
            className={styles.newPlayerButton}
          />
        </div>
      )}
    </div>
  );
}
