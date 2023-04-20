import axios from "axios";

async function getAllOrders() {
  try {
    const { data: orders } = await axios.get("/api/orders");
    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getAllOrders;
