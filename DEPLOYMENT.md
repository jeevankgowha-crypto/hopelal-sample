# Deployment Guide

## Environment

Create `server/.env` from `.env.example` and set:

- `MONGO_URI`: MongoDB Atlas connection string.
- `JWT_SECRET`: 32+ character random secret.
- `COOKIE_SECRET`: 32+ character random secret.
- `CLIENT_URL`: production frontend URL.
- `SMTP_*`: SMTP provider details for appointment confirmations, admin lead alerts, and reminders.

Create `client/.env` from `.env.example` and set:

- `VITE_API_URL`: production API URL ending in `/api`.
- `VITE_MAP_EMBED_URL`: Google Maps embed URL.

## Build

```bash
npm run install:all
npm --prefix client run build
npm --prefix server start
```

## Suggested Hosting

- Frontend: Vercel, Netlify, Cloudflare Pages, or Nginx static hosting.
- Backend: Render, Railway, Fly.io, AWS ECS, or a VPS with PM2.
- Database: MongoDB Atlas.

## Security Checklist

- Force HTTPS.
- Change seeded admin password.
- Use strong secrets.
- Keep CORS restricted to the production domain.
- Enable database IP allowlisting.
- Configure SMTP SPF/DKIM records.
- Add uptime monitoring and server log retention.
