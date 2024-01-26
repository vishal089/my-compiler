# Use a Debian-based image
FROM debian:buster

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl gnupg

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Install OpenJDK for Java
RUN apt-get install -y openjdk-11-jdk

# Install GCC for C
RUN apt-get install -y build-essential

# Install G++ for C++
RUN apt-get install -y g++

# Install Python 3
RUN apt-get install -y python3

# Install Mono for C#
# RUN apt-get install -y mono-complete

# Clean up
# RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Create a non-root user (optional but recommended for security)
# RUN useradd -m -s /bin/bash myuser
# USER myuser

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy your Node.js project files into the container
COPY . .

# Command to run your Node.js application (update this based on your project)
CMD ["npm", "start"]

