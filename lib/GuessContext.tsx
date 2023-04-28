'use client'

import React, { useContext, useEffect } from 'react';
import { Player, TransferData } from '../src/types';
import firebase_app from '../firebase/config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import moment from 'moment';

const auth = getAuth(firebase_app);

type GuessContextType = {
    correctPlayer: Player
    setCorrectPlayer: React.Dispatch<React.SetStateAction<Player>>
    transferData: TransferData[]
    setTransferData: React.Dispatch<React.SetStateAction<TransferData[]>>
}

export const GuessContext = React.createContext<GuessContextType>({
    correctPlayer: {} as Player,
    setCorrectPlayer: () => {},
    transferData: [] as TransferData[],
    setTransferData: () => {},
});

export const useGuessContext = () => useContext(GuessContext);

export const GuessContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [correctPlayer, setCorrectPlayer] = React.useState({} as Player);
    const [transferData, setTransferData] = React.useState([] as TransferData[]);

    return (
        <GuessContext.Provider value={{ 
            correctPlayer, setCorrectPlayer,
            transferData, setTransferData,
            }}>
            {children}
        </GuessContext.Provider>
    );
};