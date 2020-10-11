FROM node:alpine

RUN mkdir -p /client

WORKDIR /client

COPY package*.json ./
COPY ./ ./

RUN yarn install

CMD yarn run build