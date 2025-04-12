import AddToCart from "@/app/components/AddToCart";
import BuyNow from "@/app/components/BuyNow";
import Reviews from "@/app/components/Reviews";

import WishList from "@/app/components/WishListIcon";
import { db } from "@/app/lib/firebaseAdmin";
import Image from "next/image";

export async function generateStaticParams() {
  const products = await db.collection("gaming").get();
  return products.docs.map((product) => ({ products: product.id }));
}

export default async function ProductsPage({ params }) {
  const { products } = await params;
  const productsSnapshot = await db.collection("gaming").doc(products).get();
  const product_data = productsSnapshot.data();

  return (
    <>
      <div className="flex flex-col xs:px-2 sm:px-4 md:flex-row w-full min-h-screen">
        <div className="w-full md:w-[700px] p-2 sm:p-4 h-auto mt-2">
          <Image
            src={product_data.image}
            width={700}
            height={700}
            alt="Product image"
            className="rounded-lg w-full h-auto xs:h-[300px] sm:h-[400px] md:h-[500px] object-cover"
          />
        </div>

        {/* Product Info Section */}
        <div className="w-full p-3 sm:p-6 flex flex-col justify-start bg-white">
          <h2 className="text-xl xs:text-2xl font-bold text-gray-800">
            {product_data.name}
          </h2>
          <p className="text-sm xs:text-base text-gray-600">
            By - {product_data.brand}
          </p>
          <p className="text-sm xs:text-md font-semibold text-gray-700 mt-2">
            {product_data.description}
          </p>
          <p className="text-xs xs:text-sm text-gray-600 mt-4 leading-relaxed">
            <strong>Product Description:</strong> {product_data.detailed_desc}
          </p>
          <ul className="text-xs xs:text-sm text-gray-700 mt-4 space-y-1">
            {product_data.key_feat.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p className="text-xl xs:text-2xl font-bold text-red-600 mt-4">
            {"\u20B9"} {product_data.price}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <AddToCart item={product_data} />
            <BuyNow product={product_data} />
            <WishList item={product_data} />
          </div>

          {/* Reviews */}
          <div className="mt-8">
            <div className="border-b-2 border-gray-300 my-6" />
            <Reviews item={product_data} />
          </div>
        </div>
      </div>
    </>
  );
}
