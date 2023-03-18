# Start with node image on alpine runner (alpine is very lightweight)
FROM node:16-alpine

# Working directory from which to execute commands
WORKDIR /app

# Copy files to container's filesystem and install dependencies
COPY package*.json .
RUN npm install --legacy-peer-deps
COPY . .

# Build the webpack bundle
RUN npm run build

# Starts server when new container is created
CMD ["npm", "start"]
