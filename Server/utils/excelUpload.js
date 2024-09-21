import xlsx from 'xlsx';

export const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const bulkOps = data.map((row) => {
      return {
        updateOne: {
          filter: { studentID: row['Student ID'] },
          update: {
            $set: {
              'marks.attendance': row['Attendance'],
              'marks.projectReview': row['Project Review'],
              'marks.assessment': row['Assessment'],
              'marks.projectSubmission': row['Project Submission'],
              'marks.linkedinPost': row['LinkedIn Post'],
            },
          },
          upsert: true,
        },
      };
    });

    resolve(bulkOps);
  });
};
