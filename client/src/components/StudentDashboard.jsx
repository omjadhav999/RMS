import { useState } from 'react';
import { getStudentResults } from '../api/resultApi';

const StudentDashboard = () => {
  const [studentID, setStudentID] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!studentID.trim()) {
      setError('Please enter a valid Student ID');
      return;
    }

    setError('');
    try {
      const res = await getStudentResults(studentID);
      setResults(res.data);
      console.log("data details",res)
      console.log("data",res.data) // Assuming res.data contains the student object
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Student Dashboard</h2>
        
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>

        {error && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 text-center rounded">
            {error}
          </div>
        )}

        {results && results.marks ? (
       <div className="mt-8 mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg">
       <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Results for {results.username}</h3>
       <ul className="space-y-4 text-center">
         <li className="flex justify-between items-center text-gray-700">
           <span className="font-medium">Attendance:</span>
           <span className="font-bold text-gray-900">{results.marks.attendance}</span>
         </li>
         <li className="flex justify-between items-center text-gray-700">
           <span className="font-medium">Project Review:</span>
           <span className="font-bold text-gray-900">{results.marks.projectReview}</span>
         </li>
         <li className="flex justify-between items-center text-gray-700">
           <span className="font-medium">Assessment:</span>
           <span className="font-bold text-gray-900">{results.marks.assessment}</span>
         </li>
         <li className="flex justify-between items-center text-gray-700">
           <span className="font-medium">Project Submission:</span>
           <span className="font-bold text-gray-900">{results.marks.projectSubmission}</span>
         </li>
         <li className="flex justify-between items-center text-gray-700">
           <span className="font-medium">LinkedIn Post:</span>
           <span className="font-bold text-gray-900">{results.marks.linkedinPost}</span>
         </li>
       </ul>
       <div className="mt-6 text-center">
         <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none">
           Download Results
         </button>
       </div>
     </div>
     
        ) : (
          results && (
            <div className="mt-6 text-center text-gray-600">
              No marks available for this student.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
