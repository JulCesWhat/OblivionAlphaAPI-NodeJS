FROM node

RUN mkdir -p /usr/src/app/build/public/api-explorer/
RUN mkdir -p /usr/src/app/build/server/common/swagger/
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY /build/public/api-explorer/* /usr/src/app/build/public/api-explorer/
COPY /build/server/common/swagger/Api.yaml /usr/src/app/build/server/common/swagger/
COPY /build/public/index.html /usr/src/app/build/public/
COPY /build/*  /usr/src/app/build/

WORKDIR /usr/src/app/build

EXPOSE 3000
#EXPOSE 27017

CMD ["node","main"]