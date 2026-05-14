(function () {
  const CONFIG = window.SITE_CONFIG;

  const HERO_IMAGE_FALLBACK =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='1125' viewBox='0 0 900 1125'%3E%3Crect width='900' height='1125' fill='%23fff1ce'/%3E%3Cellipse cx='445' cy='620' rx='300' ry='235' fill='%23ffffff'/%3E%3Cellipse cx='450' cy='625' rx='245' ry='180' fill='%23f8e6d4'/%3E%3Cpath d='M270 475c105-105 250-125 370-65-55 120-175 210-330 210-50 0-82-55-40-145z' fill='%23ffc533'/%3E%3Cpath d='M380 675c90-45 205-35 285 35-70 75-220 105-340 35 0-28 20-52 55-70z' fill='%235a247a'/%3E%3Cpath d='M282 725c75 75 240 110 365 35' fill='none' stroke='%23ffffff' stroke-width='28' stroke-linecap='round'/%3E%3Ccircle cx='250' cy='260' r='48' fill='%23ffc533' opacity='.55'/%3E%3Ccircle cx='690' cy='300' r='62' fill='%23f1e4ff'/%3E%3Ctext x='450' y='1000' text-anchor='middle' font-family='Arial, sans-serif' font-size='34' font-weight='700' fill='%235a247a'%3EAdd your hero photo%3C/text%3E%3C/svg%3E";

  const PRODUCT_IMAGE_FALLBACK =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='520' viewBox='0 0 900 520'%3E%3Crect width='900' height='520' fill='%23fff7e8'/%3E%3Ccircle cx='455' cy='260' r='180' fill='%23ffffff'/%3E%3Cpath d='M300 215c86-88 210-105 305-55-48 94-146 160-270 158-43 0-70-43-35-103z' fill='%23ffc533'/%3E%3Cellipse cx='455' cy='322' rx='180' ry='72' fill='%23f5e2cd'/%3E%3Cpath d='M335 340c75 34 165 35 245 0' stroke='%23ffffff' stroke-width='22' stroke-linecap='round' fill='none'/%3E%3C/svg%3E";

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
    messageCopied: false
  };

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

  // ─── SEO: title, meta, OG, Twitter ───────────────────────────────────────────

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

    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical && CONFIG.business.siteUrl) {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = CONFIG.business.siteUrl;
      document.head.appendChild(link);
    }
  }

  // ─── Favicon ─────────────────────────────────────────────────────────────────

  function renderFavicon() {
    const accent = (CONFIG.theme.colors.accent || "#ffc533").replace("#", "%23");
    const primary = (CONFIG.theme.colors.primary || "#5a247a").replace("#", "%23");
    const initials = (CONFIG.business.initials || "").replace(/[<>&"']/g, "");
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>` +
      `<rect width='100' height='100' rx='22' fill='${accent}'/>` +
      `<text x='50' y='66' text-anchor='middle' font-family='system-ui,-apple-system,Segoe UI,sans-serif' ` +
      `font-size='46' font-weight='800' fill='${primary}'>${initials}</text></svg>`;
    const link = $("favicon");
    if (link) link.href = `data:image/svg+xml;utf8,${svg}`;
  }

  // ─── JSON-LD ──────────────────────────────────────────────────────────────────

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

  // ─── Header ───────────────────────────────────────────────────────────────────

  function renderHeader() {
    setText("brand-name", CONFIG.business.name);
    setText("brand-mark", CONFIG.business.initials);
    const link = $("brand-link");
    if (link) link.setAttribute("aria-label", `${CONFIG.business.name} home`);
  }

  // ─── Hero ─────────────────────────────────────────────────────────────────────

  function renderHero() {
    setText("hero-eyebrow", CONFIG.business.locationLabel);

    const headline = $("hero-headline");
    if (headline) {
      const lines = CONFIG.hero.headlineLines || [];
      const classes = [
        "block text-6xl font-bold text-mango sm:text-7xl lg:text-[5.25rem]",
        "mt-1 block text-5xl font-bold text-ube sm:text-6xl lg:text-[4.6rem]",
        "mt-3 block text-xl font-semibold uppercase tracking-[0.22em] text-ink/80 sm:text-2xl"
      ];
      headline.innerHTML = lines
        .map((line, i) => `<span class="${classes[i] || classes[2]}">${escapeHtml(line)}</span>`)
        .join("");
    }

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
      img.src = src || HERO_IMAGE_FALLBACK;
      img.alt = (CONFIG.hero.image && CONFIG.hero.image.alt) || `${CONFIG.business.name} — this week's drop.`;
    }
  }

  // ─── About ────────────────────────────────────────────────────────────────────

  function renderAbout() {
    const section = $("about-section");
    if (!section) return;
    if (!CONFIG.about) { section.hidden = true; return; }
    section.hidden = false;

    setText("about-eyebrow", CONFIG.about.eyebrow || "About");
    setText("about-heading", CONFIG.about.headline || "");
    setText("about-body", CONFIG.about.body || "");
    setText("about-signed-by", CONFIG.about.signedBy || "");

    const photo = $("about-photo");
    if (!photo) return;

    if (CONFIG.about.photo) {
      photo.src = CONFIG.about.photo;
      photo.alt = CONFIG.business.name;
      photo.hidden = false;
      const grid = photo.parentElement;
      if (grid) grid.className = "grid items-center gap-8 sm:grid-cols-[0.9fr_1.1fr]";
    } else {
      photo.hidden = true;
      const grid = photo.parentElement;
      if (grid) grid.className = "mx-auto max-w-2xl text-center";
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

  // ─── Menu section with allergen/tag chips ────────────────────────────────────

  function renderMenuSection() {
    setText("menu-eyebrow", CONFIG.menu.sectionEyebrow);
    setText("menu-heading", CONFIG.menu.sectionHeading);
    setText("menu-blurb", CONFIG.menu.sectionBlurb);

    const wrap = $("menu-cards");
    if (!wrap) return;

    wrap.innerHTML = CONFIG.menu.products
      .map((product) => {
        const priceSummary = (product.sizes || [])
          .map((s) => `${escapeHtml(s.label)} $${s.price}`)
          .join(" &middot; ");

        const photoSrc = product.photo || PRODUCT_IMAGE_FALLBACK;

        const tagChips = (product.tags || [])
          .map(
            (t) =>
              `<span class="rounded-full bg-ubeSoft px-3 py-1 text-xs font-extrabold text-ube">${escapeHtml(t)}</span>`
          )
          .join("");

        const allergenChips = (product.allergens || [])
          .map(
            (a) =>
              `<span class="rounded-full bg-blush px-3 py-1 text-xs font-extrabold text-blushDeep">Contains ${escapeHtml(a)}</span>`
          )
          .join("");

        const chips = tagChips + allergenChips;
        const chipsRow = chips
          ? `<div class="mt-4 flex flex-wrap gap-2" aria-label="Dietary info">${chips}</div>`
          : "";

        return `<article class="overflow-hidden rounded-[1.75rem] border border-ube/10 bg-creamSoft shadow-sm">
          <img
            class="h-72 w-full object-cover"
            alt="${escapeHtml(product.name)}."
            src="${escapeHtml(photoSrc)}"
            loading="lazy"
            decoding="async"
          />
          <div class="p-6 sm:p-8">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h3 class="font-display text-3xl font-bold text-ink">${escapeHtml(product.name)}</h3>
              <div class="shrink-0 rounded-2xl bg-mango/25 px-4 py-3 text-sm font-extrabold text-ink">${priceSummary}</div>
            </div>
            <p class="mt-4 leading-7 text-muted">${escapeHtml(product.description)}</p>
            ${chipsRow}
            <a
              href="#preorder"
              class="mt-7 inline-flex w-full justify-center rounded-full bg-ube px-6 py-4 text-sm font-extrabold text-white transition hover:bg-ube/90 focus:outline-none focus:ring-4 focus:ring-ube/20"
            >Request ${escapeHtml(product.name)}</a>
          </div>
        </article>`;
      })
      .join("");
  }

  // ─── How it works ─────────────────────────────────────────────────────────────

  function renderHowItWorks() {
    setText("how-it-works-eyebrow", CONFIG.howItWorks.eyebrow);
    setText("how-it-works-heading", CONFIG.howItWorks.heading);
    const stepsEl = $("how-it-works-steps");
    if (!stepsEl) return;
    stepsEl.innerHTML = CONFIG.howItWorks.steps
      .map(
        (step, i) =>
          `<article class="rounded-[1.5rem] bg-creamSoft p-7 shadow-sm">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-mango text-lg font-extrabold text-ink">${i + 1}</div>
            <h3 class="mt-6 font-display text-2xl font-bold">${escapeHtml(step.title)}</h3>
            <p class="mt-3 leading-7 text-muted">${escapeHtml(step.body)}</p>
          </article>`
      )
      .join("");
  }

  // ─── Preorder section header ──────────────────────────────────────────────────

  function renderPreorderSection() {
    setText("preorder-eyebrow", CONFIG.preorder.sectionEyebrow);
    setText("preorder-heading", CONFIG.preorder.sectionHeading);
    setText("preorder-blurb", CONFIG.preorder.sectionBlurb);
    setText("preorder-instructions", CONFIG.preorder.instructions);
    setText("preorder-ig-handle-label", `DM us on Instagram: ${CONFIG.preorder.instagramHandleLabel}`);
    setHref("preorder-ig-dm-link", CONFIG.preorder.instagramDmUrl);
  }

  // ─── Payment section ──────────────────────────────────────────────────────────

  function renderPaymentSection() {
    setText("payment-eyebrow", CONFIG.payment.eyebrow);
    setText("payment-heading", CONFIG.payment.heading);
    setText("payment-blurb", CONFIG.payment.blurb);
    const list = $("payment-list");
    if (list) {
      list.innerHTML = CONFIG.preorder.paymentMethods
        .map(
          (p) =>
            `<li class="rounded-2xl border border-ube/10 bg-white px-5 py-4 font-extrabold text-ube">${escapeHtml(p)}</li>`
        )
        .join("");
    }
  }

  // ─── FAQ section ──────────────────────────────────────────────────────────────

  function renderFaqSection() {
    setText("faq-eyebrow", CONFIG.faq.eyebrow);
    setText("faq-heading", CONFIG.faq.heading);
    const list = $("faq-list");
    if (!list) return;
    list.innerHTML = CONFIG.faq.items
      .map(
        (item) =>
          `<details class="group rounded-2xl border border-ube/10 bg-creamSoft p-6">
            <summary class="cursor-pointer list-none font-display text-xl font-bold text-ink">${escapeHtml(item.q)}</summary>
            <p class="mt-4 leading-7 text-muted">${escapeHtml(item.a)}</p>
          </details>`
      )
      .join("");
  }

  // ─── Legal notice ─────────────────────────────────────────────────────────────

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
      } else {
        ig.parentElement.hidden = true;
      }
    }

    const tt = $("footer-tiktok");
    if (tt) {
      if (CONFIG.social.tiktokUrl) {
        tt.setAttribute("href", CONFIG.social.tiktokUrl);
        tt.parentElement.hidden = false;
      } else {
        tt.parentElement.hidden = true;
      }
    }
  }

  // ─── Sticky bar ───────────────────────────────────────────────────────────────

  function renderStickyBar() {
    const igLink = $("sticky-instagram-link");
    if (igLink && CONFIG.social.instagramUrl) {
      igLink.setAttribute("href", CONFIG.social.instagramUrl);
      igLink.setAttribute("aria-label", `Follow ${CONFIG.business.name} on Instagram`);
    }
  }

  // ─── Pickup date helpers ──────────────────────────────────────────────────────

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
      CONFIG.pickup.dates
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
    if (!date.isoDate) return { label: "Next Drop", cls: "bg-mango/90 text-ink" };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dropDate = new Date(date.isoDate + "T00:00:00");
    const diffDays = Math.round((dropDate - today) / 86400000);
    if (diffDays >= 0 && diffDays <= 7) return { label: "This Week", cls: "bg-mango text-ink" };
    return { label: "Next Drop", cls: "bg-mango/90 text-ink" };
  }

  // ─── Date picker (native radio) ───────────────────────────────────────────────

  function renderDateOptions() {
    const container = $("pickup-date-options");
    if (!container) return;
    container.innerHTML = "";

    const soonestId = getSoonestSelectableId();

    CONFIG.pickup.dates.forEach((date) => {
      const selectable = isDateSelectable(date);
      const isSelected = state.selectedDateId === date.id;
      const isSoonest = date.id === soonestId;
      const dropLabel = getDropLabel(date, isSoonest);

      const label = document.createElement("label");
      label.className = [
        "block rounded-[1.5rem] border p-4 transition focus-within:ring-4 focus-within:ring-ube/15 sm:p-5",
        isSelected
          ? "border-ube bg-ube text-white shadow-soft"
          : "border-blushDeep/20 bg-blush text-ink",
        selectable ? "cursor-pointer hover:border-ube/35" : "cursor-not-allowed opacity-55 grayscale"
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

      const detailCls = isSelected ? "text-white/80" : "text-muted";
      const statusCls = isSelected ? "bg-white/15 text-mango" : "bg-white/80 text-ube";
      const iconCls = isSelected ? "bg-white/15 text-mango" : "bg-white text-ube";
      const tileCls = isSelected ? "bg-white/10" : "bg-white/70";

      const dropBadgeHtml = dropLabel
        ? `<span class="rounded-full px-3 py-1 text-xs font-extrabold ${dropLabel.cls}">${escapeHtml(dropLabel.label)}</span>`
        : "";

      const content = document.createElement("span");
      content.setAttribute("aria-hidden", "true");
      content.innerHTML = `
        <span class="flex items-start justify-between gap-4">
          <span class="flex items-start gap-3">
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconCls} text-xs font-black uppercase tracking-wider">Cal</span>
            <span>
              <span class="block font-display text-3xl font-bold leading-none">${escapeHtml(date.weekday)}</span>
              <span class="mt-1 block text-lg font-extrabold">${escapeHtml(date.dateLabel)}</span>
            </span>
          </span>
          <span class="flex flex-col items-end gap-1.5">
            <span class="rounded-full px-3 py-1 text-xs font-extrabold ${statusCls}">${escapeHtml(STATUS_TEXT[date.status] || date.status)}</span>
            ${dropBadgeHtml}
          </span>
        </span>
        <span class="mt-4 grid gap-2 sm:grid-cols-2">
          <span class="rounded-2xl ${tileCls} px-4 py-3">
            <span class="block text-xs font-extrabold uppercase tracking-[0.14em] ${detailCls}">Pickup window</span>
            <span class="mt-1 block text-sm font-extrabold">${escapeHtml(date.pickupWindow)}</span>
          </span>
          <span class="rounded-2xl ${tileCls} px-4 py-3">
            <span class="block text-xs font-extrabold uppercase tracking-[0.14em] ${detailCls}">Preorder cutoff</span>
            <span class="mt-1 block text-sm font-extrabold">${escapeHtml(date.preorderCutoffLabel)}</span>
          </span>
        </span>
      `;

      label.appendChild(input);
      label.appendChild(content);
      container.appendChild(label);
    });
  }

  // ─── Time picker (native radio) ───────────────────────────────────────────────

  function renderTimeOptions() {
    const container = $("pickup-time-options");
    if (!container) return;
    container.innerHTML = "";
    const selectedDate = getSelectedDate();

    if (!selectedDate) {
      const p = document.createElement("p");
      p.className =
        "rounded-2xl border border-dashed border-ube/20 bg-white/70 p-4 text-sm font-semibold text-muted sm:col-span-2";
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
        "block rounded-2xl border p-4 cursor-pointer transition focus-within:ring-4 focus-within:ring-ube/15",
        isSelected
          ? "border-ube bg-ube text-white shadow-soft"
          : "border-ube/10 bg-white text-ink hover:border-ube/35"
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
        <span class="mt-1 block text-sm ${isSelected ? "text-white/80" : "text-muted"}">Preferred pickup time</span>
      `;

      label.appendChild(input);
      label.appendChild(content);
      container.appendChild(label);
    });
  }

  // ─── Time parser ──────────────────────────────────────────────────────────────

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
        "rounded-full border-2 border-white/60 px-6 py-4 text-sm font-extrabold text-white/80 transition hover:border-white hover:text-white focus:outline-none focus:ring-4 focus:ring-white/30";
      copyBtn.textContent = "Copy again";
    }
    const igLink = $("preorder-ig-dm-link");
    if (igLink) {
      igLink.className =
        "rounded-full bg-mango px-6 py-4 text-center text-sm font-extrabold text-ink transition hover:bg-mango/90 focus:outline-none focus:ring-4 focus:ring-mango/35";
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
    renderHeader();
    renderHero();
    renderAbout();
    renderAvailabilityBanner();
    renderMenuSection();
    renderHowItWorks();
    renderPreorderSection();
    renderPaymentSection();
    renderFaqSection();
    renderLegal();
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
