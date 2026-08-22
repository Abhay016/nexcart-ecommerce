import { MdDone, MdClose } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { GiBatteryPackAlt } from "react-icons/gi";
import { HiOutlineSpeakerphone } from "react-icons/hi";

function ProductInfo({ product }) {
  const {
    productName,
    price,
    specialPrice,
    discount,
    description,
    quantity,
    rating,
    brand,
    reviewCount,
  } = product;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Product Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight hover:text-indigo-700 transition-colors duration-300">
        {productName}
      </h1>

      {/* Brand */}
      {brand && (
        <p className="text-sm text-indigo-600 font-semibold uppercase tracking-wide">
          {brand}
        </p>
      )}

      {/* Price Section */}
      <div className="flex items-center gap-3">
        {specialPrice && specialPrice < price ? (
          <>
            <span className="text-gray-400 line-through text-lg">
              ${Number(price).toFixed(2)}
            </span>
            <span className="text-3xl font-bold text-indigo-600 drop-shadow-sm">
              ${Number(specialPrice).toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow hover:scale-105 transition-transform">
                -{discount}%
              </span>
            )}
          </>
        ) : (
          <span className="text-3xl font-bold text-indigo-600 drop-shadow-sm">
            ${Number(price).toFixed(2)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed text-base">
        {description}
      </p>


      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {quantity > 0 ? (
          <span className="flex items-center gap-1 text-sm font-medium text-teal-700 bg-teal-100 px-3 py-1 rounded-md shadow hover:scale-105 transition-transform">
            <MdDone /> In Stock{" "}
            {quantity < 10 && (
              <span className="ml-1 text-rose-600 font-semibold">
                Hurry! Only {quantity} left
              </span>
            )}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-sm font-medium text-rose-700 bg-rose-100 px-3 py-1 rounded-md shadow">
            <MdClose /> Out of Stock
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400">
          {Array.from({ length: 5 }).map((_, idx) =>
            idx < Math.round(rating) ? (
              <FaStar key={idx} className="h-5 w-5" />
            ) : (
              <FaRegStar key={idx} className="h-5 w-5 text-gray-300" />
            )
          )}
        </div>
        <span className="text-sm text-gray-600 font-medium">
          {rating} / 5 ({reviewCount} reviews)
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;
