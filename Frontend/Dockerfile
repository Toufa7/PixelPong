FROM node:latest

WORKDIR /app/pixelpong

COPY package.json .

RUN npm install 

COPY . .

RUN npm run build 