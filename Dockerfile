
FROM node:12


RUN mkdir -p /usr/src/app


WORKDIR /usr/src/app


COPY . /usr/src/app


RUN npm install


EXPOSE 5002


CMD npm start