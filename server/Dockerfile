FROM node:8
RUN mkdir -p /src/app
WORKDIR /src/app

COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
COPY ./nodemon.json /src/nodemon.json
COPY ./eslint.json /src/eslint.json
COPY ./README.md /src/README.md
COPY ./.env /src/.env
COPY ./.gitignore /src/.gitignore

COPY ./app.js /src/app.js
COPY ./global_functions.js /src/global_functions.js

RUN npm cache clean
RUN npm install

COPY ./bin /src/bin
COPY ./config /src/config
COPY ./controllers /src/controllers
COPY ./helpers /src/helpers
COPY ./middleware /src/middleware
COPY ./models /src/models
COPY ./public /src/public
COPY ./repositories /src/repositories
COPY ./routes /src/routes
COPY ./test /src/test
COPY ./views /src/views

ENV NODE_ENV development

EXPOSE 3000
CMD ["node", "node_modules/.bin/nodemon", "-L", "bin/www"]


## To Fix
## 0.1) run database --> docker run -d --rm -p 5432:5432 -e POSTGRES_USER=admin --mount type=bind,source="$(pwd)"/sql,target=/sql --mount type=bind,source="$(pwd)"/.data,target=/var/lib/postgresql/data  --name nd-db postgres:9.6
## 0.2) run migrations --> docker exec nd-db psql admin admin -f /sql/migrations.sql
## 1) build --> docker build -t pasquino81/node-web-app .
## 2) run --> docker run --rm -v app:/src/app -v public:/src/public -p 3000:3000 pasquino81/node-web-app
## 3) stop --> docker stop d874ee8654d9