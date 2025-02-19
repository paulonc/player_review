COMPOSE = docker compose

.PHONY:

run:
	$(COMPOSE) up -d --build

stop:
	$(COMPOSE) down

restart: stop run

logs:
	$(COMPOSE) logs -f

deps:
	cd backend && npm ci

migrate:
	cd backend && npx prisma migrate dev

