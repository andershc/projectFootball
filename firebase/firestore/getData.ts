import { GuessResult } from "../../src/types";
import firebase_app from "../config";
import { getFirestore, doc, getDoc, } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getData(collection: string, document: string) {
    const docRef = doc(db, collection, document);
    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
        const doc = await getDoc(docRef);

        // Document was found in the cache. If no cached document exists,
        // an error will be returned to the 'catch' block below.
        return doc.data();
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
}

export async function getUserHistoryFromDate(date: string, user: any ): Promise<GuessResult | undefined> {
    const userRef = doc(getFirestore(firebase_app),
    'users',
    user.uid,
    'history',
    date
    );
    let history: GuessResult = {} as GuessResult;
    await getDoc(userRef).then((doc) => {
        if (doc.exists()) {
            const data = doc.data();
            console.log('Document data:', data);
            history = data as GuessResult;
            return history;                    
        } else {
            console.log('No such document!');
            return undefined;
        }
    });
    return history;
}