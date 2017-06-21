FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --only=dev

COPY build/* /usr/src/app/build/

WORKDIR /usr/src/app/build

EXPOSE 3000
#EXPOSE 27017

CMD ["node","main"]