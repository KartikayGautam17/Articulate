"use client";
import { createContext, useContext, useState } from "react";

export type ProfileContextProps = {
  name: string;
  description: string;
  image: string;
  tags: string[];
  links: string[];
  setProfile: () => void;
} | null;

const ProfileContext = createContext<ProfileContextProps>(null);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<ProfileContextProps>(null);

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
