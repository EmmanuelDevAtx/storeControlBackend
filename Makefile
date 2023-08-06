.PHONY: test

test:
	npm run test

start-dev:
	docker-compose up --build -d

gql-gen:
	npm run gql_gen

staging-logs:
	heroku git:remote -a loty-backend-staging
	heroku addons:open papertrail

prod-logs:
	heroku git:remote -a loty-backend-prod
	heroku addons:open papertrail
