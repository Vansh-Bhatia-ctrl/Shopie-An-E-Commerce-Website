import Categories from "./components/Categories";
import BannerImages from "./components/BannerImages";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <BannerImages />

      <div className="overflow-hidden">
        <Categories />
      </div>

      <Link href="/homeappliances">
      <div className="xs:h-[642px] xs:w-screen w-full h-[572.3px] md:w-full md:h-auto md:object-cover">
        <img
          src="/home-banner.jpg"
          width={782}
          height={370}
          alt="Home appliances banner"
          className="xs:h-full w-[782px] h-full md:w-full md:h-[650px] md:object-cover"
        />
      </div>
      </Link>
    </>
  );
}
