FROM node:18-alpine

WORKDIR /opt/app

COPY . .
RUN npm install --omit=dev

EXPOSE 3000
CMD node index.js
