# Sweet Drop Kitchen

A production-ready, mobile-first preorder site template for small cottage food businesses — bakers, dessert makers, meal prep sellers, farmers market vendors, drink makers, and Instagram/TikTok-first food brands.

Edit one config file. Deploy. Done.

Sweet Drop Kitchen ships as the demo brand inside this repo, in a bold, dark, modern aesthetic. A warm/cream/serif preset is included too for vendors who want a softer feel.

---

## What this template gives you

- A single-file deploy. No build step. No framework.
- A preorder flow that builds a message and hands off to **Instagram DM** — no checkout, no payment processor, no inventory system.
- Live **countdown** to your next drop, computed from your weekly pickup dates.
- A **featured product** in an asymmetric menu grid, plus per-product badges (SIGNATURE, NEW, LIMITED, etc).
- A weekly pickup date system with status badges (open / limited / sold out / coming soon / closed) and a "This Week" / "Next Drop" highlight.
- Optional sections: top announcement bar, stats strip, reviews marquee, full-bleed amber CTA strip.
- Two complete visual presets:
  - **bold/dark** (default `site.config.js`) — black background, amber accent, Anton condensed sans-serif. Crave-style.
  - **warm/cream** (`demo/warm-bakery.config.js`) — cream background, purple/mango, Playfair Display serif. Cottage-bakery style.
- Production SEO: dynamic OG/Twitter meta, JSON-LD `LocalBusiness`, dynamic favicon from initials.
- Native-radio pickup pickers (keyboard navigable), sticky mobile bottom bar with safe-area handling, post-copy CTA promotion.

What this template intentionally does **not** include: shipping, delivery, full ecommerce, payments, accounts, inventory, subscriptions, or an admin panel.

---

## File layout

```text
/
├── index.html                          # Page skeleton + Tailwind setup. You rarely edit this.
├── site.config.js                      # Active config. Edit this to make the site yours.
├── app.js                              # Rendering logic. You rarely edit this.
├── demo/
│   └── warm-bakery.config.js           # Alternate preset — warm/cream palette + bakery example.
└── README.md
```

---

## Switching presets

To use the warm/cream preset instead of the bold/dark default:

```bash
cp demo/warm-bakery.config.js site.config.js
```

