import RecentlyViewed from "./components/RecentlyViewed";
import Categories from "./components/Categories";
import BannerImages from "./components/BannerImages";

export default function Home() {
  return (
    <>
    <BannerImages />

      <div className="overflow-hidden">
        <Categories />
      </div>

      <div className="w-full h-auto md:w-full md:h-auto md:object-cover">
        <img
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
