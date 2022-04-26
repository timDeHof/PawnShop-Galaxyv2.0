import { useContext } from "react";
import { createProductOrder } from "../axios-services/product-orders";
import CartContext from "../CartContext";
import useAuth from "./useAuth";


const useCart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { token } = useAuth()

  const addToCart = async (orderId, productId, quantity) => {
    const productOrder = await createProductOrder(token, orderId, productId, quantity)

    console.log("this should be the productr", productOrder);
    setCart({ ...cart, product_orders: [...cart.product_orders, productOrder] })
  }
  return {
    cart, setCart, addToCart
  };
};

export default useCart;
