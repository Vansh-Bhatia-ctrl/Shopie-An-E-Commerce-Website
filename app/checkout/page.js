import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function CheckoutPage() {
  return (
    <>
      <div className="flex flex-col items-center pt-4 pl-4">
        <div className="inline-block">
          <h1 className="text-2xl font-semibold">Confirm your Order</h1>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-4">
        <section className="flex flex-col border-2 w-[600px] rounded-md md:w-[800px]">
          <div className="p-2 min-h-auto w-[580px] mr-2 ml-2 flex justify-between items-center md:w-[780px]">
            <Image
              src="/bed.jpg"
              width={100}
              height={100}
              alt="Product Image"
              className="rounded-sm"
            />
            <div className="flex flex-col w-full justify-between">
              <p className="font-semibold ml-2">
                Premium Wooden Bed – Elegant & Sturdy for Ultimate Comfort
              </p>
              <div className="flex justify-end text-right mt-2">
                <div>
                  <p className="font-semibold">Price: {"\u20B9"} 20000</p>
                  <p className="text-sm">Quantity: 1</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col border-2 w-[600px] rounded-md md:w-[800px]">
          <div className="p-6 w-full flex flex-col items-start">
            <p className="font-bold text-lg mb-2">Shipping Details</p>
            <form className="w-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1 mt-2"
              >
                Shipping address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter Address."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1 mt-6"
              >
                Street name/ Landmark
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter Street name/ Landmark."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1 mt-6"
              >
                Pincode
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter Pincode."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </form>
          </div>
        </section>
        
        <section className="flex flex-col border-2 w-[600px] rounded-md md:w-[800px]">
          <div className="p-6 w-full flex flex-col items-start">
            <p className="font-bold text-lg mb-2">Payment Method</p>
            <form className="w-full">
              <label
                htmlFor="Card Number"
                className="block text-sm font-medium text-gray-700 mb-1 mt-2"
              >
                Card Number
              </label>
              <input
                id="Card Number"
                type="text"
                placeholder="0000-0000-0000-0000"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label
                htmlFor="Expiry Date"
                className="block text-sm font-medium text-gray-700 mb-1 mt-6"
              >
                Expiry Date
              </label>
              <input
                id="Expiry Date"
                type="text"
                placeholder="Enter expiry date."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label
                htmlFor="Cvv"
                className="block text-sm font-medium text-gray-700 mb-1 mt-6"
              >
                Cvv 
              </label>
              <input
                id="Cvv"
                type="text"
                placeholder="Enter Cvv."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
