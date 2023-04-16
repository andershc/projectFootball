'use client'

import React, { useContext, useEffect } from 'react';
import { Player, TransferData } from '../src/types';
import firebase_app from '../firebase/config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import moment from 'moment';

const auth = getAuth(firebase_app);

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
    const date = moment().tz('America/New_York');
    const formatCurrentDate = `${date.year()}-${date.date()}-${date.month() + 1}`;
    React.useEffect(() => {
        if(process.env.NODE_ENV === 'development') return;
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log('user', user);
            if (user) {
                // Fetch user data from firestore
                const userRef = doc(getFirestore(firebase_app),
                'users',
                user.uid,
                'history',
                formatCurrentDate
                );
                await getDoc(userRef).then((doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        setCompleted(data.completed)                       
                    } else {
                        setCompleted(false)
                    }
                });
            } else {
                return
            }
        });

        return () => unsubscribe();
    }, [formatCurrentDate]);

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