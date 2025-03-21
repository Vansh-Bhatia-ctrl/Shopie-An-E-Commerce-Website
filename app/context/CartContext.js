"use client";

import { auth } from "../lib/firebaseconfig";

const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [wishlisted, setWishlisted] = useState(false);
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
        updatedData = prev.map((items) =>
          items.id === item.id
            ? { ...items, quantity: items.quantity - 1 }
            : items
        );
      } else {
        updatedData = prev.filter((cartItems) => cartItems.id !== item.id);
      }

      localStorage.setItem("cart", JSON.stringify(updatedData));
      return updatedData;
    });
  }

  async function addToWishlist(selectedItem) {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be signed in to Wishlist products");
      return;
    }

    try {
      const res = await fetch("/api/addwishlist", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          productName: selectedItem.productName,
          id: selectedItem.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add item to wishlist");
      }
      setWishlist((prev) => {
        const existingItem = prev.find((item) => item.id === selectedItem.id);
        let updatedWishlist;

        updatedWishlist = existingItem
          ? prev.map((item) =>
              item.id === selectedItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prev, { ...selectedItem, quantity: 1 }];

        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        return updatedWishlist;
      });

      setWishlisted(true);
    } catch (error) {
      console.error("Error adding product to wishlist", error.message);
    }
  }

  return (
    <CartContext.Provider
      value={{
        wishlisted,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        addToWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
