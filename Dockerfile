# ================================
#  Dockerfile for Render deployment
# ================================
#  1️⃣ Build stage – compile the React frontend
# ================================
FROM node:20-slim AS builder
WORKDIR /app

# Install frontend dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy the rest of the frontend source and build
COPY frontend/ ./
RUN npm run build   # creates ./dist

# ================================
#  2️⃣ Runtime stage – backend (Express) + static assets
# ================================
FROM node:20-slim
WORKDIR /app

# Install only production dependencies for the backend
COPY backend/package*.json ./
RUN npm ci --production

# Copy backend source code
COPY backend/ ./

# Bring the compiled frontend bundle into the container
COPY --from=builder /app/dist ./frontend/dist

# Expose the port Render expects (5000 by default)
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
