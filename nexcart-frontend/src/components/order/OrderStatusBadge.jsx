import React from "react";

const statusColors = {
  Delivered: "bg-green-100 text-green-700 border-green-300",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Cancelled: "bg-red-100 text-red-700 border-red-300",
};

const OrderStatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[status]}`}
  >
    {status}
  </span>
);

export default OrderStatusBadge;
