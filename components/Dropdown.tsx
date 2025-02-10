// components/Dropdown.tsx
import React from 'react';

interface DropdownProps {
  label: string;
  options: { label: string; value: string | number }[];
  onChange: (value: string | number) => void;
  value: string | number;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onChange, value }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <select
        className="border border-gray-300 rounded-md p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
