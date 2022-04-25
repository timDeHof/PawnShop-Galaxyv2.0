import axios from "axios";

// export async function getProduct(productId) {
//     try {
//         const { data: product } = await axios.get(`/api/products/${productId}`);
//         console.log(product, "product");
//         return product;
//     } catch (err) {
//         console.error(err);
//     }
// }
export async function getProducts() {
    try {
        const { data: products } = await axios.get("/api/products");
        // console.log(products, "products");
        return products;
    } catch (err) {
        console.error(err);
    }
}




