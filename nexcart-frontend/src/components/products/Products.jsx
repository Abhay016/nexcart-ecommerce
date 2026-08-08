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
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
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
          <div className="pb-6 pt-10 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-8 gap-x-8">
            {products &&
              products.map((item, i) => (
                <div
                  key={i}
                  className="transform transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <ProductCard {...item} />
                </div>
              ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center pt-12">
            <Paginations
              numberOfPage={pagination?.totalPages}
              totalProducts={pagination?.totalElements}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
