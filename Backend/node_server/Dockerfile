# Use official Node.js LTS with Alpine (smaller image)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/

# Install production dependencies
RUN npm ci --only=production && \
    npx prisma generate

# Copy application files
COPY . .

# Set environment variables (create .env.production for production)
COPY .env.production ./.env

# Expose the server port
EXPOSE 3000

# Start the server with ES modules support
CMD ["node", "--experimental-vm-modules", "index.js"]