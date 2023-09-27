#!/bin/bash
npm install
npm i @types/node-fetch
docker-compose --env-file .env up -d
npx prisma migrate dev
npx prisma generate
npx prisma studio
npm run start:dev
