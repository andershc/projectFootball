"use client";

import React, { useContext } from "react";
import { type DailyPlayer, type Player } from "../src/types";

interface PlayersContextType {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  dailyPlayer: DailyPlayer | undefined;
  setDailyPlayer: React.Dispatch<React.SetStateAction<DailyPlayer | undefined>>;
}

export const PlayersContext = React.createContext<PlayersContextType>({
  players: [],
  setPlayers: () => {},
  dailyPlayer: undefined,
  setDailyPlayer: () => {},
});

export const usePlayersContext = (): any => useContext(PlayersContext);

export const PlayersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [dailyPlayer, setDailyPlayer] = React.useState<DailyPlayer>();

  return (
    <PlayersContext.Provider
      value={{ players, setPlayers, dailyPlayer, setDailyPlayer }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
