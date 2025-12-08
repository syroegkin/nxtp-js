FROM node:24.11.1-alpine3.23 AS intermediate

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install && \
    npm run build && \
    rm -rf node_modules && \
    npm install --omit=dev

# ---------------------------------------------------------------- #

FROM node:24.11.1-alpine3.23

COPY --from=intermediate /usr/src/app/package.json /usr/src/app/package.json
COPY --from=intermediate /usr/src/app/dist /usr/src/app/dist
COPY --from=intermediate /usr/src/app/node_modules /usr/src/app/node_modules

WORKDIR /usr/src/app

RUN addgroup -g 1001 -S nxtp && adduser -S nxtp -u 1001 -G nxtp -s /bin/sh
RUN chown -R nxtp:nxtp /usr/src/app
USER nxtp

CMD ["npm", "start"]
