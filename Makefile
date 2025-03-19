COMPOSE = docker compose
BACKEND_DIR = backend

.PHONY: run stop restart logs deps migrate

run:
	$(COMPOSE) up -d --build

stop:
	$(COMPOSE) down

restart: stop run

logs:
	$(COMPOSE) logs -f

deps:
	cd $(BACKEND_DIR) && npm ci

migrate:
	cd $(BACKEND_DIR) && npx prisma migrate dev

test:
	$(COMPOSE) up -d --build
	cd $(BACKEND_DIR) && npm test