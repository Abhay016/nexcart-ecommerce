import React from "react";
import ProductCard from "../shared/ProductCard";

function DealsPage() {
  // Static deals data for now
  const deals = [
    {
      productId: 1,
      productName: "Wireless Noise-Cancelling Headphones",
      image: "/images/headphones-main.jpg",
      description:
        "Immersive sound with active noise cancellation and 30 hours of battery life.",
      quantity: 12,
      price: 249.99,
      discount: 20,
      specialPrice: 199.99,
    },
    {
      productId: 2,
      productName: "Smartwatch Series 5",
      image: "/images/smartwatch.jpg",
      description:
        "Track fitness, heart rate, and notifications with sleek design.",
      quantity: 8,
      price: 349.99,
      discount: 15,
      specialPrice: 299.99,
    },
    {
      productId: 3,
      productName: "Bluetooth Speaker",
      image: "/images/speaker.jpg",
      description:
        "Portable speaker with waterproof design and deep bass.",
      quantity: 25,
      price: 79.99,
      discount: 40,
      specialPrice: 49.99,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-rose-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Banner */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            🔥 Hot Deals
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Limited-time offers on top products. Grab them before they’re gone!
          </p>
        </div>

        {/* Deals Grid */}
        {deals.length === 0 ? (
          <p className="text-gray-600 text-center">No deals available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal) => (
              <ProductCard key={deal.productId} {...deal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DealsPage;
