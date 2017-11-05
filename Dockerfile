FROM node:8.9.0-alpine

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

COPY . /app/

CMD sh