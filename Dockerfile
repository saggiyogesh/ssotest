FROM node:10-alpine

RUN apk --update add git
ADD . /app
WORKDIR /app
RUN npm i

ENTRYPOINT node .
