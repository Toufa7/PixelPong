#!/bin/bash
npm install
docker-compose --env-file .env up -d
npm i bcrypt
npm i -D @types/bcrypt
npm install --save @nestjs/schedule
npx prisma migrate dev
npx prisma generate
npm run start:dev
# npm run dev
