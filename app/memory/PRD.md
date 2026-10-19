# PRD — Lumen & Frame Photography

## Original Problem Statement
Build a photography website that handles bookings, pricing, and offers the following services:
- Family & portrait — Mini Sessions, Full Sessions, Legacy Session
- Sports & athletes — Athlete Portrait, Game Day Coverage, Team Package
- Grad, engagement & small events — Milestone Session, Small Event Coverage, All-Day Package

## User Choices
- Booking flow: request form → saved to admin list + email notification to studio + optional Stripe deposit ($100)
- Pricing: price listed per package
- Gallery: yes, showcase gallery with sample photos
- Brand name: placeholder "Lumen & Frame" (user to supply real name)

## Architecture
- FastAPI + MongoDB (motor) backend, /api prefix; React + Tailwind + Framer Motion + Lenis frontend
- Auth: JWT (bcrypt hashed admin, httpOnly cookies + Bearer fallback), brute-force lockout (5 tries / 15 min)
- Email: Emergent-managed Resend proxy (owner notification on each booking, server-side template)
- Payments: Stripe claimable sandbox (Flow A), $100 "Session Deposit" product (lookup_key session_deposit), tax_mode calc_only (Stripe Tax calculates at checkout), webhook at /api/stripe/webhook + polling fallback

## Implemented (2026-09-08)
- Kinetic dark-editorial landing page: masked line-reveal hero with parallax, 4 numbered manifesto chapters with hover images, slow editorial marquee, film grain overlay
- Services & pricing: 3 categories × 3 packages with prices, deliverables, "Most Booked" badges, book buttons that prefill the form
- Showcase gallery: 12 images, category filters, lightbox with EXIF metadata (SAMPLE photos + metadata)
- Booking form: name/email/phone/date/category/package/notes + deposit toggle → POST /api/bookings → confirmation code modal or Stripe checkout redirect
- Admin dashboard at /admin: login, metrics, filters, confirm/cancel actions, CSV export
- Payment success/cancel pages with status polling
- Stripe sandbox provisioned (US, expires 2026-11-07); test card 4242…

## Backlog
- P0: Replace OWNER_EMAIL (currently test inbox delivered@resend.dev) with studio owner's real email
- P0: Replace placeholder brand name "Lumen & Frame" with real studio name
- P1: Replace sample gallery photos with real portfolio work (image upload via object storage)
- P1: Client confirmation email after booking
- P2: Date availability calendar / blackout dates
- P2: Client galleries with password-protected delivery
- P2: Stripe KYC claim for live payments (onboarding_url shared with user)

## Test Credentials
See /app/memory/test_credentials.md — admin@lumenframe.studio / admin123
