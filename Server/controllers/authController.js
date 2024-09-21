import Student from '../models/studentModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user (Admin/Student)
export const registerUser = async (req, res) => {
  const { username, gmail,password, role ,studentID } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Student.findOne({ gmail});
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
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user and generate JWT token
export const loginUser = async (req, res) => {
  const { username, gmail ,password } = req.body;

  try {
    // Find the user by username
    const user = await Student.findOne({ gmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the token and user information in the response
    res.status(200).json({
      message: 'Login successful',
    
      user: {
        id: user._id,
        username,
        gmail:user.gmail,
        role: user.role
      },
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
