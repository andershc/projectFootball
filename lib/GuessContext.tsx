'use client'

import React, { useContext, useEffect } from 'react';
import { Player, TransferData } from '../src/types';

type GuessContextType = {
    guessedPlayers: Player[]
    setGuessedPlayers: React.Dispatch<React.SetStateAction<Player[]>>
    correctPlayer: Player
    setCorrectPlayer: React.Dispatch<React.SetStateAction<Player>>
    transferData: TransferData[]
    setTransferData: React.Dispatch<React.SetStateAction<TransferData[]>>
    completed: boolean
    setCompleted: React.Dispatch<React.SetStateAction<boolean>>
}

export const GuessContext = React.createContext<GuessContextType>({
    guessedPlayers: Array.apply({}, Array(8)) as Player[],
    setGuessedPlayers: () => {},
    correctPlayer: {} as Player,
    setCorrectPlayer: () => {},
    transferData: [] as TransferData[],
    setTransferData: () => {},
    completed: false,
    setCompleted: () => {},
});

export const useGuessContext = () => useContext(GuessContext);

export const GuessContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [guessedPlayers, setGuessedPlayers ] = React.useState([] as Player[]);
    const [correctPlayer, setCorrectPlayer] = React.useState({} as Player);
    const [transferData, setTransferData] = React.useState([] as TransferData[]);
    const [completed, setCompleted] = React.useState(false);

    return (
        <GuessContext.Provider value={{ 
            guessedPlayers, setGuessedPlayers,
            correctPlayer, setCorrectPlayer,
            transferData, setTransferData,
            completed, setCompleted,
            }}>
            {children}
        </GuessContext.Provider>
    );
};