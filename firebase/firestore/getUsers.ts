import { Player, User } from '../../src/types';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function getAllUsers(): Promise<User[] | undefined> {
    const docRef = doc(db, "users");
    try {
        const doc  = await getDoc(docRef);
        return doc.data()?.users;
    } catch (e) {
        console.log('Error getting cached document:', e);
    }
};