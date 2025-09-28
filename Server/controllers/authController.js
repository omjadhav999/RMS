import Student from '../models/studentModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user (Admin/Student)
export const registerUser = async (req, res) => {
  const { username, gmail, password, role, studentID } = req.body;

  try {
    // Validate required fields
    if (!gmail || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user already exists
    const existingUser = await Student.findOne({ gmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new Student({
      username,
      studentID,
      gmail,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Return success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user and generate JWT token
export const loginUser = async (req, res) => {
  const { gmail, password } = req.body;

  try {
    // Validate required fields
    if (!gmail || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    console.log('Login attempt for email:', gmail);

    // Find the user by email
    const user = await Student.findOne({ gmail });
    if (!user) {
      console.log('User not found for email:', gmail);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user.gmail, 'Role:', user.role);

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', gmail);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login successful for user:', gmail);

    // Send the token and user information in the response
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        gmail: user.gmail,
        role: user.role
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};