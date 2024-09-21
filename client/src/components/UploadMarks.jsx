import axios from 'axios';

const API_URL = 'http://localhost:8080/api/results';

export const uploadMarks = async (formData) => {
  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
