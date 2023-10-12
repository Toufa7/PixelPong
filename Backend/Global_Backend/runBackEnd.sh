#!/bin/bash
npm install
docker-compose --env-file .env up -d
npx prisma migrate dev
npx prisma generate
npm run start:dev
npm run dev
