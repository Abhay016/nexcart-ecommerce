import { FaShoppingCart, FaBolt, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

function ProductActions({ product }) {
  const {
    productId,
    productName,
    description,
    price,
    discount,
    active,
    quantity,
    image,
    specialPrice,
    brand,
    rating,
    reviewCount,
  } = product;

  const isAvailable = active && Number(quantity) > 0;

  const dispatch = useDispatch();

  const addToCartHandler = (cartItems) => {
    dispatch(addToCart(cartItems, 1, toast));
  };

  const handleBuyNow = () => {
    toast.success("Proceeding to checkout...");
  };

  const handleWishlist = () => {
    toast.success("Added to wishlist!");
  };

  return (
    <div className="space-y-6">
      {/* Wishlist Button */}
      <div>
        <button
          onClick={handleWishlist}
          aria-label="Add to Wishlist"
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium shadow-sm hover:from-rose-100 hover:to-rose-200 hover:text-rose-600 transition-all duration-300"
        >
          <FaHeart className="text-rose-500 transition-transform group-hover:scale-110" />
          Add to Wishlist
        </button>
      </div>

      {/* Main Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Add to Cart */}
        <button
          disabled={!isAvailable}
          onClick={(e) => {
            e.stopPropagation();
            addToCartHandler({
              image,
              productName,
              description,
              specialPrice: specialPrice ?? price ?? 0,
              price: price ?? 0,
              productId,
              quantity: quantity ?? 0,
              brand: brand ?? "",
              rating: rating ?? 0,
              reviewCount: reviewCount ?? 0,
            });
          }}
          className={`flex items-center justify-center gap-2 w-36 py-2 px-3 rounded-lg font-semibold shadow-md transition-transform duration-300 ${
            isAvailable
              ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:scale-105 hover:shadow-lg"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          <FaShoppingCart />
          {isAvailable ? "Add to Cart" : "Out of Stock"}
        </button>

        {/* Buy Now */}
        <button
          disabled={!isAvailable}
          onClick={handleBuyNow}
          className={`flex items-center justify-center gap-2 flex-1 py-3 px-5 rounded-lg font-semibold shadow-md transition-all duration-300 ${
            isAvailable
              ? "bg-gradient-to-r from-rose-600 to-red-700 text-white hover:scale-105 hover:shadow-lg active:scale-95"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          <FaBolt /> Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductActions;
