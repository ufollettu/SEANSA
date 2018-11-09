FROM node:8

RUN mkdir -p /src

WORKDIR /src

COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
COPY ./angular.json /src/angular.json
COPY ./tsconfig.json /src/tsconfig.json
COPY ./tslint.json /src/tslint.json
COPY ./README.md /src/README.md
COPY ./.env /src/.env
COPY ./.editorconfig /src/.editorconfig
COPY ./.gitignore /src/.gitignore

RUN npm cache clean
RUN npm install

COPY ./dist /src/dist
COPY ./e2e /src/e2e
COPY ./srv /src/src

ENV NODE_ENV development

EXPOSE 4200

CMD ["npm","start"]

## To Fix
## 0.1) run database --> docker run -d --rm -p 5432:5432 -e POSTGRES_USER=admin --mount type=bind,source="$(pwd)"/sql,target=/sql --mount type=bind,source="$(pwd)"/.data,target=/var/lib/postgresql/data  --name nd-db postgres:9.6
## 0.2) run migrations --> docker exec nd-db psql admin admin -f /sql/migrations.sql
## 1) build --> docker build -t pasquino81/node-web-app .
## 2) run --> docker run --rm -v app:/src/app -v public:/src/public -p 3000:3000 pasquino81/node-web-app
## 3) stop --> docker stop d874ee8654d9