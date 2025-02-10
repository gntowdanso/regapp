"use client"
import UserForm from '@/app/components/userform'
import React, { useEffect, useState } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch users
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEditUser = (user: React.SetStateAction<null>) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteUser = userId => {
    if (confirm('Are you sure you want to delete this user?')) 
        {
      fetch(`/api/users/${userId}`, { method: 'DELETE' })
        .then(() => setUsers(users.filter(user => user._id !== userId)))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <button className="text-2xl font-bold mb-4" onClick={handleAddUser}>Add User</button>

      <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Role
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Profile Image
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-center text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className={`hover:bg-gray-100 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                {user.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                {user.email}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                {user.roles}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  'N/A'
                )}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-center">
                <button
                  onClick={() => onEdit(user)}
                  className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {showModal && (
        <UserForm
          showModal={showModal}
          setShowModal={setShowModal}
          selectedUser={selectedUser}
          isEditMode={isEditMode}
          setUsers={setUsers}
          users={users}
        />
      )}
    </div>
  );
}
