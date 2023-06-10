FROM node:18

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY dist .
ENV TZ="Paris/Europe"

CMD ["node", "index.js"]