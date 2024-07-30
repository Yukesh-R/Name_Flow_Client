# Stage 1: Build the Angular application
FROM node:20.14.0-alpine3.19 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install --force

# Copy the rest of the application files
RUN npm install -g @angular/cli@17

COPY . .

# Build the Angular application
RUN npm run build --configuration=production

# Stage 2: Serve the built application with Nginx
FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to Nginx html directory
COPY --from=build /app/dist/name-flow-client/browser /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80







