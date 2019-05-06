FROM node:10 AS builder
RUN mkdir -p /web/build
WORKDIR /web
COPY package.json /web/
COPY . /web

RUN npm install --production
RUN npm run build

FROM nginx:1.14
COPY --from=builder /web/build /usr/share/nginx/html

EXPOSE 3000:80