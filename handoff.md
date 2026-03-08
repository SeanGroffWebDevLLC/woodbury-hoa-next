# Woodbury Estates HOA - Project Handoff

This document tracks tasks and information needed for project handoff to the customer.

**Developer contact:** Sean Groff — [your email] | [your phone]

---

## Section 1: Domain Purchase (Vercel)

The website is hosted on Vercel under your developer's account — this keeps hosting free. Your domain will also be purchased through Vercel so everything stays in one place.

> **Note:** Vercel's free plan does not support multiple team members, so hosting will remain under your developer's account. Your developer manages all deployments on your behalf. You will own your domain, Stripe, Resend, and Contentful accounts directly.

### Step 1: Purchase Your Domain

Your developer will handle this on your behalf. They will:

1. Log into Vercel and navigate to **Domains**
2. Search for your desired domain name
3. Purchase the domain — the cost will be billed to you directly (see below)

> **Recommended domain:** `woodburyestates.org` — the `.org` extension is traditional for community organizations and HOAs.
>
> **Cost:** `.org` domains are typically ~$15–20/year, `.com` domains ~$10–15/year.

**Action required from HOA:** Provide a credit card to your developer to complete the domain purchase, or reimburse the developer after purchase.

---

## Section 2: Vercel Hosting Setup

The website is hosted on Vercel under your developer's account at no cost.

### What Your Developer Manages

- Deploying all website updates
- Connecting your domain to the project
- Managing environment variables and secret keys
- Monitoring uptime and performance

### Configure Environment Variables

Your developer will configure the following secret keys. You will need to provide the keys from Stripe (Section 4) and Resend (Section 3) once those accounts are set up.

| Variable                    | Description                        | Where to get it     |
| --------------------------- | ---------------------------------- | ------------------- |
| `STRIPE_SECRET_KEY`         | Stripe secret API key              | Stripe Dashboard    |
| `STRIPE_WEBHOOK_SECRET`     | Stripe webhook signing secret      | Stripe Dashboard    |
| `NEXT_PUBLIC_STRIPE_KEY`    | Stripe publishable key             | Stripe Dashboard    |
| `NEXT_PUBLIC_APP_URL`       | Your production website URL        | Your domain         |
| `RESEND_API_KEY`            | Resend email API key               | Resend Dashboard    |
| `CONTENTFUL_SPACE_ID`       | Contentful space identifier        | Contentful Settings |
| `CONTENTFUL_DELIVERY_TOKEN` | Contentful content delivery token  | Contentful Settings |

### Vercel Billing Notes

- Hosting is **free** on the Hobby plan under your developer's account
- Domain renewal (~$15–20/year) will be invoiced to the HOA annually

---

## Section 3: Resend Email Setup

Resend handles all outgoing emails from the website (contact form submissions, etc.). You own this account fully — your developer will not have access to it.

### Step 1: Create a Resend Account

