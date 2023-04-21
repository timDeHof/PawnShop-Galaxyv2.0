import React, { useEffect, useState, useMemo } from "react";
import CartContext from "../CartContext";
import useAuth from "../hooks/useAuth";
import { getCartByUserId } from "../axios-services/cart";

function CartProvider({ children }) {
  const {
    user: { id, username },
  } = useAuth();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      if (username !== "guest") {
        // get their cart from the backend
        const backendCart = await getCartByUserId(id);
        setCart(backendCart);
      }
    };
    getCart();
  }, [username, id]);

  const cartContextValue = useMemo(() => ({ cart, setCart }), [cart, setCart]);

  return cart ? (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  ) : null;
}

export default CartProvider;
