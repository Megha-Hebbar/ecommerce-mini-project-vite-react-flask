




import React, { useState, useEffect } from "react";
import "./Shop.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// Voice search setup
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1299,
    image:  "https://blaupunktaudio.in/cdn/shop/products/bh31-bluetooth-wireless-headphone-black-blaupunkt-india-1.png?v=1711006562"  ,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1999,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT28yGTu3G_1iHjZ1LZVXnhi8cxMKwIDspbItUS8qvUvAeEyYB0e3f1mdA7S03hjKEV3j6NIae_5y6L_pcOXRMpWzavMQD4UUICcVla3g51oSy28ndK9GWWYbHUv8Nby8_91U72l0hlIg&usqp=CAc",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 1499,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTsUYvqvbRZ2P2LChuQ6tBFMetlX_2x4MFSRyb5CTxBzThFuY9tGAM2tktB7creKejH8lnk2zAHO8mzq-TgDczphs34i41g9Vz2UeGgoiJJfKoTEAYQgWgBK84Hqi2CiMzqGeaM5UAVXkI&usqp=CAc",
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 899,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTX15_GSAIn5gYIn8eG2T_fC2d0BfIry1e9p3Dqy8xezuaNpahomBQg1ZHVmiTy2zJPBW1dDhng_l2mC6WdUigq77wgxIQg1MEsKBS1FKYqrxP_0etHsbxq1RgvtCmPxahu91M1X3QzOQ&usqp=CAc",
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 599,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTFR_1dfUdZcnpZJLuK4mqI1TwAxeKzzIVDqDxDdbiRKaE1IPVagVOZbvieD-iTOJ1vh5KoFPnZgvMP9xiYwLXZIWvNK66uzTxdXPw53K1COLAJffxj2lxxCKHbPsYzb0i59BX8iI87-g&usqp=CAc",
  },
  {
    id: 6,
    name: "Gaming Mouse",
    price: 1099,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSb5L73apsZg4dpNTutNdbt9nNvufd5ElPbFRdLFNPoJy6FKtkBPzD1G4nNrKN9762emWGgyGif3vkBxLCzzfZPyz8-3U3E3RTf_CGnDNw-UIV8SlLNV07E",
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    price: 2199,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTUsuhtOJAH0fwv8hT3i_AQVlxdqwC1u8R-Z9il_Nts95VfcdT0uOnmewX_TULkHCBNfxLyRuqN8EVtRhk6A65XbYSBBtUDXfyFC77cS6_l9WzgUH8BWKW7wA&usqp=CAc",
  },
  {
    id: 8,
    name: "LED Desk Lamp",
    price: 499,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTj0lB-QJkI9qcxFwx42CcqS2oYFe022eM7mOLppAQAqHZS01D47iVlOZ3WCSHHvImqE4glb-5FXtw-zUTLy2mus7gXDMdpO-txhNEEsqaz9svHVuFZuJE0x08zV9GIRQ&usqp=CAc",
  },
  {
    id: 9,
    name: "Phone Tripod",
    price: 399,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT65mpYIlx5CFT_wOl2CGF-R9-GlsN2DuagyCLKOfZeM9swU4477EmAGYl_kx_UWiukSi9dDrpflu2wtMOUE8povCyCUw0e3WReZT_fsj8qOJR8n64vLDicaW4zVF9I6eWCSSnC-BU&usqp=CAc",
  },
  {
    id: 10,
    name: "Power Bank",
    price: 1299,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSsrIB92xCVVglFJCuUPPnHXqEjYFzLU-3mChMUSLYdZVv7R20KumNRFZ2nycEPMBeb-fGpeOU2FrePdDJLoWC6uzeN85sf0OTGB5Plds3IMT9ec8Wt0prcOIfwwQ5JkaYFZIxYMfShpYc&usqp=CAc",
  },
  {
    id: 11,
    name: "Portable SSD",
    price: 3499,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSyjGAvIG9Um5useyPgVf239it19U8sTrXHYKI51VhpAyvZZeQ4cVlVfdR4StSZhM7MDiWNkJVAiByedTDeaiFEt9u4Zkcxf2yn0AY6d8T4P2G8upEFKFSbXQ",
  },
  {
    id: 12,
    name: "Wireless Charger",
    price: 799,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTYqRds13GkSEUhHxN_BW_f0amPPqOtu2r1yTOfpMaqn-IMBiPVrVemKJHJxzdLmSExkk5aeOdajrZ5u0jQNKkgLYXSg3lO5bbH2QFIYaizaCiJakPAAuKX",
  },
  {
    id: 13,
    name: "Fitness Tracker",
    price: 1799,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTLBydc1Bd4-GDNtLwqnznDjdzmCFz9G9MxmPQ0fDxb8b3bS4CWHBt6gfVEkKZ7ieehY5c6mdGIS4L06EWYElAagIZjTrKqhnif7mDKe9qjdNUN-v2bzu9UzbLMtP52Jw-9yrGv-pJ3kpE&usqp=CAc",
  },
  {
    id: 14,
    name: "Bluetooth Earbuds",
    price: 1599,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTL3r8dpr1w4DT5RbviCpj7LYiJS9Rgwp0icGVTQDWCYhAL5ETp1vYICnctJtzPrLLOfBkAVZ5V6gIFL9BM5jG6r5GOT14pnneDS6hx-4ia-Y7dOmqr_TM9",
  },
  {
    id: 15,
    name: "Smart Bulb",
    price: 299,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRpLh89R0m7A7D5Gc_AuFWWeHxR-j1LwI8Osdn7OUYd8-tN1hrFx8G95Qc7SJ2uFkkv6KTsAx1FpCvwf6NxnR-1-Foe4I0hZAbEKL1DtnaltqBIV8MOZcAy-A",
  },
  {
    id: 16,
    name: "Mini Projector",
    price: 4899,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTgxnHeGIFLlS0kN9dA48D5VxAXMiJP5IpTE6iC9ajLYodsMaKnaAsTJ0-luMBAXlFCQy7YKP6efeoq_ym5vnI81Z0IVolS5fCfKOJGV4en",
  },
  {
    id: 17,
    name: "Tablet Stand",
    price: 499,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSnMBqD_1ClUArwR7_HXjYd-tzTFMT224-IiXic0IwZW5ZaVyYxdZnlqFMM8f2ttHAlZyCi_A9ruZAFBC3xzj5XG9N2BzR_wYpqvA2QwjdEpdKEHZ-bnGqYPbQFcoeS--p92-Nex0iyuDUk&usqp=CAc",
  },
  {
    id: 18,
    name: "Gaming Chair",
    price: 7499,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTkwDhRuao2Xex26YdBBWlaQ_pdlNXshYVGgU5D6AQbamdV3-X_wiHRseCxree-25Kd_b5OGQhT3ZVyesdAXDgs5VhfjTajCeL0xk_k7eI1g9kgvU_Vhi7d8Q&usqp=CAc",
  },
  {
    id: 19,
    name: "VR Headset",
    price: 5999,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRa1lvEI1TA5nRJdsTPbmq59ezsHJ4OEpxZRa7WauAXYZfHKWlr1vm-qLEksiqgulMcKFP0Cu09rHIYZZLT3RzCgElZXt4wBlwG5vjy4H8Yi8UWMJvnpKuEeA",
  },
  {
    id: 20,
    name: "Webcam",
    price: 999,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRfdRRQAON1pz6Th9yz9wF3q4XFE4LQol_-X4qys3Xucx_luOuuWU89TRT--AA7PeVfsAH6MIikNqVJSYairLTK-buT3jhrMBKvEUQiuTs-b9FKf02MWgUQDQ",
  },
];



const Shop = () => {
  const { addToCart, isLoggedIn } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const handleBuyNow = (product) => {
    if (!isLoggedIn) {
      alert("Please login to continue.");
      navigate("/login");
    } else {
      alert(`Thanks for buying ${product.name}!`);
    }
  };

  const handleVoiceSearch = () => {
    if (!recognition) {
      alert("Your browser does not support voice search.");
      return;
    }

    recognition.start();

    recognition.onresult = (event) => {
      const voiceQuery = event.results[0][0].transcript;
      setSearchQuery(voiceQuery);
    };

    recognition.onerror = (event) => {
      alert("Voice recognition failed, please try again.");
      console.error(event.error);
    };
  };

  return (
    <div className="shop-container">
      <h2>Shop Products</h2>

      {/* Search bar and mic */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleVoiceSearch} className="mic-button">🎤</button>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="shop-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button className="buy-now" onClick={() => handleBuyNow(product)}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
