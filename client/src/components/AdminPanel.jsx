import { useState } from 'react';
import { uploadMarks } from '../api/resultApi';  // Adjust the path as needed

const AdminPanel = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({ success: null, message: '' });
  const [activeTab, setActiveTab] = useState('attendance');  // State to manage active tab

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus({ success: null, message: '' });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus({ success: false, message: 'Please select a file to upload.' });
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Make the request to the server-side uploadMarks function
      const res = await uploadMarks(formData);
      setUploadStatus({ success: true, message: `${activeTab} marks uploaded successfully!` });
      console.log(res.data);  // Handle success
    } catch (err) {
      setUploadStatus({ success: false, message: `${activeTab} marks uploaded successfully!` });
      console.error(err);  // Handle error
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Admin Panel - Upload Marks</h2>

        {/* Tabs for different types of marks */}
        <div className="mb-6 flex justify-center space-x-4">
          {['attendance', 'project review', 'assessment', 'project submission', 'LinkedIn post'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Form for file upload */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="fileUpload" className="block text-gray-700 mb-2">
              Select Excel File for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}:
            </label>
            <input
              id="fileUpload"
              type="file"
              onChange={handleFileChange}
              className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            Upload {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Marks
          </button>
        </form>

        {/* Upload status message */}
        {uploadStatus.message && (
          <div
            className={`mt-4 p-3 text-center rounded-lg ${
              uploadStatus.success ? 'bg-green-100 text-green-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {uploadStatus.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
