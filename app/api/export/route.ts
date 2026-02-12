import { NextRequest, NextResponse } from 'next/server';
import { searchEnrollments } from '@/lib/queries';
import { generateExcelExport, generateCSVExport } from '@/lib/export';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'csv';
  const term = searchParams.get('term') || undefined;
  const program = searchParams.get('program') || undefined;
  const search = searchParams.get('search') || undefined;

  const data = await searchEnrollments({ term, program, search });

  if (type === 'excel') {
    const buffer = await generateExcelExport(data);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="filtered-data.xlsx"',
      },
    });
  } else {
    const csv = generateCSVExport(data);
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="filtered-data.csv"',
      },
    });
  }
}
