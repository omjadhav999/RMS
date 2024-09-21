import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentID: { 
    type: String, 
    unique: true, 
    required: true // Ensures that studentID is provided
  },
  username: { 
    type: String, 
    // required: true // Ensures that name is provided
  },
  gmail:{
    type:String,
    // required:true
  },
  password:{
    type:String,
    // required:true,
    // unique:true

  },
  role:{
    type:String,
    required:true
  },
  marks: {
    attendance: { type: Number, default: 0 }, // Default value to 0
    projectReview: { type: Number, default: 0 },
    assessment: { type: Number, default: 0 },
    projectSubmission: { type: Number, default: 0 },
    linkedinPost: { type: Number, default: 0 }
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

export default mongoose.model('Student', studentSchema);
