import React from "react";
import Image from "next/image";



interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null; 
  role: string | null;
  id: string;
  hasAccess: boolean | null;
}

interface UserDashboardProps {
  user: User;
}
const UserDashboard = ({ user}: UserDashboardProps ) => {
  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl  my-10 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 sm:p-8 flex items-center space-x-5 border-b">
        {user.image && (
          <Image
            src={user.image}
            alt={user.name || "Profile picture"}
            width={80}
            height={80}
            className="rounded-full shadow-md"
          />
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {user.name}
          </h1>
          <p className="text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Account Details
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Username</span>
            <span className="text-gray-800">{user.username}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Role</span>
            {/* Using a badge for the role makes it stand out */}
            <span className="capitalize px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
              {user.role?.replace("_", " ")}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Access Status</span>
            {/* Conditional styling for the access status badge */}
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                user.hasAccess
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.hasAccess ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
