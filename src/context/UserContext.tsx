import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  email: string;
  domain: 'linodegpu' | 'linkerdm';
  hasSuspendedPayment: boolean;
  totalAmount: number;
  licenses: number;
  pricePerUser: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const VALID_CREDENTIALS = [
  {
    email: 'admin@linodegpu.com',
    password: 'TestPassword@123',
    domain: 'linodegpu' as const,
    hasSuspendedPayment: true,
    totalAmount: 5490,
    licenses: 121,
    pricePerUser: 45,
  },
  {
    email: 'admin@linkerdm.online',
    password: 'TestPassword@123',
    domain: 'linkerdm' as const,
    hasSuspendedPayment: true,
    totalAmount: 4230,
    licenses: 94,
    pricePerUser: 45,
  },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const credential = VALID_CREDENTIALS.find(
      (cred) => cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
    );

    if (credential) {
      setUser({
        email: credential.email,
        domain: credential.domain,
        hasSuspendedPayment: credential.hasSuspendedPayment,
        totalAmount: credential.totalAmount,
        licenses: credential.licenses,
        pricePerUser: credential.pricePerUser,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
