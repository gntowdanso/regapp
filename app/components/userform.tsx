/*
import { useState, useEffect } from "react";

export default function UserForm({ showModal, setShowModal, selectedUser, isEditMode, setUsers, users }) {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      roles:  'USER',
      profileImage: null,
    });
  
    useEffect(() => {
      if (isEditMode && selectedUser) {
        setFormData({
          name: selectedUser.name,
          email: selectedUser.email,
          roles: selectedUser.roles,
          profileImage: null,
        });
      }
    }, [isEditMode, selectedUser]);
  
    const handleSubmit = async e => {
      e.preventDefault();
  
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('roles', formData.roles);
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }
  
      try {
        if (isEditMode) {
          const res = await fetch(`/api/users/${selectedUser._id}`, {
            method: 'PUT',
            body: formDataToSend,
          });
          const updatedUser = await res.json();
          setUsers(users.map(u => (u._id === updatedUser._id ? updatedUser : u)));
        } else {
          const res = await fetch('/api/users', {
            method: 'POST',
            body: formDataToSend,
          });
          const newUser = await res.json();
          setUsers([...users, newUser]);
        }
        setShowModal(false);
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
          showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isEditMode ? 'Edit User' : 'Add User'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
  
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
  
            <div>
              <label htmlFor="roles" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="roles"
                name="roles"
                value={formData.roles}
                onChange={e => setFormData({ ...formData, roles: [e.target.value] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
  
            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={e => setFormData({ ...formData, profileImage: e.target.files[0] })}
                className="mt-1 block w-full text-sm text-gray-500"
              />
            </div>
  
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {isEditMode ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  */