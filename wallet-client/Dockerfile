# Use nginx as the base image
FROM nginx:alpine

# Copy static site content to nginx default public folder
COPY . /usr/share/nginx/html

# Expose port (nginx default)
EXPOSE 80

# No need to override CMD – nginx already runs