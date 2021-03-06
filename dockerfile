FROM node:10

# Create app directory
WORKDIR /usr/src/backend

# Install app dependencies
COPY package*.json ./

RUN yarn

# Bundle app source
COPY . .

# Build arguments
EXPOSE 8082

CMD ["yarn", "start"]