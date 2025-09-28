import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 8080;

// Connect to database first
connectDB().then(() => {
  // Start server only after database connection
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend URL: http://localhost:5173`);
    console.log(`Backend URL: http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});  