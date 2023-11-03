FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port that your NestJS application will run on
EXPOSE 3000

# Set the MONGO_URL as an environment variable
ENV MONGO_URL="mongodb://mongodb-service:27017/ddd"

# Command to run your NestJS application
CMD [ "npm", "start" ]
