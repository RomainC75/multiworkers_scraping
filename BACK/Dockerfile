FROM node:16

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

# RUN npm ci --only=production

COPY . .

EXPOSE 5000
# CMD [ "node", "server.js" ]
CMD [ "npm", "run", "dev" ]