1. Go to [resend.com](https://resend.com) and click **Get Started**
2. Sign up using the HOA email: `woodburyestateshoa.phase6@gmail.com`
3. Verify your email address
4. When prompted to create a project, name it `Woodbury HOA Website`

### Step 2: Add and Verify Your Domain

Resend must verify that you own your domain before it can send emails from it.

1. In the Resend dashboard, click **Domains** in the left sidebar
2. Click **Add Domain**
3. Type in your domain (e.g. `woodburyestates.org`) and click **Add**
4. Resend will display a list of DNS records — leave this screen open
5. Take a screenshot of the DNS records or leave the browser tab open
6. Notify your developer — they will add these DNS records in Vercel on your behalf
7. Once your developer confirms the records are added, return to this screen and click **Verify**
8. If verification fails, wait 15 minutes and try again — DNS changes can take time to propagate

### Step 3: Create an API Key

1. In the Resend dashboard, click **API Keys** in the left sidebar
2. Click **Create API Key**
3. Name it: `Woodbury HOA Website`
4. Set permission to **Full Access**
5. Click **Add**
6. **Copy the key immediately** — it will only be shown once and cannot be retrieved later
7. Paste the key into a secure note or password manager
8. Share the key with your developer so they can configure the website

> **How to share securely:** Avoid sending the API key over email or text. Use a password manager with sharing capability, or read it to your developer directly over the phone.

### Resend Billing Notes

- The **Free plan** allows 3,000 emails/month — more than enough for an HOA website
- Paid plans start at $20/month if higher volume is ever needed

---

## Section 4: Stripe Payment Setup

The website includes online payment functionality for HOA dues.

### Step 1: Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and click **Start now**
2. Complete the account registration with:
   - Business name: Woodbury Estates HOA Phase 6 (or similar)
   - Business type: Non-profit or Organization
   - Business address and contact information
   - Bank account for receiving payouts
3. Complete identity verification as required by Stripe

### Step 2: Add Your Developer as a Team Member

1. In the Stripe Dashboard, click **Settings** (gear icon, top right)
2. Under **Team and security**, click **Team**
3. Click **Invite user**
4. Enter your developer's email: **[developer email]**
5. Set the role to **Administrator**
6. Click **Send invitation**

### Step 3: Get API Keys

1. Log into the [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers → API Keys**
3. Copy both keys:
   - **Publishable key** (starts with `pk_live_`)
   - **Secret key** (starts with `sk_live_`)
4. Send these securely to your developer

> **Note:** Use test mode keys (`pk_test_` / `sk_test_`) for initial testing before going live.

### Step 4: Set Up Webhook Endpoint

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
6. Send this securely to your developer

### Step 5: Test the Integration

1. Your developer will set environment variables with **test mode** keys first
2. Make a test payment using [Stripe test cards](https://docs.stripe.com/testing#cards):
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
3. Verify the payment appears in Stripe Dashboard
4. Your developer will switch to **live mode** keys when ready for production

### Payment Processing Notes

- **Processing fees:** The website automatically calculates and adds Stripe's processing fee (2.9% + $0.30) to each payment, so the HOA receives the full dues amount.
- **No pre-configured products needed:** Payment amounts are pulled from Contentful CMS fee schedules and sent to Stripe dynamically.
- **Payment metadata:** Each payment includes metadata (fee type, property address, resident name) for record-keeping in the Stripe Dashboard.

---

## Section 5: Contentful CMS Access

Contentful is the content management system used to update website content (news, events, documents, etc.). The website content lives in your developer's Contentful space (**Groff Web Development, LLC / Woodbury-HOA-Phase-6**). You will be invited as a member so you can log in and manage content directly.

### Step 1: Create a Free Contentful Account

1. Go to [contentful.com](https://contentful.com) and click **Sign up**
2. Sign up using the HOA email: `woodburyestateshoa.phase6@gmail.com`
3. Verify your email address
4. You do not need to create a space — your developer will invite you to the existing one

### Step 2: Your Developer Will Invite You

Your developer will:

1. Log into Contentful and open the **Woodbury-HOA-Phase-6** space
2. Go to **Settings → Users**
3. Click **Invite users**
4. Enter `woodburyestateshoa.phase6@gmail.com`
5. Set the role to **Editor** (allows content updates without changing structure)
6. Send the invite

### Step 3: Accept the Invitation

1. Check `woodburyestateshoa.phase6@gmail.com` for an invitation email from Contentful
2. Click **Accept invitation**
3. Log in with the account you created in Step 1
4. You should now see the **Woodbury-HOA-Phase-6** space in your dashboard

### Contentful Billing Notes

- The space is managed under your developer's account at no cost to the HOA
- The **Free plan** is sufficient for this website's content needs

---

## Section 6: Documentation & Training

- [ ] Provide overview of website features
- [ ] Train on updating events/calendar
- [ ] Train on posting news articles
- [ ] Train on managing board member information
- [ ] Train on updating fee schedules
- [ ] Train on document uploads

---

## Section 7: Ongoing Maintenance

Your developer will manage the technical operation of the website on your behalf. Below is a summary of the arrangement.

### What Your Developer Manages

- Deploying website updates
- Monitoring uptime and performance
- Keeping software dependencies up to date
- Managing environment variables and API keys
- Coordinating with Vercel, Resend, and Stripe on your behalf

### Monthly/Annual Costs Summary

| Service    | Plan     | Cost              | Billed To    |
| ---------- | -------- | ----------------- | ------------ |
| Service    | Plan     | Cost              | Account Owner       |
| ---------- | -------- | ----------------- | ------------------- |
| Vercel     | Hobby    | Free              | Developer (managed) |
| Resend     | Free     | Free              | HOA                 |
| Stripe     | Standard | 2.9% + $0.30/txn  | HOA                 |
| Contentful | Free     | Free              | Developer (managed) |
| Domain     | Annual   | ~$15–20/year      | Developer (HOA pays)|

> Vercel hosting, the domain, and Contentful are managed by your developer. Stripe and Resend accounts are owned directly by the HOA.

- [ ] Discuss ongoing support retainer or hourly rate
- [ ] Provide developer emergency contact information
- [ ] Confirm billing email for all services is an address the HOA monitors

---

## Handoff Checklist

Use this checklist on the day of handoff:

- [ ] Domain purchased through Vercel (developer handles, HOA reimburses)
- [ ] Resend account created and developer invited
- [ ] Resend domain verified
- [ ] Resend API key created and shared with developer
- [ ] Stripe account created and developer invited
- [ ] Stripe API keys shared with developer
- [ ] Stripe webhook configured
- [ ] HOA creates Contentful account at contentful.com
- [ ] Developer sends Contentful space invitation to woodburyestateshoa.phase6@gmail.com
- [ ] HOA accepts Contentful invitation and confirms access
- [ ] All environment variables set in Vercel
- [ ] Test payment completed successfully
- [ ] Website live on custom domain
- [ ] Training session completed
- [ ] Ongoing support agreement signed
