import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { ServerThemeProvider } from "next-themes";
import { Suspense } from "react";
import { AuthContextProvider } from "../../lib/AuthContext";
import { GuessContextProvider } from "../../lib/GuessContext";
import { PlayersContextProvider } from "../../lib/PlayersContext";
import Navbar from "../components/navbar/Navbar";
import "../styles/globals.css";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "PlayerGuessr",
  description: "Football Career Path Game",
  openGraph: {
    images: "../../public/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ServerThemeProvider>
      <html lang="en">
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
          <Analytics />
        </body>
      </html>
    </ServerThemeProvider>
  );
}
