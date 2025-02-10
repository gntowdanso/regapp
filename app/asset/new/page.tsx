 
'use client';

import Dropdown from '@/components/Dropdown';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {
  const [dataVar, setData] = useState({
    userId:"",
  willId  :0,
  
  name   :"" ,  
  description: "",
  value       :0.0,
  beneficiaryId :0,  
   
  imageUrl     :"" 
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      interface AssetFormProps {
        onSubmit: (data: any) => void;
        initialData?: any;
        beneficiaries: { label: string; value: number }[]; // Beneficiary dropdown
      }

      const formData = new FormData();
      formData.append('name', dataVar.name);
      formData.append('description', dataVar.description);
      formData.append('willId', dataVar.willId.toString());
      formData.append('beneficiaryId', dataVar.beneficiaryId.toString());
      formData.append('value', dataVar.value.toString());
    
      if (file) 
        {
        formData.append('file', file); // Add file to the formData
      }





      const res = await fetch('/api/asset', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('Will created successfully!');
        setData(
          { 
            userId:"",
            willId  :0,
            
            name   :"" ,  
            description: "",
            value       :0.0,
            beneficiaryId :0,  
             
            imageUrl     :""


          }
        
        );
        setFile(null); // Reset the file
        router.push('/asset');
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || 'Error creating the record!');
      }
    } catch (error) {
      setMessage(`Error saving data`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
/*
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...dataVar, [name]: value });
  };
  */
  
  const handleChange = (field: string, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

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
          name="name"
          placeholder="Enter asset name"
          value={dataVar.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full border p-2 rounded-md"
          required
        />
        <input
        type='number'
        name="value"
        placeholder='Please enter asset value'
        value={dataVar.value}
        onChange={(e) => handleChange('value', parseFloat(e.target.value))}
        className="w-full border p-2 rounded-md"
        />
        <textarea
          rows={4}
          name="description"
          placeholder="Enter a description"
          value={dataVar.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full border p-2 rounded-md"
        />
        <Dropdown
        label="Beneficiary"
        options={beneficiaries}
        value={dataVar.beneficiaryId}
        onChange={(value) => handleChange('beneficiaryId', value)}
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
