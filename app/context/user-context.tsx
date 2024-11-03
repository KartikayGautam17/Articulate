"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type UserContextProps = {
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
};
const UserContext = createContext<UserContextProps>({
  userId: null,
  setUserId(id) {},
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
