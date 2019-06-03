FROM node:10 AS builder
RUN mkdir -p /web/build
WORKDIR /web
COPY package.json package-lock.json /web/
COPY src/ /web/src/
COPY public/ /web/public/
RUN npm install --production
RUN npm run build

FROM nginx:1.14
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /web/build /usr/share/nginx/html
