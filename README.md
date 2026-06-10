# Arigya Hospital

A premium, responsive hospital website for Arigya Hospital with React, Tailwind CSS, Express, MongoDB, JWT admin authentication, lead and appointment management, email automation hooks, and AI assistant endpoints.

## Quick Start

```bash
npm run install:all
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run seed
npm run dev
```

Client: `http://localhost:5173`  
API: `http://localhost:5000/api`

Default seeded admin:

```text
Email: admin@arigya.local
Password: ChangeMe@123
```

Change these immediately in production.

## Stack

- React + Vite + Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Helmet, CORS, rate limiting, validation, CSRF token endpoint
- Nodemailer email automation

## Deployment

1. Create MongoDB Atlas database and set `MONGO_URI`.
2. Set strong values for `JWT_SECRET`, `COOKIE_SECRET`, and `CLIENT_URL`.
3. Configure SMTP credentials in `server/.env`.
4. Build frontend with `npm run build`.
5. Deploy `server` to Render/Railway/Fly/AWS and `client/dist` to Vercel/Netlify, or serve the built files behind Nginx.
6. Add HTTPS, real domain, DNS records, and monitoring.

## Production Notes

- The server protects admin APIs with JWT bearer auth.
- Public form routes validate and rate-limit submissions.
- Email reminders are implemented as callable service methods and can be scheduled with cron or a worker queue.
- The chatbot endpoint returns deterministic healthcare triage guidance and should be connected to a clinical governance-approved AI model before giving personalized medical advice.
