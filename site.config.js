window.SITE_CONFIG = {
  business: {
    name: "Sweet Drop Kitchen",
    shortName: "Sweet Drop",
    initials: "SD",
    locationLabel: "Your City, FL",
    description:
      "A small home kitchen running weekly preorder drops. Six desserts. Seven days. Then gone.",
    siteUrl: ""
  },

  announcement: {
    enabled: true,
    text: "MADE FROM A HOME KITCHEN. PICKUP ONLY.",
    href: "#about"
  },

  theme: {
    style: "bold",
    colors: {
      bg: "#0b0907",
      bgSoft: "#16110d",
      surface: "#1b1611",
      primary: "#ffffff",
      primarySoft: "#1f1812",
      accent: "#f5a623",
      accentDeep: "#d68910",
      blush: "#1b1611",
      blushDeep: "#f5a623",
      ink: "#ffffff",
      muted: "#9a8e7d",
      mutedSoft: "#5b5347",
      edge: "#2a221a",
      onAccent: "#0b0907"
    },
    fonts: {
      display: ["Anton", "Impact", "Arial Black", "sans-serif"],
      sans: ["Inter", "system-ui", "-apple-system", "sans-serif"]
    },
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap"
  },

  hero: {
    eyebrow: "FRESH WEEKLY · LOCAL PICKUP · DM TO ORDER",
    headlineLines: [
      { text: "SIX DESSERTS.", color: "ink" },
      { text: "ONE DROP.", color: "accent" }
    ],
    subheadline:
      "Small-batch desserts, made the day of pickup. Six flavors. Seven days. Then gone.",
    primaryCta: { label: "ORDER NOW", href: "#preorder" },
    secondaryCta: { label: "FOLLOW @SWEETDROP", href: "https://www.instagram.com/sweetdropkitchen/" },
    countdown: {
      enabled: true,
      label: "NEXT DROP IN"
    },
    image: { src: "", alt: "This week's drop." }
  },

  about: {
    eyebrow: "BAKED DIFFERENT",
    headingLines: [
      { text: "MADE BY ONE PERSON.", color: "ink" },
      { text: "ON PURPOSE.", color: "accent" }
    ],
    body:
      "Sweet Drop Kitchen runs as a small weekly operation. Every order is made the day of pickup, in batches small enough to keep the texture right.",
    bullets: [
      { title: "SMALL BATCHES", body: "Made the day of pickup, in quantities small enough to control quality." },
      { title: "SIX FLAVORS A WEEK", body: "Six rotating desserts. Some signatures stay. Most rotate out." },
      { title: "ONE PERSON, ONE KITCHEN", body: "No staff, no second location. Direct from the maker." }
    ],
    photo: "",
    signedBy: "— The Sweet Drop Kitchen"
  },

  menu: {
    sectionEyebrow: "THE DROP",
    sectionHeadingLines: [
      { text: "THIS WEEK'S", color: "ink" },
      { text: "LINEUP.", color: "accent" }
    ],
    sectionBlurb: "Six flavors. Seven days. Then gone.",
    sectionFootnote: "NEW DROP EVERY FRIDAY.",
    layout: "asymmetric",
    products: [
      {
        slug: "mango-sticky-rice",
        name: "Mango Sticky Rice",
        description: "The signature. Sweet coconut sticky rice with fresh mango on top.",
        sizes: [
          { label: "Cup", price: 7 },
          { label: "Box", price: 12 }
        ],
        tags: ["gluten-free", "vegan"],
        allergens: ["coconut"],
        photo: "",
        badge: "SIGNATURE",
        featured: true
      },
      {
        slug: "ube-dessert-cup",
        name: "Ube Dessert Cup",
        description: "Creamy ube layered with coconut cream and rice pearls.",
        sizes: [
          { label: "Cup", price: 8 },
          { label: "Box", price: 13 }
        ],
        tags: [],
        allergens: ["dairy", "egg"],
        photo: "",
        badge: ""
      },
      {
        slug: "strawberry-matcha-cup",
        name: "Strawberry Matcha Cup",
        description: "Strawberry + matcha layered cup, lightly sweet.",
        sizes: [
          { label: "Cup", price: 9 },
          { label: "Box", price: 14 }
        ],
        tags: [],
        allergens: ["dairy"],
        photo: "",
        badge: "NEW"
      }
    ]
  },

  preorder: {
    enabled: true,
    sectionEyebrow: "PICKUP & PREORDER",
    sectionHeadingLines: [
      { text: "BUILD YOUR", color: "ink" },
      { text: "PREORDER.", color: "accent" }
    ],
    sectionBlurb: "Pick what you want, pick when. Copy the message, send by DM.",
    instructions: "Copy your preorder message and send it by Instagram DM. No checkout required.",
    paymentMethods: ["Cash App", "Venmo", "Apple Pay", "Cash"],
    instagramDmUrl: "https://ig.me/m/sweetdropkitchen",
    instagramHandleLabel: "@sweetdropkitchen"
  },

  pickup: {
    availabilityMode: "open",
    pausedMessage: "",
    dates: [
      {
        id: "tuesday-6-10",
        isoDate: "2026-06-10",
        weekday: "Tuesday",
        dateLabel: "6/10",
        pickupWindow: "12 PM - 6 PM",
        preorderCutoffLabel: "Preorder closes Monday at 8 PM",
        status: "open",
        timeOptions: []
      },
      {
        id: "wednesday-6-11",
        isoDate: "2026-06-11",
        weekday: "Wednesday",
        dateLabel: "6/11",
        pickupWindow: "11 AM - 6 PM",
        preorderCutoffLabel: "Preorder closes Tuesday at 8 PM",
        status: "limited",
        timeOptions: []
      },
      {
        id: "sunday-6-15",
        isoDate: "2026-06-15",
        weekday: "Sunday",
        dateLabel: "6/15",
        pickupWindow: "1 PM - 7 PM",
        preorderCutoffLabel: "Preorder closes Saturday at 8 PM",
        status: "open",
        timeOptions: []
      }
    ]
  },

  howItWorks: {
    eyebrow: "HOW IT WORKS",
    headingLines: [
      { text: "SIMPLE", color: "ink" },
      { text: "PREORDER PICKUP.", color: "accent" }
    ],
    steps: [
      { title: "SUBMIT PREORDER", body: "Send your name, quantity, size, and preferred pickup time." },
      { title: "CONFIRM ORDER", body: "Your order and pickup time are confirmed by DM. Payment may be requested to secure." },
      { title: "PICK UP LOCAL", body: "Pick up your fresh-made order at the drop location." }
    ]
  },

  payment: {
    eyebrow: "PAYMENT",
    headingLines: [
      { text: "ACCEPTED", color: "ink" },
      { text: "PAYMENT METHODS.", color: "accent" }
    ],
    blurb: "Payment may be required to secure larger orders or new customer orders."
  },

  stats: {
    enabled: true,
    eyebrow: "THE OPERATION",
    headingLines: [
      { text: "ONE KITCHEN.", color: "ink" },
      { text: "FRIDAY DROPS.", color: "accent" }
    ],
    items: [
      { value: "FRIDAY", label: "DROP DAY" },
      { value: "6", label: "FLAVORS PER WEEK" },
      { value: "100%", label: "HOME KITCHEN" }
    ]
  },

  reviews: {
    enabled: false,
    eyebrow: "WORD OF MOUTH",
    headingLines: [{ text: "FROM CUSTOMERS.", color: "ink" }],
    items: []
  },

  bigCta: {
    enabled: true,
    eyebrow: "READY?",
    headingLines: [
      { text: "FIND YOUR", color: "ink-soft" },
      { text: "DROP.", color: "ink" }
    ],
    body: "Weekly menu posts Friday. DM us to claim yours.",
    cta: { label: "ORDER NOW →", href: "#preorder" }
  },

  faq: {
    eyebrow: "FAQ",
    headingLines: [{ text: "GOOD TO KNOW.", color: "ink" }],
    items: [
      { q: "Is this pickup only?", a: "Yes — local pickup only." },
      { q: "Do I need to preorder?", a: "Yes. Orders are coordinated by DM before each drop." },
      { q: "How are pickup dates announced?", a: "Pickup dates are announced on Instagram and TikTok each week." },
      { q: "How do I place an order?", a: "Copy your preorder message from this page and send it to us by Instagram DM." },
      { q: "Where do I see allergens?", a: "Allergen and dietary tags are listed under each item on the menu. DM us if you don't see what you need." }
    ]
  },

  legal: {
    cottageFoodNotice: "",
    allergenNotice: ""
  },

  social: {
    instagramUrl: "https://www.instagram.com/sweetdropkitchen/",
    instagramHandle: "@sweetdropkitchen",
    tiktokUrl: "https://www.tiktok.com/@sweetdropkitchen",
    facebookUrl: ""
  },

  footer: {
    tagline:
      "Weekly preorder drops. Local pickup only. Coordinated by Instagram DM."
  }
};
