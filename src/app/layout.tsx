import '../styles/globals.css'
import Navbar from '../components/navbar/Navbar';
import { AuthContextProvider } from '../../lib/AuthContext';
import type { Metadata } from 'next'
import { GuessContextProvider } from '../../lib/GuessContext';
import { PlayersContextProvider } from '../../lib/PlayersContext';
import { ServerThemeProvider } from 'next-themes'
import { Suspense } from 'react';
import Loading from './loading';
import
 { Analytics } 
from
 
'@vercel/analytics/react'
;
import Head from 'next/head';

export const metadata: Metadata = {
    title: 'CareerPath',
    description: 'Football Career Path Game',
    openGraph: {
        images: '../../public/favicon.ico',
      },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ServerThemeProvider>
            <html lang='en'>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <body>
                    <Suspense fallback={<Loading />}>
                            <AuthContextProvider> 
                                <PlayersContextProvider>
                                    <GuessContextProvider>
                                        <Navbar />
                                        {children}

                                    </GuessContextProvider>
                                </PlayersContextProvider>
                            </AuthContextProvider>
                    </Suspense>
                    <Analytics/>
                </body>
            </html>
        
        </ServerThemeProvider>
    );
}


