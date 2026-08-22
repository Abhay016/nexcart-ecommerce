import React from "react";
import OrderCard from "./OrderCard";

const OrderPage = () => {
  const orders = [
    {
      id: "ORD12345",
      date: "2026-08-15",
      status: "Delivered",
      total: 120.5,
      items: [
        {
          id: 1,
          name: "Wireless Headphones",
          image: "https://via.placeholder.com/80",
          quantity: 1,
          price: 80,
        },
        {
          id: 2,
          name: "Phone Case",
          image: "https://via.placeholder.com/80",
          quantity: 2,
          price: 20,
        },
      ],
    },
    {
      id: "ORD12346",
      date: "2026-08-18",
      status: "Pending",
      total: 45,
      items: [
        {
          id: 3,
          name: "Bluetooth Speaker",
          image: "https://via.placeholder.com/80",
          quantity: 1,
          price: 45,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Orders</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
