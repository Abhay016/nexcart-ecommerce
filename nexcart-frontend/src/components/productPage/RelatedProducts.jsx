import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../shared/ProductCard";
import { fetchRelatedProducts } from "../../store/actions";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function RelatedProducts({ categoryName, productId }) {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { relatedProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (categoryName && (!relatedProducts || relatedProducts.length === 0)) {
      dispatch(fetchRelatedProducts(categoryName));
    }
  }, [categoryName, dispatch, relatedProducts]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-20 relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          You May Also Like
        </h2>
        <a
          href="/products"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View All
        </a>
      </div>

      {/* Loading/Error States */}
      {isLoading && (
        <p className="text-gray-500 italic animate-pulse">Loading related products...</p>
      )}
      {errorMessage && (
        <p className="text-red-600 font-medium">Error: {errorMessage}</p>
      )}

      {/* Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition z-10"
        >
          <FaChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {relatedProducts?.map(
            (product) =>
              product.productId !== productId && (
                <div
                  key={product.productId}
                  className="w-[380px] flex-shrink-0 transform hover:-translate-y-1 transition-transform duration-200"
                >
                  <ProductCard {...product} />
                </div>
              )
          )}
        </div>


        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition z-10"
        >
          <FaChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </section>
  );
}

export default RelatedProducts;
