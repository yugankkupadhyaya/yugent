FROM node

WORKDIR /app

COPY package*json ./

RUN npm install

COPY ./services/resume/package*json ./services/resume/

RUN cd services/resume && npm install

COPY services/resume ./services/resume

COPY shared ./shared

WORKDIR /app/services/resume

EXPOSE 8002

CMD [ "npm","start" ]

