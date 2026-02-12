// © 2026 Matthew Ssekandjako, Psalms23Wave.com - UNREMOVABLE
import ExcelJS from 'exceljs';
import { Enrollment, Student } from '@prisma/client';

type ExportData = Enrollment & { student: Student | null };

export async function generateExcelExport(data: ExportData[]) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Export');

  sheet.columns = [
    { header: 'Student ID', key: 'studentId', width: 15 },
    { header: 'Name', key: 'name', width: 25 },
    { header: 'Program', key: 'program', width: 25 },
    { header: 'Term', key: 'term', width: 15 },
    { header: 'Gender', key: 'gender', width: 10 },
    { header: 'Age', key: 'age', width: 10 },
    { header: 'State', key: 'state', width: 15 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Credits', key: 'credits', width: 10 },
  ];

  data.forEach(item => {
    sheet.addRow({
      studentId: item.studentId,
      name: item.student?.name || '',
      program: item.program,
      term: item.term,
      gender: item.student?.gender || '',
      age: item.student?.age || '',
      state: item.student?.state || '',
      status: item.status,
      credits: item.credits,
    });
  });

  return await workbook.xlsx.writeBuffer();
}

export function generateCSVExport(data: ExportData[]) {
    // Simple CSV generation
    const headers = ['Student ID', 'Name', 'Program', 'Term', 'Gender', 'Age', 'State', 'Status', 'Credits'];
    const rows = data.map(item => [
        item.studentId,
        `"${item.student?.name || ''}"`,
        `"${item.program}"`,
        item.term,
        item.student?.gender || '',
        item.student?.age || '',
        item.student?.state || '',
        item.status,
        item.credits
    ]);
    
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
