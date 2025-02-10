 
'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
const Page = () => {
  const [dataVar, setData] = useState({
    title: '',
    description: '',
    isActive: true,
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const userId = session?.user?.email;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', dataVar.title);
      formData.append('description', dataVar.description);
      formData.append('userId',userId?.toString()||"")
      if (file) 
        {
        formData.append('file', file); // Add file to the formData
      }
if(dataVar.title=="" || userId=="")
{
  setMessage(`Incomplete data entry`);
  return
}
      const res = await fetch('/api/wills', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('Will created successfully!');
        setData({ title: '', description: '', isActive: true });
        setFile(null); // Reset the file
        router.push('/will');
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || 'Error creating the record!');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (field: string, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };
  /*
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...dataVar, [name]: value });
  };
*/
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Add Will</h1>
      {message && (
        <p className={`mb-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
      <form
        className="w-[500px] mx-auto pt-10 flex flex-col gap-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          placeholder="Enter the will's title"
          value={dataVar.title}
           
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full border p-2 rounded-md"
          required
        />
        <textarea
          rows={4}
          name="description"
          placeholder="Enter a description"
          value={dataVar.description}
           
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full border p-2 rounded-md"
        />
        <label htmlFor="file" className="block mb-2">
          Upload Will (optional)
        </label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="w-full border p-2 rounded-md"
        />
        <button
          type="submit"
          className={`w-full p-2 rounded ${isLoading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Page;
