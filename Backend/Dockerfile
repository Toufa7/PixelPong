FROM node:latest

WORKDIR /app/pixelpong

COPY package.json .
COPY .env .
RUN npm install 

COPY . .
CMD [ "bash", "runBackEnd.sh" ]