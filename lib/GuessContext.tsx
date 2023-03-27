'use client'

import React from 'react';
import { Player } from '../app/api/types';

type GuessContextType = {
    guessedPlayers: Player[]
    setGuessedPlayers: React.Dispatch<React.SetStateAction<Player[]>>
}

export const GuessContext = React.createContext({
    guessedPlayers: [] as Player[],
    setGuessedPlayers: () => {}
} as GuessContextType);

export const useGuessContext = () => React.useContext(GuessContext);

export const GuessContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [guessedPlayers, setGuessedPlayers] = React.useState([] as Player[]);

    return (
        <GuessContext.Provider value={{ guessedPlayers, setGuessedPlayers }}>
            {children}
        </GuessContext.Provider>
    );
};