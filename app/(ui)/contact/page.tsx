// app/contacts/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { Contact, ContactType } from '@/types/contact';
import { useSession } from 'next-auth/react';

export default function ContactsPage() {
    const { data: session } = useSession();
    
    const userId = session?.user?.email;
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [formData, setFormData] = useState<Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>>({
      userId: '',
      contactType: ContactType.USER,
      telephoneNumber: '',
      email: '',
      address: '',
    });
    const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [message, setMessage] = useState('');
    // Fetch contacts on component mount
    useEffect(() => {

        setMessage('Fetchimg data...');
      fetch('/api/contact')
        .then((res) => res.json())
        .then((data: Contact[]) => setContacts(data));
        setMessage('Completed fetching data...');
    }, []);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setMessage('updating data...');
      const url = editingContact ? `/api/contact/${editingContact.id}` : '/api/contact';
      const method = editingContact ? 'PUT' : 'POST';
      formData.userId = userId || ''
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) 
        {
            setMessage('Data saved successfully...');

        const updatedContact: Contact = await response.json();
        if (editingContact) 
            {
          setContacts(contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)));
        } else {
          setContacts([...contacts, updatedContact]);
        }
        setFormData({
          userId: '',
          contactType: ContactType.USER,
          telephoneNumber: '',
          email: '',
          address: '',
        });
        setEditingContact(null);
      }
      else
      {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    };
  /////  DELETION METHOD
    const handleDelete = async (id: number) => {

        if (confirm('Are you sure you want to delete this contact?'))
        {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      
        


        if (res.ok) {
            setMessage('Data deleted successfully!');
            setContacts(contacts.filter((contact) => contact.id !== id));
           // setData(ds.filter((data) => data.id !== id));
          } else {
            const errorData = await res.json();
            setMessage(`Error: ${errorData.message}`);
          }

      
    }
    };
  
    const handleEdit = (contact: Contact) => {
      setEditingContact(contact);
      setFormData({
        userId: contact.userId,
        contactType: contact.contactType,
        telephoneNumber: contact.telephoneNumber,
        email: contact.email || '',
        address: contact.address || '',
      });
    };
  
    return (
      <div className="container mx-auto p-4">
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 gap-4">
             
            <select
              name="contactType"
              value={formData.contactType}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              {Object.values(ContactType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              name="telephoneNumber"
              value={formData.telephoneNumber}
              onChange={handleChange}
              placeholder="Telephone Number"
              required
              className="p-2 border rounded"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 border rounded"
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingContact ? 'Update Contact' : 'Add Contact'}
          </button>
        </form>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">User ID</th>
              <th className="py-2 px-4 border">Contact Type</th>
              <th className="py-2 px-4 border">Telephone</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{contact.userId}</td>
                <td className="py-2 px-4 border">{contact.contactType}</td>
                <td className="py-2 px-4 border">{contact.telephoneNumber}</td>
                <td className="py-2 px-4 border">{contact.email}</td>
                <td className="py-2 px-4 border">{contact.address}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
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