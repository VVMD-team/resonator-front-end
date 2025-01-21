"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Loader from "@/ui/Loader/Loader";

import { getUserData } from "@/modules/user/api";
import { error } from "jquery";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getUserData()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router]);

  return (
    <UserContext.Provider value={{ user }}>
      {!user ? <Loader /> : children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (typeof context === "undefined") {
    throw new Error("useUser must be user in a UserProvider");
  }

  return context;
};
