# Woodbury Estates HOA - Project Handoff

This document tracks tasks and information needed for project handoff to the customer.

---

## Stripe Payment Setup

The website includes online payment functionality for HOA dues. The customer will need to set up their own Stripe account and configure it for the website.

### Step 1: Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and click "Start now"
2. Complete the account registration with:
   - Business name: Woodbury Estates HOA Phase 6 (or similar)
   - Business type: Non-profit or Organization
   - Business address and contact information
   - Bank account for receiving payouts
3. Complete identity verification as required by Stripe

### Step 2: Get API Keys

1. Log into the [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers → API Keys**
3. Copy both keys:
   - **Publishable key** (starts with `pk_live_`)
   - **Secret key** (starts with `sk_live_`)

> **Note:** Use test mode keys (`pk_test_` / `sk_test_`) for initial testing before going live.

### Step 3: Set Up Webhook Endpoint

The website uses webhooks to receive payment notifications from Stripe.

1. In Stripe Dashboard, go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Configure the endpoint:
   - **Endpoint URL:** `https://[your-domain]/api/stripe/webhook`
   - **Events to listen for:**
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
4. Click **Add endpoint**
5. Copy the **Signing secret** (starts with `whsec_`)

### Step 4: Configure Environment Variables

The following environment variables must be set in the hosting environment (Vercel, etc.):

| Variable | Description | Example |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Stripe secret API key | `sk_live_xxx...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | `whsec_xxx...` |
| `NEXT_PUBLIC_APP_URL` | Production website URL | `https://woodburyestates.org` |

### Step 5: Test the Integration

1. Set environment variables with **test mode** keys first
2. Make a test payment using [Stripe test cards](https://docs.stripe.com/testing#cards):
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
3. Verify payment appears in Stripe Dashboard
4. Switch to **live mode** keys when ready for production

### Payment Processing Notes

- **Processing fees:** The website automatically calculates and adds Stripe's processing fee (2.9% + $0.30) to each payment, so the HOA receives the full dues amount.
- **No pre-configured products needed:** Payment amounts are pulled from Contentful CMS fee schedules and sent to Stripe dynamically.
- **Payment metadata:** Each payment includes metadata (fee type, property address, resident name) for record-keeping in the Stripe Dashboard.

---

## Additional Handoff Tasks

_Add additional handoff tasks below as the project progresses._

### Contentful CMS Access

- [ ] Create Contentful account for customer
- [ ] Add customer as admin to the Contentful space
- [ ] Provide training on content management
- [ ] Document content types and their usage

### Domain & Hosting

- [ ] Transfer or configure customer's domain
- [ ] Set up Vercel project under customer's account (or transfer)
- [ ] Configure environment variables in hosting platform
- [ ] Set up custom domain in Vercel

### Documentation & Training

- [ ] Provide overview of website features
- [ ] Train on updating events/calendar
- [ ] Train on posting news articles
- [ ] Train on managing board member information
- [ ] Train on updating fee schedules
- [ ] Train on document uploads

### Ongoing Maintenance

- [ ] Discuss hosting costs (Vercel, Contentful plans)
- [ ] Discuss ongoing support options
- [ ] Provide emergency contact information
