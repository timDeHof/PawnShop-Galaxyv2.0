import axios from "axios";

export async function getCartByUser(userId) {
  try {
    const {
      data: [cart],
    } = await axios.get(`/api/users/cart/${userId}`);

    return cart;
  } catch (err) {
    console.error(err);
  }
}

export async function createCart(token, userId, isActive) {
  try {
    const {
      data: [cart],
    } = await axios.post(`/api/users/cart/${userId}`, {
      isActive,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(cart, "from axios")
    return cart;
  } catch (err) {
    console.error(err);
  }
}
