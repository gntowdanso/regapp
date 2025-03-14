"use client";

import { Asset } from "@/types/contact";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
/*
interface Asset {
  id: number;
  userId?: string;
  willId?: number;
  assetType?: string;
  location?: string;
  name?: string;
  description?: string;
  value?: number;
  beneficiaryId?: number;
  imageUrl?: string;
}
*/
export default function AssetsPage() {

     const { data: session } = useSession();
     const userId = session?.user?.email;
     const [message, setMessage] = useState('');

  const [assets, setAssets] = useState<Asset[]>([]);
  const [formData, setFormData] = useState<Partial<Asset>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch assets
  const fetchAssets = async () => {
    setMessage('Fetchimg data...');
    const res = await fetch("/api/assets");
    const data = await res.json();
    
    setMessage('Completed fetching data...');
    setAssets(data);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Handle form submission (Add & Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data 1:",formData);
  formData.userId = userId || ''
    setMessage('updating data...');
    if (editingId) {
      await fetch(`/api/assets/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
        formData.willId=0;
        formData.beneficiaryId=0;
        formData.assetType="Property";
        formData.imageUrl="";
        setMessage('posting data...');
      console.log("Form Data:",formData);
      const res= await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

        if (res.ok) {
            setMessage('Data saved successfully...');
            setFormData({});
            setEditingId(null);
            fetchAssets();
        }
        else
      {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.message}`);
        console.log(`Error: ${errorData.message}`);
      }
    }
   // setMessage('Data saved successfully...');
    setFormData({});
   // setEditingId(null);
    //fetchAssets();
  };

  // Delete asset
  const deleteAsset = async (id: number) => {

    if (confirm('Are you sure you want to delete this contact?'))
        {

  const  res= await fetch(`/api/assets/${id}`, { method: "DELETE" });
   

    if (res.ok) {
        


        if (res.ok) {
            setMessage('Data deleted successfully!');
            fetchAssets();
           // setData(ds.filter((data) => data.id !== id));
          } else {
            const errorData = await res.json();
            setMessage(`Error: ${errorData.message}`);
          }

      }
        }
  };

  // Edit asset
  const editAsset = (asset: Asset) => {
    setFormData(asset);
    setEditingId(asset.id);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Asset Management</h1>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      {/* Form for Adding/Editing Assets */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
        <input
          type="text"
          placeholder="Name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="block p-2 border mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location || ""}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="block p-2 border mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Value"
          value={formData.value || ""}
          onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
          className="block p-2 border mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Add"} Asset
        </button>
      </form>

      {/* Assets List */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Value</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="border">
              <td className="border p-2">{asset.id}</td>
              <td className="border p-2">{asset.name}</td>
              <td className="border p-2">{asset.location}</td>
              <td className="border p-2">${asset.value?.toFixed(2)}</td>
              <td className="border p-2">
                <button onClick={() => editAsset(asset)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => deleteAsset(asset.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
