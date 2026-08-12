const btnBase =
  "flex items-center justify-center font-bold rounded-md transition-all duration-300 ease-in-out";

const SetQuantity = ({
  quantity,
  cardCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full">
      {/* Label (hidden in cardCounter mode) */}
      {!cardCounter && (
        <div className="font-semibold text-gray-700 text-sm sm:text-base">
          Quantity
        </div>
      )}

      {/* Counter */}
      <div className="flex flex-row sm:flex-row gap-3 items-center text-sm sm:text-base lg:text-lg w-full sm:w-auto justify-center">
        {/* Decrease Button */}
        <button
          disabled={quantity <= 1}
          onClick={handleQtyDecrease}
          className={`${btnBase} w-10 h-10 sm:w-12 sm:h-12 
                      border border-gray-300 
                      ${quantity <= 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-red-50 hover:border-red-400 hover:text-red-600"} 
                      shadow-sm`}
        >
          -
        </button>

        {/* Quantity Display */}
        <div className="px-5 py-2 min-w-[50px] text-center font-semibold text-blue-600 bg-blue-50 rounded-md shadow-sm text-base sm:text-lg">
          {quantity}
        </div>

        {/* Increase Button */}
        <button
          onClick={handleQtyIncrease}
          className={`${btnBase} w-10 h-10 sm:w-12 sm:h-12 
                      border border-gray-300 
                      bg-white text-gray-700 
                      hover:bg-green-50 hover:border-green-400 hover:text-green-600 
                      shadow-sm`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
