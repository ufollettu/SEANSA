# FROM nginx:alpine

# COPY nginx.conf /etc/nginx/nginx.conf

# WORKDIR /usr/share/nginx/html
# COPY dist/client/ .

## Create a container with angular project

FROM node:8

RUN mkdir -p /src

WORKDIR /src

COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
COPY ./angular.json /src/angular.json
COPY ./tsconfig.json /src/tsconfig.json
COPY ./tslint.json /src/tslint.json
COPY ./.editorconfig /src/.editorconfig
COPY ./.gitignore /src/.gitignore

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
RUN npm install -g @angular/cli

RUN npm cache verify
RUN npm install
RUN npm audit fix

COPY ./dist /src/dist
COPY ./e2e /src/e2e
COPY ./src /src/src

ENV NODE_ENV development

EXPOSE 4200

# CMD ["npm","start"]
CMD ng serve --host 0.0.0.0 --poll=1000