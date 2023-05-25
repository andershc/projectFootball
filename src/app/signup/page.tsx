/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import signUp from "../../../firebase/auth/signup";
import styles from "./signup.module.css";

function SignUpPage(): JSX.Element {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: {
    preventDefault: () => void;
  }): Promise<any> => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error !== null) {
      console.log(error);
      return;
    }

    // else successful
    console.log(result);
    router.push("/profile");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <h1 className="mt-60 mb-30">Sign up</h1>
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
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
