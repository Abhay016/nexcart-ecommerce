import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "../shared/ProductCard";
import { fetchProducts } from "../../store/actions";

export default function FeaturedProducts() {
  const dispatch = useDispatch();

  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
          <div className="mt-6 w-28 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Loading / Error states */}
        {isLoading && <p className="text-center text-gray-600">Loading products...</p>}
        {errorMessage && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Swiper */}
        {!isLoading && !errorMessage && products?.length > 0 && (
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
            {products
              .filter((product) => product.featured) 
              .map((product) => (
                <SwiperSlide key={product.productId}>
                  <div className="transition-transform duration-300 hover:scale-105">
                    <ProductCard {...product} />
                  </div>
                </SwiperSlide>
              ))}

          </Swiper>
        )}

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-block px-8 py-3 rounded-md bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
