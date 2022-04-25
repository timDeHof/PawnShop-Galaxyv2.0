import axios from "axios"

export async function getProductOrders() {
    try {
        const { data: products } = await axios.get("/api/product-orders");
        // console.log(products, "products");
        return products;
    } catch (err) {
        console.error(err);
    }
}
