import React, { useState } from 'react';
import { uploadMarks } from '../api/resultApi';

const AdminDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadType, setUploadType] = useState('attendance');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadSuccess(false); // Reset success message
    setError(''); // Reset error message
  };

  // Handle form submit to upload the file
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('type', uploadType); // Specify the type of marks (attendance, projectReview, etc.)

    try {
      const res = await uploadMarks(formData);
      if (res.status === 200) {
        setUploadSuccess(true);
        setSelectedFile(null);
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('File upload failed. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-md">
        <label htmlFor="uploadType" className="block mb-2 text-lg">
          Select Upload Type:
        </label>
        <select
          id="uploadType"
          value={uploadType}
          onChange={(e) => setUploadType(e.target.value)}
          className="mb-4 p-2 border rounded-md w-full"
        >
          <option value="attendance">Attendance Marks</option>
          <option value="projectReview">Project Review Marks</option>
          <option value="assessment">Assessment Marks</option>
          <option value="projectSubmission">Project Submission Marks</option>
          <option value="linkedinPost">LinkedIn Post Marks</option>
        </select>

        <label htmlFor="fileInput" className="block mb-2 text-lg">
          Upload Excel File:
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded-md w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
        >
          Upload Marks
        </button>
      </form>

      {uploadSuccess && (
        <div className="mt-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded-md">
          Marks uploaded successfully!
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-10">
        <h3 className="text-xl font-semibold">Uploaded Marks:</h3>
        <p className="text-sm text-gray-500">Students will see real-time updates in their dashboards.</p>
        {/* Add logic here to display uploaded marks if needed */}
      </div>
    </div>
  );
};

export default AdminDashboard;
