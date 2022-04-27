import axios from "axios";

export async function getProducts() {
    try {
        const { data: products } = await axios.get("/api/products");
        return products;
    } catch (err) {
        console.error(err);
    }
}

export async function deleteProduct(productId) {
    try {
        const { data: product } = await axios.delete(`/api/products/${productId}`);
        return product;
    } catch (err) {
        console.error(err);
    }
}