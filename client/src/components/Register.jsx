import { useState } from 'react';
import { register } from '../api/authApi';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Register = () => {
  // Initialize form state with the structure of the given JSON data
  const [formData, setFormData] = useState({
    studentID: '',
    user: '',
    password: '',
    gmail: '',
    role: 'student', // Default role can be 'student' or 'admin'
  });

  const notifySuccess = () => toast.success('Registered successfully!');
  const notifyError = () => toast.error('Registration failed. user already exsit with this email or student ID');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      console.log(res.data);  
      notifySuccess(); // Show success notification
      // Optionally, navigate to login page after successful registration
    } catch (err) {
      console.error(err);  // Handle error
      notifyError(); // Show error notification
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/boy-working-from-home-office-student-freelancer-computer-table_104571-206.jpg?w=996')" }}
    >
      {/* Overlay for background */}
      <div className="absolute inset-0 bg-blue-900 opacity-40"></div>

      {/* Toaster for displaying notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Registration Form */}
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Register as {formData.role === 'admin' ? 'Admin' : 'Student'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Student ID */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="studentID">
              Student ID
            </label>
            <input
              id="studentID"
              type="text"
              placeholder="Enter your student ID"
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setFormData({ ...formData, studentID: e.target.value })}
              required
            />
          </div>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="user">
              Name
            </label>
            <input
              id="user"
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setFormData({ ...formData, user: e.target.value })}
              required
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="gmail">
              Email Address
            </label>
            <input
              id="gmail"
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setFormData({ ...formData, gmail: e.target.value })}
              required
            />
          </div>
          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-all duration-200"
          >
            Register
          </button>

          {/* Link to Login Page */}
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Login here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
