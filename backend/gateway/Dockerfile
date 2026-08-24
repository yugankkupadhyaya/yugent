FROM node:22-alpine

WORKDIR /app

COPY gateway/package*.json ./
RUN npm ci --omit=dev

COPY gateway/ .
COPY shared ./shared

EXPOSE 8000

CMD ["npm", "start"]
