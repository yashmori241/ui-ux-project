# 🏎️ SPINNY — Full Production Website Implementation Plan

> **"Find Your Perfect Car. Guaranteed."**
> Cinematic dark luxury · Bugatti's darkness + Porsche's confidence + NIO's futurism + Infinite Machine's cinematic surprise

---

## Project Overview

**Product:** Spinny — India's most trusted certified used car platform
**Target Directory:** `c:\MY AI PROJECT\prototype A\`
**Design Direction:** Dark editorial luxury — gold accents, serif typography, cinematic animations
**Quality Bar:** If someone lands on this site, they should stop scrolling and say *"how did they build this."*

---

## Tech Stack (Exact Versions)

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js (App Router, TypeScript) | 14.2+ |
| Styling | Tailwind CSS + CSS custom properties | 3.4 |
| Animations | GSAP + ScrollTrigger + Flip plugins | 3.12 |
| Smooth Scroll | @studio-freight/lenis | 1.0.42 |
| Page Transitions | framer-motion | 11+ |
| State Management | zustand (with persist middleware) | 4+ |
| Forms | react-hook-form + zod | 7+ |
| Icons | lucide-react | latest |
| Fonts | next/font/google — Playfair Display (400,700,900) + Inter (300,400,500,600) | — |

---

## Design System

### Color Tokens

```
Background Primary:   #0A0A0A    (never pure black)
Surface:              #141414
Surface 2:            #1C1C1C
Elevated:             #222222

Brand Gold:           #C9A84C    (never #FFD700)
Gold Muted:           rgba(201,168,76,0.12)
Brand Red:            #E63329

Text Primary:         #F5F5F0
Text Muted:           #888880
Text Subtle:          #555550

Border Default:       rgba(255,255,255,0.08)
Border Gold:          rgba(201,168,76,0.3)
```

### Typography Scale

| Class | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| `.text-display-xl` | Playfair Display | clamp(56px, 10vw, 120px) | 900 | 1.0 |
| `.text-display-lg` | Playfair Display | clamp(40px, 6vw, 72px) | 700 | 1.1 |
| `.text-display-md` | Playfair Display | clamp(28px, 4vw, 52px) | 700 | 1.2 |
| `.text-label` | Inter | 11px | 500 | — (tracking: 0.18em, uppercase) |
| `.text-stat` | Playfair Display | clamp(52px, 8vw, 96px) | 900 | — (color: gold) |

### Design Rules

- Border-radius on cards: **4px** (sharp luxury, not bubbly)
- Hover transitions: `cubic-bezier(0.16, 1, 0.3, 1)` minimum 0.3s
- No inline styles — Tailwind classes or CSS variables only
- No `#`-prefixed hex in GSAP animations (breaks GSAP)
- Always check `prefers-reduced-motion` before animations

---

## File Structure

