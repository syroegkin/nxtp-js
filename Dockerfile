FROM node:22.9-alpine3.20 as intermediate

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install && \
    npm run build && \
    rm -rf node_modules && \
    npm install --omit=dev

# ---------------------------------------------------------------- #

FROM node:22.9-alpine3.20

COPY --from=intermediate /usr/src/app/package.json /usr/src/app/package.json
COPY --from=intermediate /usr/src/app/dist /usr/src/app/dist
COPY --from=intermediate /usr/src/app/node_modules /usr/src/app/node_modules

WORKDIR /usr/src/app

CMD ["npm", "start"]