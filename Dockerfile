FROM node:18.16.0

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build:ssr

RUN mv /app/dist /dist

RUN rm -r /app

RUN mv /dist /app/dist

RUN npm install live-server -g

CMD [ "live-server", "dist/frontend/browser/", "--entry-file=index.html" ]
