/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useAuthContext } from "../../lib/AuthContext";
import { useGuessContext } from "../../lib/GuessContext";
import { usePlayersContext } from "../../lib/PlayersContext";
import confetti from "../../public/static/lotti/confetti.json";
import Button from "../components/button/Button";
import CareerPathGame from "../components/careerpathGame";
import styles from "../styles/Home.module.css";
import { type Player, type Team, type TransferData } from "../types";
import {
  getDailyPlayer,
  getPlayers,
  getRandomPlayer,
} from "./api/fetchPlayers";
import { getUserHistory } from "./api/fetchUserData";
import { updateScore } from "./api/updateData";
import Loading from "./loading";

interface Transfer extends Team {
  type: string;
  year: string;
}

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [isDailyPlayer, setIsDailyPlayer] = useState(true);
  const [guessedPlayers, setGuessedPlayers] = useState([] as Player[]);
  const [completed, setCompleted] = useState<boolean | null>(null);
  const [clubs, setClubs] = useState<Transfer[]>([]);
  const [playConfetti, setPlayConfetti] = useState(false);
  const [stats, setStats] = useState<Record<string, number>>({
    totalAttempts: 0,
    totalCorrect: 0,
  });
  const searchParams = useSearchParams();
  const fetchDate = searchParams.get("date");
  const { user } = useAuthContext();
  const router = useRouter();

  const { correctPlayer, setCorrectPlayer, setTransferData } =
    useGuessContext();

  const { players, setPlayers } = usePlayersContext();

  useEffect(() => {
    if (user?.email !== undefined) {
      if (players.length === 0) {
        void (async () => {
          try {
            const playersData = await getPlayers();
            if (playersData !== undefined) {
              setLoading(false);
              setPlayers(playersData);
            }
          } catch (error) {
            console.error(error);
          }
        })();
      } else {
        setLoading(false);
      }
      void (async () => {
        try {
          const dailyPlayer = await getDailyPlayer(fetchDate);
          if (dailyPlayer !== undefined) {
            setCorrectPlayer(dailyPlayer.player);
            setTransferData(dailyPlayer.transferData);
            setClubs(
              getTransferClubs(
                dailyPlayer.transferData,
                dailyPlayer.player.team
              )
            );
            setStats({
              totalAttempts: dailyPlayer.totalAttempts,
              totalCorrect: dailyPlayer.totalCorrect,
            });
          }

          const userHistoryData = await getUserHistory(fetchDate, user);
          console.log(userHistoryData);
          if (userHistoryData === undefined) {
            console.log("no data");
            return;
          }
          setCompleted(userHistoryData.completed);
          setGuessedPlayers(userHistoryData?.guessedPlayers);
          if (fetchDate !== null) setIsDailyPlayer(false);
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      router.push("/signIn");
    }
  }, [
    setCorrectPlayer,
    setTransferData,
    user,
    router,
    players.length,
    setPlayers,
    fetchDate,
  ]);

  const guessLimit = clubs?.length ?? 0;

  const handlePlayerSelect = async (player: Player): Promise<void> => {
    setGuessedPlayers((prev) => [...prev, player]);
    const playersCopy = [...guessedPlayers, player];
    if (player.id === correctPlayer?.id) {
      setCompleted(true);
      if (isDailyPlayer) {
        setPlayConfetti(true);
        await updateScore(user, playersCopy, guessLimit, true);
      }
    } else {
      if (playersCopy.length === guessLimit) {
        setCompleted(false);
        void updateScore(user, playersCopy, guessLimit, false);
      } else {
        void updateScore(user, playersCopy, 0, null);
      }
    }
  };

  const handleNewPlayer = async (): Promise<void> => {
    const newPlayerData = await getRandomPlayer(players);
    if (newPlayerData === undefined) return;
    setIsDailyPlayer(false);
    setCompleted(null);
    setGuessedPlayers([]);
    setCorrectPlayer(newPlayerData.player);
    setTransferData(newPlayerData.transferData);
    setClubs(
      getTransferClubs(newPlayerData.transferData, newPlayerData.player.team)
    ); // Add this line to update the clubs
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: confetti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <Loading />
      ) : (
        <CareerPathGame
          guessedPlayers={guessedPlayers}
          correctPlayer={correctPlayer}
          clubs={clubs}
          completed={completed}
          stats={stats}
          handlePlayerSelect={handlePlayerSelect}
          players={players}
        />
      )}
      {process.env.NODE_ENV === "development" && (
        <div className={styles.gamesContainer}>
          <Button
            onClick={async () => {
              await handleNewPlayer();
            }}
            text="Get new player"
            className={styles.newPlayerButton}
          />
          <Link className={styles.game} href="/default">
            <p>👤 Standard</p>
          </Link>
        </div>
      )}
      {playConfetti && (
        <div className={styles.confetti}>
          <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
        </div>
      )}
    </div>
  );
}

function getTransferClubs(
  transferData: TransferData[],
  currentTeam: Team
): Transfer[] {
  // Reverse the transfer data so the last club is first
  transferData = transferData.slice().reverse();
  const currentYear = new Date().getFullYear();

  const clubs: Transfer[] = transferData.reduce(
    (acc: Transfer[], data, index) => {
      if (data.teams.in.id === null) return acc;

      // If the previous transfer is a loan, and the in-club is the same as the out-club, skip it
      if (
        index !== 0 &&
        transferData[index - 1].type === "Loan" &&
        data.teams.in.id === transferData[index - 1].teams.out.id
      )
        return acc;

      acc.push({
        type: data.type,
        year: data.date.split("-")[0],
        ...data.teams.in,
      });

      return acc;
    },
    []
  );

  // Add the first out club to the first spot in the list
  clubs.unshift({
    ...transferData[0].teams.out,
    type: "First",
    year: transferData[0].date.split("-")[0],
  });

  // If the last club in is not the current club, add it to the list
  if (transferData[transferData.length - 1].teams.in.id !== currentTeam.id) {
    clubs.push({
      ...currentTeam,
      type: "Current",
      year: currentYear.toString(),
    });
  }

  return clubs;
}
