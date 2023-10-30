#!/bin/bash
# npm install
# docker-compose --env-file .env up -d
# npm install --save @nestjs/schedule
npx prisma migrate dev --name ok
npx prisma generate
npm run build
npm run start:dev
# npm run dev