```
prototype A/
├── .agent/
│   └── rules.md                    # Project coding standards
├── public/
│   └── (static assets)
├── app/
│   ├── layout.tsx                  # Root layout: Lenis + PageTransition + ScrollProgress
│   ├── page.tsx                    # Home page
│   ├── loading.tsx                 # Global loading
│   ├── not-found.tsx               # 404 page
│   ├── browse/
│   │   ├── page.tsx
│   │   └── _components/            # FilterSidebar, ResultsGrid, MobileFilterSheet
│   ├── car/
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── _components/        # Gallery, SpecTabs, StickyCard, EMIInline
│   ├── sell/
│   │   ├── page.tsx
│   │   └── _components/            # WizardSteps, OTPInput, PriceReveal
│   ├── login/
│   │   ├── page.tsx
│   │   └── _components/            # AuthForm, OTPInput, TabSwitch
│   ├── emi/
│   │   └── page.tsx
│   ├── compare/
│   │   ├── page.tsx
│   │   └── _components/            # AddCarModal, CompareTable
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── _components/            # ShortlistTab, SettingsTab
│   └── about/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── CustomCursor.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── MarqueeStrip.tsx
│   │   ├── CarCard.tsx
│   │   ├── SkeletonCard.tsx
│   │   ├── Toast.tsx
│   │   ├── MagneticButton.tsx
│   │   └── PageTransition.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── TrustNumbers.tsx
│       ├── HowItWorks.tsx
│       ├── FeaturedCars.tsx
│       ├── SpinnyAssured.tsx
│       ├── Testimonials.tsx
│       └── BrandGrid.tsx
├── lib/
│   ├── data/
│   │   └── cars.ts                 # 24 mock cars with full fields
│   ├── store/
│   │   ├── shortlistStore.ts       # Zustand + persist
│   │   └── authStore.ts            # Zustand auth state
│   ├── hooks/
│   │   ├── useGSAP.ts
│   │   ├── useLenis.ts
│   │   ├── useMagneticButton.ts
│   │   └── useMediaQuery.ts
│   └── utils/
│       ├── emi.ts                  # EMI formula
│       └── formatters.ts           # Price/number formatting
├── tailwind.config.ts
├── globals.css
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Phase 1 — Foundation & Architecture

> **Goal:** Set up the entire project skeleton, design system, and data layer. No pages or components yet.

### Steps

#### 1.1 Initialize Next.js 14 Project
```bash
cd "c:\MY AI PROJECT\prototype A"
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

#### 1.2 Install All Dependencies
```bash
npm install gsap @studio-freight/lenis framer-motion zustand react-hook-form zod lucide-react
```

#### 1.3 Configure Tailwind (`tailwind.config.ts`)
- Full color token system (bg, brand, text, border)
- Extended font families (Playfair Display, Inter)
- Custom animations: ticker, shimmer, bounce-scroll, pulse-marker
- Custom transitions: `cubic-bezier(0.16, 1, 0.3, 1)`
- Custom spacing and breakpoints as needed

#### 1.4 Create `globals.css`
- CSS variable definitions for all design tokens
- Font imports via `next/font/google` (configured in layout.tsx)
- Typography utility classes (`.text-display-xl`, `.text-label`, `.text-stat`, etc.)
- Animation keyframes: `@keyframes ticker`, `@keyframes shimmer`, `@keyframes bounce-scroll`, `@keyframes pulse`
- Base resets: scrollbar styling, selection color, smooth scroll
- Custom cursor utility classes

#### 1.5 Create `.agent/rules.md`
- All code standards from the spec (TypeScript strict, functional components, `'use client'`, GSAP cleanup, etc.)
- Design rules (colors, border-radius, transitions)
- Animation rules (reduced motion, ScrollTrigger refresh, cursor, magnetic buttons, Lenis)
- File structure rules

#### 1.6 Create Mock Data (`lib/data/cars.ts`)
- 24 cars with full fields:
  ```typescript
  interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    originalPrice: number;
    mileage: number;        // km
    fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
    transmission: 'Manual' | 'Automatic';
    bodyType: string;
    color: string;
    owners: number;
    registrationState: string;
    images: string[];        // Unsplash URLs
    features: string[];
    inspectionScore: number; // out of 200
    emiPerMonth: number;
    location: string;
    assured: boolean;
    trending: boolean;
  }
  ```
- Brands mix: Maruti, Hyundai, Tata, Honda, Toyota, Mahindra, BMW, Audi, Kia, MG, Volkswagen, Skoda

#### 1.7 Create Zustand Stores
- **`shortlistStore.ts`**: `{ shortlist: string[], add, remove, toggle, isShortlisted }` with `persist` middleware (localStorage)
- **`authStore.ts`**: `{ isAuthenticated, user: { name, phone }, login, logout }`

#### 1.8 Create Root `layout.tsx`
- Google Fonts: Playfair Display (400, 700, 900) + Inter (300, 400, 500, 600) via `next/font/google`
- Lenis smooth scroll provider (with GSAP ticker sync)
- `<CustomCursor />` component (rendered client-side only)
- `<PageTransition />` wrapper (Framer Motion `AnimatePresence`)
- Scroll progress bar (thin gold line at top, scaleX based on scrollY)
- `<LoadingScreen />` with sessionStorage check
- Metadata: title, description, OG tags

