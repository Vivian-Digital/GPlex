# Use a base image with Node.js installed
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy tsconfig.json
COPY tsconfig.json ./

# Copy source code
COPY src ./src

# Install app dependencies
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Define the command to start supervisord
CMD npm run start
