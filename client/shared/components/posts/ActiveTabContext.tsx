'use client';

import { createContext, useContext, useRef } from 'react';

type ActiveTabPosition = {
  left: number;
  width: number;
};

const ActiveTabContext = createContext<React.RefObject<ActiveTabPosition | null> | null>(null);

export const useActiveTabPosition = () => useContext(ActiveTabContext);

export const ActiveTabProvider = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<ActiveTabPosition | null>(null);
  return (
    <ActiveTabContext.Provider value={ref}>
      {children}
    </ActiveTabContext.Provider>
  );
};
