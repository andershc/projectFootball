'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '../../../lib/AuthContext';
import { useTheme } from 'next-themes'
import Button from '../button/Button';
import styles from './navbar.module.css';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HomeIcon from '@mui/icons-material/Home';

// Top navbar
export default function Navbar() {
  const { user } = useContext(AuthContext);
  const username = user?.['displayName'];
  const { theme, setTheme } = useTheme()
  
  return (
    <nav className="navbar">
      <ul>
        <li className={styles.leftSide}>
          <Link href="/">
            <button className="btn-logo">
              <HomeIcon/>
            </button>
          </Link>
          <Link href="/leaderboard">
            <button className="btn-logo">
              <LeaderboardIcon fontSize='medium'/>
            </button>
          </Link>
        </li>
        <li>
          {/* user is signed-in and has username */}
          {user && (
              <>
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
                </div>
                <Link href="/profile" className={styles.profilePic}>
                  {<Image 
                    src={user?.['photoURL'] || '/static/images/hacker.png'}
                    alt="user profile"
                    width={32}
                    height={32}
                  />}
                </Link>
              </>
          )}
        </li>
        {/* user is not signed OR has not created username */}
        {!user && (
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