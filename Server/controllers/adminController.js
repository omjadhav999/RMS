import Admin from '../models/adminModel.js';
import User from '../models/studentModel.js';
import { parseExcelFile } from '../utils/excelUpload.js';

// Function to handle Excel uploads for marks
export const uploadMarks = async (req, res) => {
  try {
    const data = await parseExcelFile(req.file); // Excel file is parsed
    await User.bulkWrite(data); // Bulk update student marks
    res.status(200).json({ message: 'Marks uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading marks' });
  }
};

// Function to create an admin
export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const admin = new Admin({ name, email, password });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error creating admin' });
  }
};
