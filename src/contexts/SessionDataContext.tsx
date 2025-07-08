import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { SessionData } from '@interface/SessionData';


interface SessionDataContextType {
  sessionData: SessionData;
  setSessionValue: <K extends keyof SessionData>(
    key: K,
    value: SessionData[K]
  ) => void;
  clearSessionData: () => void;
}

const SessionDataContext = createContext<SessionDataContextType | undefined>(undefined);

interface SessionDataProviderProps {
  children: ReactNode;
}

export const SessionDataProvider: React.FC<SessionDataProviderProps> = ({ children }) => {
  const [sessionData, setSessionData] = useState<SessionData>(() => {
    const stored = sessionStorage.getItem('sessionData');
    return stored ? JSON.parse(stored) : { username: '', isLoggedIn: false };
  });

  useEffect(() => {
    sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
  }, [sessionData]);

  const setSessionValue = <K extends keyof SessionData>(key: K, value: SessionData[K]) => {
    setSessionData(prev => ({ ...prev, [key]: value }));
  };

  const clearSessionData = () => {
    setSessionData({ username: '', roomId: ''});
    sessionStorage.removeItem('sessionData');
  };

  return (
    <SessionDataContext.Provider
      value={{ sessionData, setSessionValue, clearSessionData }}
    >
      {children}
    </SessionDataContext.Provider>
  );
};

export const useSessionData = (): SessionDataContextType => {
  const context = useContext(SessionDataContext);
  if (!context) {
    throw new Error('useSessionData must be used within a SessionDataProvider');
  }
  return context;
};
