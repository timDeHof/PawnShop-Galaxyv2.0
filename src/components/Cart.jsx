import React, { useCallback, useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

function Cart() {
  const { token, user } = useAuth();
  const { cart, updateQty, deleteItem, checkout } = useCart();
  const [loading, setLoading] = useState(false);

  console.log("The Cart:", cart);
  const decrementButton = useRef();
  const incrementButton = useRef();

  useEffect(() => {
    if (loading) {
      decrementButton.current.disabled = true;
      incrementButton.current.disabled = true;
    } else {
      decrementButton.current.removeAttribute("disabled");
      incrementButton.current.removeAttribute("disabled");
    }
  }, [loading]);

  async function handleCheckout() {
    const orderId = cart.id;
    await checkout(orderId, user.id);
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

  const handleQuantityDecrement = useCallback(async (productOrder) => {
    setLoading(true);
    try {
      await updateQty(productOrder.id, productOrder.quantity - 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleQuantityIncrement = useCallback(async (productOrder) => {
    setLoading(true);
    try {
      await updateQty(productOrder.id, productOrder.quantity + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <button type="button" onClick={handleCheckout}>
        Checkout
      </button>

      {cart.productOrders.map((productOrder) => (
        <div key={`cartProduct${productOrder.products.id}-${productOrder.id}`}>
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
            onClick={handleQuantityDecrement}
          >
            {loading ? "loading..." : "-"}
          </button>
          <div>{productOrder.quantity}</div>
          <button
            type="button"
            ref={incrementButton}
            onClick={handleQuantityIncrement}
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
