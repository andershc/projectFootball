'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '../lib/AuthContext';

// Top navbar
export default function Navbar() {
  const { user } = useContext(AuthContext);
  const username = user?.['displayName'];
  
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">NXT</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li>
              <Link href="/profile">
                {<Image 
                  src={user?.['photoURL'] || '/hacker.png'}
                  alt="user profile"
                  width={32}
                  height={32}
                />}
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
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