import React, { useState, useEffect,useRef } from "react"
import useAuth from "../hooks/useAuth"
import useCart from "../hooks/useCart"
import { removeFromCart } from "../axios-services/product-orders"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const { token, user } = useAuth()
  const { cart, setCart, updateQty, deleteItem, checkout } = useCart()
  const [loading, setLoading] = useState(false);
  // const [qty, setQty] = useState(1)
  // const incrementQty = () => setQty(qty + 1)
  // let decrementQty = () => setQty(qty - 1)

  const navigate = useNavigate()
  const quantityButton = useRef();
  console.log("The Cart:", cart)

  useEffect(() => {
    if (loading) {
      quantityButton.current.disabled = true;
    } else {
      quantityButton.current.removeAttribute("disabled");
    }
  }, [loading])

  return (
    <div>
      <br />
      <br />

      <br />
      <br />
      <br />

      <button
        onClick={async () => {
          const orderId = cart.id
          console.log("OrderId", orderId)
          await checkout(orderId, user.id)

          // navigate("/", { replace: true });
        }}>
        Checkout
      </button>

      {cart.product_orders.map((product_order, i) => {
        return (
          <div key={`cartProduct${i}`}>
            <h2>{product_order.products.name}</h2>
            <img src={product_order.products.imageURL} width='200px' />
            <div>
              $ {parseFloat(product_order.products.price * product_order.quantity).toFixed(2)}
            </div>
            <button
              ref={quantityButton}
              disabled={ product_order.quantity === 1 ? true : false}
              onClick={async () => {
                setLoading(true)
                updateQty(product_order.id, --product_order.quantity).then(() => setLoading(false))
              }}>
              -
            </button>
            <div>{product_order.quantity}</div>
            <button
              ref={quantityButton}
              onClick={async () => {
                setLoading(true)
                updateQty(product_order.id, ++product_order.quantity).then(() => setLoading(false))
              }}>
              +
            </button>
            <div>
              <button
                onClick={async () => {
                  deleteItem(token, product_order.id)
                }}>
                Remove Item
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cart
