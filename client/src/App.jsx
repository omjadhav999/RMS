import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import StudentDashboard from './components/StudentDashboard';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        {/* <Toaster/> */}
      </Routes>
    </Router>
  );
}

export default App;
