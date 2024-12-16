# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application (assuming you have a build step)
RUN npm run build

# Expose the app's port (adjust based on your application port)
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start"]