---

## Phase 2 — Core Components

> **Goal:** Build every shared component. Fully functional, using design tokens. No pages yet.

### 2.1 `Navbar.tsx`
- Fixed position, transparent initially → `backdrop-blur-lg bg-bg-primary/80` on scroll (IntersectionObserver or scroll listener)
- Logo left, nav links center, CTA right
- Links: Browse Cars, Sell Car, EMI Calculator, About
- Right side: Compare (icon), Shortlist count (heart badge), Login/Profile
- **Mobile:** Hamburger icon → full-screen dark overlay with staggered link entrance (GSAP `stagger: 0.08`)
- Active link indicator with gold underline

### 2.2 `CustomCursor.tsx`
- `'use client'` — renders only on desktop (`window.matchMedia('(pointer: fine)')`)
- Two elements: outer ring (32px, border 1px white, mix-blend-mode: difference) + inner dot (6px solid white)
- Follows mouse with `gsap.quickTo` for smooth lag (ring: duration 0.5, dot: duration 0.15)
- On hover over interactive elements (`a, button, [data-cursor]`): ring scales to 1.5×, turns gold
- On `[data-cursor="drag"]`: shows drag icon
- Hidden on mobile / touch devices

### 2.3 `LoadingScreen.tsx`
- Full viewport overlay, z-index: 99999, bg: `#0A0A0A`
- SVG "SPINNY" logotype with stroke-dasharray animation (draw on over 1.5s)
- After draw: fill fades in (0.3s), then entire screen slides up (GSAP `yPercent: -100`, 0.8s, `power3.inOut`)
- **sessionStorage check:** `if (sessionStorage.getItem('spinny-loaded')) return null;` — only shows once per session
- Sets `sessionStorage.setItem('spinny-loaded', 'true')` after animation

### 2.4 `MarqueeStrip.tsx`
- Height 44px, bg `#111111`, overflow hidden
- Items: `SPINNY ASSURED ® · 200-POINT INSPECTION · 5-DAY MONEY BACK · HOME TEST DRIVE · 3-YEAR WARRANTY · FREE RC TRANSFER ·`
- Content duplicated 2× for seamless loop
- CSS `animation: ticker 28s linear infinite`
- `pause` on hover via CSS `animation-play-state: paused`
- Gold diamond separator `◆` between items

### 2.5 `Footer.tsx`
- Dark bg (`#0A0A0A`), top gold border (1px)
- 4-column grid: Company, Buy Car, Sell Car, Support
- Bottom row: copyright, social icons, legal links
- Responsive: stacks on mobile

### 2.6 `CarCard.tsx`
- Dark card: bg `#141414`, border `rgba(255,255,255,0.08)`, rounded `4px`
- Image top with `<Image>` component, aspect-ratio 4/3
- "SPINNY ASSURED" badge (gold, top-left)
- "Trending" badge (red, conditional)
- Heart icon top-right: click toggles Zustand shortlist, with scale+bounce animation
- Content: Make Model Year, price (₹ formatted), mileage | fuel | transmission
- EMI badge: `₹X,XXX/mo`
- **Hover:** `translateY(-4px)`, border transitions to `rgba(201,168,76,0.3)`, shadow glow
- Transition: `cubic-bezier(0.16, 1, 0.3, 1) 0.3s`

### 2.7 `SkeletonCard.tsx`
- Matches CarCard dimensions exactly
- Shimmer animation: CSS gradient `linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)` moving with `@keyframes shimmer`
- Rounded placeholders for image, title, specs, price

### 2.8 `Toast.tsx`
- Fixed bottom-right, z-index: 9000
- Types: success (gold border), error (red border), info (white border)
- Slide in from right, auto-dismiss 3s, manual close button
- Zustand or React context for global `toast()` function

