# Use Node for building and serving
FROM node:20

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Build the Vite app
RUN npm run build

# Expose port for preview
EXPOSE 6179

# Start the Vite preview server
CMD ["npm", "run", "preview", "--", "--port", "6179"]