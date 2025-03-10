# Use official Node.js LTS image with Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./ 
COPY prisma/schema.prisma ./prisma/

# Install dependencies (including Prisma)
RUN npm ci --only=production && \
    npx prisma generate

# Copy all application files
COPY . .

# Expose the port your server uses
EXPOSE 3000  # ✅ Comment should be on a new line

# Start the Node.js server
CMD ["node", "./routes/index.js"]
