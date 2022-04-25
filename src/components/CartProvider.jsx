import React, { useEffect, useState } from "react";
import CartContext from "../CartContext";
import useAuth from "../hooks/useAuth";
import { getOrderByUser } from "../axios-services/cart";
import { getProductOrders } from "../axios-services/product-orders";
import { getProducts } from "../axios-services/products";

// import { getProducts } from "../axios-services/products";

const CartProvider = ({ children }) => {
  const { token, user } = useAuth();
  const localCart = JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState(localCart);
  useEffect(() => {
    if (user) {
      async function getCart() {
        const userOrders = await getOrderByUser(user.id);
        const activeOrder = userOrders.find((item) => item.isActive);
        const productOrders = await getProductOrders();
        const filteredOrders = productOrders.filter(
          (productOrder) => activeOrder.id === productOrder.orderId
        );
        const products = await getProducts();
        const filteredProducts = products.filter((product) => {
          if (filteredOrders.id === product.id) {
              console.log(filteredOrders, "filtered product");
              return filteredOrders;
            }
        });
        setCart(filteredOrders);
        console.log(cart, "This cart");
        console.log(filteredOrders, "alberts cart");
      }

      getCart();
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
