# akademdata-open-source

[![npm](https://img.shields.io/npm/v/akademdata-open-source)](https://www.npmjs.com/package/akademdata-open-source)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)

© 2026 Mathew Sekanjako. MIT License. Psalms23Wave: https://www.psalms23wave.com

Template for Excel analytics apps.

## Features

- **Drag-drop upload/validate/parse**
- **Search/filter/export CSV/Excel**
- **Charts/tables**

![Dashboard Demo](https://via.placeholder.com/800x400?text=Dashboard+GIF+Placeholder)

## Quickstart

### Option A: Install from NPM

Use this if you want to inspect the core logic or use it as a reference in your `node_modules`.

```bash
npm i akademdata-open-source
```

### Option B: Clone & Run (Recommended)

Use this to build your own app on top of this template.

```bash
git clone https://github.com/mathewisrich/akademdata-open-source.git
cd akademdata-open-source
npm install
npx prisma db push
npm run seed  # Adds 10 fake records
npm run dev
```

Demo: Upload sample.xlsx → see dashboard.

## Intended Use

This template is intended as a foundation for:

- Internal analytics tools
- Institutional data platforms
- Reporting dashboards and admin portals
- Prototypes and production systems that need a structured codebase from day one

Consumers of this template are expected to adapt the stack, modules, and deployment configuration to their own environment.

## Adapt to Your Data

To customize this template for your own data schema:

1.  **Edit `data/colMappings.json`** to match your Excel columns.
2.  **Modify `prisma/schema.prisma`** to define your data model.
3.  **Update `lib/parser.ts`** to map the Excel data to your Prisma model.

See [docs/ADAPT.md](docs/ADAPT.md) for a full guide.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Repository Ownership

This repository is maintained under the personal GitHub account of the original author and is also associated with the [Psalms23Wave](https://github.com/Psalms23Wave) organization.

- Company site: https://www.psalms23wave.com
- Contact: contact@psalms23wave.com

## License

This project is licensed under the MIT License.

See the [LICENSE](https://github.com/mathewisrich/akademdata-open-source/blob/main/LICENSE) file for full details.

## Dual Repo Sync

This template syncs to Psalms23Wave org:

```bash
git remote add org https://github.com/Psalms23Wave/akademdata-open-source.git
git push origin main
git push org main
```
