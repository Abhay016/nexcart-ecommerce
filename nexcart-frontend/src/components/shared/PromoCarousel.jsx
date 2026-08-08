import { useState, useEffect } from "react";

const messages = [
  "🎉 Upcoming Sale: Flat 50% Off on Electronics",
  "🚀 Great Offers on Fashion & Accessories",
  "⭐ Featured Product: SmartWatch Pro at Best Price",
  "🔥 Limited Time Deal: Buy 1 Get 1 Free on Shoes",
];

const PromoCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-16 left-0 w-full bg-gray-100 text-blue-600 text-sm md:text-base font-medium py-2 px-4 text-center shadow z-50">
      <span className="transition-opacity duration-500 ease-in-out">
        {messages[index]}
      </span>
    </div>
  );
};

export default PromoCarousel;
