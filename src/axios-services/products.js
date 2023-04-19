import axios from 'axios';

export async function getProducts() {
  try {
    const { data: products } = await axios.get('/api/products');
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProduct(productId) {
  if (!productId) {
    throw new Error('ProductId is required');
  }
  try {
    const { data: product } = await axios.delete(`/api/products/${productId}`);
    return product;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}

export async function createProduct(name, price, description, condition, imageURL) {
  if (!name || !price || !description || !condition || !imageURL) {
    throw new Error('name, price, description, condition, imageURL must be provided');
  }
  try {
    const { data: product } = await axios.post(`/api/products`, {
      name,
      price,
      description,
      condition,
      imageURL,
    });
    return product;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}

export async function updateProduct(productId, name, price, description, condition, imageURL) {
  try {
    const { data: product } = await axios.patch(`/api/products/${productId}`, {
      name,
      price,
      description,
      condition,
      imageURL,
    });
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProductById(id) {
  if (!id) {
    throw new Error('Product ID required');
  }
  try {
    const { data: product } = await axios.get(`/api/products/${id}`);
    return product;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}
