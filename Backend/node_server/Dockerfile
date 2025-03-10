FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/
RUN npm ci --only=production && \
    npx prisma generate
COPY . .
EXPOSE 3000
CMD ["node", "--experimental-vm-modules", "index.js"]