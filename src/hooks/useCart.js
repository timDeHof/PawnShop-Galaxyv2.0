/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { useContext } from "react";
import {
  createProductOrder,
  updateQuantity,
  removeFromCart,
} from "../axios-services/product-orders";
import CartContext from "../CartContext";
import useAuth from "./useAuth";
import { createCart, setInactiveOrder } from "../axios-services/cart";

const useCart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { token } = useAuth();

  const addToCart = async (orderId, productId, quantity) => {
    const productOrder = await createProductOrder(
      token,
      orderId,
      productId,
      quantity
    );

    console.log("this should be the product", productOrder);
    setCart({
      ...cart,
      productOrders: [...cart.productOrders, productOrder],
    });
  };

  const updateQty = async (productOrderId, qty) => {
    await updateQuantity(productOrderId, qty);
    console.log(cart.productOrders);
    const mappedItems = cart.productOrders.map((productOrder) => {
      console.log("productOrder in map", productOrder);
      if (productOrder.id === productOrderId) {
        productOrder.quantity = +qty;
      }
      return productOrder;
    });
    console.log(mappedItems);
    setCart({ ...cart, productOrders: mappedItems });
  };

  const deleteItem = async (token, productOrderId) => {
    await removeFromCart(token, productOrderId);
    // eslint-disable-next-line consistent-return
    const filteredItems = cart.productOrders.filter((productOrder) => {
      if (productOrder.id !== productOrderId) {
        return productOrder;
      }
    });
    setCart({ ...cart, productOrders: filteredItems });
  };

  const checkout = async (orderId, userId) => {
    await setInactiveOrder(orderId, userId, false);
    const newCart = await createCart(userId, true);
    console.log("New Cart", newCart);
    setCart(newCart);
  };

  return {
    cart,
    setCart,
    addToCart,
    updateQty,
    deleteItem,
    checkout,
  };
};

export default useCart;
