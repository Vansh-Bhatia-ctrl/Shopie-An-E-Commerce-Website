import { Raleway } from "next/font/google";
import Image from "next/image";

const raleway = Raleway({ subsets: ["latin"], weight: ["300", "700"] });

export default function Categories() {
  const categories = [
    {
      title: "Fashion Sale",
      items: [
        { src: "/jackets.jpg", alt: "Jacket", label: "Jackets" },
        { src: "/jean.jpg", alt: "Jeans", label: "Jeans" },
        { src: "/informalshirt.jpg", alt: "Shirts", label: "Shirts" },
        {
          src: "/glasses.jpg",
          alt: "Sunglasses",
          label: "Sunglasses",
        },
      ],
    },
    {
      title: "Gaming",
      items: [
        { src: "/gamingmonitor.jpg", alt: "Gaming monitor", label: "Monitors" },
        { src: "/mouse.jpg", alt: "Gaming mouse", label: "Mouse" },
        {
          src: "/play-station5.jpg",
          alt: "Dual shock controller",
          label: "Controllers",
        },
        {
          src: "/headset.jpg",
          alt: "Gaming headphones",
          label: "Headphones",
        },
      ],
    },
    {
      title: "Formals",
      items: [
        { src: "/shirt.jpg", alt: "Shirt", label: "Shirt" },
        { src: "/pants.jpg", alt: "Pants", label: "Pants" },
        { src: "/formaltshirt.jpg", alt: "T-shirts", label: "T-shirts" },
        { src: "/tie.jpg", alt: "Tie", label: "Tie" },
      ],
    },
    {
      title: "Electronics",
      items: [
        { src: "/mobile.jpg", alt: "Mobile phone", label: "Smart Phones" },
        { src: "/smartwatch.jpg", alt: "Smart watch", label: "Smart watches" },
        { src: "/earpods.jpg", alt: "Earpods", label: "Ear phones" },
        { src: "/tv.jpg", alt: "Television", label: "Televisions" },
      ],
    },
    {
      title: "Home Appliances",
      items: [
        { src: "/fridge.jpg", alt: "Refrigerator", label: "Refrigerators" },
        {
          src: "/washingmachine.jpg",
          alt: "Washing machine",
          label: "Washing machines",
        },
        {
          src: "/coffeemachine.jpg",
          alt: "Coffee machine",
          label: "Coffee machines",
        },
        { src: "/microwave.jpg", alt: "Micro wave", label: "Micro waves" },
      ],
    },
    {
      title: "Readings",
      items: [
        {
          src: "/fiction.jpg",
          alt: "Fictional novel",
          label: "Fictional novels",
        },
        {
          src: "/autobiography.jpg",
          alt: "Autobiography",
          label: "Autobiographies",
        },
        {
          src: "/selfhelp.jpg",
          alt: "Self help book",
          label: "Self-help books",
        },
        { src: "/maths.jpg", alt: "School books", label: "School books" },
      ],
    },
  ];
  return (
    <>
      <div className="my-3 p-1 mb-[2px] mx-1 md:mx-3 md:mt-8 md:flex md:items-center">
        <p className="font-bold text-orange-50 text-xl md:text-xl lg:text-2xl">
          Choose by category
        </p>
      </div>

      <div className="w-[1100px] h-[310px] flex flex-row justify-center md:h-[450px] md:w-[1500px] lg:w-[2200px] lg:justify-center">
        {categories.map((category, index) => (
          <section
            key={index}
            className="bg-white-300 h-[290px] w-[1000px] my-3 mx-1.5 border-2 rounded p-1 md:h-[425px] md:w-[400px] lg:w-[400px] lg:h-[400px]"
          >
            <h1
              className={`text-blue-500 font-bold ${raleway.className} md:text-lg md:p-3 lg:text-xl`}
            >
              {category.title}
            </h1>

            <div className="grid grid-cols-2 gap-5">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-1 flex items-center flex-col md:p-1"
                >
                  <Image
                    src={item.src}
                    width={270}
                    height={270}
                    alt={item.alt}
                    className="rounded p-0.5 h-[70px] md:w-[270px] md:h-[120px] lg:w-[270px]"
                  />
                  <p className="text-sm md:text-lg">{item.label}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
