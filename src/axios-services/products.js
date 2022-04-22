import axios from "axios";

export async function getProducts() {
    try {
        const { data: products } = await axios.get("/api/products");
        console.log(products, "products");
        return products;
    } catch (err) {
        console.error(err);
    }
}
