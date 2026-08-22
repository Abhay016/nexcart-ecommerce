import React from "react";

const ProfileHeader = ({ user }) => (
  <div className="flex items-center gap-6 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
    <img
      src={user.avatar}
      alt="User Avatar"
      className="w-24 h-24 rounded-full border-4 border-white shadow-md"
    />
    <div>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-sm opacity-90">{user.role}</p>
    </div>
  </div>
);

export default ProfileHeader;
