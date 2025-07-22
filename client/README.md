# 🛒 Frontend - E-Commerce Mini Project

This is the **React.js frontend** for the e-commerce mini project built using **Vite** and styled to resemble modern platforms like Amazon or Flipkart.

---

## 🚀 Features

- User login and registration (connected to Flask backend)
- Product listings and individual product pages
- Add to cart functionality
- Navigation between pages (Home, Shop, Cart)
- Voice search 


---

## 📁 Project Structure

  client/
└── src/
    ├── components/                # Reusable UI components
    │   ├── login.css
    │   ├── login.jsx
    │   ├── navbar.css
    │   ├── navbar.jsx
    │   ├── productcard.css
    │   ├── productcard.jsx
    │   ├── register.css
    │   └── register.jsx
    │
    ├── context/                   # React Context for global state
    │   └── cartcontext.jsx
    │
    ├── nextpages/                 # Main application pages
    │   ├── cart.css
    │   ├── cart.jsx
    │   ├── home.css
    │   ├── home.jsx
    │   ├── shop.css
    │   └── shop.jsx
    │
    ├── app.css                    # Global styles
    ├── app.jsx                    # Root component
    ├── index.css                  # Base styles (usually for resetting/defaults)
    └── main.jsx                   # Entry point of the app
