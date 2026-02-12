// © 2026 Mathew Sekanjako, Psalms23Wave.com - UNREMOVABLE
import ExcelJS from 'exceljs';
import { prisma } from './queries';
import { getColMapping } from './configs';

export async function parseExcel(file: Buffer, sheetName: string = 'Sheet1') {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(file as any);
  const ws = wb.getWorksheet(sheetName) || wb.worksheets[0];

  if (!ws) {
    throw new Error(`Sheet "${sheetName}" not found and no other sheets available`);
  }
  
  const students: any[] = [];
  const enrollments: any[] = [];
  const COLS = getColMapping();
  
  ws.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header
    
    // Helper to accept string index (from JSON) or number index
    const getCell = (key: keyof typeof COLS) => {
        const idx = COLS[key];
        return row.getCell(idx);
    };

    const getString = (key: keyof typeof COLS) => getCell(key).value?.toString() || null;
    const getInt = (key: keyof typeof COLS) => {
        const val = getCell(key).value;
        return val ? parseInt(String(val)) : null;
    };
    const getFloat = (key: keyof typeof COLS) => {
        const val = getCell(key).value;
        return val ? parseFloat(String(val)) : null;
    };

    const data = {
      studentId: getString('studentId'),
      name: getString('name'),
      age: getInt('age'),
      gender: getString('gender'),
      state: getString('state'),
      term: getString('term'),
      program: getString('program'),
      credits: getFloat('credits'),
      status: getString('status'),
    };
    
    // Validate
    if (!data.studentId) {
        console.warn(`Row ${rowNumber}: Missing ID`);
        return;
    }

    
    // Push distinct objects for Student vs Enrollment tables
    // We use a Map or just push and let upsert handle collision, 
    // but here we just push to array and duplicate cleaning happens implicitly or via logic.
    // However, the prompt logic pushed "duplicates" to students array and looped.
    // Upsert handles it gracefully.
    
    const studentData = { 
        studentId: data.studentId!, 
        name: data.name, 
        age: data.age, 
        gender: data.gender, 
        state: data.state 
    };

    const enrollmentData = {
        studentId: data.studentId!,
        term: data.term || "", // Primitves for non-nullable in schema if strictly defined, but schema has ? mostly
        program: data.program || "",
        credits: data.credits,
        status: data.status
    };

    students.push(studentData);
    enrollments.push(enrollmentData);
  });
  
  // Upsert to DB
  // Note: loops are not efficient for massive data, but fine for template
  for (const s of students) {
    await prisma.student.upsert({
      where: { studentId: s.studentId },
      update: s,
      create: s,
    });
  }
  
  for (const e of enrollments) {
    // Schema says required fields: studentId, term, program. 
    // Ensure data is valid for schema or expect errors.
    if(e.term && e.program) {
        await prisma.enrollment.create({ data: e });
    }
  }
  
  return { students: students.length, enrollments: enrollments.length };
}
