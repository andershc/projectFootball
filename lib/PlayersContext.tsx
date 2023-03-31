'use client'

import React, { useContext } from 'react';
import { Player, DailyPlayer } from '../src/types';

type PlayersContextType = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    dailyPlayer: DailyPlayer;
    setDailyPlayer: React.Dispatch<React.SetStateAction<DailyPlayer>>;
}

export const PlayersContext = React.createContext<PlayersContextType>({
    players: [],
    setPlayers: () => {},
    dailyPlayer: {} as DailyPlayer,
    setDailyPlayer: () => {}
});

export const usePlayersContext = () => useContext(PlayersContext);

export const PlayersContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [players, setPlayers] = React.useState([] as Player[]);
    const [dailyPlayer, setDailyPlayer] = React.useState({} as DailyPlayer);

    return (
        <PlayersContext.Provider value={{ players, setPlayers, dailyPlayer, setDailyPlayer }}>
            {children}
        </PlayersContext.Provider>
    );
};
