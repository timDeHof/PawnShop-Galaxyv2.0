import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

const Cart = () => {
  const { token, user } = useAuth();
  const { cart, setCart, updateQty } = useCart();
  const [ qty, setQty ] = useState(1)
  const incrementQty = () => setQty(qty + 1);
  let decrementQty = () => setQty(qty - 1);

console.log("The Cart:", cart)
  return (
    <>
      {cart.product_orders.map( (product_order, i)=> {
        return (
          <div key={`cartproduct${i}`}>
              <h2>{product_order.products.name}</h2>
              <img src={product_order.products.imageURL} width="200px"/>
              <div>{product_order.products.price * product_order.quantity} ₡</div>
              <button 
              onClick={async () => {
                updateQty(product_order.id, --product_order.quantity)
              }}
              >-</button>
              <div>{product_order.quantity}</div>
              <button onClick={async () => {
                updateQty(product_order.id, ++product_order.quantity)
              }}>+</button>
          </div>
        )
      })}
    </>
  )
};

export default Cart;
