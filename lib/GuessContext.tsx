'use client'

import React, { useEffect } from 'react';
import { Player, TransferData } from '../types';

type GuessContextType = {
    guessedPlayers: Player[]
    setGuessedPlayers: React.Dispatch<React.SetStateAction<Player[]>>
    correctPlayer: Player
    setCorrectPlayer: React.Dispatch<React.SetStateAction<Player>>
    transferData: TransferData[]
    setTransferData: React.Dispatch<React.SetStateAction<TransferData[]>>
}

export const GuessContext = React.createContext({
    guessedPlayers: Array.apply({}, Array(8)) as Player[],
    setGuessedPlayers: () => {},
    correctPlayer: {} as Player,
    setCorrectPlayer: () => {},
    transferData: [] as TransferData[],
    setTransferData: () => {},
} as GuessContextType);

export const useGuessContext = () => React.useContext(GuessContext);

export const GuessContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [guessedPlayers, setGuessedPlayers ] = React.useState([] as Player[]);
    const [correctPlayer, setCorrectPlayer] = React.useState({} as Player);
    const [transferData, setTransferData] = React.useState([] as TransferData[]);

    return (
        <GuessContext.Provider value={{ 
            guessedPlayers, setGuessedPlayers,
            correctPlayer, setCorrectPlayer,
            transferData, setTransferData
            }}>
            {children}
        </GuessContext.Provider>
    );
};