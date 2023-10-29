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

# Command to run your NestJS application
CMD [ "npm", "start" ]
