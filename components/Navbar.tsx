'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import signOutUser from '../firebase/auth/signout';
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
            <li className="push-left">
            <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <img src={user?.['photoURL'] || '/hacker.png'} />
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