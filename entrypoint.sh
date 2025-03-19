#!/bin/sh
echo "Executing Prisma migrations..."
npx prisma migrate deploy --schema=./backend/prisma/schema.prisma

echo "Initializing application..."
exec npm start --prefix ./backend
