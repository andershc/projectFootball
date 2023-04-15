import Error from "next/error";
import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export const auth = getAuth(firebase_app);
const googleAuthProvider = new GoogleAuthProvider();
const db = getFirestore(firebase_app);

export async function signIn(email: string, password: string) {
    let result = null,
        error = null;
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
                        username: ''
                    });
                } else {
                    await setDoc(userDocRef, {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                    }, { merge: true });
                }
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("ERROR ", errorCode, errorMessage)
            }
        );
    } catch (e) {
        console.log(e)
        error = e;
    }

    return { result, error };
}

// Google Sign In
export async function signInWithGoogle() {
    let result = null,
        error: Error | null = null;
    await signInWithPopup(auth, googleAuthProvider)
        .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)
        // Store user in DB if not already there
        const userDocRef = doc(db, "users", user?.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            await setDoc(userDocRef, {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                points: 0,
                username: ''
            });
        } else {
            await setDoc(userDocRef, {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            }, { merge: true });
        }
    })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("ERROR ", errorCode)
        });
    return { result, error };
}