FROM node:lts-alpine

LABEL name="wizardmc-note-api"
LABEL version="1.0"

ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV APP_KEY=VPKSi84B15noudhHcltq0J-1S8khDPx1
ENV DRIVE_DISK=local
ENV DB_CONNECTION=pg

RUN [ "mkdir", "/app" ]
WORKDIR /app
ADD "https://api.github.com/repos/Galitan-dev/wizardmc/commits?per_page=1" /cache/commit
RUN [ "git", "clone", "https://github.com/Galitan-dev/wizardmc", "." ]

WORKDIR /app/api
ADD "https://raw.githubusercontent.com/Galitan-dev/wizardmc.fr/master/api/package.json" /cache/package
RUN [ "yarn", "--ignore-platform" ]
ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" /cache/random
RUN [ "yarn", "build" ]

WORKDIR /app/api/build
ADD "https://raw.githubusercontent.com/Galitan-dev/wizardmc.fr/master/api/package.json" /cache/package2
RUN [ "yarn", "--production", "--ignore-platform" ]

ENTRYPOINT [ "node", "/app/api/build/server.js" ]
CMD [ "" ]