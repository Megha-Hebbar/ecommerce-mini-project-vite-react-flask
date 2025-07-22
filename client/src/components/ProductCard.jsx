

import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleBuyNow = () => {
    addToCart(product);
    
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹{product.price}</p>
      <div className="card-buttons">
        <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
        <button className="buy-btn" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
