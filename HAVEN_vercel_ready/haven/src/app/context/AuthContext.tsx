import { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'patient' | 'doctor' | 'admin';

interface AuthUser {
  name: string;
  email: string;
  type: UserType;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: AuthUser | null;
  signIn: (type: UserType, name?: string, email?: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
});

const DEFAULT_USERS: Record<UserType, AuthUser> = {
  patient: { name: 'Jane Doe', email: 'jane.doe@gmail.com', type: 'patient' },
  doctor: { name: 'Dr. Sarah Johnson', email: 'dr.johnson@hospital.org', type: 'doctor' },
  admin: { name: 'Admin', email: 'admin@haven.health', type: 'admin' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const signIn = (type: UserType, name?: string, email?: string) => {
    setUser({
      name: name || DEFAULT_USERS[type].name,
      email: email || DEFAULT_USERS[type].email,
      type,
    });
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated: user !== null, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
