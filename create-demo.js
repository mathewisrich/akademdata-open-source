const ExcelJS = require('exceljs');

async function createDemo() {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Sheet1');

  ws.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Age', key: 'age', width: 10 },
    { header: 'Gender', key: 'gender', width: 10 },
    { header: 'State', key: 'state', width: 15 },
    { header: 'Term', key: 'term', width: 10 },
    { header: 'Program', key: 'program', width: 20 },
    { header: 'Credits', key: 'credits', width: 10 },
    { header: 'Status', key: 'status', width: 15 },
  ];

  ws.addRow({ id: 'S001', name: 'Alice Smith', age: 20, gender: 'F', state: 'NY', term: 'Fall23', program: 'CS', credits: 15, status: 'Active' });
  ws.addRow({ id: 'S002', name: 'Bob Jones', age: 22, gender: 'M', state: 'CA', term: 'Fall23', program: 'Math', credits: 12, status: 'Active' });
  ws.addRow({ id: 'S003', name: 'Charlie Day', age: 21, gender: 'M', state: 'TX', term: 'Spring24', program: 'CS', credits: 18, status: 'Probation' });
  ws.addRow({ id: 'S004', name: 'Diana Bose', age: 19, gender: 'F', state: 'NY', term: 'Spring24', program: 'Physics', credits: 16, status: 'Active' });
  ws.addRow({ id: 'S005', name: 'Evan Hart', age: 23, gender: 'M', state: 'FL', term: 'Fall23', program: 'Math', credits: 14, status: 'Graduated' });

  await wb.xlsx.writeFile('public/demo.xlsx');
  console.log('Created public/demo.xlsx');
}

createDemo();
