"use client";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseconfig";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [storedProduct, setStoredProduct] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [landmarkError, setLandmarkError] = useState(false);
  const [pincodeError, setPincodeError] = useState(false);

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

    if (name.trim() === "") {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }

    if (email.trim() === "") {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (phone.trim() === "") {
      setPhoneError(true);
      return;
    } else {
      setPhoneError(false);
    }

    if (shipAddress.trim() === "") {
      setAddressError(true);
      return;
    } else {
      setAddressError(false);
    }

    if (landmark.trim() === "") {
      setLandmarkError(true);
      return;
    } else {
      setLandmarkError(false);
    }

    if (pincode.trim() === "") {
      setPincodeError(true);
      return;
    } else {
      setPincodeError(false);
    }

    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          uid: uid,
        }),
      });

      const { order } = await response.json();
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
              storedProducts: storedProduct,
            }),
          });

          const result = await verifypayment.json();
          if (result.success) {
            alert("Payment Successful! Order placed");
            router.push("/");
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
      <div className="flex flex-col items-center pt-4 px-2 sm:px-4">
        <h1 className="text-2xl font-semibold text-center">
          Confirm your Order
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 mt-6 px-2 sm:px-4">
        {/* Checkout item Details section */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {storedProduct.length > 0 &&
            storedProduct.map((product) => (
              <section
                key={product.id}
                className="flex flex-col border-2 rounded-md w-full max-w-full"
              >
                <div className="p-2 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <img
                    src={product.image}
                    width={100}
                    height={100}
                    alt="Product Image"
                    className="rounded-sm"
                  />
                  <div className="flex flex-col w-full justify-between">
                    <p className="font-semibold">{product.description}</p>
                    <div className="flex justify-between sm:justify-end mt-2">
                      <div className="text-right xs:mt-4">
                        <p className="font-semibold">
                          Price: ₹
                          {product.quantity
                            ? product.price * product.quantity
                            : product.price}
                        </p>
                        <p className="text-sm flex items-start">
                          Quantity: {product.quantity || 1}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
        </div>

        {/* Shipping Details & Payment Section */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <section className="flex flex-col border-2 rounded-md w-full">
            <div className="p-4 sm:p-6 w-full flex flex-col items-start">
              <p className="font-bold text-lg mb-2">Shipping Details</p>
              <form className="w-full">
                {/* Name */}
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1 mt-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  className={`${
                    nameError ? "border-red-500 border-2" : ""
                  } w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {nameError && (
                  <p className="text-red-400 text-sm mb-4">
                    Please enter your name.
                  </p>
                )}

                {/* Email */}
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1 mt-4"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
                  className={`${
                    emailError ? "border-red-500 border-2" : ""
                  } w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && (
                  <p className="text-red-400 text-sm mb-4">
                    Please enter your email-Id.
                  </p>
                )}

                {/* Phone */}
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium mb-1 mt-4"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="number"
                  placeholder="Enter Phone Number"
                  className={`${
                    phoneError ? "border-red-500 border-2" : ""
                  } w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {phoneError && (
                  <p className="text-red-400 text-sm mb-4">
                    Please enter your phone number.
                  </p>
                )}

                {/* Address */}
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-1 mt-4"
                >
                  Shipping address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter Address"
                  className={`${
                    addressError ? "border-red-500 border-2" : ""
                  } w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={shipAddress}
                  onChange={(e) => setShipAddress(e.target.value)}
                  required
                />
                {addressError && (
                  <p className="text-red-400 text-sm mb-4">
                    Please enter your shipping address.
                  </p>
                )}

                {/* Landmark */}
                <label
                  htmlFor="streetName"
                  className="block text-sm font-medium mb-1 mt-4"
                >
                  Street name / Landmark
                </label>
                <input
                  id="streetName"
                  type="text"
                  placeholder="Enter Street name / Landmark"
                  className={`${
                    landmarkError ? "border-red-500 border-2" : ""
                  } w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  required
                />
                {landmarkError && (
                  <p className="text-red-400 text-sm mb-4">
                    Please enter your landmark.
                  </p>
                )}

                {/* Pincode */}
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium mb-1 mt-4"
                >
                  Pincode
                </label>
                <input
                  id="pincode"
                  type="number"
                  placeholder="Enter Pincode"
                  className={`${
                    pincodeError ? "border-red-500 border-2" : ""
                  } w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
                {pincodeError && (
                  <p className="text-red-400 text-sm mb-4">
                    Please enter your pincode.
                  </p>
                )}
              </form>
            </div>
          </section>

          {/* Payment Button */}
          <div className="flex justify-center sm:justify-start mb-2">
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold shadow-md transition w-full sm:w-[200px]"
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
