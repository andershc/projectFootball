'use client'
import React, { useContext } from "react";
import { signIn, signInWithGoogle} from "../../firebase/auth/signIn";
import { useRouter } from 'next/navigation'
import { useAuthContext } from "../../lib/AuthContext";

function SignInPage() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    
    const router = useRouter()

    const handleGoogleSignIn = async () => {
        const { result, error } = await signInWithGoogle();
        if (error) {
            return console.log(error)
        }
        // else successful
        console.log("Result ", result)
        return router.push("/profile")
    }
    
    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            if(error === "auth/user-not-found") {
                return router.push("/signup")
            }
            return console.log(error)
        }

        // else successful
        console.log("Result ", result)
        return router.push("/profile")
    }
    

    return (
    <div className="wrapper">
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Sign in</h1>
            <form onSubmit={handleForm} className="form">
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                {/* Don't have a user? */}
                <p>Do not have an account?<a href="/signup">Sign up</a></p>
                <button type="submit">Sign In</button>
            </form>
            {/*Google Sign in */}
            
        </div>
        <button className="btn-google" onClick={handleGoogleSignIn}>
            <img src={'/google.png'} width="30px" /> Sign in with Google
        </button>
    </div>);
}

export default SignInPage;