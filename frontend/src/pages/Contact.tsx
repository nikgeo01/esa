import React, { useState } from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, CheckCircleIcon } from 'lucide-react';
import ContactForm from '../components/ContactForm';
const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmitSuccess = () => {
    setSubmitted(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Reset after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  return <div className="w-full bg-white">
      {/* Contact Header */}
      <section className="bg-gray-50 py-12 md:py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600">
              Have a project in mind? We'd love to hear about it. Fill out the
              form below and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Content */}
      <section className="py-12 md:py-20 w-full">
        <div className="container mx-auto px-4">
          {submitted && <div className="mb-10 p-4 bg-green-50 border border-green-200 rounded-lg max-w-3xl mx-auto">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-green-700 font-medium">
                  Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            </div>}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Send us a message
              </h2>
              <ContactForm onSubmitSuccess={handleSubmitSuccess} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <MailIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <a href="mailto:contact@esa-dev.com" className="text-blue-600 hover:underline">
                      contact@esa-dev.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <PhoneIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <a href="tel:+15551234567" className="text-gray-600 hover:text-blue-600">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <MapPinIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Office</p>
                    <p className="text-gray-600">
                      123 Tech Avenue
                      <br />
                      San Francisco, CA 94107
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Office Hours
                </h3>
                <p className="text-gray-600 mb-2">
                  Monday - Friday: 9am - 6pm PST
                </p>
                <p className="text-gray-600">Weekend: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Contact;