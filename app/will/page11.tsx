// page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';



 
const prisma = new PrismaClient();
export default   function Page11() {
  const [ds, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { data: session, status } = useSession();

  const userId = session?.user?.email;
 

 


  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setMessage("Error: userId is not defined");
        setLoading(false);
        return;
      }
      

      try {
        
        
       const rst= await prisma.will.findMany();
       const res= new Response(JSON.stringify(rst), { status: 200 });
     // const rst1=  JSON.stringify(rst)
     //{      where: { userId:userId.trim() },    }
    // console.log("rest",rst);
      //
       // const res = await fetch(`/api/wills/user/${userId}`);
        if (!res.ok) 
          {
          const errorData = await res.json();
          setMessage(`Error: ${errorData.message || "Unknown error"}`);
          return;
        }
        const data = await res.json();
        setData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) 
      {
        console.log("userId");
        setMessage(`No data  was returned11`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddUser = () => {
    router.push('/will/new');
  };

  const handleUpdate = (id: unknown) => {
    router.push(`/will/update/${id}`);
  };

  const handleDelete = async (id: unknown) => {
    if (confirm('Are you sure you want to delete this will?')) {
      try {
        const res = await fetch(`/api/wills/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setMessage('Data deleted successfully!');
          setData(ds.filter((data) => data.id !== id));
        } else {
          const errorData = await res.json();
          setMessage(`Error: ${errorData.message}`);
        }
      } catch (error) {
        setMessage(`Error deleting a record: ${error.message}`);
      }
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Wills</h1>
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddUser}
      >
        Add Will
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
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-center text-sm font-medium text-gray-700">
                Document
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
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                  {data.title}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                  {data.description}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800 text-center">
                  {data.isActive ? 'Active' : 'Inactive'}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-center">
                  {data.documentUrl ? (
                    <img
                      src={data.documentUrl}
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
