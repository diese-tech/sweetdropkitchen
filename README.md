# Sweet Drop Kitchen

A mobile-first preorder landing page **template** for small cottage food businesses — bakers, dessert makers, meal prep sellers, farmers market vendors, drink makers, and Instagram/TikTok-first food brands.

Edit one config file. Deploy. Done.

Sweet Drop Kitchen ships as the demo brand inside this repo. The template is designed so any small food seller can clone the repo, customize `site.config.js`, and launch a warm, personal, mobile-first preorder page in an afternoon.

---

## What this template gives you

- A single-file deploy. No build step. No framework.
- A preorder flow that builds a message and hands off to **Instagram DM** — no checkout, no payment processor, no inventory system.
- Weekly pickup date cards with status badges (open / limited / sold out / coming soon / closed).
- A config-driven menu with per-product sizes.
- Editable hero, about, FAQ, payment methods, social links, and pickup details.
- A theme system you can re-color in one place.

What this template intentionally does **not** include: shipping, delivery, full ecommerce, payments, accounts, inventory, subscriptions, or an admin panel. Those add complexity that small cottage food sellers don't need on day one.

---

## File layout

```text
/
├── index.html        # Page skeleton + Tailwind setup. You rarely edit this.
├── site.config.js    # Everything you customize lives here.
├── app.js            # Rendering logic. You rarely edit this.
└── README.md
```

Three real files. That's the whole template.

---

## Customize in 10 minutes

Open `site.config.js`. Every field below maps to something on the page.

### 1. Brand name and initials

```js
business: {
  name: "Maya's Bakery",
  shortName: "Maya's",
  initials: "MB",                // shown inside the header logo bubble and favicon
  locationLabel: "Tampa, FL",    // shown in the hero pill + footer
  description: "...",            // short description used for SEO, footer, and OG tags
  siteUrl: "https://mayasbakery.com"  // optional — used for canonical URL and JSON-LD
}
```

### 2. Colors

The template ships with a warm cream + purple + mango palette. Change the hex values; the rest of the page updates automatically.

```js
theme: {
  colors: {
    bg:           "#fff7e8",   // page background
    bgSoft:       "#fffaf1",   // card / soft-surface background
    primary:      "#5a247a",   // brand color (CTAs, headlines)
    primarySoft:  "#f1e4ff",   // pale tint of primary
    accent:       "#ffc533",   // pop color (hero, badges)
    accentDeep:   "#d89300",   // darker accent
    blush:        "#ffe6ef",   // soft pink card background
    blushDeep:    "#dd6f9b",   // pink border
    ink:          "#24180d",   // body text
    muted:        "#6b5b48"    // supporting text
  }
}
```

Tip: pick two anchor colors (primary + accent) and let the rest follow.

### 3. Fonts

```js
fonts: {
  display: ["Playfair Display", "Georgia", "serif"],
  sans:    ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"]
}
```

If you change fonts, also update the Google Fonts `<link>` tag in `index.html` (the `<link href="https://fonts.googleapis.com/...">` line) so the new fonts actually load.

### 4. Hero

```js
hero: {
  headlineLines: ["Real bread.", "Real butter.", "Made Saturdays."],
  subheadline:   "Sourdough loaves and morning buns, baked fresh each weekend in East Tampa.",
  primaryCta:    { label: "Reserve a loaf", href: "#preorder" },
  secondaryCta:  { label: "Follow on Instagram", href: "https://www.instagram.com/yourhandle/" },
  image: {
    src: "images/hero.jpg",      // optional; leaves a placeholder if blank
    alt: "Two sourdough loaves cooling on a rack."
  }
}
```

### 5. Menu items

Each product has its own `sizes` array. A baker can say `Single` / `Half-dozen` / `Dozen`. A meal prep vendor can say `3 meals` / `5 meals`. A drink maker can say `Bottle` / `6-pack`.

```js
menu: {
  sectionEyebrow: "This Week",
  sectionHeading: "Saturday's bake",
  sectionBlurb:   "Reserve by Thursday — loaves go fast.",
  products: [
    {
      slug:        "country-sourdough",
      name:        "Country Sourdough",
      description: "Open crumb, blistered crust, naturally leavened.",
      sizes: [
        { label: "Boule",      price: 9 },
        { label: "Half-boule", price: 5 }
      ],
      tags:      ["vegan"],          // optional — rendered as chips (e.g. "gluten-free", "vegan")
      allergens: ["gluten"],         // optional — rendered as "Contains X" chips
      photo: "images/products/country-sourdough.jpg"  // optional
    }
  ]
}
```

Image convention: drop files into an `images/products/` folder next to `index.html` and reference them by relative path. If `photo` is left blank, the template uses a soft placeholder SVG.

### 6. Pickup dates

Each week, update the `pickup.dates` array. Status drives the badge color and whether the date is selectable.

```js
pickup: {
  availabilityMode: "open",    // "open" | "paused" | "coming_soon"
  pausedMessage: "",           // shown across the top if mode is not "open"
  dates: [
    {
      id: "sat-9-14",
      isoDate: "2026-09-14",   // ISO date — drives the "This Week" / "Next Drop" badge
      weekday: "Saturday",
      dateLabel: "9/14",
      pickupWindow: "9 AM - 12 PM",
      preorderCutoffLabel: "Preorder closes Thursday at 8 PM",
      status: "open",          // open | limited | sold_out | closed | coming_soon
      timeOptions: []          // leave empty to auto-generate hourly options
    }
  ]
}
```

