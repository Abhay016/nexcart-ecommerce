import React from "react";

const ProfileActions = () => (
  <div className="flex justify-end gap-4 border-t p-6">
    <button className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition">
      Edit Profile
    </button>
    <button className="px-5 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white shadow hover:from-red-600 hover:to-red-700 transition">
      Logout
    </button>
  </div>
);

export default ProfileActions;
