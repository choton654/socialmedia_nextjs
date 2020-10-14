FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

RUN npm run build

CMD node server.js
# EXPOSE 3000


# FROM node:14

# # ENV PORT 3000

# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Installing dependencies
# COPY package*.json /usr/src/app/
# RUN npm install

# # Copying source files
# COPY . /usr/src/app

# # install new dependencies if any
# RUN npm install

# # uninstall the current bcrypt modules
# RUN npm uninstall bcrypt

# # install the bcrypt modules for the machine
# RUN npm install bcrypt

# # Building app
# RUN npm run build
# EXPOSE 3000

# # Running the app
# CMD node server.js