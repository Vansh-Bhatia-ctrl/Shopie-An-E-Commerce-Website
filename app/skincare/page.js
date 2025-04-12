import Image from "next/image";
import { Playfair_Display, Merriweather } from "next/font/google";
import { db } from "../lib/firebaseAdmin";
import Link from "next/link";
import AddToCart from "../components/AddToCart";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "400" });

const getProducts = async () => {
  const dataSnapshot = await db.collection("skincare").get();
  return dataSnapshot.docs.map((doc) => doc.data());
};

export default async function SkinCare() {
  const data = await getProducts();

  return (
    <>
   <div className="flex flex-col items-center pt-4">
        <div className="inline-block border-b-4">
          <h1 className="text-2xl font-semibold">Shop for Skin-Care</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 px-20 mt-5 md:grid md:grid-cols-3 md:gap-4 lg:grid lg:grid-cols-4 lg:gap-4">
        {data.map((product) => (
          <div
            className={`flex flex-col items-center text-center border-2 rounded-lg p-4 mb-10 transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105 ${playfair.className}`}
            key={product.id}
          >
            <Link href={`/skincare/${product.id}`}>
              <Image
                src={product.image}
                width={300}
                height={300}
                alt="Product image"
                className="rounded-lg md:w-full md:h-[150px] lg:w-full lg:h-[300px] cursor-pointer xl:w-[400px]"
              />
            </Link>
            <div className="flex-grow">
              <p className="text-lg font-semibold mt-2">
                {product.name}
              </p>
              <p className="text-gold-100">By - {product.brand}</p>
              <p className="text-sm text-black">{product.description}</p>
              <p className="text-xl font-bold text-blue-600 mt-2">
                {"\u20B9"} {product.price}
              </p>
            </div>
            <AddToCart item={product} />
          </div>
        ))}
      </div>
    </>
  );
}
