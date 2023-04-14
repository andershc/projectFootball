'use client'
import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebase_app from '../firebase/config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

const auth = getAuth(firebase_app);

export interface UserType extends User {
    username: string;
    points: number;
}

export const AuthContext = React.createContext({} as { user: UserType | null});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = React.useState({} as UserType);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log('user', user);
            if (user) {
                // Fetch user data from firestore
                const userRef = doc(getFirestore(firebase_app), 'users', user.uid);
                await getDoc(userRef).then((doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        const userData = {
                            ...user,
                            username: data.username,
                            points: data.points,
                        } as UserType;
                        setUser(userData);                     
                    } else {
                        setUser(user as UserType);
                    }
                });
            } else {
                setUser({} as UserType);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};