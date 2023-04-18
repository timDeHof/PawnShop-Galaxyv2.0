import axios from 'axios';

// eslint-disable-next-line consistent-return
export default async function getAllOrders() {
  try {
    const { data: orders } = await axios.get('/api/orders');
    return orders;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
