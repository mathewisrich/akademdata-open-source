# How to Adapt This Template

This template is designed to be easily modified for any data structure. Follow these steps to adapt it to your specific needs.

## 1. Update the Database Schema

Open `prisma/schema.prisma` and modify the `Student` and `Enrollment` models to match your data.

```prisma
model YourModel {
  id        String   @id @default(uuid())
  yourField String
  // ...
}
```

After modifying the schema, update the database:

```bash
npx prisma db push
```

## 2. Configure Column Mappings

Open `data/colMappings.json`. This file maps Excel column headers (or indices) to your database fields.

```json
{
  "studentId": 1,
  "name": 2,
  "customField": 3
}
```

- Values are 1-based column indices (A=1, B=2, etc).
- You can also use header names if you update `lib/parser.ts` to support header matching.

## 3. Update the Parser

Modify `lib/parser.ts` to handle your new data structure.

- Update the `data` object to extract fields based on your new schema.
- Update the `prisma.upsert` calls to save to your new tables.

## 4. Customize the Dashboard

- **Stats**: Update `getDashboard()` in `lib/queries.ts`.
- **Charts**: Update `getChartData()` in `lib/queries.ts` and `components/ChartComponent.tsx`.
- **Table**: Update `components/EnrollmentTable.tsx` columns.

## 5. Branding

- Replace `public/logo.svg` and `public/icon.svg`.
- Update colors in `tailwind.config.js` or `app/globals.css`.

## Need Help?

Check the [Prisma Documentation](https://www.prisma.io/docs) or [Next.js Documentation](https://nextjs.org/docs).
