# Daj Herbate

Project's Google Drive: https://drive.google.com/drive/folders/13rDXZN7zfV3hCC7OurLJ4NfSy9TIETTB

## Setup

To run this project locally:

```
git pull
npm install
```

create .env file in root folder and copy and paste environment variables provided in the doc

```
npm run dev
```

optionally to access and modify the database run

```
npx prisma studio
```

## Dependencies docs

- https://ui.shadcn.com/ - components
- https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts - routing
- https://tailwindcss.com/ - styling
- https://trpc.io/docs/server/routers - routers (queries from db)
- https://www.prisma.io/docs/concepts/components/prisma-schema/data-model - modyfing db models inside schema.prisma
