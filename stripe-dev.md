# Stripe Development Setup

This document outlines the steps to configure your Stripe account for local development and testing of the Woodbury HOA payment system.

---

## Quick Start Checklist

- [ ] Enable test mode in Stripe Dashboard
- [ ] Copy test API keys to `.env.local`
- [ ] Set up webhook endpoint with Stripe CLI
- [ ] Test a payment with test card numbers

---

## 1. Stripe Dashboard Setup

### Switch to Test Mode

1. Log into [Stripe Dashboard](https://dashboard.stripe.com)
2. Toggle **Test mode** in the top-right corner (should show "Test mode" badge)

### Get Test API Keys

1. Go to **Developers → API Keys**
2. Copy your test keys:
   - **Publishable key:** `pk_test_...`
   - **Secret key:** `sk_test_...`

---

## 2. Local Environment Variables

Create or update `.env.local` with your test keys:

```bash
# Stripe Test Keys
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# App URL (for Stripe redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 3. Webhook Setup for Local Development

Stripe can't reach `localhost` directly, so use the Stripe CLI to forward webhook events.

### Install Stripe CLI

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Or download from: https://stripe.com/docs/stripe-cli
```

### Login to Stripe CLI

```bash
stripe login
```

### Forward Webhooks to Localhost

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will output a webhook signing secret like:

```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

Copy this `whsec_` value to your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

> **Note:** You need to run `stripe listen` every time you develop locally. The webhook secret may change between sessions.

---

## 4. Test Card Numbers

Use these test card numbers in Stripe Checkout:

| Scenario                    | Card Number           | CVC          | Expiry          |
| --------------------------- | --------------------- | ------------ | --------------- |
| **Successful payment**      | `4242 4242 4242 4242` | Any 3 digits | Any future date |
| **Requires authentication** | `4000 0025 0000 3155` | Any 3 digits | Any future date |
| **Declined**                | `4000 0000 0000 0002` | Any 3 digits | Any future date |
| **Insufficient funds**      | `4000 0000 0000 9995` | Any 3 digits | Any future date |

Full list: [Stripe Testing Documentation](https://docs.stripe.com/testing)

---

## 5. Testing the Payment Flow

1. Start the dev server:

   ```bash
   pnpm dev
   ```

2. In a separate terminal, start webhook forwarding:

   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

3. Navigate to the dues/payment page on the site

4. Click a "Pay Online" button

5. Complete checkout with a test card

6. Verify:
   - Redirected to `/payment/success` page
   - Webhook events logged in the `stripe listen` terminal
   - Payment visible in Stripe Dashboard (Test mode) under **Payments**

---

## 6. Viewing Test Data in Stripe Dashboard

With test mode enabled, you can view:

- **Payments:** All test payments and their status
- **Customers:** Auto-created customer records
- **Events:** Webhook events and delivery status
- **Logs:** API request/response logs for debugging

---

## 7. Webhook Events Reference

The webhook handler at `/api/stripe/webhook` processes these events:

| Event                           | Description                              |
| ------------------------------- | ---------------------------------------- |
| `checkout.session.completed`    | Customer completed checkout successfully |
| `payment_intent.succeeded`      | Payment was successful                   |
| `payment_intent.payment_failed` | Payment failed                           |

---

## 8. Environment Variable Summary

| Variable                | Dev Value               | Description                           |
| ----------------------- | ----------------------- | ------------------------------------- |
| `STRIPE_SECRET_KEY`     | `sk_test_...`           | Test secret key from Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...`             | From `stripe listen` CLI output       |
| `NEXT_PUBLIC_APP_URL`   | `http://localhost:3000` | Local dev server URL                  |

---

## Troubleshooting

### "Webhook signature verification failed"

- Make sure `stripe listen` is running
- Copy the fresh `whsec_` secret from the CLI output to `.env.local`
- Restart the Next.js dev server after updating `.env.local`

### Checkout redirects to wrong URL

- Verify `NEXT_PUBLIC_APP_URL` is set to `http://localhost:3000`
- Restart the dev server after changing environment variables

### Payment succeeds but webhook not received

- Confirm `stripe listen --forward-to localhost:3000/api/stripe/webhook` is running
- Check the Stripe CLI terminal for errors
- Verify the webhook route exists at `app/api/stripe/webhook/route.ts`

---

## Production Checklist (Before Handoff)

When ready to deploy to production with real payments:

- [ ] Switch all `sk_test_` keys to `sk_live_` keys
- [ ] Set up a real webhook endpoint in Stripe Dashboard (not CLI)
- [ ] Use the production webhook signing secret
- [ ] Update `NEXT_PUBLIC_APP_URL` to the production domain
- [ ] Test with a real card (small amount, then refund)
