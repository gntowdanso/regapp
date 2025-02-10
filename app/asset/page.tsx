// pages/assets/index.tsx
"use client";

import { Space } from 'lucide-react';
import { useSession } from 'next-auth/react';
 
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
 

export default   function Page() {

  const { data: session, status } = useSession();

  const userId = session?.user?.email;

 
//const userName=session?.user?.name;

  const [ds, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/asset/user/${userId}`, { method: "GET" });
      const data = await res.json();
      console.log("Fetched data:", data);

      if (res.ok) 
        {
        setData(data);
      } 
      else 
      {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) 
    {
      setMessage(`Error getting data`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = () => {
    router.push('/asset/new');
  };

  const handleUpdate = (id: unknown) => {
    router.push(`/asset/update/${id}`);
  };

  const handleDelete = async (id: unknown) => {
    if (confirm('Are you sure you want to delete this data?')) {
      try {
        const res = await fetch(`/api/asset/${id}`, 
            
            {
                 method: 'DELETE'
                 }
        
        );

        if (res.ok) {
          setMessage('Data deleted successfully!');
          setData(ds.filter((data) => data.id !== id));
        } else {
          const errorData = await res.json();
          setMessage(`Error: ${errorData.message}`);
        }
      } catch (error) {
        setMessage(`Error deleting data`);
      }
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
     
    <div className="p-10">
    <h1 className="text-2xl font-bold mb-4">Assets</h1>
  
    <button
      className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handleAddUser}
    >
      Add Asset
    </button>
  
    {message && <p className="text-center text-red-500 mb-4">{message}</p>}
  
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Title
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Description
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-center text-sm font-medium text-gray-700">
              Value
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-center text-sm font-medium text-gray-700">
              Image
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-center text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {ds.map((data, index) => (
            <tr
              key={data.id}
              className={`hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                {data.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                {data.description}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800 text-center">
                {data.value ? "Active" : "Inactive"}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-center">
                {data.imageUrl? (
                  <img
                    src={data.imageUrl}
                    alt="Document"
                    className="h-16 w-16 object-cover rounded"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-center">
                <button
                  onClick={() => handleUpdate(data.id)}
                  className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(data.id)}
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
  </div>
  
  );  
}

