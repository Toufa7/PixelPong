#!/bin/bash
open -a Docker
docker-compose -f ./Backend/user_account/docker-compose.yml --env-file ./Backend/user_account/.env up -d
cd Frontend
(npm run dev&)
if [[ $? == 0 ]]; then
  echo "FrontEnd is running"
fi
cd $OLDPWD
cd Backend/user_account
echo 
(npm run start:dev&)
if [[ $? == 0 ]]; then
  echo "Backend is running"
fi
(npx prisma studio&)
if [[ $? == 0 ]]; then
  echo "Prisma is running"
fi