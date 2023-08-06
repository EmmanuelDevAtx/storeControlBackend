FROM node:19-alpine3.16
WORKDIR /app
RUN apk add g++ make py3-pip
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
