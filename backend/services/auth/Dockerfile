FROM node:22-alpine

WORKDIR /app

COPY package*json ./

RUN npm ci --omit=dev

COPY ./services/auth/package*json ./services/auth/

RUN cd services/auth && npm ci --omit=dev

COPY services/auth ./services/auth

COPY shared ./shared

WORKDIR /app/services/auth

EXPOSE 8001

CMD ["npm", "start"]

