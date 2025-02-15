COMPOSE=docker compose

run:
	$(COMPOSE) up -d --build

stop:
	$(COMPOSE) down

deps:
	cd backend && npm install