### 2.9 `PageTransition.tsx`
- Framer Motion `AnimatePresence` + `motion.div`
- Enter: dark overlay sweeps from left → right (scaleX 0→1→0)
- Exit: content fades, overlay sweeps
- Duration: 0.6s total, ease: `[0.76, 0, 0.24, 1]`

### 2.10 `MagneticButton.tsx`
- Wrapper component for CTAs
- Tracks mouse position within 80px radius
- Lerps button transform toward cursor (max 8px drift, lerp: 0.15)
- Resets on mouse leave with spring ease
- Gold filled variant + white ghost variant

---

## Phase 3 — Page Building

> **Goal:** Build all 10 pages. Each page uses shared components from Phase 2.

### 3.1 Home Page `/` — ⭐ HIGHEST PRIORITY

The hero of this entire build. 7 sections:

#### Section 1: Hero
- 100svh, overflow hidden
- Background: Unsplash car image (`?w=1920&q=80`) in `<Image>` with `fill` + `object-cover`
- Overlay: `linear-gradient(105deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0.15) 100%)`
- GSAP Parallax on image: `yPercent: 30` on scroll scrub
- Left-aligned content (max-width 680px):
  - Label: "INDIA'S MOST TRUSTED USED CAR PLATFORM" — `.text-label`, color gold, fade in delay 0.3s
  - H1 Line 1: "Find Your" — `.text-display-xl`, animate up from `y:60, opacity:0` at 0.7s
  - H1 Line 2: "Perfect Car." — `.text-display-xl`, animate up at 0.9s
  - Subtitle: "Certified · Guaranteed · Delivered to You." — Inter 18px, muted, at 1.1s
  - CTAs at 1.3s: "Browse Cars →" (gold filled MagneticButton) + "Sell Your Car" (white ghost MagneticButton)
- Scroll indicator: bouncing chevron-down, fades when scrollY > 80

#### Section 2: Ticker Strip
- `<MarqueeStrip />` component

#### Section 3: Trust Numbers
- bg `#111111`, py-24
- 4 columns with gold 1px vertical dividers
- Stats: 2,00,000+ / 10,000+ / 200 / 20+
- Labels: Happy Customers / Cars Available / Quality Checks / Cities
- GSAP counter animation: `textContent` tween with `snap: 1`, once on scroll into view

#### Section 4: "How It Works" Scrolljack
- Outer div: `height: 500vh` (scroll spacer)
- Inner div: `height: 100vh, position: sticky, top: 0`
- GSAP timeline with ScrollTrigger pin, scrub: 0.8
- 4 steps animate in/out at 25% intervals
- Step content: number + title + description + right-side visual
- **Mobile:** No pin, vertical card stack with individual ScrollTrigger reveals

#### Section 5: Featured Cars (Draggable Carousel)
- Section heading with `.text-display-md`
- Horizontal scrollable track with momentum drag (mouse + touch)
- 6 `<CarCard />` components
- Custom cursor shows drag icon on hover (`[data-cursor="drag"]`)
- Momentum: on release, GSAP tweens `scrollLeft` with velocity × 8

#### Section 6: Spinny Assured
- bg `#0D0D0D` with radial gradient gold glow
- Central badge: SVG circle with "SPINNY ASSURED ®" text-on-path
- 4 feature columns with icons, stagger entrance animation

#### Section 7: Testimonials
- 3 cards, auto-rotate every 5s (pause on hover)
- Star ratings, quote, name, car purchased
- Drag navigation with momentum

#### Section 8: Brand Grid
- 15 brands in responsive grid (5 cols desktop, 3 cols mobile)
- 3D tilt on hover: `perspective(800px) rotateY(Xdeg) rotateX(Ydeg)` — max 8°
- Brand logos (using brand name text + icon placeholder)
- Reset on mouse leave

---

### 3.2 Browse Page `/browse`

