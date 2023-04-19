'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../lib/AuthContext';
import { useTheme } from 'next-themes'
import Button from '../button/Button';
import styles from './navbar.module.css';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HomeIcon from '@mui/icons-material/Home';
import useWindowWidth from '../../../lib/hooks';

// Top navbar
export default function Navbar() {
  const { user } = useContext(AuthContext);
  const username = user?.['displayName'];
  const { theme, setTheme } = useTheme()
  const width = useWindowWidth();
  
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.leftSide}>
          { width !== null && width > 900 &&
             <Link href="/">
             <button className="btn-logo">
               <HomeIcon/>
             </button>
           </Link>
          }
          <Link href="/leaderboard">
            <button className="btn-logo">
              <LeaderboardIcon fontSize='medium'/>
            </button>
          </Link>
        </li>
        <li className={styles.center}>
          <Link href="/">
            <h1 >CarrerPath</h1>
          </Link>
        </li>
        <li className={styles.rightSide}>
          {/* user is signed-in and has username */}
          {user?.email && (
              <>
                { width !== null && width > 900 &&
                 <div className={styles.themeContainer}>
                  <Button 
                    onClick={() => setTheme('light')}
                    text='Light'
                    className={styles.themeButton}
                    />
                  <Button 
                    onClick={() => setTheme('dark')} 
                    text='Dark'
                    className={styles.themeButton}
                    />
                </div>}
                <Link href="/profile" className={styles.profilePic}>
                  {<Image 
                    src={user?.['photoURL'] || '/static/images/hacker.png'}
                    alt="user profile"
                    width={50}
                    height={50}
                  />}
                </Link>
              </>
          )}
        </li>
        {/* user is not signed OR has not created username */}
        {!user?.email && (
          <li>
            <Link href="/signIn">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}