FROM node:14.15.4-alpine

RUN apk add --no-cache bash 

RUN npm i -g @nestjs/cli@7.4.1
RUN npm install @nestjs/common
RUN npm install @nestjs/core

USER node

WORKDIR /home/node/app