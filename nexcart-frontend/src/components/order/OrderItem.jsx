import React from "react";

const OrderItem = ({ item }) => (
  <div className="flex items-center gap-4">
    <img
      src={item.image}
      alt={item.name}
      className="w-16 h-16 rounded-md object-cover shadow-sm"
    />
    <div className="flex-1">
      <p className="font-medium text-slate-800">{item.name}</p>
      <p className="text-sm text-gray-500">
        {item.quantity} × ${item.price.toFixed(2)}
      </p>
    </div>
    <div className="font-semibold text-slate-900">
      ${(item.quantity * item.price).toFixed(2)}
    </div>
  </div>
);

export default OrderItem;
