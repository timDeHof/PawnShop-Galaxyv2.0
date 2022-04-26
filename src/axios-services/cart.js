import axios from "axios";

export async function getCartByUser(userId) {
  try {
    const { data: [cart] } = await axios.get(`/api/users/cart/${userId}`);

    return cart;
  } catch (err) {
    console.error(err);
  }
}
