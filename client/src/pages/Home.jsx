


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Home.css";
const Home = () => {
  const { cartItems } = useCart(); 
  const [showReminder, setShowReminder] = useState(false);
 useEffect(() => {
    if (cartItems.length > 0) {
      setShowReminder(true);
    } else {
      setShowReminder(false);
    }
  }, [cartItems]); 

  return (
    <div className="home-page">
      {showReminder && (
        <div className="reminder-popup">
          🛒 You have {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your cart!
        </div>
      )}

      <h1>Welcome to Your Mini E-Commerce Store!</h1>
      <p>
        Discover amazing products, add them to your cart, and experience a smooth shopping flow.
      </p>

      <div className="home-buttons">
        <Link to="/shop">Start Shopping</Link>
        <Link to="/cart">Go to Cart</Link>
      </div>
    </div>
  );
};

export default Home;

