window.SITE_CONFIG = {
  business: {
    name: "Sweet Drop Kitchen",
    shortName: "Sweet Drop",
    initials: "SD",
    locationLabel: "Your City, FL",
    description:
      "A mobile-first preorder page for local food sellers who announce weekly drops, take pickup orders, and coordinate through Instagram DMs."
  },

  theme: {
    colors: {
      bg: "#fff7e8",
      bgSoft: "#fffaf1",
      primary: "#5a247a",
      primarySoft: "#f1e4ff",
      accent: "#ffc533",
      accentDeep: "#d89300",
      blush: "#ffe6ef",
      blushDeep: "#dd6f9b",
      ink: "#24180d",
      muted: "#6b5b48"
    },
    fonts: {
      display: ["Playfair Display", "Georgia", "serif"],
      sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"]
    },
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
  },

  hero: {
    headlineLines: ["Weekly", "Preorder Drops", "Made Simple"],
    subheadline:
      "A mobile-first preorder page for local food sellers who announce weekly drops, take pickup orders, and coordinate through Instagram DMs.",
    primaryCta: { label: "Preorder Now", href: "#preorder" },
    secondaryCta: { label: "View Menu", href: "#menu" },
    image: {
      src: "",
      alt: "Close-up of this week's drop."
    }
  },

  about: null,

  menu: {
    sectionEyebrow: "Featured Menu",
    sectionHeading: "This week's drops",
    sectionBlurb: "Preorder by DM. Pick up local. Fresh each drop.",
    products: [
      {
        slug: "mango-sticky-rice",
        name: "Mango Sticky Rice",
        description: "Classic mango sticky rice prepared for preorder pickup.",
        sizes: [
          { label: "Cup", price: 7 },
          { label: "Box", price: 12 }
        ],
        photo: ""
      },
      {
        slug: "ube-dessert-cup",
        name: "Ube Dessert Cup",
        description: "Creamy ube dessert layered and portioned for pickup.",
        sizes: [
          { label: "Cup", price: 8 },
          { label: "Box", price: 13 }
        ],
        photo: ""
      },
      {
        slug: "strawberry-matcha-cup",
        name: "Strawberry Matcha Cup",
        description: "Strawberry + matcha dessert cup made for weekly drops.",
        sizes: [
          { label: "Cup", price: 9 },
          { label: "Box", price: 14 }
        ],
        photo: ""
      }
    ]
  },

  preorder: {
    enabled: true,
    sectionEyebrow: "Pickup & Preorder",
    sectionHeading: "Build your preorder message.",
    sectionBlurb:
      "Weekly preorder drops for local food sellers. Pickup dates are announced regularly.",
    instructions:
      "Copy your preorder message and send it by Instagram DM. No checkout required.",
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
        weekday: "Tuesday",
        dateLabel: "6/10",
        pickupWindow: "12 PM - 6 PM",
        preorderCutoffLabel: "Preorder closes Monday at 8 PM",
        status: "open",
        timeOptions: []
      },
      {
        id: "wednesday-6-11",
        weekday: "Wednesday",
        dateLabel: "6/11",
        pickupWindow: "11 AM - 6 PM",
        preorderCutoffLabel: "Preorder closes Tuesday at 8 PM",
        status: "limited",
        timeOptions: []
      },
      {
        id: "sunday-6-15",
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
    eyebrow: "How It Works",
    heading: "Simple preorder pickup",
    steps: [
      {
        title: "Submit preorder",
        body: "Send your name, quantity, size, and preferred pickup time."
      },
      {
        title: "Confirm payment/pickup time",
        body: "Your order and pickup time are confirmed. Payment may be requested to secure the order."
      },
      {
        title: "Pick up locally",
        body: "Pick up your fresh-made order at your local drop location."
      }
    ]
  },

  payment: {
    eyebrow: "Payment",
    heading: "Accepted payment methods",
    blurb: "Payment may be required to secure larger orders or new customer orders."
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Good to know",
    items: [
      { q: "Is this pickup only?", a: "Yes — local pickup only." },
      { q: "Do I need to preorder?", a: "Yes. Orders are coordinated by DM before each drop." },
      { q: "How are pickup dates announced?", a: "Pickup dates are announced on Instagram and TikTok each week." },
      { q: "How do I place an order?", a: "Copy your preorder message from this page and send it to us by Instagram DM." }
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
