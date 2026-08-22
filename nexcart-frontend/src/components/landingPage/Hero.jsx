import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const slides = [
  {
    id: 1,
    title: "Exclusive Fashion Deals",
    subtitle: "Up to 50% off on top brands",
    badge: "🔥 Hot Deal",
    image: "https://cdn.scenesku.com/resources/mens_fashion_hero_banner_business_style.webp?w=1500",
    cta: { text: "Shop Fashion", link: "/products?category=fashion" },
  },
  {
    id: 2,
    title: "Latest Electronics",
    subtitle: "Smartphones, laptops & more",
    badge: "⚡ Limited Time",
    image: "https://cdn.scenesku.com/resources/holiday_specials_hero_banner_tech_and_gifts.webp?w=1500",
    cta: { text: "Shop Electronics", link: "/products?category=electronics" },
  },
  {
    id: 3,
    title: "Home & Living Essentials",
    subtitle: "Make your home cozy & stylish",
    badge: "🏠 New Arrival",
    image: "https://cdn.scenesku.com/resources/furniture_hero_banner_modern_living_room.webp?w=1500",
    cta: { text: "Shop Home", link: "/products?category=Home+%26+Living" },
  },
  {
    id: 4,
    title: "Beauty & Skincare",
    subtitle: "Luxury products for radiant skin",
    badge: "✨ Trending",
    image: "https://cdn.scenesku.com/resources/beauty_skincare_hero_banner_floral_luxury.webp?w=1500",
    cta: { text: "Shop Beauty", link: "/products?category=beauty" },
  },
  {
    id: 5,
    title: "Sports & Fitness",
    subtitle: "Gear up for your active lifestyle",
    badge: "🏋️ Best Seller",
    image: "https://cdn.scenesku.com/resources/sports_fitness_hero_banner_gym_essentials.webp?w=1500",
    cta: { text: "Shop Sports", link: "/products?category=sports" },
  },
  {
    id: 6,
    title: "Food & Beverages",
    subtitle: "Delicious treats and refreshing drinks",
    badge: "🍔 Fresh Picks",
    image: "https://cdn.scenesku.com/resources/grocery_food_hero_banner_fresh_market.webp?w=1500",
    cta: { text: "Shop Food & Beverages", link: "/products?category=food+%26+Beverages" },
  },
  {
    id: 7,
    title: "Women's Accessories",
    subtitle: "Stylish accessories for every occasion",
    badge: "💎 Exclusive",
    image: "https://cdn.scenesku.com/resources/fashion_store_hero_banner_womens_accessories.webp?w=1400",
    cta: { text: "Shop Accessories", link: "/products?category=accessories" },
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Swipe support
  let startX = 0;
  const handleTouchStart = (e) => (startX = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    if (endX - startX > 50) prevSlide();
  };

  return (
    <section
      className="relative w-full h-[600px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
            }`}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4c4740]/90 via-[#4c4740]/70 to-transparent" />

          {/* Content */}
          <div className="relative z-20 flex flex-col justify-center h-full px-8 md:px-20 text-[#fdfdfd] space-y-6">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-[#d4af37] to-[#f5e6a2] text-[#2c2c2c] font-semibold rounded-full shadow-md w-fit text-sm">
              {slide.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200">{slide.subtitle}</p>
            <a
              href={slide.cta.link}
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#fdfdfd] font-semibold rounded-md shadow-lg hover:scale-105 hover:shadow-2xl transition-transform w-fit"
            >
              {slide.cta.text}
            </a>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-[#564f45] text-black p-2 rounded-full shadow-md hover:bg-gray-500 transition z-20"
      >
        <AiOutlineArrowLeft className="text-xl" /> {/* smaller icon */}
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-[#564f45] text-black p-2 rounded-full shadow-md hover:bg-gray-500 transition z-20"
      >
        <AiOutlineArrowRight className="text-xl" /> {/* smaller icon */}
      </button>


      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-4 h-4 rounded-full transition ${idx === current
                ? "bg-gradient-to-r from-[#6b7280] to-[#b8860b] shadow-lg scale-110" // gold/bronze gradient for active
                : "bg-[#6b7280]" // dark gray for inactive
              }`}
          />
        ))}
      </div>

    </section>
  );
}
