# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server (localhost:3000)
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm format:check # Check formatting without writing
```

## Architecture

This is a Next.js 16 App Router application for the Woodbury Estates HOA Phase 6 website. Content is managed via Contentful CMS.

### Data Flow

- **Contentful CMS** → `app/lib/` data fetchers → Server Components → UI
- In development, uses Contentful Preview API; in production, uses Delivery API
- All page data is fetched server-side in React Server Components

### Key Directories

- `app/lib/` - Contentful data fetching functions (one file per content type: `get-events.ts`, `get-documents.ts`, etc.)
- `types/contentful.ts` - TypeScript interfaces for all Contentful content types
- `components/ui/` - shadcn/ui components (new-york style)
- `components/layout/` - Header, Footer, MobileNav
- `components/{feature}/` - Feature-specific components (calendar, news, board, etc.)
- `lib/utils.ts` - Utility functions including `cn()` for className merging and date formatting helpers

### Contentful Content Types

Defined in `types/contentful.ts`:

- `blogPost` - News articles with rich text body
- `event` - Calendar events with types: meeting, social, maintenance, deadline
- `document` - HOA documents (bylaws, financials, meeting-minutes, forms)
- `boardMember` - Board member profiles
- `feeSchedule` - Dues and fees information
- `externalLink` - Footer links (emergency, government, utilities)
- `pageContent` - Static page content
- `mainLogo` - Site logos

### Environment Variables

Required in `.env`:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_DELIVERY_TOKEN` (production)
- `CONTENTFUL_PREVIEW_TOKEN` (development)

### Styling

- Tailwind CSS v4 with CSS variables
- Custom HOA brand colors: `hoa-blue` (#5ba4d4), `hoa-navy` (#1a365d) and variants
- shadcn/ui components use the new-york style variant
