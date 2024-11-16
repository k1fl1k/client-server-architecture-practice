# Use the official Node.js image
FROM node:22

# Set SHELL environment variable to a supported shell
ENV SHELL=/bin/bash
# Install pnpm globally using corepack
RUN corepack enable && corepack prepare pnpm@latest --activate
# Set PNPM_HOME to define the global bin directory and add it to PATH
ENV PNPM_HOME=/node/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
# Run pnpm setup to configure global bin directory
RUN pnpm setup

# Set the working directory
WORKDIR /srv/node/app

RUN pnpm install -g nodemon

# Copy package.json and install dependencies
COPY package*.json ./

RUN pnpm install

# Copy the rest of the application
COPY . .

# Change the ownership of the application to the node user
RUN chown -R node:node /srv/node/app

# Change to the node user
USER node

# Expose the port the app runs on
EXPOSE 3000

EXPOSE 9229

# Command to run the app
CMD ["nodemon","--inspect=0.0.0.0:9229", "server.js"]
