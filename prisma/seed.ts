import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');
  
  const seedData = Array.from({ length: 10 }).map((_, i) => ({
    studentId: `S${1000 + i}`,
    name: `Student ${i + 1}`,
    age: 20 + (i % 5),
    gender: i % 2 === 0 ? 'M' : 'F',
    state: ['NY', 'CA', 'TX', 'FL', 'WA'][i % 5],
  }));

  for (let i = 0; i < seedData.length; i++) {
    const s = seedData[i];
    const student = await prisma.student.upsert({
      where: { studentId: s.studentId },
      update: {},
      create: s,
    });

    await prisma.enrollment.create({
      data: {
        studentId: student.studentId,
        term: 'Fall 2025',
        program: i % 2 === 0 ? 'Computer Science' : 'Data Science',
        credits: 12 + (i % 4),
        status: 'Enrolled'
      }
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
