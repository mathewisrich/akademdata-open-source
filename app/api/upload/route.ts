import { NextRequest, NextResponse } from 'next/server';
import { parseExcel } from '@/lib/parser';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get('file') as File;
    
    if (!file) {
        return NextResponse.json({ error: 'No file' }, { status: 400 });
    }
    
    const bytes = await file.arrayBuffer();
    const result = await parseExcel(Buffer.from(bytes));
    
    return NextResponse.json(result);
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || 'Server Error' }, { status: 500 });
  }
}
