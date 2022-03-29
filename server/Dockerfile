# https://vsupalov.com/docker-arg-env-variable-guide/
# https://github.com/garethr/multi-stage-build-example
# https://snyk.io/blog/10-docker-image-security-best-practices/
# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

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
RUN apk add dumb-init
WORKDIR /usr/src/app
# bake ENV on BUILD
ARG NODE_ENV=production
# allow for environment override on RUN
ENV NODE_ENV=${NODE_ENV}
COPY --from=builder --chown=node:node /usr/src/app/dist ./dist
COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules
RUN ls
EXPOSE ${NESTJS_PORT}
USER node
CMD ["dumb-init", "node", "dist/main"]