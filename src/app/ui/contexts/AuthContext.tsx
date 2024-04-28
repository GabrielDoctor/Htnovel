"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
type UserData = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
};

type AuthContextType = {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    const verify = async () => {
      try {
        const authResult = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await authResult.json();

        if (json.Status === "Success") {
          setUserData(json.User);
        } else {
          setUserData({
            id: "0",
            name: "Guest",
            email: "example@gmail.com",
            avatar: "",
            role: "Guest",
          });
        }
        //console.log("Route: ");
      } catch (err) {
        console.error(err);
      }
    };

    verify();
    console.log("AuthContext: ", userData);
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
