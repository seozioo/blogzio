import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider와 함께 사용해야 합니다.');
  }
  return context;
};
