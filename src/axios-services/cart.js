import axios from "axios"

export async function getOrderByUser(userId) {
    try {
        const { data: order } = await axios.get(`/api/orders/${userId}`);
        return order;
    } catch (err) {
        console.error(err);
    }
}

