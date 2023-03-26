import '../styles/globals.css'
import Navbar from '../components/Navbar';
import { AuthContextProvider } from '../lib/AuthContext';
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

    return (
        <html lang='en'>
            <body>
            <AuthContextProvider> 
                
                    <Navbar />
                    {children}
               
            </AuthContextProvider>
            </body>
        </html>
    );
}