Going on vacation? Set `availabilityMode: "paused"` and write a one-line `pausedMessage`. The banner shows up; preorders still display.

### 7. Social links and Instagram DM

```js
social: {
  instagramUrl:    "https://www.instagram.com/yourhandle/",
  instagramHandle: "@yourhandle",
  tiktokUrl:       "https://www.tiktok.com/@yourhandle",
  facebookUrl:     ""
},
preorder: {
  instagramDmUrl:        "https://ig.me/m/yourhandle",  // deep-links to your DM thread
  instagramHandleLabel:  "@yourhandle"
}
```

`ig.me/m/<handle>` is the public Instagram DM deep link — replace `<handle>` with your Instagram username.

### 8. Payment methods

```js
preorder: {
  paymentMethods: ["Cash App", "Venmo", "Zelle", "Cash"]
}
```

These render both in the preorder form's payment dropdown and in the "Accepted payment methods" section.

### 9. Cottage food disclaimer (optional)

Cottage food laws vary by state. Leave this empty unless you've checked your local rules.

```js
legal: {
  cottageFoodNotice: "Made in a home kitchen. Not subject to state inspection per FL Cottage Food Law."
}
```

If set, a small disclaimer appears below the FAQ.

### 10. About / story (optional)

The about section is hidden by default. Adding an `about` object reveals it between the hero and menu.

```js
about: {
  eyebrow:   "About",
  headline:  "Hi, I'm Maya.",
  body:      "I bake on Saturdays out of my home kitchen in East Tampa. I started baking for friends in 2023 and never really stopped.",
  photo:     "images/about.jpg",    // optional
  signedBy:  "— Maya"               // optional
}
```

Write it in your own voice. One real paragraph beats five generic ones.

---

## Copy patterns by business type

Starting points — replace with your own voice.

**Dessert seller**
- Headline: `Weekly` / `Dessert Drops` / `in {neighborhood}`
- Subhead: `Small-batch desserts made the day of pickup. Order by DM, pick up Friday.`
- CTA: `Preorder this week`

**Baker**
- Headline: `Real bread.` / `Real butter.` / `Made Saturdays.`
- Subhead: `Sourdough and morning buns, baked fresh each weekend in {neighborhood}.`
- CTA: `Reserve a loaf`

**Meal prep**
- Headline: `Real food,` / `ready Monday.` / `Made by {name}.`
- Subhead: `5 fresh meals, packed and labeled, every Sunday night for Monday pickup.`
- CTA: `Order this week's menu`

**Farmers market vendor**
- Headline: `See you at` / `{Market Name}` / `Saturdays.`
- Subhead: `What I'm bringing this weekend — reserve ahead so you don't miss out.`
- CTA: `Reserve for Saturday`

**Drink / beverage seller**
- Headline: `Cold-pressed` / `{drink}` / `for the week.`
- Subhead: `4 flavors, 6-bottle packs, pickup every Wednesday in {neighborhood}.`
- CTA: `Order a pack`

Don't fake testimonials, awards, or "100+ orders this month" scarcity. Real beats polished.

---

## Local development

Open the file directly in a browser:

```bash
open index.html
```

Or serve it locally so the relative `site.config.js` / `app.js` paths load cleanly:

```bash
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

## SEO and social preview cards

`app.js` updates the page title, meta description, and OG/Twitter tags from `site.config.js` at runtime. Googlebot runs JS and will see those values.

Facebook, iMessage, and Twitter/X scrapers often do **not** run JavaScript. For correct social share previews, also update these lines directly in `index.html`:

```html
<!-- ~line 8 -->
<title>Your Business Name</title>
<meta name="description" content="Your description." />
<meta property="og:title" content="Your Business Name" />
<meta property="og:description" content="Your description." />
<meta name="twitter:title" content="Your Business Name" />
<meta name="twitter:description" content="Your description." />
```

If you have a hero photo at a public URL, add:

```html
<meta property="og:image" content="https://yourdomain.com/images/hero.jpg" />
<meta name="twitter:image" content="https://yourdomain.com/images/hero.jpg" />
```

---

## JavaScript-disabled users

The `<noscript>` block near the top of `<body>` in `index.html` shows a fallback message for the rare browser with JS off. Update the Instagram URL inside it to match your handle:

```html
<a ... href="https://www.instagram.com/yourhandle/">DM on Instagram</a>
```

---

## What not to touch

- `app.js` rendering logic (message builder, pickup time parser, clipboard handoff). Edit only if you really need to change behavior, not content.
- The Tailwind class names inside `index.html` markup. The template maps your `theme.colors` config onto stable class names (`bg-mango`, `text-ube`, `border-blush`) so the markup keeps working even when you re-color the site. Renaming classes in markup will break styling.
- The grain texture SVG in the `<style>` block — purely decorative.

---

## Tech stack

- HTML
- Tailwind CSS via CDN
- Vanilla JavaScript
- Static hosting (Vercel / Netlify / GitHub Pages)

No npm. No framework. No database.

---

## License

MIT. Adapt freely for personal or commercial use.

---

## Author

Built by Diese Tech — https://github.com/diese-tech
