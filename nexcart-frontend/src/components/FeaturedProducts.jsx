import ProductCard from "./shared/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const products = [
  {
    productId: 1,
    productName: "Smart Watch",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    description: "Feature-packed smartwatch with heart rate monitor, GPS, and customizable watch faces.",
    quantity: 25,
    price: 249.0,
    discount: 20,
    specialPrice: 199.0,
    about: false,
  },
  {
    productId: 2,
    productName: "Wireless Earbuds",
    image: "https://images.unsplash.com/photo-1585386959984-a415522bde5f",
    description: "Noise-cancelling wireless earbuds with 24-hour battery life and fast charging case.",
    quantity: 50,
    price: 129.0,
    discount: 23,
    specialPrice: 99.0,
    about: false,
  },
  {
    productId: 3,
    productName: "Sneakers",
    image: "https://images.unsplash.com/photo-1600180758895-3c7d3a3d8f5d",
    description: "Lightweight sneakers designed for comfort and durability, perfect for everyday wear.",
    quantity: 40,
    price: 159.0,
    discount: 19,
    specialPrice: 129.0,
    about: false,
  },
  {
    productId: 4,
    productName: "Bluetooth Speaker",
    image: "https://images.unsplash.com/photo-1585386959984-3c7d3a3d8f5d",
    description: "Portable Bluetooth speaker with deep bass, waterproof design, and 12-hour playtime.",
    quantity: 60,
    price: 99.0,
    discount: 10,
    specialPrice: 89.0,
    about: false,
  },
  {
    productId: 5,
    productName: "Gaming Mouse",
    image: "https://images.unsplash.com/photo-1616627455126-3f8a3d8f5d",
    description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
    quantity: 80,
    price: 59.0,
    discount: 15,
    specialPrice: 49.0,
    about: false,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-violet-50 to-rose-50 relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-sm">
            Featured Products
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Handpicked items curated just for you
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-indigo-400 to-rose-400 mx-auto rounded-full"></div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.productId}>
              <div className="transition-transform duration-300 hover:scale-105">
                <ProductCard {...product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-block px-6 py-3 rounded-md bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
