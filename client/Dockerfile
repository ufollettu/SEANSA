FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/client/ .

## Create a container with dist only (works!)

# 1) ng build --prod (in client/ folder)
# 2) docker image build -t ngapp .
# 3) docker run -p 4200:80 --rm ngapp


## Create a container with angular project

# FROM node:8

# RUN mkdir -p /src

# WORKDIR /src

# COPY ./package.json /src/package.json
# COPY ./package-lock.json /src/package-lock.json
# COPY ./angular.json /src/angular.json
# COPY ./tsconfig.json /src/tsconfig.json
# COPY ./tslint.json /src/tslint.json
# COPY ./README.md /src/README.md
# COPY ./.env /src/.env
# COPY ./.editorconfig /src/.editorconfig
# COPY ./.gitignore /src/.gitignore

# RUN npm cache verify
# RUN npm install
# RUN npm audit fix

# COPY ./dist /src/dist
# COPY ./e2e /src/e2e
# COPY ./src /src/src

# ENV NODE_ENV development

# EXPOSE 4200

# CMD ["npm","start"]