import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function getRandomDocument(
  collection: string,
  document: string
): Promise<any | undefined> {
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
