"use client";
import { Raleway } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const raleway = Raleway({ subsets: ["latin"], weight: ["300", "700"] });

export default function Categories() {
  const categories = [
    {
      title: "Home Appliances",
      route: "homeappliances",
      items: [
        {
          src: "/refrigerator2.jpg",
          alt: "Refrigerator",
          label: "Refrigerator",
          id: "32",
          route: "electronics",
        },
        {
          src: "/toast.jpg",
          alt: "Toaster",
          label: "Toaster",
          id: "39",
          route: "electronics",
        },
        {
          src: "/washing.jpg",
          alt: "Washing Machine",
          label: "Washing Machine",
          id: "31",
          route: "electronics",
        },
        {
          src: "/microw.jpg",
          alt: "Microwave",
          label: "Microwave",
          id: "33",
          route: "electronics",
        },
      ],
    },
    {
      title: "Gaming",
      route: "gaming",
      items: [
        {
          src: "/playstation.jpg",
          alt: "PlayStation 5",
          label: "PlayStation 5",
          id: "41",
          route: "gaming",
        },
        {
          src: "/xbox.jpg",
          alt: "XBox Series X",
          label: "XBox Series X",
          id: "46",
          route: "gaming",
        },
        {
          src: "/nintendoswitch.jpg",
          alt: "Nintendo Switch",
          label: "Nintendo Switch",
          id: "50",
          route: "gaming",
        },
        {
          src: "/xboxseriess.jpg",
          alt: "XBox Series S",
          label: "XBox Series S",
          id: "49",
          route: "gaming",
        },
      ],
    },
    {
      title: "Electronics",
      route: "electronics",
      items: [
        {
          src: "/ac.jpg",
          alt: "Air-Conditioner",
          label: "Air-Conditioner",
          id: "22",
          route: "electronics",
        },
        {
          src: "/laptop.jpg",
          alt: "Laptop",
          label: "Laptop",
          id: "23",
          route: "electronics",
        },
        {
          src: "/iphone.jpg",
          alt: "Smart Phone",
          label: "Smart Phone",
          id: "25",
          route: "electronics",
        },
        {
          src: "/jblHeadphones.jpg",
          alt: "Headphones",
          label: "Headphones",
          id: "27",
          route: "electronics",
        },
      ],
    },
    {
      title: "Clothing",
      route: "clothing",
      items: [
        {
          src: "/jeans.jpg",
          alt: "Jeans",
          label: "Jeans",
          id: "65",
          route: "clothing",
        },
        {
          src: "/formalshirt.jpg",
          alt: "Formal Shirt",
          label: "Formal Shirt",
          id: "64",
          route: "clothing",
        },
        {
          src: "/womentshirt.jpg",
          alt: "Women's Shirt",
          label: "Women's Shirt",
          id: "72",
          route: "clothing",
        },
        {
          src: "/jeggings.jpg",
          alt: "Jeggings",
          label: "Jeggings",
          id: "74",
          route: "clothing",
        },
      ],
    },
    {
      title: "Skin Care",
      route: "skincare",
      items: [
        {
          src: "/micellar_water.jpg",
          alt: "Micellar Water",
          label: "Micellar Water",
          id: "102",
          route: "skincare",
        },
        {
          src: "/vitamin_c_serum.jpg",
          alt: "Vitamin C Serum",
          label: "Vitamin C Serum",
          id: "106",
          route: "skincare",
        },
        {
          src: "/retinol_serum.jpg",
          alt: "Retonil Serum",
          label: "Retonil Serum",
          id: "109",
          route: "skincare",
        },
        {
          src: "/aloe_gel.jpg",
          alt: "Aloe Vera Gel",
          label: "Aloe Vera Gel",
          id: "113",
          route: "skincare",
        },
      ],
    },
  ];

  return (
    <div className="relative">
      <div className="my-3 p-1 mb-[2px] mx-1 md:mx-3 md:mt-8 md:flex md:items-center">
        <p className="font-bold text-orange-500 text-xl md:text-xl lg:text-2xl">
          Choose by category
        </p>
      </div>

      <div className="relative flex items-center overflow-hidden">
        <div className="w-full h-[297px] flex flex-row overflow-x-auto scroll-smooth md:h-[480px] md:w-[1500px] lg:w-[2200px] lg:justify-start no-scrollbar xl:h-[470px]">
          {categories.map((category, index) => (
            <section
              key={index}
              className={`h-[270px] w-[250px] my-3 mx-2 border-2 rounded p-2 md:h-[440px] md:w-[300px] xl:w-[363px] lg:h-[450px] flex-shrink-0 ${
                index === 0 ? "ml-3" : ""
              } xl:h-[430px]`}
            >
              <Link href={`/${category.route}`}>
                <h1
                  className={`text-blue-500 font-bold ${raleway.className} md:text-lg md:p-3 lg:text-xl`}
                >
                  {category.title}
                </h1>
              </Link>

              <div className="grid grid-cols-2 gap-5 sm:gap-4">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-1 flex items-center flex-col md:p-1"
                  >
                    <Link href={`/${item.route}/${item.id}`}>
                      <Image
                        src={item.src}
                        width={270}
                        height={270}
                        alt={item.alt}
                        className="rounded p-0.5 h-[70px] md:w-[270px] md:h-[120px] lg:w-[270px]"
                      />
                    </Link>
                    <p className="text-sm md:text-lg font-semibold text-gray-600">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
