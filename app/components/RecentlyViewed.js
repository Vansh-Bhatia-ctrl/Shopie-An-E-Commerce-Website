import { Playfair_Display, Merriweather } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "400" });
const merriweather = Merriweather({ subsets: ["latin"], weight: "400" });

export default function RecentlyViewed() {
  return (
    <div className="ml-4 mt-4 md:my-4 border-2 border-gray-400 rounded-lg w-[270px] p-3 md:mx-4 md:w-[350px] md:p-3 md:border-2 md:border-gray-400 md:rounded-lg">
      <h3
        className={`md:font-bold md:border-b-2 md:my-2 md:text-xl ${merriweather.className}`}
      >
        Recently Viewed
      </h3>
      <div className="w-full border-2 border-gray-400 border-t-0 rounded-lg md:w-full md:border-2 md:border-gray-400 md:border-t-0 md:rounded-md">
        <Image
          src="/watch.jpg"
          width={300}
          height={200}
          alt="Watch image"
          className="rounded-lg md:w-full md:rounded-lg"
        />
        <div className="md:p-2 md:flex md:item-center md:flex-col md:items-center md:w-full">
          <p className={`p-2 ${playfair.className} md:text-xl`}>
            Rolex - Limited edition storm grey color
          </p>
          <p className={`p-2 md:my-3 ${playfair.className} md:text-xl`}>
            {"\u20B9"} 1,00,000
          </p>
        </div>
      </div>

      <div className="w-full border-2 border-gray-400 border-t-0 my-4 rounded-lg md:w-full md:border-2 md:border-gray-400 md:border-t-0 md:my-4 md:rounded-lg">
        <Image
          src="/ps.jpg"
          width={300}
          height={200}
          alt="Watch image"
          className="rounded-lg md:w-full md:rounded-lg"
        />
        <div className="md:p-2 md:flex md:item-center md:flex-col md:items-center md:w-full">
          <p className={`p-2 ${playfair.className} md:text-xl`}>
            Sony Playstation Portal - Black
          </p>
          <p className={`p-2 md:my-3 ${playfair.className} md:text-xl`}>
            {"\u20B9"} 24,599
          </p>
        </div>
      </div>
    </div>
  );
}
