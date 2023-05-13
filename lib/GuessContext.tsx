"use client";

import React, { useContext } from "react";
import { type Player, type TransferData } from "../src/types";

interface GuessContextType {
  correctPlayer: Player | undefined;
  setCorrectPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;
  transferData: TransferData[];
  setTransferData: React.Dispatch<React.SetStateAction<TransferData[]>>;
}

export const GuessContext = React.createContext<GuessContextType>({
  correctPlayer: undefined,
  setCorrectPlayer: () => {},
  transferData: [] as TransferData[],
  setTransferData: () => {},
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useGuessContext = () => useContext(GuessContext);

export const GuessContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [correctPlayer, setCorrectPlayer] = React.useState<Player>();
  const [transferData, setTransferData] = React.useState([] as TransferData[]);

  return (
    <GuessContext.Provider
      value={{
        correctPlayer,
        setCorrectPlayer,
        transferData,
        setTransferData,
      }}
    >
      {children}
    </GuessContext.Provider>
  );
};
