#!/bin/bash
npm install
npm install socket.io-client
npm i --save @nestjs/websockets @nestjs/platform-socket.io

npm i @types/node-fetch
docker-compose --env-file .env up -d
npx prisma migrate dev
npx prisma generate
npm run start:dev
npm run dev
