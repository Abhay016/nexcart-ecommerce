import React from "react";

const ProfileStats = ({ stats }) => (
  <div className="grid grid-cols-3 gap-4 text-center">
    {Object.entries(stats).map(([key, value]) => (
      <div
        key={key}
        className="bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition"
      >
        <p className="text-2xl font-bold text-blue-600">{value}</p>
        <p className="text-sm text-gray-600 capitalize">{key}</p>
      </div>
    ))}
  </div>
);

export default ProfileStats;
