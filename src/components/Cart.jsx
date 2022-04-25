import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { getOrderByUser } from "../axios-services/cart";
import { getProductOrders } from "../axios-services/product-orders";
import { getProducts } from "../axios-services/products";

const Cart = () => {
  const { token, user } = useAuth();
  const { cart, setCart } = useCart();

 

  return <div>{console.log(cart)}</div>;
};

export default Cart;
