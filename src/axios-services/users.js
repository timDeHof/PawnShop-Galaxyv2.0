import axios from 'axios';

export async function getUsers() {
  try {
    const { data: users } = await axios.get('/api/users');
    return users;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}

export async function fetchUser(token) {
  if (!token) {
    throw new Error('Token is required');
  }
  try {
    const { data } = await axios.get('/api/users/me', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}
export async function loginUser(username, password) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  try {
    const { data } = await axios.post('/api/users/login', {
      username,
      password,
    });
    return data;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}

export async function registerUser(username, password, name, shippingAddress, billingAddress) {
  if (!username || !password || !name || !shippingAddress || !billingAddress) {
    throw new Error('All fields are required');
  }
  try {
    const { data } = await axios.post('/api/users/register', {
      username,
      password,
      name,
      shippingAddress,
      billingAddress,
    });
    return data;
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}
