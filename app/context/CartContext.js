"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebaseconfig";

const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      setCartItems(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      async function fetchWishlist() {
        if (!user) return;

        try {
          const res = await fetch(`/api/getwishlist?uid=${user.uid}`);
          if (!res.ok) {
            throw new Error("Failed to fetch wishlisted products");
          }

          const data = await res.json();
          console.log("Fetched wishlists successfully ");
          setWishlist(data);
        } catch (error) {
          console.error("Failed to fetch wishlist", error.message);
        }
      }

      fetchWishlist();
    });

    return () => unsubscribe();
  }, [auth]);

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

  async function toggleWishlist(selectedItem) {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be signed in to Wishlist products");
      return;
    }

    const existingItem = wishlist.find((item) => item.id === selectedItem.id);
    if (existingItem) {
      try {
        const res = await fetch(
          "/api/removewishlist",
          {
            method: "DELETE",
            headers:{'Content-type': 'application/json'},
            body:JSON.stringify({
              id: selectedItem.id,
              uid: user.uid,
              name: selectedItem.productName
            })
          }
        );

        if (!res.ok) {
          throw new Error("Failed to remove item from wishlist");
        }

        const data = await res.json();
        setWishlist((prev) =>
          prev.filter((item) => item.id !== selectedItem.id)
        );
      } catch (error) {
        console.error("Error removing item from wishlist", error.message);
      }
    }

    if (!existingItem) {
      try {
        const resp = await fetch("/api/addwishlist", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            name:selectedItem.productName,
            id: selectedItem.id,
          }),
        });

        if (!resp.ok) {
          throw new Error("Failed to add item to wishlist");
        }

        const data = await resp.json();
        setWishlist((prev) => [...prev, selectedItem]);
      } catch (error) {
        console.error("Error adding item to wishlist", error.message);
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        wishlist,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
