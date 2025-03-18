"use client";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function BannerImages() {
  const banners = [
    { src: "/fashion-banner.jpg" },
    { src: "/gamming-banner.jpg" },
    { src: "/kitchen-appliances.jpg" },
    { src: "/shoes-banner.jpg" },
    { src: "/laptop-banner-2.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNext() {
    setCurrentIndex((prev) => {
      return prev === banners.length - 1 ? 0 : prev + 1;
    });
  }

  function handlePrev() {
    setCurrentIndex((prev) => {
      return prev === 0 ? banners.length - 1 : prev - 1;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[610px] md:w-auto lg:h-[900px] overflow-hidden p-0 m-0">
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out p-0 m-0 bg-red-100" // Added bg-red-100 for debugging
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <Image
            key={index}
            src={banner.src}
            alt={`Banner Image ${index + 1}`}
            width={1920}
            height={1080}
            quality={100}
            className="w-full h-full object-fill md:object-cover flex-shrink-0 p-0 m-0"
            style={{ width: "100vw" }} // Force full viewport width
          />
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition"
        onClick={handlePrev}
      >
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition"
        onClick={handleNext}
      >
        <ArrowRight className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
}