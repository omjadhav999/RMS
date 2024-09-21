import { useState } from 'react';
import { login } from '../api/authApi';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ gmail: '', password: '' });
  const navigate = useNavigate(); // Hook for navigation

  // Display success toast notification
  const notifySuccess = () => toast.success('Login successfully!');
  
  // Display error toast notification (optional)
  const notifyError = () => toast.error('Login failed. Please try again.');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      const userRole = res.data.user.role;
      console.log("role:",userRole)  // Assuming 'role' is part of the response data
      
      notifySuccess();  // Show success notification
      // console.log();  // Handle login success

      // Check the user's role and redirect accordingly
      if (userRole === 'admin') {
        // Redirect to the admin panel
        navigate('/admin'); // Adjust this path as per your routing
      } else if (userRole === 'student') {
        // Redirect to the student dashboard
        navigate('/student-dashboard'); // Adjust this path as per your routing
      } else {
        // Handle other roles or default case
        navigate('/admin'); // Optional: handle default role
      }
    } catch (err) {
      notifyError();  // Show error notification if login fails
      console.error(err);  // Handle error
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/boy-working-from-home-office-student-freelancer-computer-table_104571-206.jpg?w=996')" }}
    >
      {/* Overlay for background */}
      <div className="absolute inset-0 bg-blue-900 opacity-40"></div>

      {/* Toaster for displaying notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Login Form */}
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Student Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, gmail: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
