(function () {
  const CONFIG = window.SITE_CONFIG;

  const STATUS_TEXT = {
    open: "Open",
    limited: "Few slots left",
    sold_out: "Sold out",
    coming_soon: "Coming soon",
    closed: "Preorders closed"
  };

  const state = {
    selectedDateId: "",
    selectedTime: "",
    messageCopied: false,
    countdownTimer: null
  };

  // ─── DOM helpers ──────────────────────────────────────────────────────────────

  const $ = (id) => document.getElementById(id);

  function setText(id, value) {
    const el = $(id);
    if (el && typeof value === "string") el.textContent = value;
  }

  function setHref(id, value) {
    const el = $(id);
    if (el && value) el.setAttribute("href", value);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
    );
  }

  function setMetaAttr(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el && value) el.setAttribute(attr, value);
  }

  // ─── Color-split heading system ──────────────────────────────────────────────

  const COLOR_MAP_DEFAULT = {
    ink: "text-ink",
    accent: "text-mango",
    primary: "text-ube",
    muted: "text-muted",
    "ink-soft": "text-ink/40",
    "accent-soft": "text-mango/70"
  };

  const COLOR_MAP_ON_ACCENT = {
    ink: "text-onAccent",
    accent: "text-onAccent",
    primary: "text-onAccent",
    muted: "text-onAccent/70",
    "ink-soft": "text-onAccent/60",
    "accent-soft": "text-onAccent/70"
  };

  function colorClassFor(color, map) {
    return (map || COLOR_MAP_DEFAULT)[color] || "text-ink";
  }

  function normalizeHeadingLines(input, fallbackText) {
    if (Array.isArray(input)) {
      return input.map((entry, i) =>
        typeof entry === "string"
          ? { text: entry, color: i === 0 ? "ink" : i === 1 ? "accent" : "ink" }
          : { text: entry.text || "", color: entry.color || "ink" }
      );
    }
    if (typeof input === "string" && input) return [{ text: input, color: "ink" }];
    if (fallbackText) return [{ text: fallbackText, color: "ink" }];
    return [];
  }

  function sizeClassesForHeadline(count) {
    if (count <= 1) return ["text-6xl sm:text-7xl lg:text-[5.5rem]"];
    if (count === 2) {
      return [
        "text-6xl sm:text-7xl lg:text-[5.5rem]",
        "text-6xl sm:text-7xl lg:text-[5.5rem]"
      ];
    }
    return [
      "text-5xl sm:text-6xl lg:text-[5rem]",
      "text-5xl sm:text-6xl lg:text-[4.5rem]",
      "text-xl uppercase tracking-[0.22em] sm:text-2xl"
    ];
  }

  function sizeClassesForSectionHeading(count) {
    if (count <= 1) return ["text-4xl sm:text-5xl lg:text-6xl"];
    if (count === 2)
      return ["text-4xl sm:text-5xl lg:text-6xl", "text-4xl sm:text-5xl lg:text-6xl"];
    return [
      "text-3xl sm:text-4xl lg:text-5xl",
      "text-3xl sm:text-4xl lg:text-5xl",
      "text-xl sm:text-2xl uppercase tracking-[0.22em]"
    ];
  }

  function renderHeadingLines(targetId, input, opts) {
    const el = $(targetId);
    if (!el) return;
    const lines = normalizeHeadingLines(input);
    if (!lines.length) { el.innerHTML = ""; return; }
    const sizes = (opts && opts.sizes) || sizeClassesForSectionHeading(lines.length);
    const colorMap = (opts && opts.colorMap) || COLOR_MAP_DEFAULT;
    el.innerHTML = lines
      .map((line, i) => {
        const sizeCls = sizes[i] || sizes[sizes.length - 1];
        const colorCls = colorClassFor(line.color, colorMap);
        const display = "font-display uppercase";
        return `<span class="block ${display} ${sizeCls} ${colorCls}">${escapeHtml(line.text)}</span>`;
      })
      .join("");
  }

  // ─── SEO ──────────────────────────────────────────────────────────────────────

  function renderSeoMeta() {
    const name = CONFIG.business.name;
    const desc = CONFIG.business.description;
    const locationSuffix = CONFIG.business.locationLabel ? ` — ${CONFIG.business.locationLabel}` : "";

    document.title = `${name}${locationSuffix}`;
    setMetaAttr('meta[name="description"]', "content", desc);
    setMetaAttr('meta[name="theme-color"]', "content", CONFIG.theme.colors.bg);

    const siteUrl = CONFIG.business.siteUrl || window.location.href;
    setMetaAttr('meta[property="og:title"]', "content", name);
    setMetaAttr('meta[property="og:description"]', "content", desc);
    setMetaAttr('meta[property="og:url"]', "content", siteUrl);
    setMetaAttr('meta[name="twitter:title"]', "content", name);
    setMetaAttr('meta[name="twitter:description"]', "content", desc);

    const heroSrc = CONFIG.hero.image && CONFIG.hero.image.src;
    if (heroSrc) {
      setMetaAttr('meta[property="og:image"]', "content", heroSrc);
      setMetaAttr('meta[name="twitter:image"]', "content", heroSrc);
    }

    if (CONFIG.business.siteUrl && !document.querySelector('link[rel="canonical"]')) {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = CONFIG.business.siteUrl;
      document.head.appendChild(link);
    }
  }

  function renderFavicon() {
    const accent = (CONFIG.theme.colors.accent || "#f5a623").replace("#", "%23");
    const fg = (CONFIG.theme.colors.onAccent || CONFIG.theme.colors.ink || "#0b0907").replace("#", "%23");
    const initials = (CONFIG.business.initials || "").replace(/[<>&"']/g, "");
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>` +
      `<rect width='100' height='100' rx='22' fill='${accent}'/>` +
      `<text x='50' y='66' text-anchor='middle' font-family='system-ui,-apple-system,Segoe UI,sans-serif' ` +
      `font-size='46' font-weight='800' fill='${fg}'>${initials}</text></svg>`;
    const link = $("favicon");
    if (link) link.href = `data:image/svg+xml;utf8,${svg}`;
  }

  function renderJsonLd() {
    const sameAs = [
      CONFIG.social.instagramUrl,
      CONFIG.social.tiktokUrl,
      CONFIG.social.facebookUrl
    ].filter(Boolean);

    const schema = {
      "@context": "https://schema.org",
      "@type": "FoodEstablishment",
      name: CONFIG.business.name,
      description: CONFIG.business.description,
      url: CONFIG.business.siteUrl || window.location.origin,
      areaServed: CONFIG.business.locationLabel,
      ...(sameAs.length ? { sameAs } : {})
    };

    const existing = document.getElementById("json-ld");
    const script = existing || document.createElement("script");
    script.type = "application/ld+json";
    script.id = "json-ld";
    script.textContent = JSON.stringify(schema);
    if (!existing) document.head.appendChild(script);
  }

  // ─── Placeholder SVG (theme-aware) ────────────────────────────────────────────

  function placeholderSvg(label, w, h) {
    const c = CONFIG.theme.colors;
    const bg = encodeURIComponent(c.bgSoft || c.bg);
    const accent = encodeURIComponent(c.accent);
    const ink = encodeURIComponent(c.muted);
    const safeLabel = String(label || "").replace(/[<>&"']/g, "");
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.28;
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>` +
      `<rect width='${w}' height='${h}' fill='${bg}'/>` +
      `<circle cx='${cx}' cy='${cy - h * 0.05}' r='${r}' fill='${accent}' opacity='0.35'/>` +
      `<text x='${cx}' y='${cy + h * 0.32}' text-anchor='middle' ` +
      `font-family='system-ui,sans-serif' font-size='${Math.round(w * 0.035)}' font-weight='700' ` +
      `fill='${ink}' letter-spacing='2'>${safeLabel}</text>` +
      `</svg>`;
    return `data:image/svg+xml;utf8,${svg.replace(/%/g, "%25").replace(/#/g, "%23")}`;
  }

  // ─── Announcement bar ────────────────────────────────────────────────────────

  function renderAnnouncement() {
    const bar = $("announcement-bar");
    if (!bar) return;
    const cfg = CONFIG.announcement;
    if (!cfg || !cfg.enabled || !cfg.text) { bar.hidden = true; return; }
    bar.hidden = false;
    setText("announcement-text", cfg.text);
    if (cfg.href) bar.setAttribute("href", cfg.href);
    else bar.removeAttribute("href");
  }

  // ─── Header ───────────────────────────────────────────────────────────────────

  function renderHeader() {
    setText("brand-name", CONFIG.business.name);
    setText("brand-mark", CONFIG.business.initials);
    const link = $("brand-link");
    if (link) link.setAttribute("aria-label", `${CONFIG.business.name} home`);
  }

  // ─── Hero ─────────────────────────────────────────────────────────────────────

  function renderHero() {
    setText("hero-eyebrow", CONFIG.hero.eyebrow || CONFIG.business.locationLabel || "");

    renderHeadingLines("hero-headline", CONFIG.hero.headlineLines, {
      sizes: sizeClassesForHeadline(
        normalizeHeadingLines(CONFIG.hero.headlineLines).length
      )
    });

    setText("hero-subheadline", CONFIG.hero.subheadline);

    const primary = $("hero-primary-cta");
    if (primary && CONFIG.hero.primaryCta) {
      primary.textContent = CONFIG.hero.primaryCta.label;
      primary.setAttribute("href", CONFIG.hero.primaryCta.href);
    }

    const secondary = $("hero-secondary-cta");
    if (secondary && CONFIG.hero.secondaryCta) {
      secondary.textContent = CONFIG.hero.secondaryCta.label;
      secondary.setAttribute("href", CONFIG.hero.secondaryCta.href);
      if (CONFIG.hero.secondaryCta.href && CONFIG.hero.secondaryCta.href.startsWith("http")) {
        secondary.setAttribute("target", "_blank");
        secondary.setAttribute("rel", "noopener noreferrer");
      }
    }

    const img = $("hero-image");
    if (img) {
      const src = CONFIG.hero.image && CONFIG.hero.image.src;
      img.src = src || placeholderSvg("Add your hero photo", 900, 1125);
      img.alt = (CONFIG.hero.image && CONFIG.hero.image.alt) || `${CONFIG.business.name} — this week's drop.`;
    }
  }

  // ─── Countdown ────────────────────────────────────────────────────────────────

  function pad2(n) { return n < 10 ? `0${n}` : String(n); }

  function renderCountdown() {
    const container = $("hero-countdown");
    if (!container) return;
    const cfg = CONFIG.hero.countdown;
    const targetId = getSoonestSelectableId();
    const target = CONFIG.pickup.dates.find((d) => d.id === targetId);

    if (!cfg || !cfg.enabled || !target || !target.isoDate) {
      container.hidden = true;
      stopCountdownTicker();
      return;
    }

    container.hidden = false;
    setText("countdown-label", cfg.label || "Next drop in");

    const targetMs = new Date(target.isoDate + "T00:00:00").getTime();

    function tick() {
      const now = Date.now();
      const diffSec = Math.max(0, Math.floor((targetMs - now) / 1000));
      const days = Math.floor(diffSec / 86400);
      const hrs = Math.floor((diffSec % 86400) / 3600);
      const min = Math.floor((diffSec % 3600) / 60);
      const sec = diffSec % 60;
      setText("countdown-days", pad2(days));
      setText("countdown-hrs", pad2(hrs));
      setText("countdown-min", pad2(min));
      setText("countdown-sec", pad2(sec));
    }

    tick();
    stopCountdownTicker();
    state.countdownTimer = setInterval(tick, 1000);
  }

  function stopCountdownTicker() {
    if (state.countdownTimer) {
      clearInterval(state.countdownTimer);
      state.countdownTimer = null;
    }
  }

  // ─── About ────────────────────────────────────────────────────────────────────

  function renderAbout() {
    const section = $("about-section");
    if (!section) return;
    if (!CONFIG.about) { section.hidden = true; return; }
    section.hidden = false;

    setText("about-eyebrow", CONFIG.about.eyebrow || "About");
    renderHeadingLines(
      "about-heading",
      CONFIG.about.headingLines || CONFIG.about.headline,
      {}
    );
    setText("about-body", CONFIG.about.body || "");
    setText("about-signed-by", CONFIG.about.signedBy || "");

    const bulletsEl = $("about-bullets");
    if (bulletsEl) {
      if (CONFIG.about.bullets && CONFIG.about.bullets.length) {
        bulletsEl.hidden = false;
        bulletsEl.innerHTML = CONFIG.about.bullets
          .map(
            (b) =>
              `<li>
                <p class="eyebrow text-mango">${escapeHtml(b.title || "")}</p>
                <p class="mt-1 text-sm leading-6 text-muted">${escapeHtml(b.body || "")}</p>
              </li>`
          )
          .join("");
      } else {
        bulletsEl.hidden = true;
        bulletsEl.innerHTML = "";
      }
    }

    const photo = $("about-photo");
    const grid = $("about-grid");
    if (photo) {
      if (CONFIG.about.photo) {
        photo.src = CONFIG.about.photo;
        photo.alt = CONFIG.business.name;
        photo.hidden = false;
        if (grid) grid.className = "grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center";
      } else {
        photo.hidden = true;
        if (grid) grid.className = "mx-auto grid max-w-3xl gap-10";
      }
    }
  }

  // ─── Availability banner ──────────────────────────────────────────────────────

  function renderAvailabilityBanner() {
    const banner = $("availability-banner");
    if (!banner) return;
    const mode = (CONFIG.pickup && CONFIG.pickup.availabilityMode) || "open";
    if (mode === "open") { banner.hidden = true; return; }
    const fallback =
      mode === "paused"
        ? "Preorders are paused this week. Follow on Instagram for the next drop."
        : "Preorders opening soon. Follow on Instagram for the next drop announcement.";
    banner.hidden = false;
    banner.textContent = CONFIG.pickup.pausedMessage || fallback;
  }

  // ─── Menu section ─────────────────────────────────────────────────────────────

  function renderMenuSection() {
    setText("menu-eyebrow", CONFIG.menu.sectionEyebrow);
    renderHeadingLines(
      "menu-heading",
      CONFIG.menu.sectionHeadingLines || CONFIG.menu.sectionHeading,
      {}
    );
    setText("menu-blurb", CONFIG.menu.sectionBlurb || "");
    setText("menu-footnote", CONFIG.menu.sectionFootnote || "");

    const wrap = $("menu-cards");
    if (!wrap) return;

    const layout = CONFIG.menu.layout || "grid";
    const products = CONFIG.menu.products || [];
    const featuredIdx = (() => {
      const explicit = products.findIndex((p) => p.featured);
      return explicit >= 0 ? explicit : 0;
    })();

    const useAsymmetric = layout === "asymmetric" && products.length >= 3;

    if (useAsymmetric) {
      wrap.className = "mt-12 grid gap-5 lg:grid-cols-3 lg:auto-rows-fr";
    } else {
      wrap.className = "mt-12 grid gap-5 lg:grid-cols-2";
    }

    wrap.innerHTML = products
      .map((product, i) =>
        useAsymmetric && i === featuredIdx
          ? renderFeaturedCard(product)
          : renderProductCard(product)
      )
      .join("");
  }

  function chipsHtml(product) {
    const tagChips = (product.tags || [])
      .map(
        (t) =>
          `<span class="rounded-full border border-edge bg-cream/60 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-mango">${escapeHtml(t)}</span>`
      )
      .join("");
    const allergenChips = (product.allergens || [])
      .map(
        (a) =>
          `<span class="rounded-full border border-edge bg-cream/60 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted">Contains ${escapeHtml(a)}</span>`
      )
      .join("");
    const chips = tagChips + allergenChips;
    return chips
      ? `<div class="mt-4 flex flex-wrap gap-2" aria-label="Dietary info">${chips}</div>`
      : "";
  }

  function priceSummary(product) {
    return (product.sizes || [])
      .map((s) => `${escapeHtml(s.label)} $${s.price}`)
      .join(" · ");
  }

  function badgeOverlayHtml(product) {
    if (!product.badge) return "";
    return `<span class="absolute left-4 top-4 rounded-md border border-white/40 bg-black/45 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-sm">${escapeHtml(product.badge)}</span>`;
  }

  function badgeSmallHtml(product) {
    if (!product.badge) return "";
    return `<span class="absolute left-3 top-3 rounded-md border border-white/40 bg-black/40 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-sm">${escapeHtml(product.badge)}</span>`;
  }

  function renderFeaturedCard(product) {
    const photoSrc = product.photo || placeholderSvg(product.name, 1200, 900);
    return `<article class="group relative overflow-hidden rounded-[1.75rem] border border-edge bg-creamSoft shadow-soft lg:col-span-2 lg:row-span-2">
      <div class="relative h-full">
        <img
          class="h-full min-h-[420px] w-full object-cover lg:aspect-[5/4] lg:min-h-0"
          src="${escapeHtml(photoSrc)}"
          alt="${escapeHtml(product.name)}."
          loading="lazy"
          decoding="async"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
        ${badgeOverlayHtml(product)}
        <div class="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
          <h3 class="font-display text-3xl uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">${escapeHtml(product.name)}</h3>
          <p class="mt-3 max-w-md text-sm leading-6 text-white/85">${escapeHtml(product.description || "")}</p>
          <p class="mt-3 text-xs font-extrabold uppercase tracking-[0.18em] text-mango">${priceSummary(product)}</p>
          <a href="#preorder" class="mt-6 inline-flex rounded-full bg-mango px-6 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-onAccent transition hover:bg-mangoDeep focus:outline-none focus:ring-4 focus:ring-mango/35">Order Now →</a>
        </div>
      </div>
    </article>`;
  }

  function renderProductCard(product) {
    const photoSrc = product.photo || placeholderSvg(product.name, 900, 600);
    return `<article class="relative overflow-hidden rounded-[1.75rem] border border-edge bg-creamSoft shadow-sm">
      <div class="relative">
        <img
          class="aspect-[4/3] w-full object-cover"
          src="${escapeHtml(photoSrc)}"
          alt="${escapeHtml(product.name)}."
          loading="lazy"
          decoding="async"
        />
        ${badgeSmallHtml(product)}
      </div>
      <div class="p-5 sm:p-6">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 class="font-display text-2xl uppercase tracking-tight text-ink">${escapeHtml(product.name)}</h3>
          <div class="text-xs font-extrabold uppercase tracking-[0.18em] text-mango">${priceSummary(product)}</div>
        </div>
        <p class="mt-3 text-sm leading-6 text-muted">${escapeHtml(product.description || "")}</p>
        ${chipsHtml(product)}
        <a href="#preorder" class="mt-5 inline-flex w-full justify-center rounded-full bg-mango px-5 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-onAccent transition hover:bg-mangoDeep focus:outline-none focus:ring-4 focus:ring-mango/35">Request ${escapeHtml(product.name)}</a>
      </div>
    </article>`;
  }

  // ─── How It Works ─────────────────────────────────────────────────────────────

  function renderHowItWorks() {
    setText("how-it-works-eyebrow", CONFIG.howItWorks.eyebrow);
    renderHeadingLines(
      "how-it-works-heading",
      CONFIG.howItWorks.headingLines || CONFIG.howItWorks.heading,
      {}
    );
    const stepsEl = $("how-it-works-steps");
    if (!stepsEl) return;
    stepsEl.innerHTML = (CONFIG.howItWorks.steps || [])
      .map(
        (step, i) =>
          `<article class="rounded-[1.5rem] border border-edge bg-cream p-7 shadow-sm">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-mango font-display text-2xl uppercase text-onAccent">${i + 1}</div>
            <h3 class="mt-6 font-display text-xl uppercase tracking-tight text-ink sm:text-2xl">${escapeHtml(step.title)}</h3>
            <p class="mt-3 leading-7 text-muted">${escapeHtml(step.body)}</p>
          </article>`
      )
      .join("");
  }

  // ─── Preorder section header ──────────────────────────────────────────────────

  function renderPreorderSection() {
    setText("preorder-eyebrow", CONFIG.preorder.sectionEyebrow);
    renderHeadingLines(
      "preorder-heading",
      CONFIG.preorder.sectionHeadingLines || CONFIG.preorder.sectionHeading,
      {}
    );
    setText("preorder-blurb", CONFIG.preorder.sectionBlurb || "");
    setText("preorder-instructions", CONFIG.preorder.instructions || "");
    setText("preorder-ig-handle-label", `DM us on Instagram: ${CONFIG.preorder.instagramHandleLabel || ""}`);
    setHref("preorder-ig-dm-link", CONFIG.preorder.instagramDmUrl);
  }

  // ─── Payment section ──────────────────────────────────────────────────────────

  function renderPaymentSection() {
    setText("payment-eyebrow", CONFIG.payment.eyebrow);
    renderHeadingLines(
      "payment-heading",
      CONFIG.payment.headingLines || CONFIG.payment.heading,
      {}
    );
    setText("payment-blurb", CONFIG.payment.blurb || "");
    const list = $("payment-list");
    if (list) {
      list.innerHTML = (CONFIG.preorder.paymentMethods || [])
        .map(
          (p) =>
            `<li class="rounded-2xl border border-edge bg-cream px-5 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-mango">${escapeHtml(p)}</li>`
        )
        .join("");
    }
  }

  // ─── Stats section ────────────────────────────────────────────────────────────

  function renderStatsSection() {
    const section = $("stats-section");
    if (!section) return;
    const cfg = CONFIG.stats;
    if (!cfg || !cfg.enabled || !cfg.items || !cfg.items.length) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    setText("stats-eyebrow", cfg.eyebrow || "");
    renderHeadingLines("stats-heading", cfg.headingLines || cfg.heading, {});
    const grid = $("stats-grid");
    if (grid) {
      grid.innerHTML = cfg.items
        .map(
          (item) =>
            `<div class="rounded-2xl border border-edge bg-creamSoft px-4 py-10 text-center">
              <p class="font-display text-5xl uppercase tracking-tight text-mango sm:text-6xl">${escapeHtml(item.value || "")}</p>
              <p class="mt-3 eyebrow text-muted">${escapeHtml(item.label || "")}</p>
            </div>`
        )
        .join("");
    }
  }

  // ─── Reviews marquee ──────────────────────────────────────────────────────────

  function renderReviewsSection() {
    const section = $("reviews-section");
    if (!section) return;
    const cfg = CONFIG.reviews;
    if (!cfg || !cfg.enabled || !cfg.items || !cfg.items.length) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    setText("reviews-eyebrow", cfg.eyebrow || "");
    renderHeadingLines("reviews-heading", cfg.headingLines || cfg.heading, {});

    const track = $("reviews-track");
    if (!track) return;

    const cardHtml = (r) => {
      const stars = "★".repeat(Math.max(0, Math.min(5, Number(r.stars) || 5)));
      return `<article class="w-80 shrink-0 rounded-2xl border border-edge bg-cream p-5">
        <p class="text-lg leading-none text-mango" aria-label="${r.stars || 5} out of 5 stars">${stars}</p>
        <p class="mt-3 text-sm leading-6 text-ink">"${escapeHtml(r.body || "")}"</p>
        <p class="mt-3 text-xs font-extrabold uppercase tracking-[0.18em] text-muted">— ${escapeHtml(r.author || "")} · ${escapeHtml(r.source || "")}</p>
      </article>`;
    };

    const cards = cfg.items.map(cardHtml).join("");
    track.innerHTML = cards + cards;
  }

  // ─── Big CTA strip ────────────────────────────────────────────────────────────

  function renderBigCtaSection() {
    const section = $("big-cta-section");
    if (!section) return;
    const cfg = CONFIG.bigCta;
    if (!cfg || !cfg.enabled) { section.hidden = true; return; }
    section.hidden = false;

    setText("big-cta-eyebrow", cfg.eyebrow || "");
    renderHeadingLines("big-cta-heading", cfg.headingLines || cfg.heading, {
      colorMap: COLOR_MAP_ON_ACCENT
    });
    setText("big-cta-body", cfg.body || "");

    const link = $("big-cta-link");
    if (link && cfg.cta) {
      link.textContent = cfg.cta.label || "Order Now →";
      link.setAttribute("href", cfg.cta.href || "#preorder");
    }
  }

  // ─── FAQ ──────────────────────────────────────────────────────────────────────

  function renderFaqSection() {
    setText("faq-eyebrow", CONFIG.faq.eyebrow);
    renderHeadingLines(
      "faq-heading",
      CONFIG.faq.headingLines || CONFIG.faq.heading,
      {}
    );
    const list = $("faq-list");
    if (!list) return;
    list.innerHTML = (CONFIG.faq.items || [])
      .map(
        (item) =>
          `<details class="group rounded-2xl border border-edge bg-creamSoft p-6">
            <summary class="cursor-pointer list-none font-display text-xl uppercase tracking-tight text-ink">${escapeHtml(item.q)}</summary>
            <p class="mt-4 leading-7 text-muted">${escapeHtml(item.a)}</p>
          </details>`
      )
      .join("");
  }

  function renderLegal() {
    const el = $("legal-notice");
    if (!el) return;
    const notice =
      (CONFIG.legal && (CONFIG.legal.cottageFoodNotice || CONFIG.legal.allergenNotice)) || "";
    el.hidden = !notice;
    el.textContent = notice;
  }

  // ─── Footer ───────────────────────────────────────────────────────────────────

  function renderFooter() {
    setText("footer-brand", CONFIG.business.name);
    setText("footer-tagline", CONFIG.footer.tagline);
    setText("footer-location", CONFIG.business.locationLabel);

    const ig = $("footer-instagram");
    if (ig) {
      if (CONFIG.social.instagramUrl) {
        ig.setAttribute("href", CONFIG.social.instagramUrl);
        ig.parentElement.hidden = false;
      } else { ig.parentElement.hidden = true; }
    }

    const tt = $("footer-tiktok");
    if (tt) {
      if (CONFIG.social.tiktokUrl) {
        tt.setAttribute("href", CONFIG.social.tiktokUrl);
        tt.parentElement.hidden = false;
      } else { tt.parentElement.hidden = true; }
    }
  }

  function renderStickyBar() {
    const igLink = $("sticky-instagram-link");
    if (igLink && CONFIG.social.instagramUrl) {
      igLink.setAttribute("href", CONFIG.social.instagramUrl);
      igLink.setAttribute("aria-label", `Follow ${CONFIG.business.name} on Instagram`);
    }
  }

  // ─── Pickup helpers ───────────────────────────────────────────────────────────

  function isDateSelectable(date) {
    return date.status === "open" || date.status === "limited";
  }

  function getSelectedDate() {
    return CONFIG.pickup.dates.find((d) => d.id === state.selectedDateId);
  }

  function getSoonestSelectableId() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      (CONFIG.pickup.dates || [])
        .filter(
          (d) =>
            isDateSelectable(d) &&
            d.isoDate &&
            new Date(d.isoDate + "T00:00:00") >= today
        )
        .sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate))
        .map((d) => d.id)[0] || null
    );
  }

  function getDropLabel(date, isSoonest) {
    if (!isSoonest) return null;
    if (!date.isoDate) return { label: "Next Drop", cls: "bg-mango text-onAccent" };
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const dropDate = new Date(date.isoDate + "T00:00:00");
    const diffDays = Math.round((dropDate - today) / 86400000);
    if (diffDays >= 0 && diffDays <= 7) return { label: "This Week", cls: "bg-mango text-onAccent" };
    return { label: "Next Drop", cls: "bg-mango text-onAccent" };
  }

  // ─── Date picker ──────────────────────────────────────────────────────────────

  function renderDateOptions() {
    const container = $("pickup-date-options");
    if (!container) return;
    container.innerHTML = "";
    const soonestId = getSoonestSelectableId();

    (CONFIG.pickup.dates || []).forEach((date) => {
      const selectable = isDateSelectable(date);
      const isSelected = state.selectedDateId === date.id;
      const isSoonest = date.id === soonestId;
      const dropLabel = getDropLabel(date, isSoonest);

      const label = document.createElement("label");
      label.className = [
        "block rounded-[1.5rem] border p-4 transition focus-within:ring-4 focus-within:ring-mango/25 sm:p-5",
        isSelected
          ? "border-mango bg-mango text-onAccent shadow-soft"
          : "border-edge bg-creamSoft text-ink",
        selectable ? "cursor-pointer hover:border-mango" : "cursor-not-allowed opacity-55 grayscale"
      ].join(" ");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "pickup-date";
      input.value = date.id;
      input.checked = isSelected;
      input.disabled = !selectable;
      input.className = "sr-only";
      input.setAttribute(
        "aria-label",
        `${date.weekday} ${date.dateLabel} — ${STATUS_TEXT[date.status] || date.status}`
      );

      const detailCls = isSelected ? "text-onAccent/80" : "text-muted";
      const statusCls = isSelected
        ? "bg-onAccent/15 text-onAccent"
        : "bg-cream text-mango";
      const iconCls = isSelected
        ? "bg-onAccent/15 text-onAccent"
        : "bg-cream text-mango";
      const tileCls = isSelected ? "bg-onAccent/10" : "bg-cream";

      const dropBadgeHtml = dropLabel
        ? `<span class="rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] ${isSelected ? "bg-onAccent text-mango" : dropLabel.cls}">${escapeHtml(dropLabel.label)}</span>`
        : "";

      const content = document.createElement("span");
      content.setAttribute("aria-hidden", "true");
      content.innerHTML = `
        <span class="flex items-start justify-between gap-4">
          <span class="flex items-start gap-3">
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconCls} text-[10px] font-extrabold uppercase tracking-[0.14em]">Cal</span>
            <span>
              <span class="block font-display text-3xl uppercase leading-none tracking-tight">${escapeHtml(date.weekday)}</span>
              <span class="mt-1 block text-base font-extrabold">${escapeHtml(date.dateLabel)}</span>
            </span>
          </span>
          <span class="flex flex-col items-end gap-1.5">
            <span class="rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] ${statusCls}">${escapeHtml(STATUS_TEXT[date.status] || date.status)}</span>
            ${dropBadgeHtml}
          </span>
        </span>
        <span class="mt-4 grid gap-2 sm:grid-cols-2">
          <span class="rounded-2xl ${tileCls} px-4 py-3">
            <span class="block text-[10px] font-extrabold uppercase tracking-[0.18em] ${detailCls}">Pickup window</span>
            <span class="mt-1 block text-sm font-extrabold">${escapeHtml(date.pickupWindow)}</span>
          </span>
          <span class="rounded-2xl ${tileCls} px-4 py-3">
            <span class="block text-[10px] font-extrabold uppercase tracking-[0.18em] ${detailCls}">Preorder cutoff</span>
            <span class="mt-1 block text-sm font-extrabold">${escapeHtml(date.preorderCutoffLabel)}</span>
          </span>
        </span>
      `;

      label.appendChild(input);
      label.appendChild(content);
      container.appendChild(label);
    });
  }

  function renderTimeOptions() {
    const container = $("pickup-time-options");
    if (!container) return;
    container.innerHTML = "";
    const selectedDate = getSelectedDate();

    if (!selectedDate) {
      const p = document.createElement("p");
      p.className =
        "rounded-2xl border border-dashed border-edge bg-creamSoft p-4 text-sm font-semibold text-muted sm:col-span-2";
      p.textContent = "Select an available pickup date to view preferred pickup times.";
      container.appendChild(p);
      return;
    }

    const times =
      selectedDate.timeOptions && selectedDate.timeOptions.length > 0
        ? selectedDate.timeOptions
        : getHourlyTimeOptions(selectedDate.pickupWindow);

    times.forEach((time) => {
      const isSelected = state.selectedTime === time;

      const label = document.createElement("label");
      label.className = [
        "block rounded-2xl border p-4 cursor-pointer transition focus-within:ring-4 focus-within:ring-mango/25",
        isSelected
          ? "border-mango bg-mango text-onAccent shadow-soft"
          : "border-edge bg-cream text-ink hover:border-mango"
      ].join(" ");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "pickup-time";
      input.value = time;
      input.checked = isSelected;
      input.className = "sr-only";
      input.setAttribute("aria-label", `${time} — Preferred pickup time`);

      const content = document.createElement("span");
      content.setAttribute("aria-hidden", "true");
      content.innerHTML = `
        <span class="block font-extrabold">${escapeHtml(time)}</span>
        <span class="mt-1 block text-xs font-extrabold uppercase tracking-[0.18em] ${isSelected ? "text-onAccent/80" : "text-muted"}">Preferred pickup time</span>
      `;

      label.appendChild(input);
      label.appendChild(content);
      container.appendChild(label);
    });
  }

  function formatHour(h) {
    return `${h % 12 || 12} ${h >= 12 ? "PM" : "AM"}`;
  }

  function getHourlyTimeOptions(pickupWindow) {
    const m = pickupWindow.match(/(\d+)\s*(AM|PM)\s*-\s*(\d+)\s*(AM|PM)/i);
    if (!m) return [];
    let s = parseInt(m[1], 10);
    let e = parseInt(m[3], 10);
    if (m[2].toUpperCase() === "PM" && s !== 12) s += 12;
    if (m[2].toUpperCase() === "AM" && s === 12) s = 0;
    if (m[4].toUpperCase() === "PM" && e !== 12) e += 12;
    if (m[4].toUpperCase() === "AM" && e === 12) e = 0;
    const out = [];
    for (let h = s; h < e; h++) out.push(formatHour(h));
    return out;
  }

  // ─── Preorder form ────────────────────────────────────────────────────────────

  function getProductByValue(value) {
    return CONFIG.menu.products.find((p) => p.slug === value || p.name === value);
  }

  function populateProductSelect() {
    const sel = $("product");
    if (!sel) return;
    sel.innerHTML = CONFIG.menu.products
      .map(
        (p, i) =>
          `<option value="${escapeHtml(p.slug || p.name)}" ${i === 0 ? "selected" : ""}>${escapeHtml(p.name)}</option>`
      )
      .join("");
  }

  function populateSizeSelect(productValue) {
    const sel = $("size");
    if (!sel) return;
    const product = getProductByValue(productValue) || CONFIG.menu.products[0];
    const sizes = (product && product.sizes) || [];
    const prev = sel.value;
    sel.innerHTML = sizes
      .map((s) => `<option value="${escapeHtml(s.label)}">${escapeHtml(s.label)}</option>`)
      .join("");
    if (sizes.find((s) => s.label === prev)) sel.value = prev;
  }

  function populatePaymentSelect() {
    const sel = $("payment-method");
    if (!sel) return;
    sel.innerHTML = CONFIG.preorder.paymentMethods
      .map((p) => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`)
      .join("");
  }

  function getUnitPrice(productValue, sizeLabel) {
    const product = getProductByValue(productValue);
    const size = (product && product.sizes || []).find((s) => s.label === sizeLabel);
    return size ? size.price : 0;
  }

  function getProductDisplayName(productValue) {
    const product = getProductByValue(productValue);
    return product ? product.name : productValue;
  }

  function getFormValues() {
    const productValue = $("product").value;
    const sizeLabel = $("size").value;
    const quantity = Math.max(1, parseInt($("quantity").value, 10) || 1);
    const selectedDate = getSelectedDate();
    return {
      name: $("customer-name").value.trim(),
      product: getProductDisplayName(productValue),
      size: sizeLabel,
      quantity,
      total: getUnitPrice(productValue, sizeLabel) * quantity,
      paymentMethod: $("payment-method").value,
      pickupDate: selectedDate ? `${selectedDate.weekday} ${selectedDate.dateLabel}` : "",
      pickupTime: state.selectedTime
    };
  }

  function buildMessage(values) {
    return [
      "Hi! I'd like to place a preorder.",
      "",
      `Name: ${values.name || "[name]"}`,
      `Item: ${values.quantity}x ${values.size} ${values.product}`,
      `Estimated total: $${values.total || "[total]"}`,
      `Pickup date: ${values.pickupDate || "[date]"}`,
      `Preferred pickup time: ${values.pickupTime || "[time]"}`,
      `Payment method: ${values.paymentMethod}`,
      "",
      "Please confirm availability when you can. Thank you!"
    ].join("\n");
  }

  function updatePreview() {
    const values = getFormValues();
    setText("order-total", `$${values.total}`);
    const preview = $("message-preview");
    if (preview) preview.textContent = buildMessage(values);
  }

  function validatePreorder() {
    const values = getFormValues();
    const missing = [];
    if (!values.name) missing.push("your name");
    if (!values.pickupDate) missing.push("a pickup date");
    if (!values.pickupTime) missing.push("a pickup time");
    if (missing.length) {
      setText("preorder-status", `Almost there — please add ${missing.join(", ")} before copying.`);
      return null;
    }
    return values;
  }

  function promoteIgDmCta() {
    const copyBtn = $("copy-message");
    if (copyBtn) {
      copyBtn.className =
        "rounded-full border-2 border-edge px-6 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-muted transition hover:border-ink hover:text-ink focus:outline-none focus:ring-4 focus:ring-edge";
      copyBtn.textContent = "Copy again";
    }
    const igLink = $("preorder-ig-dm-link");
    if (igLink) {
      igLink.className =
        "rounded-full bg-mango px-6 py-4 text-center text-sm font-extrabold uppercase tracking-[0.18em] text-onAccent transition hover:bg-mangoDeep focus:outline-none focus:ring-4 focus:ring-mango/35";
    }
  }

  async function copyPreorderMessage() {
    const values = validatePreorder();
    if (!values) return;
    const message = buildMessage(values);
    try {
      await navigator.clipboard.writeText(message);
      setText("preorder-status", "Message copied. Now open Instagram DM and paste it.");
      state.messageCopied = true;
      promoteIgDmCta();
    } catch {
      setText(
        "preorder-status",
        "Copy didn't work in this browser — select and copy the preview text manually."
      );
    }
  }

  // ─── Event wiring ─────────────────────────────────────────────────────────────

  function wirePreorderForm() {
    const form = $("preorder-form");
    if (!form) return;

    form.addEventListener("input", (e) => {
      if (e.target && e.target.id === "product") {
        populateSizeSelect($("product").value);
      }
      if (!state.messageCopied) setText("preorder-status", "");
      updatePreview();
    });

    form.addEventListener("change", (e) => {
      if (e.target && e.target.id === "product") {
        populateSizeSelect($("product").value);
      }
      if (!state.messageCopied) setText("preorder-status", "");
      updatePreview();
    });

    const copyBtn = $("copy-message");
    if (copyBtn) copyBtn.addEventListener("click", copyPreorderMessage);
  }

  function wireDatePicker() {
    const container = $("pickup-date-options");
    if (!container) return;
    container.addEventListener("change", (e) => {
      if (e.target.name !== "pickup-date") return;
      const date = CONFIG.pickup.dates.find((d) => d.id === e.target.value);
      if (!date || !isDateSelectable(date)) return;
      state.selectedDateId = e.target.value;
      state.selectedTime = "";
      state.messageCopied = false;
      setText("selected-date-note", `${date.weekday} ${date.dateLabel}`);
      setText("selected-time-note", "No time selected");
      setText("preorder-status", "");
      renderDateOptions();
      renderTimeOptions();
      updatePreview();
    });
  }

  function wireTimePicker() {
    const container = $("pickup-time-options");
    if (!container) return;
    container.addEventListener("change", (e) => {
      if (e.target.name !== "pickup-time") return;
      state.selectedTime = e.target.value;
      state.messageCopied = false;
      setText("selected-time-note", e.target.value);
      setText("preorder-status", "");
      renderTimeOptions();
      updatePreview();
    });
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────

  function init() {
    if (!CONFIG) {
      console.error("[sweetdropkitchen] window.SITE_CONFIG missing — did site.config.js fail to load?");
      return;
    }

    renderSeoMeta();
    renderFavicon();
    renderJsonLd();
    renderAnnouncement();
    renderHeader();
    renderHero();
    renderCountdown();
    renderAbout();
    renderAvailabilityBanner();
    renderMenuSection();
    renderHowItWorks();
    renderPreorderSection();
    renderPaymentSection();
    renderStatsSection();
    renderReviewsSection();
    renderFaqSection();
    renderLegal();
    renderBigCtaSection();
    renderFooter();
    renderStickyBar();

    populateProductSelect();
    populateSizeSelect($("product") ? $("product").value : "");
    populatePaymentSelect();

    wireDatePicker();
    wireTimePicker();
    wirePreorderForm();

    renderDateOptions();
    renderTimeOptions();
    updatePreview();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
