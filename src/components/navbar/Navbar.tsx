"use client";

import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../../lib/AuthContext";
import useWindowWidth from "../../../lib/hooks";
import Button from "../button/Button";
import styles from "./navbar.module.css";

// Top navbar
export default function Navbar(): JSX.Element {
  const { user } = useContext(AuthContext);
  const { setTheme } = useTheme();
  const width = useWindowWidth();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.leftSide}>
          {width !== null && width > 900 && (
            <Link href="/">
              <button className="btn-logo">
                <HomeIcon />
              </button>
            </Link>
          )}
          <Link href="/leaderboard">
            <button className="btn-logo">
              <LeaderboardIcon fontSize="medium" />
            </button>
          </Link>
        </li>
        <li className={styles.center}>
          <Link href="/">
            <h1>PlayerGuessr</h1>
          </Link>
        </li>
        <li className={styles.rightSide}>
          {/* user is signed-in and has username */}
          {width !== null && width > 900 && (
            <div className={styles.themeContainer}>
              <Button
                onClick={() => {
                  setTheme("light");
                }}
                text="Light"
                className={styles.themeButton}
              />
              <Button
                onClick={() => {
                  setTheme("dark");
                }}
                text="Dark"
                className={styles.themeButton}
              />
            </div>
          )}
          {user?.email != null && (
            <>
              <Link href="/profile" className={styles.profilePic}>
                {
                  <Image
                    src={
                      user?.photoURL !== null && user?.photoURL !== undefined
                        ? user.photoURL
                        : "/static/images/hacker.png"
                    }
                    alt="user profile"
                    width={50}
                    height={50}
                  />
                }
              </Link>
            </>
          )}
          {/* user is not signed OR has not created username */}
          {user?.email == null && (
            <Link href="/signIn">
              <p className={styles.loginButton}>Log in</p>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
