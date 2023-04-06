FROM node:12.22.10 AS dev

WORKDIR /usr/src/main-api

COPY . .

RUN npm install -g @nestjs/cli

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start:dev"]

FROM node:12.22.10 AS prodution

WORKDIR /usr/src/main-api

COPY . .

RUN npm install -g @nestjs/cli

RUN yarn install

EXPOSE 3000

CMD ["yarn", "build"]