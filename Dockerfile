FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./backend/

RUN npm install --prefix ./backend

COPY ./backend ./backend

RUN npx prisma generate --schema=./backend/prisma/schema.prisma

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
