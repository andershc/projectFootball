import '../styles/globals.css'
import Navbar from '../components/navbar/Navbar';
import { AuthContextProvider } from '../lib/AuthContext';
import type { Metadata } from 'next'
import { GuessContextProvider } from '../lib/GuessContext';
import { ServerThemeProvider } from 'next-themes'
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
    title: 'BallerBingo',
    description: 'Football Standings',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <ServerThemeProvider>
            
                <html lang='en'>
                    <body>
                    <Suspense fallback={<Loading />}>
                        <AuthContextProvider> 
                            <GuessContextProvider>
                                <Navbar />
                                {children}
                            </GuessContextProvider>
                        </AuthContextProvider>
                        </Suspense>
                    </body>
                </html>
            
        </ServerThemeProvider>
    );
}


