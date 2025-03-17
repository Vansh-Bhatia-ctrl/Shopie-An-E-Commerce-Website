import Image from "next/image";
import RecentlyViewed from "./components/RecentlyViewed";
import Categories from "./components/Categories";

export default function Home() {
  return (
    <>
      <div className="w-full h-auto md:w-full md:h-auto md:object-cover">
        <Image
          src="/fashion-banner.jpg"
          alt="Banner Image"
          width={1920}
          height={1080}
          quality={100}
          className="md:w-full"
        />
      </div>

      <div className="overflow-hidden">
        <Categories />
      </div>

      <div className="w-full h-auto md:w-full md:h-auto md:object-cover">
        <Image
          src="/home-banner.jpg"
          width={782}
          height={370}
          alt="Home appliances banner"
          className="w-[782px] h-[370px] md:w-full md:h-[650px] md:object-cover"
        />
      </div>

      <section className="md:flex md:flex-row md:gap-4">
        <RecentlyViewed />
      </section>
    </>
  );
}
