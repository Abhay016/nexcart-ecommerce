import { FaShoppingCart, FaHeart, FaEye, FaStar } from "react-icons/fa";
import truncateText from "../../utils/truncateText";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseCartQuantity,
  decreaseCartQuantity,
} from "../../store/actions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  productId,
  productName = "Unnamed Product",
  image = "/placeholder.png",
  description = "",
  quantity = 0,
  price = 0,
  discount = 0,
  specialPrice = 0,
  brand = "",
  rating = 0,
  reviewCount = 0,
  isActive = true,
  isFeatured = false,
  about = false,
}) => {
  const isAvailable = isActive && Number(quantity) > 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart state from Redux
  const cartItems = useSelector((state) => state.carts.cart || []);
  const cartItem = cartItems.find((item) => item.productId === productId);

  const addToCartHandler = (cartItemData) => {
    dispatch(addToCart(cartItemData, 1, toast));
    toast.success("Added to cart!");
  };

  const handleViewProduct = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="group border rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 relative">
      {/* Product Image */}
      <div
        className="relative w-full overflow-hidden aspect-[4/3] cursor-pointer"
        onClick={handleViewProduct}
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            -{discount}%
          </span>
        )}

        {/* Featured Badge */}
        {isFeatured && (
          <span className="absolute top-3 right-3 z-20 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            Featured
          </span>
        )}

        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={`${import.meta.env.VITE_NEXCART_BACKEND_BASE_URL}/uploads/images/${image}`}
          alt={productName}
        />

        {/* Action Icons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button
            aria-label="Add to Wishlist"
            className="p-2 rounded-full bg-white/90 text-gray-700 shadow-md hover:bg-rose-500 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toast.success("Added to wishlist!");
            }}
          >
            <FaHeart size={16} />
          </button>
          <button
            aria-label="View Product"
            className="p-2 rounded-full bg-white/90 text-gray-700 shadow-md hover:bg-indigo-600 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProduct();
            }}
          >
            <FaEye size={16} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Brand */}
        {brand && (
          <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">
            {brand}
          </p>
        )}

        {/* Name */}
        <h2
          onClick={handleViewProduct}
          className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors"
        >
          {truncateText(productName, 50)}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed min-h-20 max-h-20">
          {truncateText(description, 80)}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              size={14}
              className={
                i < Math.round(Number(rating ?? 0))
                  ? "text-yellow-500"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-gray-600 ml-2">
            {Number(rating ?? 0).toFixed(1)} ({reviewCount ?? 0})
          </span>
        </div>

        {!about && (
          <div className="flex items-center justify-between mt-4">
            {/* Price Section */}
            {specialPrice && Number(specialPrice) < Number(price ?? 0) ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through text-sm">
                  ${Number(price ?? 0).toFixed(2)}
                </span>
                <span className="text-xl font-bold text-indigo-600">
                  ${Number(specialPrice ?? price ?? 0).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-indigo-600">
                ${Number(price ?? 0).toFixed(2)}
              </span>
            )}

            {/* Cart Actions */}
            {cartItem ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (cartItem.quantity > 1) {
                      dispatch(
                        decreaseCartQuantity(cartItem, cartItem.quantity - 1)
                      );
                    } else {
                      toast.error("Quantity cannot be less than 1");
                    }
                  }}
                  className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-800 font-semibold">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      increaseCartQuantity(
                        cartItem,
                        toast,
                        cartItem.quantity,
                        () => {}
                      )
                    );
                  }}
                  className="px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  +
                </button>
              </div>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
