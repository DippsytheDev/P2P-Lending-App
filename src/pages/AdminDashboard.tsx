import { useState } from "react";
import { mockUsers } from "../data/users";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState(mockUsers);

  const toggleUserStatus = (email: string) => {
    const updated = users.map((user) =>
      user.email === email ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updated);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email} className="border-t">
              <td className="p-2">{user.firstName}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 capitalize">{user.role}</td>
              <td className="p-2">
                {user.isActive ? (
                  <span className="text-green-600 font-medium">Active</span>
                ) : (
                  <span className="text-red-600 font-medium">Disabled</span>
                )}
              </td>
              <td className="p-2">
                <button
                  onClick={() => toggleUserStatus(user.email)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  {user.isActive ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

            {/* All Pools Section */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-800">
                  All Pools
                </h3>
                <Link
                  to="/lender/pools"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                >
                  View All Pools
                </Link>
              </div>
              <p className="text-blue-900">
                Browse all available pools and manage your contributions.
              </p>
            </div>
    </div>
  );
};

export default AdminDashboard;