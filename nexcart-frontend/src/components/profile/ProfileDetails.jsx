import React from "react";

const ProfileDetails = ({ user }) => (
  <div className="space-y-3">
    <h2 className="text-lg font-semibold text-slate-800">Profile Details</h2>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Phone:</strong> {user.phone}</p>
    <p><strong>Address:</strong> {user.address}</p>
  </div>
);

export default ProfileDetails;