- **Sticky sidebar** (280px desktop): brand checkboxes, body type, fuel type, transmission, budget range (dual-range slider), sort dropdown
- **Dual-range slider:** Two overlapping `<input type="range">`, gold fill between thumbs, dark track
- **Results grid:** `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`
- **GSAP Flip** on filter change: capture state → update → `Flip.from(state, { duration: 0.5, stagger: 0.02 })`
- **Skeleton loading:** Show `<SkeletonCard />` × 6 for 500ms on filter change
- **Result count** and active filter chips with ✕ remove
- **Mobile:** Bottom sheet filter (slides up from bottom), drag handle, same filter options

---

### 3.3 Car Detail `/car/[id]`

- **Sticky secondary nav:** Appears after scrolling 120px past gallery. Links: Overview, Specs, Features, EMI, Similar
- **Image gallery:** Main image (16:9) + thumbnail strip below. Click thumbnail → GSAP crossfade (opacity 0→swap→1)
- **Full-screen gallery modal:** Keyboard nav (Arrow keys, Escape), swipe on mobile
- **Car info:** Year Make Model, price, EMI, location, assured badge
- **Specs tab:** Tabbed content (Overview / Specifications / Features / Inspection)
- **Inspection accordion:** Expandable sections with SVG circle progress (score out of 200)
- **Inline EMI calculator:** Sliders for loan amount, interest, tenure — live EMI update
- **Right sticky card** (`position: sticky; top: 80px`): Price, EMI, "Book Test Drive" CTA, "Add to Compare", Contact
- **Similar cars:** Horizontal scroll of related `<CarCard />`

---

### 3.4 Sell Page `/sell`

- **3-step wizard** with animated gold progress bar (width CSS transition)
- **Step 1 — Car Details:** Brand dropdown, model, year, variant, mileage — react-hook-form + zod
- **Step 2 — Contact:** Name, phone, OTP verification (6 inputs, auto-focus-next, backspace goes back)
- **Step 3 — Valuation:** Price blur reveal — `gsap.from(priceEl, { filter: "blur(16px)", opacity: 0, duration: 1.2 })`
- Step transitions: `gsap.fromTo(newStep, { x: 60, opacity: 0}, { x: 0, opacity: 1, duration: 0.4 })`
- Mock OTP: `123456`

---

### 3.5 Login Page `/login`

- **Split screen:** Left dark panel (branding, tagline, car image) + right form panel
- **Tab switch** (Login / Register): GSAP animated gold indicator sliding between tabs
- **Phone input** + OTP flow (same 6-box component as Sell)
- **react-hook-form + zod** validation, real-time inline errors
- **Auth success:** Any phone + OTP `123456` → Zustand `authStore.login()` → redirect `/dashboard`

---

### 3.6 EMI Calculator `/emi`

- **3 sliders:** Loan amount (₹1L–₹50L), interest rate (6%–18%), tenure (12–84 months)
- **GSAP `quickTo`** for smooth number animation on every change
- **EMI formula:** `EMI = P × r × (1+r)^n / ((1+r)^n - 1)`
- **Visual breakdown:** Donut chart (CSS conic-gradient) showing principal vs interest
- **Amortization table:** Expandable, columns: Month, Principal, Interest, Balance
- **Summary cards:** Total payment, total interest, principal

---

### 3.7 Compare Page `/compare`

- **Add Car modal:** Search through mock data with live filter-as-you-type
- **Compare table:** 2-3 cars side by side, specs rows
- **Sticky left column** (spec labels): `position: sticky; left: 0; z-index: 1`
- **GSAP "Best Value" highlight:** Shimmer sweep animation on the winning column
- **Empty state:** Illustration + "Add cars to compare" CTA

---

### 3.8 Dashboard `/dashboard`

- **Auth guard:** `useEffect` checks Zustand `isAuthenticated`, redirects to `/login` if false
- **Tabs:** My Shortlist, My Bookings, Settings
- **Shortlist tab:** Reads from Zustand `shortlistStore` (persisted), renders `<CarCard />`s in grid
- **Settings:** Inline edit pattern — click value → input appears, save/cancel buttons
- **Empty states** for each tab with illustrations

