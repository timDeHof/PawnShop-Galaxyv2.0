import { useContext } from "react";
import AuthContext from "../AuthContext";

const useAuth = () => {
  const { user, setUser, token, setToken, cart, setCart } = useContext(AuthContext);

  return {
    user,
    setUser,
    token,
    setToken,
    cart, 
    setCart
  };
};

export default useAuth;
