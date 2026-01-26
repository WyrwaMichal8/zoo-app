FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Uruchom seed po starcie
CMD npm run build && npm run seed && npm run start:prod