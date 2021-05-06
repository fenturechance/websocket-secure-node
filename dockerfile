FROM alpine
RUN apk update && apk add bash
WORKDIR /usr/src/app
RUN apk add nodejs-current
RUN apk add nodejs-npm
RUN npm install pm2 -g