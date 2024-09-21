import axios from 'axios';

// API base URLs
const API_URL = 'http://localhost:8080/api/student';  // Ensure this matches your server URL
const API_URL2 = 'http://localhost:8080/api/admin';

// Get the auth token from localStorage (or any storage method you're using)
const token = localStorage.getItem('authToken');

// Function to get student results by student ID
export const getStudentResults = async (studentID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,  // Attach the token to the headers
    },
  };
  
  return axios.get(`${API_URL}/marks/${studentID}`, config);
};

// Function to upload marks (for admins)
export const uploadMarks = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',  // Ensure the content type is multipart/form-data for file upload
      Authorization: `Bearer ${token}`,       // Attach the token for authentication
    },
  };

  return axios.post(`${API_URL2}/upload-marks`, formData, config);
};
