
# This first section is a builder which is used to reduce the final size of the image of frontend application.
# Uses node version 22 as our base image and export as builder
FROM node:22-slim AS builder

# set the main directory as app
WORKDIR /frontend

COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy all files now from the root directory to the working root directory
COPY . .


# Uses node version 22 as our base image
FROM node:22-slim

# set the main directory as app
WORKDIR /app

COPY --from=builder /frontend .


# Expose the port
EXPOSE 9000

# Run the app. this is equal to RUN npm start. Docker only actually runs with the below command. You can only have 1 CMD in a dockerfile
# Docker uses the CMD to START the container AFTER building
CMD ["npm", "run", "dev"]