"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
 

export default function UpdatePage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [error, setError] = useState("");
  const id = params.id;

  const [dataVar, setData] = useState({
    id: id, 
    title: '',
    description: '',
    documentUrl: '',
    isActive: true,  // Default value for isActive
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data for the will with the given `id`
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/wills/${id}`);
        if (!res.ok) throw new Error("Failed to fetch will details");
        const data = await res.json();
        setData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("update:", dataVar);
    const { name, value } = e.target;
    setData({ ...dataVar, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("data:", dataVar);

      // Call the correct endpoint with the specific `id` in the URL
      const res = await fetch(`/api/wills`, {  // Using the ID in the URL for the update
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataVar),
      });

      if (res.ok) {
        setMessage('Update completed successfully!');
        router.push('/will');
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Update Will</h1>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={dataVar.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"  // Corrected the name here
          rows={15}
          placeholder="Description"  // Corrected the placeholder here
          value={dataVar.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
