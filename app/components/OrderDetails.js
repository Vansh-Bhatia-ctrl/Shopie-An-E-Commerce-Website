"use client";
import { useState } from "react";
import CancelOrder from "./CancelOrder";

export default function OrderDetails({ initialOrder }) {
  const [orders, setOrder] = useState(initialOrder);

  function handleCancelOrder(id) {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrder(updatedOrders);
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10 font-semibold text-gray-700">
        No orders to show.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6 sm:flex sm:flex-row">
      {orders.map((order) => (
        <div key={order.id} className="flex flex-col gap-4 md:mt-2">
          <section className="flex flex-col border-2 w-[600px]  rounded-md md:w-[750px]">
            <div>
              <div className="p-4">
                <img
                  src={order.image}
                  width={300}
                  height={300}
                  className="rounded-md"
                />
              </div>
              <div className="p-2 flex flex-col gap-1">
                <p className="font-bold ml-2 text-2xl">{order.name}</p>
                <p className="font-semibold ml-2 text-omd text-gray-600">
                  {order.description}
                </p>
                <p className="font-medium ml-2 text-o2md text-gray-600">
                  Quantity: {order.quantity}
                </p>
                <p className="font-semibold ml-2 text-o2md">
                  Price: {"\u20B9"} {order.price * order.quantity}
                </p>
              </div>
            </div>

            <CancelOrder product={order} onCancel={handleCancelOrder} />
          </section>
        </div>
      ))}
    </div>
  );
}
