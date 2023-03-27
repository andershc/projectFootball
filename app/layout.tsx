import '../styles/globals.css'
import Navbar from '../components/Navbar';
import { AuthContextProvider } from '../lib/AuthContext';
import type { Metadata } from 'next'
import { GuessContextProvider } from '../lib/GuessContext';

export const metadata: Metadata = {
    title: 'Football Standings',
    description: 'Football Standings',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang='en'>
            <body>
            <AuthContextProvider> 
                <GuessContextProvider>
                    <Navbar />
                    {children}
                </GuessContextProvider>
            </AuthContextProvider>
            </body>
        </html>
    );
}


