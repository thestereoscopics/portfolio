# Welcome to my portfolio

## Project info

```
npm i

npm run dev
```

`npm run dev` serves the site only. To exercise the contact form locally, run `npx vercel dev` instead (it also runs `api/send-email.js`).

## What technologies are used for this project?

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deploy

Hosted on Vercel (free tier) with the project root set to `client`. Domain is registered at Namecheap with DNS pointed at Vercel.

The contact form posts to `api/send-email.js`, a Vercel serverless function that sends through [Resend](https://resend.com). Set these in Vercel → Settings → Environment Variables (see `.env.example`):

- `RESEND_API_KEY`
- `CONTACT_FROM` – sender on the Resend-verified domain, e.g. `Jeremy Sell <contact@jeremysell.com>`
- `CONTACT_TO` – inbox that receives messages
