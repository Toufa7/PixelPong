#!/bin/bash
open -a Docker
docker-compose -f ./Backend/docker-compose.yml --env-file ./Backend/.env up -d
cd Frontend
kill lsof -i:5173 | tail -n 1 | awk '{printf $2}'
(npm run dev&)
if [[ $? == 0 ]]; then
  echo "FrontEnd is running"
fi
cd $OLDPWD
cd Backend
echo 
(npm run start:dev&)
if [[ $? == 0 ]]; then
  echo "Backend is running"
fi
(npx prisma studio&)
if [[ $? == 0 ]]; then
  echo "Prisma is running"
fi