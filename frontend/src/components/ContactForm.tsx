import React, { useState } from 'react';
import Button from './Button';
interface ContactFormProps {
  onSubmitSuccess?: () => void;
}
const ContactForm = ({
  onSubmitSuccess
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Store the submission in localStorage
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      const newSubmission = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString()
      };
      submissions.push(newSubmission);
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setIsSubmitting(false);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }, 1000);
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name *
        </label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 border`} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 border`} />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message *
        </label>
        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.message ? 'border-red-500' : 'border-gray-300'} p-2 border`} />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>
      <div>
        <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>;
};
export default ContactForm;