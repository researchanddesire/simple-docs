.PHONY: serve build shell

serve:
	docker compose up --build

build:
	docker compose run --rm docs mkdocs build --clean --strict

shell:
	docker compose run --rm docs bash
