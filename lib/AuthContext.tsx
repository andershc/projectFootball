/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React from "react";
import firebase_app from "../firebase/config";
import Loading from "../src/app/loading";

const auth = getAuth(firebase_app);

export interface UserType extends User {
  username: string;
  points: number;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AuthContext = React.createContext(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as { user: UserType | undefined }
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [user, setUser] = React.useState<UserType>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("user", user);
      if (user != null) {
        // Fetch user data from firestore
        const userRef = doc(getFirestore(firebase_app), "users", user.uid);
        await getDoc(userRef).then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const userData: UserType = {
              ...user,
              username: data.username,
              points: data.points,
            };
            setUser(userData);
          } else {
            setUser(user as UserType);
          }
        });
      } else {
        setUser(undefined);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