(Back up your current `site.config.js` first if you've already customized it.)

---

## Customize in 10 minutes

Open `site.config.js`. Every field below maps to something on the page.

### 1. Brand name, initials, and SEO

```js
business: {
  name:          "Maya's Bakery",
  shortName:     "Maya's",
  initials:      "MB",                       // shown in header bubble + favicon
  locationLabel: "Tampa, FL",                // hero eyebrow + footer
  description:   "Weekend sourdough loaves and morning buns, baked fresh in East Tampa.",
  siteUrl:       "https://mayasbakery.com"   // optional — canonical URL + JSON-LD
}
```

### 2. Top announcement bar (optional)

A thin strip across the very top of the page. Set `enabled: false` to hide.

```js
announcement: {
  enabled: true,
  text:    "MADE FROM A HOME KITCHEN. PICKUP ONLY.",
  href:    "#about"   // optional click target; leave "" for non-clickable text
}
```

### 3. Colors

The template ships with two complete palettes. Pick one or roll your own.

**bold/dark** (default Sweet Drop preset):

```js
theme: {
  style: "bold",
  colors: {
    bg:        "#0b0907",   // page background (near-black)
    bgSoft:    "#16110d",   // alt surface / card bg
    surface:   "#1b1611",   // slightly raised surface
    primary:   "#ffffff",   // primary text
    primarySoft: "#1f1812",
    accent:    "#f5a623",   // amber CTAs and highlights
    accentDeep:"#d68910",
    blush:     "#1b1611",
    blushDeep: "#f5a623",
    ink:       "#ffffff",   // body text
    muted:     "#9a8e7d",   // secondary text
    mutedSoft: "#5b5347",
    edge:      "#2a221a",   // subtle borders
    onAccent:  "#0b0907"    // text on amber buttons (always dark)
  }
}
```

**warm/cream** (Maya's Bakery preset):

```js
theme: {
  style: "warm",
  colors: {
    bg:        "#fff7e8",
    bgSoft:    "#fffaf1",
    surface:   "#ffffff",
    primary:   "#5a247a",   // purple
    primarySoft: "#f1e4ff",
    accent:    "#ffc533",   // yellow/mango
    accentDeep:"#d89300",
    blush:     "#ffe6ef",
    blushDeep: "#dd6f9b",
    ink:       "#24180d",
    muted:     "#6b5b48",
    mutedSoft: "#a89a85",
    edge:      "#ead8c0",
    onAccent:  "#24180d"
  }
}
```

`onAccent` is the text color used on top of `accent` (amber/yellow) buttons — always dark, in both themes.

### 4. Fonts

```js
theme: {
  fonts: {
    display: ["Anton", "Impact", "Arial Black", "sans-serif"],
    sans:    ["Inter", "system-ui", "-apple-system", "sans-serif"]
  },
  googleFontsHref: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap"
}
```

`index.html` preloads Anton + Inter + Playfair Display + Plus Jakarta Sans, so either preset works out of the box. To use a different font, update the Google Fonts `<link>` in `index.html` to load the new family.

### 5. Hero with color-split headline + countdown

Every section heading can be split into multiple lines with per-line colors. Pass an array of `{text, color}` objects:

```js
hero: {
  eyebrow: "FRESH WEEKLY · LOCAL PICKUP · DM TO ORDER",
  headlineLines: [
    { text: "SIX DESSERTS.", color: "ink" },      // white in bold theme, dark in warm
    { text: "ONE DROP.",     color: "accent" }    // amber/yellow in both themes
  ],
  subheadline: "Small-batch desserts, made the day of pickup.",
  primaryCta:   { label: "ORDER NOW",          href: "#preorder" },
  secondaryCta: { label: "FOLLOW @SWEETDROP",  href: "https://www.instagram.com/sweetdropkitchen/" },
  countdown: {
    enabled: true,
    label:   "NEXT DROP IN"   // shown above the days/hrs/min/sec boxes
  },
  image: { src: "", alt: "This week's drop." }   // leave src empty for a theme-aware placeholder
}
```

Available `color` values: `"ink"`, `"accent"`, `"primary"`, `"muted"`, `"ink-soft"`, `"accent-soft"`.

The countdown auto-targets the **soonest selectable pickup date** with an `isoDate`. It ticks every second. Set `countdown.enabled: false` to hide.

You can also pass `headlineLines` as a plain string array — backward-compatible with older configs:

```js
headlineLines: ["Real bread.", "Real butter.", "Made Saturdays."]
```

### 6. About section with bullets

```js
about: {
  eyebrow: "BAKED DIFFERENT",
  headingLines: [
    { text: "MADE BY ONE PERSON.", color: "ink" },
    { text: "ON PURPOSE.",         color: "accent" }
  ],
  body: "Sweet Drop Kitchen runs as a small weekly operation...",
  bullets: [   // optional — renders as amber-line list under the body
    { title: "SMALL BATCHES",       body: "Made the day of pickup, in quantities small enough to control quality." },
    { title: "SIX FLAVORS A WEEK",  body: "Six rotating desserts. Some signatures stay. Most rotate out." },
    { title: "ONE PERSON, ONE KITCHEN", body: "No staff, no second location. Direct from the maker." }
  ],
  photo: "",                          // optional; "" hides photo column
  signedBy: "— The Sweet Drop Kitchen"
}
```

Set `about: null` to hide the entire section.

### 7. Menu with featured product, layout, and badges

```js
menu: {
  sectionEyebrow: "THE DROP",
  sectionHeadingLines: [
    { text: "THIS WEEK'S", color: "ink" },
    { text: "LINEUP.",     color: "accent" }
  ],
  sectionBlurb:    "Six flavors. Seven days. Then gone.",
  sectionFootnote: "NEW DROP EVERY FRIDAY.",
  layout: "asymmetric",   // "asymmetric" (one big featured + smaller cards) or "grid" (uniform 2-col)
  products: [
    {
      slug: "mango-sticky-rice",
      name: "Mango Sticky Rice",
      description: "The signature. Sweet coconut sticky rice with fresh mango on top.",
      sizes: [
        { label: "Cup", price: 7 },
        { label: "Box", price: 12 }
      ],
      tags:      ["gluten-free", "vegan"],   // optional — green tag chips
      allergens: ["coconut"],                // optional — "Contains X" chips
      photo:     "",                          // "" uses a theme-aware placeholder
      badge:     "SIGNATURE",                 // optional — "SIGNATURE" | "NEW" | "LIMITED" | "CHILLED" | ...
      featured:  true                         // marks this as the big card in asymmetric layout
    }
  ]
}
```

`layout: "asymmetric"` makes the featured product a large card spanning 2 columns and 2 rows on desktop, with the rest filling around it.  
`layout: "grid"` uses a uniform 2-column grid where all cards are the same size.

### 8. Pickup dates

Add an entry for each upcoming drop. `isoDate` drives the countdown, the "This Week" badge, and the "Add to calendar" download.

```js
pickup: {
  availabilityMode: "open",    // "open" | "paused" | "coming_soon"
  pausedMessage:    "",
  allowIcsExport:   true,      // optional; default true. Set false to hide "Add to calendar" links
  dates: [
    {
      id:                  "saturday-5-17",
      isoDate:             "2026-05-17",                          // ISO date — required for countdown + .ics
      weekday:             "Saturday",
      dateLabel:           "5/17",
      pickupWindow:        "9 AM - 12 PM",                         // start/end hour drive .ics DTSTART/DTEND
      preorderCutoffLabel: "Reservations close Thursday at 9 PM",
      status:              "open",                                // open | limited | sold_out | closed | coming_soon
      timeOptions:         []                                     // leave [] to auto-generate hourly options
    }
  ]
}
```

**Add to calendar (.ics export).** Each date with an `isoDate` shows a small "Add to calendar" link below the card. Clicking it downloads an `.ics` file that drops a calendar event with title `"<business> pickup"`, the parsed pickup window as start/end, your `business.locationLabel` as the location, and a description with the cutoff + Instagram handle. The file works in Apple Calendar, Google Calendar, Outlook, and any other ICS-compatible app.

Times are written as **floating** (no timezone). Calendar apps interpret them in the customer's local timezone — fine for local pickup, where vendor and customer share a timezone.

Set `allowIcsExport: false` to hide the links globally.

### 9. Stats strip (optional)

A three-stat horizontal block. Use real facts, not fabricated numbers.

```js
stats: {
  enabled: true,
  eyebrow: "THE OPERATION",
  headingLines: [
    { text: "ONE KITCHEN.",  color: "ink" },
    { text: "FRIDAY DROPS.", color: "accent" }
  ],
  items: [
    { value: "FRIDAY", label: "DROP DAY" },
    { value: "6",      label: "FLAVORS PER WEEK" },
    { value: "100%",   label: "HOME KITCHEN" }
  ]
}
```

Use descriptive facts (drop day, batch count, years baking) rather than exaggerated scale claims. Set `enabled: false` to hide.

### 10. Reviews marquee (optional)

Only enable this when you have **real** customer reviews. Don't fabricate.

```js
reviews: {
  enabled: true,
  eyebrow: "FROM CUSTOMERS",
  headingLines: [{ text: "REAL MESSAGES.", color: "ink" }],
  items: [
    { stars: 5, body: "Best bread I've had in Tampa.", author: "Sarah K.", source: "Instagram DM" },
    { stars: 5, body: "Morning buns disappeared in 30 seconds.", author: "James R.", source: "Instagram DM" }
  ]
}
```

Reviews scroll horizontally on infinite loop. Pause on hover.

### 11. Big amber CTA strip (optional)

Full-width amber-background section near the bottom of the page.

```js
bigCta: {
  enabled: true,
  eyebrow: "READY?",
  headingLines: [
    { text: "FIND YOUR", color: "ink-soft" },   // dim
    { text: "DROP.",     color: "ink" }         // solid
  ],
  body: "Weekly menu posts Friday. DM us to claim yours.",
  cta:  { label: "ORDER NOW →", href: "#preorder" }
}
```

On the amber strip, all heading colors are auto-mapped to dark-on-amber. So `"ink"` becomes solid dark and `"ink-soft"` becomes dim dark.

### 12. Payment, FAQ, How It Works

All three sections now support the same `headingLines` color-split system.

```js
howItWorks: {
  eyebrow: "HOW IT WORKS",
  headingLines: [{ text: "SIMPLE PREORDER PICKUP.", color: "ink" }],
  steps: [
    { title: "SUBMIT PREORDER", body: "Send your name, quantity, size, and preferred pickup time." },
    { title: "CONFIRM ORDER",   body: "Your order and pickup time are confirmed by DM." },
    { title: "PICK UP LOCAL",   body: "Pick up your fresh-made order at the drop location." }
  ]
},
payment: {
  eyebrow: "PAYMENT",
  headingLines: [{ text: "ACCEPTED PAYMENT METHODS.", color: "ink" }],
  blurb: "Payment may be required to secure larger orders or new customer orders."
},
faq: {
  eyebrow: "FAQ",
  headingLines: [{ text: "GOOD TO KNOW.", color: "ink" }],
  items: [
    { q: "Is this pickup only?", a: "Yes — local pickup only." }
  ]
}
```

### 13. Social, payment methods, legal, footer

```js
preorder: {
  paymentMethods:        ["Cash App", "Venmo", "Apple Pay", "Cash"],
  instagramDmUrl:        "https://ig.me/m/yourhandle",
  instagramHandleLabel:  "@yourhandle"
},
social: {
  instagramUrl:    "https://www.instagram.com/yourhandle/",
  instagramHandle: "@yourhandle",
  tiktokUrl:       "https://www.tiktok.com/@yourhandle",
  facebookUrl:     ""
},
legal: {
  cottageFoodNotice: "Made in a home kitchen. Not subject to state inspection per Florida Cottage Food Law.",
  allergenNotice:    ""
},
footer: {
  tagline: "Weekly preorder drops. Local pickup only. Coordinated by Instagram DM."
}
```

---

## Product photos

The template auto-resolves photos from a convention. **Drop files into these paths and the page picks them up — no config edit needed:**

```
images/hero.jpg                  — hero (recommended portrait, ~900×1125)
images/about.jpg                 — about section (recommended portrait, ~900×1125)
images/products/<slug>.jpg       — one per product, named after the product's slug (recommended ~900×600)
```

Each product's `slug` field is the lookup key. So `slug: "mango-sticky-rice"` → `images/products/mango-sticky-rice.jpg`.

If a file isn't present at the convention path, the template falls back to a theme-aware SVG placeholder (uses your accent color). The browser logs a single 404 per missing image — harmless, just a missed network request.

**Overriding the convention.** Set an explicit path in config to point at a different file:

```js
hero:  { image: { src: "images/this-week.jpg", alt: "This week's lineup." } },
about: { photo: "images/baking-day.jpg" },
menu: {
  products: [
    { slug: "country-loaf", photo: "images/country-loaf-v2.jpg", ... }
  ]
}
```

**Disabling auto-resolution for the about photo only** (e.g. you don't want an about photo at all): set `about: { photoAuto: false }`. The section will render as a centered single-column block.

---

## SEO and social previews

`app.js` updates `<title>`, meta description, OG tags, Twitter tags, JSON-LD, and the favicon from `site.config.js` at runtime.

Facebook, iMessage, and Twitter/X scrapers often **don't run JavaScript**. For correct social-share preview cards, also update these blocks directly in `index.html`:

```html
<title>Your Business Name</title>
<meta name="description"               content="Your description." />
<meta property="og:title"              content="Your Business Name" />
<meta property="og:description"        content="Your description." />
<meta name="twitter:title"             content="Your Business Name" />
<meta name="twitter:description"       content="Your description." />
```

If you have a public hero photo URL, also add:

```html
<meta property="og:image"    content="https://yourdomain.com/images/hero.jpg" />
<meta name="twitter:image"   content="https://yourdomain.com/images/hero.jpg" />
```

The `<noscript>` fallback block (just inside `<body>`) hardcodes the demo Instagram URL — update it to your handle when you customize.

---

## Copy patterns by business type

Replace `{X}` slots with your own voice. Use the color-split pattern with `accent` on the punchy second line.

**Dessert seller** (bold/dark recommended)

```js
headlineLines: [
  { text: "SIX FLAVORS.", color: "ink" },
  { text: "ONE DROP.",    color: "accent" }
]
```

**Baker** (warm/cream recommended)

```js
headlineLines: [
  { text: "Real bread.",      color: "accent" },
  { text: "Real butter.",     color: "primary" },
  { text: "Made Saturdays.",  color: "ink" }
]
```

**Meal prep**

```js
headlineLines: [
  { text: "REAL FOOD,",       color: "ink" },
  { text: "READY MONDAY.",    color: "accent" }
]
```

**Farmers market**

```js
headlineLines: [
  { text: "SEE YOU AT",        color: "ink" },
  { text: "{MARKET NAME}",     color: "accent" },
  { text: "SATURDAYS.",        color: "ink" }
]
```

**Drinks**

```js
headlineLines: [
  { text: "COLD-PRESSED",      color: "ink" },
  { text: "FOR THE WEEK.",     color: "accent" }
]
```

Don't fake testimonials, awards, or "100+ orders this month" scarcity. Real beats polished.

---

## Local development

```bash
# Open directly
open index.html

# Or serve locally so site.config.js / app.js relative paths load cleanly
python -m http.server
# then visit http://localhost:8000
```

---

## Deploy

This is a static site — no build step. Pick whichever host you already use.

### Vercel

1. Push the repo to GitHub.
2. Import the repo in Vercel.
3. Accept the defaults. Deploy.

### Netlify

1. Push the repo to GitHub.
2. In Netlify, **Add new site → Import an existing project**.
3. Pick the repo. Leave build command empty, publish directory = `.`.
4. Deploy.

### GitHub Pages

1. Push to `main`.
2. Repo **Settings → Pages → Source: Deploy from branch → `main` / root**.
3. Wait a minute for the URL to appear.

---

## What not to touch

- `app.js` — rendering, countdown ticker, clipboard, message builder, asymmetric grid logic. Edit only if you're extending the template, not the content.
- The Tailwind class names in `index.html` (`bg-cream`, `text-ink`, `text-onAccent`, `border-edge`, etc.). These are aliases pointing at your theme tokens; the markup keeps working when you re-color via `theme.colors`. Renaming them in markup will break styling.
- The `[id]` attributes throughout `index.html`. `app.js` targets every config-driven element by stable ID.
- The marquee CSS keyframes — controls the reviews scroll animation.
- The Tailwind CDN `<script>` ordering — `site.config.js` must load **before** the Tailwind script so the theme tokens are available at config-time.

---

## Tech stack

- HTML
- Tailwind CSS via CDN (no build step)
- Vanilla JavaScript
- Static hosting (Vercel / Netlify / GitHub Pages)

No npm. No framework. No database.

---

## License

MIT. Adapt freely for personal or commercial use.

---

## Author

Built by Diese Tech — https://github.com/diese-tech
