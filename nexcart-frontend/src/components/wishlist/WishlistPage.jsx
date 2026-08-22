import React from "react";
import WishlistItems from "./WishlistItems";

function WishlistPage() {
  // Static wishlist data for now
  const wishlist = [
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      price: 199.99,
      image: "/images/headphones-main.jpg",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Smartwatch Series 5",
      price: 299.99,
      image: "/images/smartwatch.jpg",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 49.99,
      image: "/images/speaker.jpg",
      rating: 4.0,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <WishlistItems key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
