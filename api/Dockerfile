FROM node:14.5.0-alpine3.12 AS builder

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 4001

CMD ["npm", "start"]

# FROM nginx:1.19.1-alpine

# RUN rm -rf /usr/share/nginx/html/*

# COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html
# COPY --from=builder /usr/src/app/nginx/ /etc/nginx/conf.d

# EXPOSE 80
