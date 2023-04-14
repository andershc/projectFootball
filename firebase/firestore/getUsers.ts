import { Player, User } from '../../src/types';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import firebase_app from '../config';
import { getAuth } from 'firebase/auth';
import {UserType } from '../../lib/AuthContext';

const db = getFirestore(firebase_app);

export default async function getAllUsers(currentUser: UserType | null): Promise<User[] | undefined> {
  
    if (!currentUser) {
      console.log('User not authenticated');
      return;
    }
  
    const docRef = collection(db, "users");
    try {
      const doc  = await getDocs(docRef);
      const users: User[] = [];
      doc.forEach((user) => {
        users.push(user.data() as User);
      });
      return users;
    } catch (e) {
      console.log('Error getting cached document:', e);
    }
  };