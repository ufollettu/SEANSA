FROM node:8
RUN mkdir -p /src/app
WORKDIR /src/app

COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
COPY ./nodemon.json /src/nodemon.json
COPY ./README.md /src/README.md
COPY ./.sequelizerc /src/.sequelizerc
COPY ./.eslintrc.json /src/.eslintrc.json
COPY ./.env /src/.env
COPY ./.gitignore /src/.gitignore

COPY ./app.js /src/app.js
COPY ./global_functions.js /src/global_functions.js

RUN npm cache verify
RUN npm install

COPY ./bin /src/bin
COPY ./config /src/config
COPY ./controllers /src/controllers
COPY ./helpers /src/helpers
COPY ./middleware /src/middleware
COPY ./migrations /src/migrations
COPY ./models /src/models
COPY ./public /src/public
COPY ./repositories /src/repositories
COPY ./routes /src/routes
COPY ./seeders /src/seeders
COPY ./seeds /src/seeds
COPY ./test /src/test
COPY ./views /src/views

ENV NODE_ENV development

EXPOSE 3000
CMD ["npm", "start"]


## command list

# 1) docker image build -t exapp .
# 2) docker run -p 3000:3000 --name exapp --link sqldb:mysql -d exapp

## vai in mysql-dump e lancia 
# 3) docker exec exapp npm run dbinit
# oppure
# 3) docker exec -i sqldb /usr/bin/mysql -u root --password=radiohead

## Delete all containers
# docker rm $(docker ps -a -q)
## Delete all images
# docker rmi $(docker images -q)