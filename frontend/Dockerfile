# Use Node.js as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the frontend
RUN npm run build

# Serve the frontend
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
