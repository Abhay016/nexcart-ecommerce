import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";

const Products = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products, categories, pagination } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-rose-50 min-h-screen overflow-hidden">
      {/* Decorative blurred accents */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="lg:px-14 sm:px-8 px-4 relative z-10 2xl:w-[90%] 2xl:mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Our Products
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of premium items designed to bring innovation, style, and convenience to your everyday life.
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-indigo-400 to-rose-400 mx-auto rounded-full"></div>
        </div>

        {/* Filter Section */}
        <div className="mb-10">
          <Filter categories={categories ? categories : []} />
        </div>

        {/* Loader / Error / Products */}
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <div className="flex justify-center items-center h-[200px] bg-red-50 rounded-lg shadow-md">
            <FaExclamationTriangle className="text-red-600 text-3xl mr-2" />
            <span className="text-red-700 text-lg font-medium">{errorMessage}</span>
          </div>
        ) : (
          <div className="min-h-[700px]">
            {/* Products Grid */}
            <div className="pb-6 pt-10 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-10 gap-x-10">
              {products &&
                products.map((item, i) => (
                  <div
                    key={i}
                    className="transform transition duration-300 hover:scale-105 hover:shadow-xl rounded-xl"
                  >
                    <ProductCard {...item} />
                  </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center pt-14">
              <Paginations
                numberOfPage={pagination?.totalPages}
                totalProducts={pagination?.totalElements}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
