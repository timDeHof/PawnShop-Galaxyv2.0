import React, { useEffect, useState } from "react";
import getAllOrders from "../axios-services/orders";
import { getUsers } from "../axios-services/users";
import useAuth from "../hooks/useAuth";

function AdminDashboard() {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [users, orders] = await Promise.all([getUsers(), getAllOrders()]);
      setAllUsers(users);
      setAllOrders(orders);
    }
    fetchData();
  }, []);
  const usersById = allUsers.reduce(
    (acc, selectUser) => ({ ...acc, [user.id]: selectUser }),
    {}
  );
  return (
    <div>
      {user.isAdmin ? (
        <>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Shipping Address</th>
                <th>Billing Address</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(
                ({ id, username, name, shippingAddress, billingAddress }) => (
                  <tr key={`user${id}`}>
                    <td>{username}</td>
                    <td>{name}</td>
                    <td>{shippingAddress}</td>
                    <td>{billingAddress || "N/A"}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <h2>Pending Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Username</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {allOrders
                .filter((order) => !order.isActive)
                .map((order) => (
                  <tr key={`order${order.id}`}>
                    <td>{order.id}</td>
                    <td>{usersById[order.userId]?.username || null}</td>
                    <td>{usersById[order.userId]?.shippingAddress || null}</td>
                  </tr>
                ))}
              ;
            </tbody>
          </table>
        </>
      ) : (
        <h2>You are not authorized to view this page :/</h2>
      )}
      ;
    </div>
  );
}

export default AdminDashboard;
