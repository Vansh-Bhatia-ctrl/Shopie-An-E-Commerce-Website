import Image from "next/image";
import { Playfair_Display, Merriweather } from "next/font/google";
import { db } from "../lib/firebaseAdmin";
import Link from "next/link";
import AddToCart from "../components/AddToCart";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "400" });

const getProducts = async () => {
  const dataSnapshot = await db.collection("clothing").get();
  return dataSnapshot.docs.map((doc) => doc.data());
};

export default async function Clothing() {
  const data = await getProducts();

  return (
    <>
      <div className="flex flex-col items-center pt-4">
        <div className="inline-block border-b-4">
          <h1 className="text-2xl font-semibold">Shop for Clothes</h1>
        </div>
      </div>

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6 md:px-10 lg:px-20 mt-5">
        {data.map((product) => (
          <div
            className={`flex flex-col items-center text-center border-2 rounded-lg p-4 mb-10 transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105 ${playfair.className}`}
            key={product.id}
          >
            <Link href={`/clothing/${product.id}`}>
              <Image
                src={product.image}
                width={300}
                height={300}
                alt="Product image"
                className="rounded-lg w-full xs:h-[140px] sm:h-[180px] md:h-[200px] lg:h-[300px] cursor-pointer"
              />
            </Link>
            <div className="flex-grow">
              <p className="text-sm xs:text-base sm:text-lg font-semibold mt-2">
                {product.name}
              </p>
              <p className="text-xs xs:text-sm text-gold-100">
                By - {product.brand}
              </p>
              <p className="text-xs xs:text-sm text-black">
                {product.description}
              </p>
              <p className="text-base xs:text-lg font-bold text-blue-600 mt-2">
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
