import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentID: { 
    type: String, 
    unique: true, 
    sparse: true // This allows multiple documents without studentID
  },
  username: { 
    type: String, 
    required: false
  },
  gmail: {
    type: String,
    required: true, // Email should be required for login
    unique: true // Email should be unique
  },
  password: {
    type: String,
    required: true // Password should be required
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'student'], // Restrict to valid roles
    default: 'student'
  },
  marks: {
    attendance: { type: Number, default: 0 },
    projectReview: { type: Number, default: 0 },
    assessment: { type: Number, default: 0 },
    projectSubmission: { type: Number, default: 0 },
    linkedinPost: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);