import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import {
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart,
} from "../../store/actions";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";
import truncateText from "../../utils/truncateText";

const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    cartId,
}) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const dispatch = useDispatch();

    const handleQtyIncrease = (cartItems) => {
        dispatch(
            increaseCartQuantity(cartItems, toast, currentQuantity, setCurrentQuantity)
        );
    };

    const handleQtyDecrease = (cartItems) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            dispatch(decreaseCartQuantity(cartItems, newQuantity));
        }
    };

    const removeItemFromCart = (cartItems) => {
        dispatch(removeFromCart(cartItems, toast));
    };

    return (
        <div className="flex flex-col md:grid md:grid-cols-5 items-center justify-between 
                    bg-white border border-gray-200 rounded-xl shadow-sm 
                    hover:shadow-md transition-shadow duration-300 p-4 mb-4">

            {/* Product Info */}
            <div className="md:col-span-2 flex items-start gap-4 w-full">
                <img
                    src={`${import.meta.env.VITE_NEXCART_BACKEND_BASE_URL}/uploads/images/${image}`}
                    alt={productName}
                    className="h-24 w-24 object-cover rounded-lg border border-gray-100 shadow-sm hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col justify-between">
                    <h3 className="text-base font-semibold text-gray-800">
                        {truncateText(productName)}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
                    {discount && (
                        <span className="mt-1 inline-block text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                            {discount}% OFF
                        </span>
                    )}
                    <button
                        onClick={() =>
                            removeItemFromCart({
                                image,
                                productName,
                                description,
                                specialPrice,
                                price,
                                productId,
                                quantity,
                            })
                        }
                        className="mt-2 flex items-center justify-center gap-2 
             text-xs sm:text-sm font-medium 
             w-28 sm:w-32 py-2 
             rounded-md 
             bg-gradient-to-r from-red-500 to-rose-600 
             text-white shadow-sm 
             cursor-pointer
             hover:bg-red-600 hover:shadow-lg hover:scale-[1.05] 
             active:scale-[0.97] 
             transition-all duration-300 ease-in-out"
                    >
                        <HiOutlineTrash size={16} />
                        <span>Remove</span>
                    </button>


                </div>
            </div>

            {/* Price */}
            <div className="justify-self-center text-sm md:text-base text-gray-700 font-semibold mt-4 md:mt-0">
                {formatPrice(Number(specialPrice))}
            </div>

            {/* Quantity */}
            <div className="justify-self-center mt-2 md:mt-0">
                <SetQuantity
                    quantity={currentQuantity}
                    cardCounter={true}
                    handleQtyIncrease={() =>
                        handleQtyIncrease({
                            image,
                            productName,
                            description,
                            specialPrice,
                            price,
                            productId,
                            quantity,
                        })
                    }
                    handleQtyDecrease={() =>
                        handleQtyDecrease({
                            image,
                            productName,
                            description,
                            specialPrice,
                            price,
                            productId,
                            quantity,
                        })
                    }
                />
            </div>

            {/* Total */}
            <div className="justify-self-center text-sm md:text-base text-gray-900 font-bold mt-2 md:mt-0">
                {formatPrice(Number(currentQuantity) * Number(specialPrice))}
            </div>
        </div>
    );
};

export default ItemContent;
