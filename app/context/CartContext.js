"use client";
const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      setCartItems(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(item) {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      let updatedData;
      if (existingItem) {
        updatedData = prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedData = [...prev, { ...item, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedData));
      return updatedData;
    });
  }

  function removeFromCart(item) {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (!existingItem) {
        return prev;
      }

      let updatedData;
      if (existingItem.quantity > 1) {
        updatedData = prev.map((item) =>
          item.id === item.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        updatedData = prev.filter((item) => item.id !== item.id);
      }

      localStorage.setItem("cart", JSON.stringify(updatedData));
      return updatedData;
    });
  }

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}