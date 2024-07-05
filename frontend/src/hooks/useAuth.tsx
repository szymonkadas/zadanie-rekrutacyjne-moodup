import { useContext } from "react";
import { AuthContext, AuthCredentials } from "../contexts/AuthContext";

export default function useAuth() {
  const {
    auth,
    setAuth,
  }: {
    auth: AuthCredentials;
    setAuth: (value: AuthCredentials) => void;
  } = useContext(AuthContext);
  return { auth, setAuth };
}
