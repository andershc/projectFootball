import { Player, User } from '../../src/types';
import { getFirestore, doc, getDoc, collection, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import firebase_app from '../config';
import { getAuth } from 'firebase/auth';
import {UserType } from '../../lib/AuthContext';
import moment from 'moment';

const db = getFirestore(firebase_app);

export async function updateDailyScore(
    currentUser: UserType | null,
    points: number,
    completed: boolean,
    guesses: number
) {
    // Update the user's score in DB
    if (currentUser) {
        const date = moment().tz('America/New_York');
        const formatCurrentDate = `${date.year()}-${date.date()}-${date.month() + 1}`;
        const userRef = doc(db, 'users', currentUser.uid, 'history', formatCurrentDate);
        try {
            const userDoc = await getDoc(userRef);
            if(userDoc.exists()) {
                console.log('User already completed a puzzle today.');
                return;
            }
            await setDoc(userRef, {
                completed: completed,
                points: points,
                guesses: guesses
            }, { merge: true });
            await setDoc(doc(db, 'users', currentUser.uid), {
                points: currentUser.points + points
            }, { merge: true });
        } catch (e) {
            console.log(e);
        }
    }
}

export async function setUsername(
    currentUser: UserType | null,
    username: string,
) {
    // Update the user's score in DB
    if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        try {
            // Check if username is already taken (exists in usernames)
            const usernamesRef = collection(db, 'usernames');
            const usernamesSnapshot = await getDocs(usernamesRef);
            const usernames = usernamesSnapshot.docs.map(doc => doc.id);
            if (usernames.includes(username)) {
                console.log('Username already taken');
                return false;
            }
            else {
                // Delete old username from usernames
                if (currentUser.username) {
                    await deleteDoc(doc(db, 'usernames', currentUser.username));
                }
                await setDoc(userRef, {
                    username: username,
                }, { merge: true });
                await setDoc(doc(db, 'usernames', username), {
                    uid: currentUser.uid,
                });
                return true;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
