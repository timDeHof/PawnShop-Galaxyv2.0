import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getOrderByUser } from "../axios-services/cart";
import { getProductOrders } from "../axios-services/product-orders";

const Cart = () => {
  const { token, user, cart, setCart } = useAuth();
  console.log(user.id, "Line 9");
  useEffect(() => {
    async function getCart() {
      const userOrders = await getOrderByUser(user.id);
      console.log(userOrders, "line 13");
      const activeOrder = userOrders.find((item) => item.isActive);

      console.log(activeOrder, "activeOrder");
      const productOrders = await getProductOrders();
      console.log(productOrders, "product orders");
      const filteredOrders = productOrders.filter((product) => {
        activeOrder.id === product.orderId;
      });
      console.log(filteredOrders, "filtered orders")
      setCart(filteredOrders);
      console.log(cart, "line 19!!");
    }
    getCart();
  }, [user]);

  return <div></div>;
};

export default Cart;
