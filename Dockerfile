# Base image for Node.js environment
FROM node:20-alpine

# Working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Set the NODE_EXTRA_CA_CERTS environment variable
ENV NODE_EXTRA_CA_CERTS=/usr/share/elasticsearch/config/certs/ca/ca.crt

# Copy remaining project files
COPY . .

# Expose the application's port
EXPOSE 3000

# Define the command to start the application
CMD ["node", "index.js"]