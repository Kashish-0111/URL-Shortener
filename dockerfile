# Base image - Node.js
FROM node:18-alpine

# Working directory container ke andar
WORKDIR /app

# Package files copy karo
COPY package*.json ./

# Dependencies install karo
RUN npm install

# Saara code copy karo
COPY . .

# Port expose karo
EXPOSE 5000

# App start karo
CMD ["node", "src/index.js"]