import React, { useCallback, useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

function Cart() {
  const { token } = useAuth();
  const { cart, updateQty, deleteItem, checkout } = useCart();
  const [loading, setLoading] = useState(false);

  console.log("The Cart:", cart);
  const decrementButton = useRef();
  const incrementButton = useRef();
  const { id, userId } = cart;

  useEffect(() => {
    if (loading) {
      if (decrementButton.current) decrementButton.current.disabled = true;
      if (incrementButton.current) incrementButton.current.disabled = true;
    } else {
      if (decrementButton.current) decrementButton.current.disabled = false;
      if (incrementButton.current) incrementButton.current.disabled = false;
    }
  }, [loading]);

  async function handleCheckout() {
    const orderId = id;
    await checkout(orderId, userId);
  }

  async function handleDeleteItemFromCart(productOrder) {
    setLoading(true);
    try {
      await deleteItem(token, productOrder.id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleQuantityDecrement = useCallback(
    async (productOrder) => {
      console.log("click");
      console.log("product order", productOrder);
      setLoading(true);
      const newQuantity = productOrder.quantity - 1;
      if (newQuantity >= 1) {
        try {
          await updateQty(productOrder.id, newQuantity);
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    },
    [updateQty]
  );

  const handleQuantityIncrement = useCallback(
    async (productOrder) => {
      setLoading(true);
      const newQuantity = productOrder.quantity + 1;
      try {
        await updateQty(productOrder.id, newQuantity);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [updateQty]
  );

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <button type="button" onClick={() => handleCheckout(cart)}>
        Checkout
      </button>
      {cart.productOrders.map((productOrder) => (
        <div key={`cartProduct${productOrder.products.id}`}>
          <h2>{productOrder.products.name}</h2>
          <img
            src={productOrder.products.imageURL}
            width="200px"
            alt={productOrder.products.name}
          />
          <div>
            ${" "}
            {parseFloat(
              productOrder.products.price * productOrder.quantity
            ).toFixed(2)}
          </div>
          <button
            type="button"
            ref={decrementButton}
            disabled={productOrder.quantity === 1}
            onClick={() => handleQuantityDecrement(productOrder)}
          >
            {loading ? "loading..." : "-"}
          </button>
          <div>{productOrder.quantity}</div>
          <button
            type="button"
            ref={incrementButton}
            onClick={() => handleQuantityIncrement(productOrder)}
          >
            {loading ? "loading..." : "+"}
          </button>
          <div>
            <button
              type="button"
              onClick={() => handleDeleteItemFromCart(productOrder)}
            >
              Remove Item
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
