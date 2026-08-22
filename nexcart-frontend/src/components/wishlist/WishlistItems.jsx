function WishlistItems({ item }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="mt-4 font-semibold text-lg text-gray-900">{item.name}</h3>
      <p className="text-indigo-600 font-medium mt-1">${item.price}</p>
      <p className="text-yellow-500 text-sm mt-1">⭐ {item.rating} / 5</p>
      <div className="mt-4 flex space-x-3">
        <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
          Add to Cart
        </button>
        <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
          Remove
        </button>
      </div>
    </div>
  );
}

export default WishlistItems;
