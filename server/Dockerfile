# Check for unexpected alpine behavour: https://wiki.alpinelinux.org/wiki/Docker

### DEVELOPMENT ###
FROM node:16.14-alpine As development
WORKDIR /usr/src/app
ENV NODE_ENV=development
COPY package*.json . ./
RUN ls
RUN npm install --loglevel verbose

### BUILDER ###
FROM node:16.14-alpine as builder
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=development /usr/src/app ./
RUN ls
# build and remove all devDependencies
RUN npm run build --loglevel verbose && npm prune --production

### PRODUCTION ###
FROM node:16.14-alpine as production
WORKDIR /usr/src/app
ARG NODE_ENV=production
# allow for environment override
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
RUN ls
USER node
EXPOSE ${NESTJS_PORT}
ENTRYPOINT ["node"]
CMD ["dist/main"]