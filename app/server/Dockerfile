FROM node:20.11.0

WORKDIR /app
COPY build .
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production

CMD [ "node", "index.js" ]
