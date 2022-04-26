import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { updateQuantity } from "../axios-services/product-orders";

const Cart = () => {
  const { token, user } = useAuth();
  const { cart, setCart } = useCart();
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
              <div>{product_order.products.price} ₡</div>
              <button 
              onClick={async () => {
                decrementQty()
                const id = product_order.id
                await updateQuantity(id, qty)
              }}
              >-</button>
              <div>{qty}</div>
              <button onClick={async () => {
                incrementQty()
                const id = product_order.id
                await updateQuantity(id, qty)
              }}>+</button>
          </div>
        )
      })}
    </>
  )
};

export default Cart;
