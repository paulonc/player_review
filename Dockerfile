FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./backend/

RUN npm install --prefix ./backend

COPY ./backend ./backend

RUN npx prisma generate --schema=./backend/prisma/schema.prisma

EXPOSE 3000

CMD ["npm", "start", "--prefix", "./backend"]
