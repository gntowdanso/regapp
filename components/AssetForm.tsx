// components/AssetForm.tsx
import React, { useState } from 'react';
 
 
import Dropdown from './dropdown';
interface AssetFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  beneficiaries: { label: string; value: number }[]; // Beneficiary dropdown
}

const AssetForm: React.FC<AssetFormProps> = ({ onSubmit, initialData, beneficiaries }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    value: initialData?.value || 0.0,
    beneficiaryId: initialData?.beneficiaryId || beneficiaries[0]?.value || '',
    imageUrl: initialData?.imageUrl || '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Estimated Value</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-md p-2"
          value={formData.value}
          onChange={(e) => handleChange('value', parseFloat(e.target.value))}
        />
      </div>
      <Dropdown
        label="Contacts"
        options={beneficiaries}
        value={formData.beneficiaryId}
        onChange={(value) => handleChange('beneficiaryId', value)}
      />
      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          value={formData.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Save Asset
      </button>
    </form>
  );
};

export default AssetForm;
