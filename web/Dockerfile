FROM node:latest
RUN mkdir /web
WORKDIR /web
COPY . /web
RUN npm install
CMD [ "npm", "start" ]