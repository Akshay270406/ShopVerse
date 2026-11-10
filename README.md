# ShopVerse

ShopVerse is a full-stack e-commerce monorepo with a Next.js frontend, an Express/TypeScript backend, MongoDB persistence, JWT-cookie authentication, and Razorpay checkout.

## Tech stack

- **Workspace:** pnpm
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Axios
- **Backend:** Node.js, Express 5, TypeScript, Mongoose, JWT, bcryptjs
- **Database:** MongoDB
- **Payments:** Razorpay (test mode recommended for local development)

## Features

- User registration, login, and logout using an HTTP-only JWT cookie
- Product listing and product details
- Anime figurine sample catalogue with locally stored product images
- Persistent client-side shopping cart
- Protected shipping, checkout, and order-history pages
- Razorpay order creation and payment-signature verification

## Prerequisites

- **Node.js 24 LTS recommended** (Next.js 16 requires Node.js 20.9 or later)
- pnpm 10 (the repository declares pnpm 10.20.0)
- MongoDB Atlas account or a local MongoDB instance
- Razorpay account and test-mode API keys for payment testing

## Setup

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/Akshay270406/ShopVerse.git
   cd ShopVerse
   ```

2. Install the workspace dependencies:

   ```bash
   pnpm install
   ```

3. Create the backend environment file by copying `apps/backend/.env.example` to `apps/backend/.env`, then replace the placeholders:

   ```ini
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
   PORT=5000
   JWT_SECRET=use_a_long_random_secret
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
   ```

4. Create the frontend environment file by copying `apps/frontend/.env.example` to `apps/frontend/.env.local`:

   ```ini
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
   ```

   Use the matching Razorpay **test** Key ID in both files. Keep the Razorpay secret only in the backend environment file. Never commit either local environment file.

## Run locally

Open two terminals from the repository root.

**Terminal 1 — backend**

```bash
pnpm --filter backend run dev
```

The API listens on [http://localhost:5000](http://localhost:5000). The health route is [http://localhost:5000/api](http://localhost:5000/api).

**Terminal 2 — frontend**

```bash
pnpm --filter frontend run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Optional: seed sample products

The seed command inserts any missing sample products by name and leaves existing products and users untouched. It is safe to rerun after new sample products are added.

```bash
pnpm --filter backend run seed
```

The legacy `seed:destroy` command is intentionally disabled to avoid accidental database deletion.

## Repository structure

```text
ShopVerse/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── utils/
│   │   │   ├── index.ts
│   │   │   └── seeder.ts
│   │   ├── .env.example
│   │   └── package.json
│   └── frontend/
│       ├── public/
│       │   └── images/figurines/  (sample anime-style figure images)
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── context/
│       │   └── types/
│       ├── .env.example
│       └── package.json
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Notes

- Product image rendering currently uses placeholders in the UI.
- Configure your own MongoDB connection and Razorpay test credentials before testing registration, orders, or checkout.
- The project is an MVP and should receive a security review before production deployment.
