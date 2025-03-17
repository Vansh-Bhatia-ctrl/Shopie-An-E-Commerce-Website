"use client";
import Image from "next/image";
import ProceedToBuy from "../components/ProceedToBuy";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center pt-4">
        <div className="inline-block border-b-4">
          <h1 className="text-2xl font-semibold">Cart</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center gap-4 mt-3 mb-20">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="w-[90%] max-w-[800px] border-2 flex flex-col gap-4 p-3 rounded-lg mx-auto md:w-[90%] md:max-w-[2000px] md:flex-row md:items-center"
            >
              <Image
                src={item.imageURL}
                width={200}
                height={200}
                alt="Product image"
                className="rounded-md"
              />

              <div className="flex flex-col flex-1 md:ml-auto">
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.productName}
                </h2>
                <p className="text-md font-semibold text-gray-700 mt-2">
                  {item.description}
                </p>
                <p className="text-cmd font-bold text-red-600 mt-4">
                  {"\u20B9"}
                  {item.price}
                </p>

                <div className="flex items-center gap-2 mt-4 md:justify-end">
                  <button
                    className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full bg-gray-200 text-lg font-semibold hover:bg-gray-300 active:scale-90 transition"
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </button>

                  <p className="text-lg font-medium w-6 text-center">
                    {item.quantity}
                  </p>

                  <button
                    className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full bg-gray-200 text-lg font-semibold hover:bg-gray-300 active:scale-90 transition"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-lg font-semibold">
            No items in the cart.
          </p>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="w-full bg-white border-t bg-white-100 border-gray-300 flex justify-end py-3 px-4 mt-auto fixed bottom-0 left-0 right-0">
          <ProceedToBuy />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
