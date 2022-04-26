import axios from "axios"

export async function getProductOrders() {
    try {
        const { data: products } = await axios.get("/api/product-orders");
        return products;
    } catch (err) {
        console.error(err);
    }
}

export async function createProductOrder(token, orderId, productId, quantity) {
    try {
        const { data: product } = await axios.post("/api/product-orders", {
            orderId,
            productId,
            quantity,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        console.log("This should be product from axios", product)
        return product;
    } catch (err) {
        console.error(err);
    }
}
