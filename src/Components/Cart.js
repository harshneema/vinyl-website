import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Cart.css';
import Navbar from './Navbar';
import BottomBar from './BottomBar'

function Cart() {
  const [displayName, setDisplayName] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the uid from localStorage
    const uid = localStorage.getItem('uid');

    const fetchDisplayName = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/getDisplayName?uid=${uid}`);
        if (response.status === 200) {
          setDisplayName(response.data.displayName);
        }
      } catch (error) {
        setError('Failed to fetch display name');
      }
    };

    // Fetch the user's orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/getOrders?uid=${uid}`);
        if (response.status === 200) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        setError('Failed to fetch orders');
      }
    };

    fetchDisplayName();
    fetchOrders();
  }, []);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    orders.forEach((order) => {
      totalPrice += order.price * order.count;
    });
    return totalPrice.toFixed(2); 
  };

  // Frontend Code

const updateOrderCount = async (orderId, newCount) => {
    // Send a request update the order count
    try {
      const uid = localStorage.getItem('uid'); // Get the user's UID from localStorage
      const response = await axios.put(`http://localhost:5001/updateOrderCount`, {
        uid: uid,
        orderId: orderId,
        newCount: newCount,
      });
  
      if (response.status === 200) {
        // The update was successful
        const updatedUser = response.data; // Updated user data from the server
        setOrders(updatedUser.orders); 
      } else {
        // Handle error here
        console.error('Failed to update order count');
      }
    } catch (error) {
      console.error('Error updating order count:', error);
    }
  };

    // Function to handle card deletion
  

  const handleIncrement = (order) => {
    const updatedOrders = [...orders];
  
    // Find the index of the order to update
    const index = updatedOrders.findIndex((o) => o.id === order.id);
  
    // Increment the count of the order at the found index
    if (index !== -1) {
      updatedOrders[index].count += 1;
  
      // Send a request to update the order count on the server
      updateOrderCount(updatedOrders[index].id, updatedOrders[index].count);
  
      // Update the state with the modified orders array
      setOrders(updatedOrders);
    }
  };
  
  const handleDecrement = async (order) => {

    const updatedOrders = [...orders];

    const index = updatedOrders.findIndex((o) => o.id === order.id);
  
    // Check if the count is 1 and handle card deletion
    if (index !== -1 && updatedOrders[index].count === 1) {
      // Remove the order from the local state
      updatedOrders.splice(index, 1);
  

      await deleteOrder(order.id);
  

      setOrders(updatedOrders);
    } else {
      
      if (index !== -1 && updatedOrders[index].count > 1) {
        updatedOrders[index].count -= 1;
  
        // Send a request to update the order count on the server (optional)
        updateOrderCount(updatedOrders[index].id, updatedOrders[index].count);
  
        // Update the state with the modified orders array
        setOrders(updatedOrders);
      }
    }
  };
  const handlePlaceOrder = () => {

    alert('Order placed successfully!'); // Example alert
    // Clear the cart or perform other necessary actions
    setOrders([]);
  };

  const deleteOrder = async (orderId) => {
    try {
      const uid = localStorage.getItem('uid'); // Get the user's UID from localStorage
      const response = await axios.delete(`http://localhost:5001/deleteOrder`, {
        data: {
          uid: uid,
          orderId: orderId,
        },
      });
  
      if (response.status === 200) {
        // The order was successfully deleted
        console.log('Order deleted:', response.data);
  
  
      } else {
        // Handle error here
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  
  

  return (
<div className="cart-container-parent">
  <Navbar />
  <div className="cart-container">
    <h2 className="cart-header">Your Cart</h2>
    <div className="user-details">
      <h3>Welcome, {displayName}</h3>
    </div>
    {orders.length > 0 ? (
      <ul className="user-orders">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <img src={order.coverImage} alt={order.title} />
            <div className="order-item-flex">
            <div className="order-item-details">
              <h4>{order.title}</h4>
              <p>Price: ${order.price.toFixed(2)}</p>
              <p>Title: {order.Title}</p> {/* Add the title here */}
            </div>
            <div className="order-item-controls">
              <button onClick={() => handleDecrement(order)}>-</button>
              <p className="order-item-price">Quantity: {order.count}</p>
              <button onClick={() => handleIncrement(order)}>+</button>
            </div>
            </div>
          </li>
        ))}
      </ul>
      
    ) : (
      <p>Your cart is empty.</p>
    )}
     <div className="total-price">
              <p>Total Price: ${calculateTotalPrice()}</p>
      </div>
      <button className="place-order-button" onClick={handlePlaceOrder}>
              Place Order
            </button>
    {error && <p className="error-message">{error}</p>}
  </div>
  <BottomBar/>
</div>
  );
}

export default Cart;
