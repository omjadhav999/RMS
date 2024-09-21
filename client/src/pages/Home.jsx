import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-cover bg-center bg-fixed" 
         style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?abstract,education')" }}>
      {/* Overlay for background image */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg">
          Welcome to the Student Portal
        </h1>
        <p className="text-lg text-gray-300 mb-6 text-center max-w-md leading-relaxed">
          Easily manage your results, track progress, and stay up-to-date with your academic performance.
        </p>
        
        <div className="space-x-6">
          <Link 
            to="/login" 
            className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-110"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
