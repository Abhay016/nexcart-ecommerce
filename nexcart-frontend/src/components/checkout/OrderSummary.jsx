import React from 'react';
import { formatPriceCalculation } from '../../utils/formatPrice';

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
  return (
    <div className="container mx-auto px-4 mb-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Section */}
        <div className="w-full lg:w-8/12 space-y-6">
          {/* Billing Address */}
          <div className="p-6 bg-white border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">
              Billing Address
            </h2>
            <div className="space-y-1 text-slate-700">
              <p><strong>Building Name:</strong> {address?.buildingName}</p>
              <p><strong>City:</strong> {address?.city}</p>
              <p><strong>Street:</strong> {address?.street}</p>
              <p><strong>State:</strong> {address?.state}</p>
              <p><strong>Pincode:</strong> {address?.pincode}</p>
              <p><strong>Country:</strong> {address?.country}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 bg-white border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">
              Payment Method
            </h2>
            <p className="text-slate-700">
              <strong>Method:</strong> {paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div className="p-6 bg-white border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">
              Order Items
            </h2>
            <div className="space-y-4">
              {cart?.map((item) => (
                <div
                  key={item?.productId}
                  className="flex items-center gap-4 border-b pb-3 last:border-b-0"
                >
                  <img
                    src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`}
                    alt="Product"
                    className="w-14 h-14 rounded-md object-cover shadow-sm"
                  />
                  <div className="text-slate-700">
                    <p className="font-medium">{item?.productName}</p>
                    <p className="text-sm text-gray-500">
                      {item?.quantity} × ${item?.specialPrice} = $
                      {formatPriceCalculation(item?.quantity, item?.specialPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section (Checkout Summary) */}
        <div className="w-full lg:w-4/12">
          <div className="p-6 bg-white border rounded-lg shadow-md space-y-4 lg:sticky lg:top-24">
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">
              Order Summary
            </h2>

            <div className="space-y-3 text-slate-700">
              <div className="flex justify-between">
                <span>Products</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-900">
                <span>Subtotal</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
            </div>

            <button
              className="w-full mt-4 py-3 rounded-md font-semibold text-white shadow-md bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
