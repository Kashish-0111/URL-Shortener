# URL Shortener Microservice 🔗

A production-ready URL Shortener REST API built with Node.js, Express, MongoDB, Redis, and Docker.

## Features ✨
- 🔗 URL Shortening
- 🎯 Custom Alias Support
- ⏰ URL Expiry with MongoDB TTL Index
- ⚡ Redis Caching for fast redirects
- 🛡️ Rate Limiting (10 requests/minute)
- ✅ Input Validation
- 🐳 Dockerized with Docker Compose

## Tech Stack 🛠️
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Cache:** Redis
- **Containerization:** Docker + Docker Compose

## Getting Started 🚀

### Without Docker
```bash
npm install
npm run dev
```

### With Docker
```bash
docker-compose up --build
```

## API Endpoints 📡

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/shorten | Shorten a URL |
| GET | /:shortCode | Redirect to original URL |
| GET | /api/stats/:shortCode | Get URL stats |

## Request Examples 📝

### Shorten URL
```json
POST /api/shorten
{
    "originalUrl": "https://www.youtube.com"
}
```

### Custom Alias
```json
POST /api/shorten
{
    "originalUrl": "https://www.youtube.com",
    "customAlias": "yt"
}
```

## Response Example ✅
```json
{
    "originalUrl": "https://www.youtube.com",
    "shortCode": "yt",
    "clicks": 0,
    "createdAt": "2026-03-24T07:38:50.000Z",
    "expireAt": "2026-03-31T07:38:50.000Z"
}
```

## Environment Variables ⚙️
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
REDIS_HOST=redis
```