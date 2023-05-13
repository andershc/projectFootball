import {
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import type Error from "next/error";
import firebase_app from "../config";

export const auth = getAuth(firebase_app);
const googleAuthProvider = new GoogleAuthProvider();
const db = getFirestore(firebase_app);

export async function signIn(email: string, password: string): Promise<any> {
  const result = null;
  let error = null;
  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        // Signed in
        const user = result.user;
        // Store user in DB if not already there
        const userDocRef = doc(db, "users", user?.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            points: 0,
            username: "",
          });
        } else {
          await setDoc(
            userDocRef,
            {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            },
            { merge: true }
          );
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR ", errorCode, errorMessage);
      });
  } catch (e) {
    console.log(e);
    error = e;
  }

  return { result, error };
}

// Google Sign In
export async function signInWithGoogle(): Promise<any> {
  const result = null;
  const error: Error | null = null;
  await signInWithPopup(auth, googleAuthProvider)
    .then(async (result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // Store user in DB if not already there
      const userDocRef = doc(db, "users", user?.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          points: 0,
          username: "",
        });
      } else {
        await setDoc(
          userDocRef,
          {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          },
          { merge: true }
        );
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log("ERROR ", errorCode);
    });
  return { result, error };
}
