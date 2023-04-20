import axios from "axios";

export async function getCartByUserId(userId) {
  if (!userId) {
    throw new Error("UserId is required");
  }
  try {
    const {
      data: [cart],
    } = await axios.get(`/api/users/cart/${userId}`);

    return cart;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}

export async function createCart(userId, isActive) {
  if (!userId || !isActive) {
    throw new Error("UserId and isActive is required");
  }
  try {
    const { data } = await axios.post(`/api/orders/`, {
      userId,
      isActive,
    });
    return data;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}

export async function setInactiveOrder(orderId, userId, isActive) {
  if (!orderId || !userId || !isActive) {
    throw new Error("UserId, orderId, and isActive is required");
  }
  try {
    const data = await axios.patch(`/api/orders/${orderId}`, {
      userId,
      isActive,
    });
    return data;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}
