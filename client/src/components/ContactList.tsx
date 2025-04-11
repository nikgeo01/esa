import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/contact/list/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          // Token expired or invalid, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/login');
        } else {
          setError('Failed to fetch contacts');
          setLoading(false);
        }
      }
    };

    fetchContacts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Form Submissions</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
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