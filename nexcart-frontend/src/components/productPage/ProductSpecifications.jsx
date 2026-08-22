import React from "react";

function ProductSpecifications() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
        Product Specifications
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1 */}
        <div className="space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Material:</span> 100% Cotton
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Available Colors:</span> Blue, Black, White
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Warranty:</span> 1 Year Manufacturer Warranty
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Origin:</span> Made in India
          </p>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Dimensions:</span> 40 x 30 x 10 cm
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Weight:</span> 1.2 kg
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Care Instructions:</span> Machine Washable, Gentle Cycle
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Package Includes:</span> 1 Product + Care Guide
          </p>
        </div>
      </div>

      {/* Extra Notes */}
      <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-6">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold text-indigo-700">Note:</span> Specifications are standard across all products for demonstration purposes. Actual product details may vary slightly depending on the category and model.
        </p>
      </div>
    </section>
  );
}

export default ProductSpecifications;
