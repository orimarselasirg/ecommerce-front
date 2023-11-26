FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock .

ENV  NODE_ENV local

RUN yarn install --production

COPY . .

RUN yarn build

COPY .next ./.next

EXPOSE 3000

CMD ["yarn", "start"]