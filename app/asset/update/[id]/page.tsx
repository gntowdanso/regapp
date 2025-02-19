"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface WillData {
  id: string;
  title: string;
  description: string;
  documentUrl?: string;
  isActive: boolean;
}

export default function UpdatePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // Use useParams() instead of props

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [dataVar, setData] = useState<WillData>({
    id: "",
    title: "",
    description: "",
    documentUrl: "",
    isActive: true,
  });

  useEffect(() => {
    if (!id) return;
    
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/wills/${id}`);
        if (!res.ok) throw new Error("Failed to fetch will details");

        const data: WillData = await res.json();
        setData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`/api/wills/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataVar),
      });

      if (res.ok) {
        setMessage("Update completed successfully!");
        router.push("/will");
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (err) {
      setMessage(`Error: ${(err as Error).message}`);
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Update Will</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}

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
          name="description"
          rows={5}
          placeholder="Description"
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
