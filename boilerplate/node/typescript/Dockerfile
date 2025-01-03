# Use the official Node.js image as a base
FROM node:20

# Set the working directory inside the container
WORKDIR /

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Expose the port the app will run on
EXPOSE 8000

# Set environment variables from .env file
# Docker Compose will automatically load the environment variables from the .env file
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}
ENV DATABASE_URL=${DATABASE_URL}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_USER=${DB_USER}
ENV MAIL_HOST=${MAIL_HOST}
ENV MAIL_PORT=${MAIL_PORT}
ENV MAIL_USERNAME=${MAIL_USERNAME}
ENV MAIL_PASSWORD=${MAIL_PASSWORD}
ENV MAIL_FROM_NAME=${MAIL_FROM_NAME}
ENV MAIL_FROM_ADDRESS=${MAIL_FROM_ADDRESS}
ENV LOG_LEVEL=${LOG_LEVEL}
ENV BASE_API_URL=${BASE_API_URL}
ENV DOCKER_ENV=${DOCKER_ENV}
ENV THIRD_PARTY_API_KEY=${THIRD_PARTY_API_KEY}
ENV APP_NAME=${APP_NAME}
ENV TIMEZONE=${TIMEZONE}

# Command to run the app
CMD ["npm", "start"]
