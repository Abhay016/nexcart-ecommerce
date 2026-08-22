import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";
import ProfileStats from "./ProfileStats";
import ProfileActions from "./ProfileActions";

const ProfilePage = () => {
  const user = {
    name: "John Doe",
    role: "Premium Member",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, New York, USA",
    avatar: "https://i.pravatar.cc/150?img=3",
    stats: {
      orders: 24,
      wishlist: 12,
      reviews: 5,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <ProfileHeader user={user} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <ProfileDetails user={user} />
          <ProfileStats stats={user.stats} />
        </div>
        <ProfileActions />
      </div>
    </div>
  );
};

export default ProfilePage;
