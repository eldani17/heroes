# stage 1: build
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force && npm install

COPY . .

RUN npm run build

# stage 2: serve
FROM nginx:alpine

COPY --from=build /usr/src/app/dist/heroes/browser /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
