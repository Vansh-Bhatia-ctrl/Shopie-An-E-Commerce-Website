import Categories from "./components/Categories";
import BannerImages from "./components/BannerImages";

export default function Home() {
  return (
    <>
      <BannerImages />

      <div className="overflow-hidden">
        <Categories />
      </div>

      <div className="w-full h-[479px] md:w-full md:h-auto md:object-cover">
        <img
          src="/home-banner.jpg"
          width={782}
          height={370}
          alt="Home appliances banner"
          className="w-[782px] h-full md:w-full md:h-[650px] md:object-cover"
        />
      </div>

    
    </>
  );
}
