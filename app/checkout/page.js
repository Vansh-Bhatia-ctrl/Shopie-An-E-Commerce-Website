"use client";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseconfig";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [storedProduct, setStoredProduct] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkoutType = localStorage.getItem("checkoutType");

    if (checkoutType === "buyNow") {
      const products = localStorage.getItem("products");
      if (products) {
        const parsedProducts = JSON.parse(products);
        setStoredProduct(parsedProducts);
        setTotalAmount(parsedProducts[0].price);
      }
    } else if (checkoutType === "cartItems") {
      const cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        const parsedCartItems = JSON.parse(cartItems);
        setStoredProduct(parsedCartItems);
        const total = parsedCartItems.reduce(
          (sum, product) => sum + product.price,
          0
        );
        setTotalAmount(total);
      }
    }
  }, []);

  async function handlePayment() {
    const user = auth.currentUser;
    const uid = user.uid;
    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          uid: uid,
        }),
      });

      const { order}  = await response.json();
      console.log(order);
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Shopie",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          const verifypayment = await fetch("/api/verifypayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              payment_id: response.razorpay_payment_id,
              orderId: order.id,
              uid: uid,
            }),
          });

          const result = await verifypayment.json();
          if (result.success) {
            alert("Payment Successful! Order placed");
          } else {
            alert("Payment failed please contact support");
          }
        },
        prefill: {
          name: "Vansh Bhatia",
          email: "vansh@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center pt-4 pl-4">
        <div className="inline-block">
          <h1 className="text-2xl font-semibold">Confirm your Order</h1>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6 sm:flex sm:flex-row">
        {/*Checkout item Details section */}
        <div className="flex flex-col gap-4 ">
          {storedProduct.length > 0
            ? storedProduct.map((product) => (
                <section
                  key={product.id}
                  className="flex flex-col border-2 w-[600px] rounded-md md:w-[800px]"
                >
                  <div className="p-2 min-h-auto w-[580px] mr-2 ml-2 flex justify-between items-center md:w-[780px]">
                    <img
                      src={product.image}
                      width={100}
                      height={100}
                      alt="Product Image"
                      className="rounded-sm"
                    />
                    <div className="flex flex-col w-full justify-between">
                      <p className="font-semibold ml-2">
                        {product.description}
                      </p>
                      <div className="flex justify-end text-right mt-2">
                        <div>
                          <p className="font-semibold">
                            Price: {"\u20B9"}{" "}
                            {product.quantity
                              ? product.price * product.quantity
                              : product.price}
                          </p>
                          <p className="text-sm">
                            Quantity: {product.quantity ? product.quantity : 1}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))
            : ""}
        </div>

        {/*Shipping details Details section */}
        <div className="flex flex-col gap-4">
          <section className="flex flex-col border-2 w-[600px] rounded-md md:w-[800px]">
            <div className="p-6 w-full flex flex-col items-start">
              <p className="font-bold text-lg mb-2">Shipping Details</p>
              <form className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1 mt-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Address."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1 mt-6"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Enter Address."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1 mt-6"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter Address."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1 mt-6"
                >
                  Shipping address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter Address."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={shipAddress}
                  onChange={(e) => setShipAddress(e.target.value)}
                  required
                />
                <label
                  htmlFor="streetName"
                  className="block text-sm font-medium text-gray-700 mb-1 mt-6"
                >
                  Street name/ Landmark
                </label>
                <input
                  id="streetName"
                  type="text"
                  placeholder="Enter Street name/ Landmark."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  required
                />
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-gray-700 mb-1 mt-6"
                >
                  Pincode
                </label>
                <input
                  id="pincode"
                  type="text"
                  placeholder="Enter Pincode."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
              </form>
            </div>
          </section>

          {/*Payment method section */}

          <div>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black p-2  rounded-lg font-semibold shadow-md transition w-[200px]"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