---

### 3.9 About Page `/about`

- **Scrollytelling:** Each section triggers on scroll with GSAP ScrollTrigger
- **India SVG map:** Simplified path outlines, circle markers for cities with `@keyframes pulse`
- **Stats section:** Large counter numbers (similar to home Trust Numbers)
- **Alternating content rows:** Image left/text right, then swap — each enters from its side
- **Timeline:** Company milestones with scroll-triggered reveals

---

### 3.10 404 Page

- Dark background with "404" in massive `.text-display-xl` (gold, semi-transparent)
- Tagline: "This road doesn't exist. Let's get you back on track."
- "Back to Home" MagneticButton
- Subtle floating particle animation (CSS)

---

## Phase 4 — Animation Layer (Global Polish)

> **Goal:** Apply cinematic GSAP animations across all pages. Runs after Phase 2+3.

### 4.1 Text Split Reveals
- All H1/H2 elements: Split into spans per word/character
- Animate: `y: 40, opacity: 0` → `y: 0, opacity: 1` with stagger 0.03
- Trigger: ScrollTrigger `start: "top 85%"`, once

### 4.2 Section Entrance Animations
- Every `<section>`: children fade up with `y: 30, opacity: 0`, stagger 0.1
- ScrollTrigger: `start: "top 80%"`, once

### 4.3 Parallax Effects
- Hero image: `yPercent: 30` scrub
- About page images: `yPercent: 15` scrub
- Section background accents: subtle parallax

### 4.4 Counter Animations
- All stat numbers: `textContent` tween, `snap: 1`, `power2.out`, duration 1.8

### 4.5 Horizontal Drag with Momentum
- Featured Cars carousel, Testimonials — same drag+momentum pattern

### 4.6 Magnetic Button Effect
- All primary CTAs wrapped in `<MagneticButton>`
- Max drift: 8px, lerp: 0.15, reset on mouseleave

### 4.7 Card Tilt (Brand Grid)
- `perspective(800px) rotateY/rotateX` — max 8° — on brand grid items

### 4.8 Scroll Progress Bar
- Thin (3px) gold bar at very top of viewport
- `scaleX` based on `scrollY / (docHeight - viewportHeight)`
- `transform-origin: left`

---

## Phase 5 — Browser Agent Verification

> **Goal:** Automated testing of all pages, interactions, and responsive behavior.

### Test Checklist

| # | Test | Page | Expected Result |
|---|------|------|-----------------|
| 1 | Loading screen SVG draws on first visit | `/` | SVG animates, then slides up |
| 2 | Loading screen does NOT show on refresh | `/` | Skipped (sessionStorage) |
| 3 | Custom cursor visible on desktop | All | White ring follows mouse |
| 4 | Custom cursor hidden on mobile (375px) | All | No cursor elements |
| 5 | Navbar transparent → blur on scroll | `/` | Background appears after scroll |
| 6 | Hero parallax | `/` | Image moves slower than content |
| 7 | Marquee ticker loops seamlessly | `/` | No gap in loop |
| 8 | Trust numbers count up | `/` | Numbers animate on scroll-in |
| 9 | How It Works scrolljack pins | `/` | Section pins and transitions 4 steps |
| 10 | How It Works stacks on mobile | `/` (375px) | No pin, cards stack |
| 11 | Featured cars drag with momentum | `/` | Horizontal drag works |
| 12 | Brand cards 3D tilt on hover | `/` | Perspective tilt effect |
| 13 | Navigate to `/browse` | Navbar | Page loads, no errors |
| 14 | Filters update results | `/browse` | Grid updates, Flip animation |
| 15 | Skeleton loaders show | `/browse` | Shimmer cards during filter |
| 16 | Car card hover effect | `/browse` | Lift + gold border |
| 17 | Shortlist heart toggle | `/browse` | Heart animates, persists on refresh |
| 18 | Click car → detail page | `/car/[id]` | Page loads with car data |
| 19 | Gallery crossfade | `/car/[id]` | Thumbnail click swaps image |
| 20 | Inline EMI calculation | `/car/[id]` | Updates on slider change |
| 21 | Sell wizard 3 steps | `/sell` | Advances with animation |
| 22 | OTP auto-focus-next | `/sell` | Next input focuses automatically |
| 23 | Price blur reveal | `/sell` | Price unblurs on step 3 |
| 24 | Login OTP flow | `/login` | OTP 123456 → redirect `/dashboard` |
| 25 | EMI calculator updates | `/emi` | Smooth number animation |
| 26 | Compare add cars | `/compare` | Table populates |
| 27 | Dashboard auth guard | `/dashboard` | Redirect if not logged in |
| 28 | Dashboard shortlist | `/dashboard` | Shows shortlisted cars |
| 29 | Mobile hamburger menu | All (375px) | Full-screen overlay opens |
| 30 | Mobile bottom-sheet filter | `/browse` (375px) | Sheet slides up |
| 31 | No horizontal overflow | All (375px) | No side scroll |
| 32 | All nav links work | All | Every link navigates correctly |

