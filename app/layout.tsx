import '../styles/globals.css'
import Navbar from '../components/Navbar';
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Football Standings',
    description: 'Football Standings',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  const userData = useUserData();

  return (
    <html lang='en'>
        <UserContext.Provider value={userData}> 
        <body>
            <Navbar />
            {children}
        </body>
        </UserContext.Provider>
    </html>
  );
}


