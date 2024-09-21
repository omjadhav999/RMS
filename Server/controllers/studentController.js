import Students from '../models/studentModel.js';

// Function to get student marks
export const getStudentMarks = async (req, res) => {
  const { studentID } = req.params;
  console.log("Student ID:", studentID);

  try {
    // Find the student by studentID
    const student = await Students.findOne({ studentID });
    
    // If student is not found, return a 404 error
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Return the student's marks
    res.status(200).json({ marks: student.marks,username:student.username });
  } catch (error) {
    console.error("Error fetching student marks:", error); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching student marks' });
  }
};
