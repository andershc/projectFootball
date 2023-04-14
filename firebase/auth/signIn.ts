import Error from "next/error";
import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const auth = getAuth(firebase_app);
const googleAuthProvider = new GoogleAuthProvider();

export async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
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
    signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)
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
