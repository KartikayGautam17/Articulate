"use client";
import { createContext, useContext, useState } from "react";

type UserId = string | null;

export type UserContextProps = {
  userId: UserId;
  setUserId: (id: UserId) => void;
};

const UserContext = createContext<UserContextProps>({
  userId: null,
  setUserId(id) {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserID] = useState<UserId>(null);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId(id) {
          setUserID(id);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom Hook to get userId if a user is signed in.
 *
 * Can be used only on client-side.
 * @returns {Object} {userId,setUserId}
 */

export const useUser = (): UserContextProps => useContext(UserContext);
