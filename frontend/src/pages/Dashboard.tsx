import React, { useEffect, useState } from 'react';
import { CalendarIcon, TrashIcon, InboxIcon } from 'lucide-react';
import Button from '../components/Button';
interface Submission {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
}
const Dashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  useEffect(() => {
    // Load submissions from localStorage
    const storedSubmissions = localStorage.getItem('contactSubmissions');
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    }
  }, []);
  const handleDelete = (id: number) => {
    const updatedSubmissions = submissions.filter(submission => submission.id !== id);
    setSubmissions(updatedSubmissions);
    localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));
    if (selectedSubmission?.id === id) {
      setSelectedSubmission(null);
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  return <div className="w-full bg-white">
      <section className="py-10 w-full">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Contact Form Submissions
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                View and manage messages from your website visitors.
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              {/* Submissions List */}
              <div className="w-full md:w-1/3 border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h4 className="font-medium text-gray-700">
                    {submissions.length}{' '}
                    {submissions.length === 1 ? 'Submission' : 'Submissions'}
                  </h4>
                </div>
                <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                  {submissions.length > 0 ? submissions.map(submission => <div key={submission.id} className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedSubmission?.id === submission.id ? 'bg-blue-50' : ''}`} onClick={() => setSelectedSubmission(submission)}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-gray-900">
                              {submission.name}
                            </h5>
                            <p className="text-sm text-gray-500 truncate">
                              {submission.email}
                            </p>
                          </div>
                          <button onClick={e => {
                      e.stopPropagation();
                      handleDelete(submission.id);
                    }} className="text-gray-400 hover:text-red-500">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {formatDate(submission.date)}
                        </div>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {submission.message}
                        </p>
                      </div>) : <div className="p-8 text-center">
                      <div className="mx-auto h-12 w-12 text-gray-400 flex items-center justify-center rounded-full bg-gray-100">
                        <InboxIcon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No submissions
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        You haven't received any contact form submissions yet.
                      </p>
                    </div>}
                </div>
              </div>
              {/* Submission Detail */}
              <div className="w-full md:w-2/3 p-6">
                {selectedSubmission ? <div>
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <h3 className="text-xl font-medium text-gray-900">
                        {selectedSubmission.name}
                      </h3>
                      {selectedSubmission.company && <p className="text-sm text-gray-500">
                          {selectedSubmission.company}
                        </p>}
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(selectedSubmission.date)}
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Contact Information
                      </h4>
                      <p className="text-sm text-gray-900 mb-1">
                        <span className="font-medium">Email:</span>{' '}
                        {selectedSubmission.email}
                      </p>
                      {selectedSubmission.company && <p className="text-sm text-gray-900 mb-1">
                          <span className="font-medium">Company:</span>{' '}
                          {selectedSubmission.company}
                        </p>}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Message
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">
                          {selectedSubmission.message}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex space-x-3">
                      <Button variant="outline" size="md" onClick={() => window.location.href = `mailto:${selectedSubmission.email}`}>
                        Reply via Email
                      </Button>
                      <Button variant="outline" size="md" onClick={() => handleDelete(selectedSubmission.id)}>
                        Delete
                      </Button>
                    </div>
                  </div> : <div className="h-full flex items-center justify-center text-center p-8">
                    <div>
                      <div className="mx-auto h-12 w-12 text-gray-400 flex items-center justify-center rounded-full bg-gray-100">
                        <InboxIcon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No submission selected
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Select a submission from the list to view details.
                      </p>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Dashboard;