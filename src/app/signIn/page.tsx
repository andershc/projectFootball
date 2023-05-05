/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { signIn, signInWithGoogle } from "../../../firebase/auth/signIn";
import GoogleImage from "../../../public/static/images/google.png";
import styles from "./signIn-page.module.css";

function SignInPage(): JSX.Element {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleGoogleSignIn = async (): Promise<void> => {
    const { result, error } = await signInWithGoogle();
    if (error !== null) {
      console.log(error);
      return;
    }
    // else successful
    console.log("Result ", result);
    router.push("/profile");
  };

  const handleForm = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error !== null) {
      if (error === "auth/user-not-found") {
        router.push("/signup");
        return;
      }
      console.log(error);
      return;
    }

    // else successful
    console.log("Result ", result);
    router.push("/profile");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <h1 className="mt-60 mb-30">Sign in</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          {/* Don't have a user? */}
          <p>
            Do not have an account?<Link href="/signup">Sign up</Link>
          </p>
          <button type="submit">Sign In</button>
        </form>
        {/* Google Sign in */}
      </div>
      <button className={styles.googleButton} onClick={handleGoogleSignIn}>
        <Image src={GoogleImage} alt={"Google"} width={30} height={30} /> Sign
        in with Google
      </button>
    </div>
  );
}

export default SignInPage;
