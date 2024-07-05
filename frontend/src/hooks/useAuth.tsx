import { useContext } from "react";
import { AuthContext, AuthCredentials } from "../contexts/AuthContext";

export default function useAuth() {
  const {
    auth,
    setAuth,
  }: {
    auth: AuthCredentials;
    setAuth: React.Dispatch<React.SetStateAction<AuthCredentials>>;
  } = useContext(AuthContext);
  return { auth, setAuth };
}
