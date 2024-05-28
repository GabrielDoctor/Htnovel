"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
type UserData = {
  id: string;
  user_name: string;
  email: string;
  photo: string;
  role: string;
};

type AuthContextType = {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
};

const initAuthContext: AuthContextType = {
  userData: null,
  setUserData: () => {},
};

export const AuthContext = createContext<AuthContextType>(initAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const verify = async () => {
      try {
        const authResult = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (authResult.status === 200) {
          const res = await authResult.json();
          setUserData(res.User);
        } else {
          setUserData({
            id: "0",
            user_name: "Guest",
            email: "example@gmail.com",
            photo: "",
            role: "Guest",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    verify();
    console.log("AuthContext: ", userData);
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
