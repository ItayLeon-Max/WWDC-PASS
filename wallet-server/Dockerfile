# Use an official Node.js runtime as a base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript code
RUN npm run build

# Remove source files (optional)
RUN rm -rf ./src

# Expose port if needed (change if your server runs on another port)
EXPOSE 3000

# Run the server (runs dist/app.js)
CMD ["npm", "start"]