#!/bin/bash
npm install
sudo docker-compose --env-file .env up -d
npm install --save @nestjs/schedule
npx prisma migrate dev
npx prisma generate
npm run start:dev
# npm run dev
