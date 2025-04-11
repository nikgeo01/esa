import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/contact/list/');
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch contacts');
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Form Submissions</h2>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{contact.name}</h3>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(contact.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">{contact.message}</p>
            </div>
            <div className="mt-2">
              <span className={`px-2 py-1 rounded text-sm ${
                contact.is_read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {contact.is_read ? 'Read' : 'Unread'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList; 