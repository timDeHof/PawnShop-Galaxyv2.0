import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { getOrderByUser } from "../axios-services/cart";
import { getProductOrders } from "../axios-services/product-orders";
import { getProducts } from "../axios-services/products";

const Cart = () => {
  const { token, user } = useAuth();
  const { cart, setCart } = useCart();

console.log("The Cart:", cart)

  // useEffect(() => {
  //   if (user) {
  //     async function getCart() {
  //       const userOrders = await getOrderByUser(user.id);
  //       const activeOrder = userOrders.find((item) => item.isActive);
  //       const productOrders = await getProductOrders();
  //       const filteredOrders = productOrders.filter(
  //         (productOrder) => activeOrder.id === productOrder.orderId
  //       );
  //       const products = await getProducts();
  //       if (products.id === productOrders.productId) {
  //         localStorage.setItem("cart", JSON.stringify(products));
  //         console.log(JSON.stringify(products));
  //         setCart(cart);
  //       } else {
  //         return null;
  //       }
  //       console.log(cart, "users cart");
  //     }

  //     getCart();
  //   }
  // }, [user]);
 

  return <div>{console.log(cart)}</div>;
};

export default Cart;
