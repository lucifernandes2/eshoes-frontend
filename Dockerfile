FROM node:20-alpine3.20

WORKDIR /app/

ENV NODE_ENV production

COPY package*.json ./
COPY .next ./.next
COPY public ./public

RUN npm ci --only=production

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]