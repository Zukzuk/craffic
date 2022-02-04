FROM mhart/alpine-node:16 AS development
# https://sysdig.com/blog/dockerfile-best-practices/

WORKDIR /app/dev/server

COPY . .

RUN npm install glob rimraf

RUN npm install --only=development

CMD ["npm", "run start:dev"]