import '../styles/globals.css'
import Navbar from '../components/Navbar';
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}> 
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp
