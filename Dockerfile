FROM node:20

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/frontend
RUN npm install
RUN npm run build

WORKDIR /usr/src/app/backend
RUN npm install

EXPOSE 3005

CMD [ "node", "index.js" ]
