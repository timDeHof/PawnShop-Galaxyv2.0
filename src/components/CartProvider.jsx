/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import CartContext from "../CartContext";
import useAuth from "../hooks/useAuth";
import { getCartByUserId, createCart } from "../axios-services/cart";
import { getProductOrders } from "../axios-services/product-orders";
import { getProducts } from "../axios-services/products";

function CartProvider({ children }) {
  const { token, user } = useAuth();
  const [cart, setCart] = useState({ productOrders: [] });

  //   const localCart = JSON.parse(localStorage.getItem("cart"));
  //   console.log(localCart, "my local cart");
  //   console.log(cart, "This cart");
  //   if (localCart) {
  //     console.log("localCart exists");
  //   } else {
  //     console.log("localCart is not found");
  //   }

  useEffect(() => {
    const getCart = async () => {
      if (user.username !== "guest") {
        // get their cart from the backend
        const backendCart = await getCartByUserId(user.id);
        setCart(backendCart);
      }
    };
    getCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
