import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation (optional)
    if (formData.phone.trim()) {
      const phoneRegex = /^[0-9\s-+()]{5,}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
        isValid = false;
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    if (!validateForm()) {
      setStatus('error');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/contact/submit/', formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus('error');
      if (axios.isAxiosError(error) && error.response?.data) {
        // Handle backend validation errors
        const backendErrors = error.response.data;
        if (typeof backendErrors === 'object') {
          const newErrors: FormErrors = {};
          Object.keys(backendErrors).forEach(key => {
            newErrors[key as keyof FormErrors] = backendErrors[key][0];
          });
          setErrors(newErrors);
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-light mb-6 text-gray-800">Contact Us</h2>
      
      {status === 'success' ? (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
          Thank you for your message. We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 border-2 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 border-2 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone (optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 border-2 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 border-2 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          </div>

          {status === 'error' && errorMessage && !Object.keys(errors).length && (
            <div className="text-red-600 text-sm">{errorMessage}</div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 