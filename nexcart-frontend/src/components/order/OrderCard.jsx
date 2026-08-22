import React from "react";
import OrderItem from "./OrderItem";
import OrderStatusBadge from "./OrderStatusBadge";

const OrderCard = ({ order }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    {/* Header */}
    <div className="flex justify-between items-center border-b pb-4 mb-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Order #{order.id}
        </h2>
        <p className="text-sm text-gray-500">Placed on {order.date}</p>
      </div>
      <OrderStatusBadge status={order.status} />
    </div>

    {/* Items */}
    <div className="space-y-4">
      {order.items.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </div>

    {/* Footer */}
    <div className="flex justify-between items-center border-t pt-4 mt-4">
      <span className="font-medium text-slate-700">Total:</span>
      <span className="text-xl font-bold text-blue-600">
        ${order.total.toFixed(2)}
      </span>
    </div>
  </div>
);

export default OrderCard;
