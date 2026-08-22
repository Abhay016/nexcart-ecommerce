import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/actions";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Categories() {
  const dispatch = useDispatch();

  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { categories = [] } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-violet-50 to-rose-50 relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute -top-24 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-sm">
            Shop by Category
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Explore curated collections across every lifestyle
          </p>
          <div className="mt-6 w-28 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Loading / Error states */}
        {isLoading && <p className="text-center text-gray-600">Loading categories...</p>}
        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

        {/* Swiper */}
        {!isLoading && !errorMessage && categories && categories.length > 0 && (
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
            {categories && categories
              .filter((cat) => cat.categoryImage !== null)
              .map((cat) => (
                <SwiperSlide key={cat.categoryName}>
                  <a
                    href={`/products?category=${encodeURIComponent(cat.categoryName)}`}
                    className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2"
                  >
                    {/* Category Image */}
                    <img
                      src={cat.categoryImage}
                      alt={cat.categoryName}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <span className="text-white text-2xl font-semibold tracking-wide drop-shadow-md">
                        {cat.categoryName}
                      </span>
                      <span className="mt-2 text-sm text-gray-200">
                        Discover the latest {cat.categoryName} trends
                      </span>
                      <button className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium rounded-md shadow-md hover:scale-105 transition-transform">
                        Explore {cat.categoryName}
                      </button>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}