FROM node:18.16.0

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build:ssr

RUN mv /app/dist /dist

RUN rm -r /app

RUN mv /dist /app/dist

CMD [ "node", "dist/frontend/server/main.js" ]
