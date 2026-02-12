// © 2026 Matthew Ssekandjako, Psalms23Wave.com - UNREMOVABLE
import fs from 'fs';
import path from 'path';

export const DEFAULT_COLS = {
  studentId: 1, name: 2, age: 3, gender: 4, state: 5,
  term: 6, program: 7, credits: 8, status: 9
};

export function getColMapping() {
  try {
    const configPath = path.join(process.cwd(), 'data', 'colMappings.json');
    if (fs.existsSync(configPath)) {
      const file = fs.readFileSync(configPath, 'utf-8');
      const json = JSON.parse(file);
      return { ...DEFAULT_COLS, ...json };
    }
  } catch (e) {
    console.error("Error loading colMappings.json", e);
  }
  return DEFAULT_COLS;
}
