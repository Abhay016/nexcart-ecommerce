import { useState } from "react";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  about = false,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();

  const handleProductView = (product) => {
    if (!about) {
      setSelectedViewProduct(product);
      setOpenProductViewModal(true);
    }
  };

  const addToCartHandler = (cartItems) => {
    dispatch(addToCart(cartItems, 1, toast));
  };

  return (
    <div className="group border rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 relative">
      {/* Discount Badge */}
      {discount && (
        <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
          -{discount}%
        </span>
      )}

      {/* Product Image with Hover Icons */}
      <div className="relative w-full overflow-hidden aspect-[4/3] cursor-pointer">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={image}
          alt={productName}
          onClick={() =>
            handleProductView({
              id: productId,
              productName,
              image,
              description,
              quantity,
              price,
              discount,
              specialPrice,
            })
          }
        />

        {/* Hover Action Icons */}
        <div className="absolute top-6 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            aria-label="Add to Wishlist"
            className="p-2 rounded-full bg-black/60 text-white shadow-md hover:bg-rose-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toast.success("Added to wishlist!");
            }}
          >
            <FaHeart size={16} />
          </button>
          <button
            aria-label="View Product"
            className="p-2 rounded-full bg-black/60 text-white shadow-md hover:bg-indigo-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleProductView({
                id: productId,
                productName,
                image,
                description,
                quantity,
                price,
                discount,
                specialPrice,
              });
            }}
          >
            <FaEye size={16} />
          </button>
        </div>

      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <h2
          onClick={() =>
            handleProductView({
              id: productId,
              productName,
              image,
              description,
              quantity,
              price,
              discount,
              specialPrice,
            })
          }
          className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors"
        >
          {truncateText(productName, 50)}
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed min-h-20 max-h-20">
          {truncateText(description, 80)}
        </p>

        {!about && (
          <div className="flex items-center justify-between mt-4">
            {/* Price Section */}
            {specialPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through text-sm">
                  ${Number(price).toFixed(2)}
                </span>
                <span className="text-xl font-bold text-indigo-600">
                  ${Number(specialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-indigo-600">
                ${Number(price).toFixed(2)}
              </span>
            )}

            {/* Add to Cart Button (original bg preserved) */}
            <button
              disabled={!isAvailable}
              onClick={() =>
                addToCartHandler({
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
                })
              }
              className={`flex items-center justify-center gap-2 w-36 py-2 px-3 rounded-lg font-semibold shadow-md transition-transform duration-300 ${isAvailable
                ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:scale-105 hover:shadow-lg"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              <FaShoppingCart />
              {isAvailable ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  );
};

export default ProductCard;
