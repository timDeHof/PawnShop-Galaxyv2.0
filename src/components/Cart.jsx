import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getOrderByUser } from "../axios-services/cart";
import { getProductOrders } from "../axios-services/product-orders";
import { getProducts } from "../axios-services/products";

const Cart = () => {
  const { token, user, cart, setCart } = useAuth();
  
  useEffect(() => {
    async function getCart() {
      const userOrders = await getOrderByUser(user.id);
      const activeOrder = userOrders.find((item) => item.isActive);
      const productOrders = await getProductOrders();
      const filteredOrders = productOrders.filter( productOrder => activeOrder.id === productOrder.orderId );
      console.log(filteredOrders, "filtered orders")
      const products = await getProducts
      setCart();
    }
    getCart();
  }, [user]);

  return <div></div>;
};

export default Cart;
