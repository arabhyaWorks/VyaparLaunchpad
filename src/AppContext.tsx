import React, { createContext, useState, ReactNode, useEffect, useRef } from 'react';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  hashed_password: string;
}

interface AppContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  storeData: any;
  setStoreData: (data: any) => void;
  userStoreData: any;
  setUserStoreData: (data: any) => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  stopAudioPlayback: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [storeData, setStoreData] = useState<any>(null);
  const [userStoreData, setUserStoreData] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("languageCode") || "en"
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("languageCode", selectedLanguage);
  }, [selectedLanguage]);

  const stopAudioPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  return (
    <AppContext.Provider value={{
      loading, setLoading, user, setUser, isEditing, setIsEditing, storeData, setStoreData,
      userStoreData, setUserStoreData, selectedLanguage, setSelectedLanguage, stopAudioPlayback
    }}>
      {children}
    </AppContext.Provider>
  );
};
