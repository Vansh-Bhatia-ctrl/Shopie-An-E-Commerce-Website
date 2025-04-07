import AddToCart from "@/app/components/AddToCart";
import BuyNow from "@/app/components/BuyNow";
import Reviews from "@/app/components/Reviews";
import WishList from "@/app/components/WishListIcon";
import { db } from "@/app/lib/firebaseAdmin";
import Image from "next/image";

export async function generateStaticParams() {
  const products = await db.collection("products").get();
  return products.docs.map((product) => ({ products: product.id }));
}

export default async function ProductsPage({ params }) {
  const { products } = await params;
  const productsSnapshot = await db.collection("products").doc(products).get();
  const product_data = productsSnapshot.data();

  return (
    <>
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        <div className="w-full md:w-[1000px] p-4">
          <Image
            src={product_data.imageURL}
            width={1000}
            height={1000}
            alt="Product image"
            className="rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col justify-start bg-white">
          <h2 className="text-2xl font-bold text-gray-800">
            {product_data.productName}
          </h2>
          <p className="text-gray-600 text-lg">By - {product_data.brand}</p>
          <p className="text-md font-semibold text-gray-700 mt-2">
            {product_data.description}
          </p>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            <strong>Product Description:</strong> {product_data.detailed_desc}
          </p>
          <ul className="text-sm text-gray-700 mt-4 space-y-1">
            {product_data.key_feat.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p className="text-2xl font-bold text-red-600 mt-4">
            {"\u20B9"} {product_data.price}
          </p>

          <div className="flex gap-4 mt-6">
            <AddToCart item={product_data} />
            {/*Client component as it required interactivity*/}
            <BuyNow product={product_data} />
            <WishList item={product_data} />
          </div>
        </div>
      </div>

      <div className="px-4">
  <div className="border-b-2 border-gray-300 mx-4 my-6" />
  <Reviews item={product_data} />
</div>
    </>
  );
}
