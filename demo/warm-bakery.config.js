// Alternate preset: warm/cream/serif aesthetic for a home baker.
// To use this preset: copy this file to site.config.js (back up the bold/dark one first).
//   cp demo/warm-bakery.config.js site.config.js
window.SITE_CONFIG = {
  business: {
    name: "Maya's Bakery",
    shortName: "Maya's",
    initials: "MB",
    locationLabel: "Tampa, FL",
    description:
      "Weekend sourdough loaves and morning buns, baked fresh in a home kitchen in Tampa.",
    siteUrl: ""
  },

  announcement: {
    enabled: false,
    text: "",
    href: ""
  },

  theme: {
    style: "warm",
    colors: {
      bg: "#fff7e8",
      bgSoft: "#fffaf1",
      surface: "#ffffff",
      primary: "#5a247a",
      primarySoft: "#f1e4ff",
      accent: "#ffc533",
      accentDeep: "#d89300",
      blush: "#ffe6ef",
      blushDeep: "#dd6f9b",
      ink: "#24180d",
      muted: "#6b5b48",
      mutedSoft: "#a89a85",
      edge: "#ead8c0",
      onAccent: "#24180d"
    },
    fonts: {
      display: ["Playfair Display", "Georgia", "serif"],
      sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"]
    },
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
  },

  hero: {
    eyebrow: "Tampa, FL",
    headlineLines: [
      { text: "Real bread.", color: "accent" },
      { text: "Real butter.", color: "primary" },
      { text: "Made Saturdays.", color: "ink" }
    ],
    subheadline:
      "Sourdough loaves and morning buns, baked fresh each weekend in a home kitchen in East Tampa.",
    primaryCta: { label: "Reserve a loaf", href: "#preorder" },
    secondaryCta: { label: "Follow on Instagram", href: "https://www.instagram.com/yourhandle/" },
    countdown: {
      enabled: true,
      label: "Next bake in"
    },
    image: { src: "", alt: "This weekend's loaves." }
  },

  about: {
    eyebrow: "About",
    headingLines: [
      { text: "Hi, I'm Maya.", color: "primary" }
    ],
    body:
      "I bake on Saturdays out of my home kitchen in East Tampa. I started baking for friends in 2023 and never really stopped. Every loaf is hand-shaped, scored, and baked in a home oven.",
    bullets: [
      { title: "Small bakes", body: "12 loaves max per Saturday. Reserve before Thursday." },
      { title: "Same-day fresh", body: "Baked the morning of pickup. Never the night before." },
      { title: "One baker", body: "No staff, no second kitchen. Direct from me to you." }
    ],
    photo: "",
    signedBy: "— Maya"
  },

  menu: {
    sectionEyebrow: "This week",
    sectionHeadingLines: [
      { text: "Saturday's bake.", color: "primary" }
    ],
    sectionBlurb: "Reserve by Thursday — loaves go fast.",
    sectionFootnote: "",
    layout: "grid",
    products: [
      {
        slug: "country-sourdough",
        name: "Country Sourdough",
        description: "Open crumb, blistered crust, naturally leavened.",
        sizes: [
          { label: "Boule", price: 9 },
          { label: "Half-boule", price: 5 }
        ],
        tags: ["vegan"],
        allergens: ["gluten"],
        photo: "",
        badge: "Signature",
        featured: true
      },
      {
        slug: "morning-buns",
        name: "Morning Buns",
        description: "Laminated dough, cinnamon-sugar, baked muffin-style.",
        sizes: [
          { label: "Single", price: 5 },
          { label: "Four-pack", price: 18 }
        ],
        tags: [],
        allergens: ["gluten", "dairy", "egg"],
        photo: "",
        badge: ""
      },
      {
        slug: "seeded-loaf",
        name: "Seeded Loaf",
        description: "Sesame, sunflower, flax. Hearty and toast-friendly.",
        sizes: [
          { label: "Boule", price: 10 }
        ],
        tags: [],
        allergens: ["gluten", "sesame"],
        photo: "",
        badge: "New"
      }
    ]
  },

  preorder: {
    enabled: true,
    sectionEyebrow: "Reserve",
    sectionHeadingLines: [
      { text: "Hold a loaf.", color: "primary" }
    ],
    sectionBlurb: "Pick what you want, pick when. Send the message by DM.",
    instructions: "Copy your reservation message and send it by Instagram DM. No checkout required.",
    paymentMethods: ["Cash App", "Venmo", "Zelle", "Cash"],
    instagramDmUrl: "https://ig.me/m/yourhandle",
    instagramHandleLabel: "@yourhandle"
  },

  pickup: {
    availabilityMode: "open",
    pausedMessage: "",
    dates: [
      {
        id: "saturday-5-17",
        isoDate: "2026-05-17",
        weekday: "Saturday",
        dateLabel: "5/17",
        pickupWindow: "9 AM - 12 PM",
        preorderCutoffLabel: "Reservations close Thursday at 9 PM",
        status: "open",
        timeOptions: []
      },
      {
        id: "saturday-5-24",
        isoDate: "2026-05-24",
        weekday: "Saturday",
        dateLabel: "5/24",
        pickupWindow: "9 AM - 12 PM",
        preorderCutoffLabel: "Reservations close Thursday at 9 PM",
        status: "limited",
        timeOptions: []
      }
    ]
  },

  howItWorks: {
    eyebrow: "How it works",
    headingLines: [
      { text: "Saturday pickup.", color: "primary" }
    ],
    steps: [
      { title: "Reserve", body: "Send your name, what you want, and how many." },
      { title: "Confirm", body: "I'll DM back with pickup details and a Venmo request." },
      { title: "Pick up", body: "Pop by Saturday morning. I'll have your bag ready." }
    ]
  },

  payment: {
    eyebrow: "Payment",
    headingLines: [
      { text: "Accepted payment.", color: "primary" }
    ],
    blurb: "Reservations are confirmed by Venmo or Cash App. Pay on pickup also works for repeat customers."
  },

  stats: {
    enabled: true,
    eyebrow: "About this kitchen",
    headingLines: [
      { text: "Real numbers.", color: "primary" }
    ],
    items: [
      { value: "12", label: "Loaves per Saturday" },
      { value: "2023", label: "First bake" },
      { value: "Saturday", label: "Bake day" }
    ]
  },

  reviews: {
    enabled: true,
    eyebrow: "From customers",
    headingLines: [
      { text: "Real messages.", color: "primary" }
    ],
    items: [
      { stars: 5, body: "Best bread I've had in Tampa. The crust is incredible.", author: "Sarah K.", source: "Instagram DM" },
      { stars: 5, body: "Morning buns disappeared in 30 seconds. Already ordering next week.", author: "James R.", source: "Instagram DM" },
      { stars: 5, body: "Real sourdough, real flavor. Worth the drive every Saturday.", author: "Priya M.", source: "Google Review" }
    ]
  },

  bigCta: {
    enabled: true,
    eyebrow: "Saturday's coming",
    headingLines: [
      { text: "Reserve", color: "ink-soft" },
      { text: "your loaf.", color: "primary" }
    ],
    body: "DM by Thursday at 9 PM and your loaf is held with your name on it.",
    cta: { label: "Reserve a loaf", href: "#preorder" }
  },

  faq: {
    eyebrow: "FAQ",
    headingLines: [{ text: "Good to know.", color: "primary" }],
    items: [
      { q: "How many loaves do you make?", a: "12 per Saturday. First-come, first-reserved." },
      { q: "Can I freeze the bread?", a: "Yes — slice first, freeze in a bag, toast straight from frozen." },
      { q: "Do you ship?", a: "No — local pickup only in East Tampa." },
      { q: "Is the kitchen licensed?", a: "I bake under Florida's Cottage Food Law. Bread is one of the allowed items." }
    ]
  },

  legal: {
    cottageFoodNotice: "Made in a home kitchen. Not subject to state inspection per Florida Cottage Food Law.",
    allergenNotice: ""
  },

  social: {
    instagramUrl: "https://www.instagram.com/yourhandle/",
    instagramHandle: "@yourhandle",
    tiktokUrl: "",
    facebookUrl: ""
  },

  footer: {
    tagline: "Weekend sourdough and morning buns, baked fresh in East Tampa."
  }
};
