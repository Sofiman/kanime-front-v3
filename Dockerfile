FROM node:19.6-bullseye-slim AS build
LABEL stage=build

WORKDIR /usr/src/kanime-front-v3

COPY . .
RUN npm ci
RUN npm run build

##################################
FROM oven/bun

# The port that your application listens to.
EXPOSE 80
ENV PORT=80

WORKDIR /usr/src/kanime-front-v3
COPY --from=build /usr/src/kanime-front-v3/node_modules /usr/src/kanime-front-v3/node_modules
COPY --from=build /usr/src/kanime-front-v3/build /usr/src/kanime-front-v3/build

ENTRYPOINT ["bun", "run", "build/index.js", "--production"]

