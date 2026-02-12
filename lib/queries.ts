// © 2026 Mathew Sekanjako, Psalms23Wave.com - UNREMOVABLE
import { PrismaClient, Prisma } from '@prisma/client';

// Best practice for Next.js dev to avoid too many connections
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getDashboard() {
  const students = await prisma.student.count();
  const enrollments = await prisma.enrollment.count();
  const recent = await prisma.enrollment.findMany({
    take: 10,
    include: { student: true },
    orderBy: { id: 'desc' }
  });
  return { students, enrollments, recent };
}

export async function getChartData() {
  const data = await prisma.enrollment.groupBy({
    by: ['program'],
    _count: { id: true }
  });
  return data.map(d => ({ label: d.program, value: d._count.id }));
}

export async function searchEnrollments(filters: { term?: string; program?: string; search?: string }) {
  const where: Prisma.EnrollmentWhereInput = {};

  if (filters.term && filters.term !== 'all') {
    where.term = filters.term;
  }
  
  if (filters.program && filters.program !== 'all') {
    where.program = filters.program;
  }

  if (filters.search) {
      where.OR = [
          { student: { name: { contains: filters.search } } },
          { studentId: { contains: filters.search } }
      ];
  }

  return await prisma.enrollment.findMany({
    where,
    include: { student: true },
    orderBy: { id: 'desc' },
    take: 100 // Limit to avoid massive renders
  });
}