### Automated Test Commands
```bash
npm run build          # Verify production build succeeds
npm run lint           # Verify no linting errors
```

### Browser Agent Test Script
```
1. Open http://localhost:3000 — verify loading screen, hero, parallax, ticker
2. Scroll to "How It Works" — verify pin and step transitions
3. Navigate to /browse — apply filters, verify grid updates
4. Click a car card — verify detail page loads
5. Navigate to /sell — complete 3 steps with OTP 123456
6. Navigate to /login — log in with OTP 123456, verify /dashboard redirect
7. Navigate to /emi — move sliders, verify EMI updates
8. Navigate to /compare — add 2 cars, verify table
9. Resize to 375px — verify hamburger, bottom-sheet, no overflow
10. Check console for errors
```

---

## User Review Required

> [!IMPORTANT]
> **Please review and approve this plan before I begin coding.** The project is substantial (~40+ files, 10 pages, complex GSAP animations). Here are key decisions for your review:

1. **Next.js 14 `create-next-app` initialization** — Will use `--src-dir=false` (no `/src` directory) to keep the structure flat. App directory at root.

2. **Images** — Using Unsplash URLs with `?w=1920&q=80` for all car imagery. Next.js `<Image>` with `unoptimized` for external URLs, or configure `next.config.js` with Unsplash domain.

3. **Tailwind CSS** — User explicitly requested Tailwind. Will use v3.4 with full custom config.

4. **Mock OTP** — Any phone number + OTP `123456` will work for login/sell flows.

5. **No real backend** — All data is mock. No API calls. Zustand persist for local state.

6. **Build order** — Foundation → Components → Pages (Home first) → Animation polish → Verification.

## Open Questions

> [!WARNING]
> **Please confirm before I proceed:**
> 1. Should I proceed with the exact file structure shown above, or do you have modifications?
> 2. The 24 mock cars will use Unsplash images — any specific car types/brands you want prioritized?
> 3. For the About page scrollytelling — any specific company history/milestones you'd like included, or should I create fictional but realistic ones?
> 4. The project will be initialized directly in `c:\MY AI PROJECT\prototype A\` — confirmed?

---

## Verification Plan

### Automated Tests
- `npm run build` — production build must succeed with zero errors
- `npm run lint` — zero linting errors
- Browser Agent verification of all 32 test items listed above

### Manual Verification
- Visual inspection of all pages at 1440px and 375px widths
- Animation smoothness at 60fps
- Scroll performance with Lenis + GSAP
- Cross-page navigation with page transitions
- Shortlist persistence across refresh
- Auth flow end-to-end

---

*This plan will produce approximately 50+ files across 10 pages with full GSAP animation integration, resulting in a cinematic, dark luxury experience that rivals Bugatti.com in visual quality.*
