import { useState, useEffect } from 'react';
import { getStudentResults } from '../api/resultApi';

const StudentDashboard = () => {
  const [studentID, setStudentID] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await getStudentResults(studentID);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Student Dashboard</h2>
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">Search</button>
      {results && (
        <div className="mt-4">
          <h3>Results for {results.name}</h3>
          <ul>
            <li>Attendance: {results.marks.attendance}</li>
            <li>Project Review: {results.marks.projectReview}</li>
            <li>Assessment: {results.marks.assessment}</li>
            <li>Project Submission: {results.marks.projectSubmission}</li>
            <li>LinkedIn Post: {results.marks.linkedinPost}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
