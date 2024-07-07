import { createContext, useState } from "react";
interface IAuthContext {
  auth: AuthCredentials;
  setAuth: (value: AuthCredentials) => void;
}

export type AuthCredentials = {
  email: string;
  accessToken: string;
};


export const LoggedOutAuthState: AuthCredentials = {
  email: "",
  accessToken: "",
};

// For dev purposes (mocking logged in state):
// const LoggedInAuthState: AuthCredentials = {
//   email: "email@email.com",
// accessToken: "okokokontojesrybafest6219410",
// };

export const AuthContext = createContext<IAuthContext>({
  auth: LoggedOutAuthState,
  setAuth: (val: AuthCredentials) => val,
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<AuthCredentials>(LoggedOutAuthState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
