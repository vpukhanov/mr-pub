FROM node:16.8-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV NODE_ENV=production

COPY . ./

RUN npm run build

CMD [ "npm", "start" ]