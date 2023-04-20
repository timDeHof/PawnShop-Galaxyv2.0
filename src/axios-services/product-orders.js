import axios from 'axios';

export async function getProductOrders() {
  try {
    const { data: products } = await axios.get('/api/product-orders');
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createProductOrder(token, orderId, productId, quantity) {
  try {
    const { data: productOrder } = await axios.post('/api/product-orders', {
      orderId,
      productId,
      quantity,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return productOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function removeFromCart(token, productOrderId) {
  if (!token || !productOrderId) {
    throw new Error('Token and productOrderId are required');
  }
  try {
    const { data: productOrder } = await axios.delete(`/api/product-orders/${productOrderId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return productOrder;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}

export async function updateQuantity(productOrderId, quantity) {
  if (!productOrderId || !quantity) {
    throw new Error('productOrderId and quantity is required');
  }
  try {
    const { data: productOrder } = await axios.patch(`/api/product-orders/${productOrderId}`, {
      quantity,
    });
    return productOrder;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}
