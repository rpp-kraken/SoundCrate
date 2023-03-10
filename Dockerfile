# Start with node image on alpine runner (alpine is very lightweight)
FROM node:16-alpine

# Create a system user instead of running commands from root user (for security)
# RUN addgroup app && adduser -S -G app app
# USER app

# Working directory from which to execute commands
WORKDIR /app

# Copy files to container's filesystem and install dependencies
COPY package*.json .
RUN npm install
COPY . .

# Build the webpack bundle
RUN npm run build

# Starts server when new container is created
CMD ["npm", "start"]
