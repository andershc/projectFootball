import firebase_app from "../config";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);
const signOut = () => auth.signOut();

export default async function signOutUser() {
    let result = null,
        error = null;
    try {
        result = await signOut();
        
    } catch (e) {
        error = e;
    }

    return { result, error };
}