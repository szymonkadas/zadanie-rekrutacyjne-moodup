import { createContext, ReactNode, useState } from 'react';
interface IAuthContext {
  auth: AuthData;
  setAuth: (value: AuthData) => void;
}

export type AuthData = {
  email: string;
  accessToken: string;
  // jokes: string[]
};

export const LoggedOutAuthState: AuthData = {
  email: "",
  accessToken: "",
  // jokes: []
};

export const AuthContext = createContext<IAuthContext>({
  auth: LoggedOutAuthState,
  setAuth: (val: AuthData) => val,
});

export function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [auth, setAuth] = useState<AuthData>(LoggedOutAuthState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
