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
    selectedTime: ""
  };

  const $ = (id) => document.getElementById(id);

  const setText = (id, value) => {
    const el = $(id);
    if (el && typeof value === "string") el.textContent = value;
  };

  const setHref = (id, value) => {
    const el = $(id);
    if (el && value) el.setAttribute("href", value);
  };

  const setHidden = (id, hidden) => {
    const el = $(id);
    if (el) el.hidden = hidden;
  };

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch]));
  }

  function renderMeta() {
    document.title = `${CONFIG.business.name} | ${CONFIG.menu.sectionHeading}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", CONFIG.business.description);
    document.documentElement.lang = document.documentElement.lang || "en";
  }

  function renderHeader() {
    setText("brand-name", CONFIG.business.name);
    setText("brand-mark", CONFIG.business.initials);
    const brandLink = $("brand-link");
    if (brandLink) brandLink.setAttribute("aria-label", `${CONFIG.business.name} home`);
  }

  function renderHero() {
    setText("hero-eyebrow", CONFIG.business.locationLabel);

    const headline = $("hero-headline");
    if (headline) {
      const lines = CONFIG.hero.headlineLines || [];
      const sizeClasses = [
        "block text-6xl font-bold text-mango sm:text-7xl lg:text-[5.25rem]",
        "mt-1 block text-5xl font-bold text-ube sm:text-6xl lg:text-[4.6rem]",
        "mt-3 block text-xl font-semibold uppercase tracking-[0.22em] text-ink/80 sm:text-2xl"
      ];
      headline.innerHTML = lines
        .map((line, i) => `<span class="${sizeClasses[i] || sizeClasses[2]}">${escapeHtml(line)}</span>`)
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
    }

    const img = $("hero-image");
    if (img) {
      img.src = CONFIG.hero.image && CONFIG.hero.image.src ? CONFIG.hero.image.src : HERO_IMAGE_FALLBACK;
      img.alt = (CONFIG.hero.image && CONFIG.hero.image.alt) || "Hero photo placeholder.";
    }
  }

  function renderAbout() {
    const section = $("about-section");
    if (!section) return;
    if (!CONFIG.about) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    setText("about-eyebrow", CONFIG.about.eyebrow || "About");
    setText("about-heading", CONFIG.about.headline || "");
    setText("about-body", CONFIG.about.body || "");
    setText("about-signed-by", CONFIG.about.signedBy || "");
    const photo = $("about-photo");
    if (photo) {
      if (CONFIG.about.photo) {
        photo.src = CONFIG.about.photo;
        photo.hidden = false;
      } else {
        photo.hidden = true;
      }
    }
  }

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
        return `<article class="overflow-hidden rounded-[1.75rem] border border-ube/10 bg-creamSoft shadow-sm">
          <img class="h-72 w-full object-cover" alt="${escapeHtml(product.name)} photo." src="${photoSrc}" loading="lazy" decoding="async" />
          <div class="p-6 sm:p-8">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h3 class="font-display text-3xl font-bold text-ink">${escapeHtml(product.name)}</h3>
              <div class="rounded-2xl bg-mango/25 px-4 py-3 text-sm font-extrabold text-ink">${priceSummary}</div>
            </div>
            <p class="mt-4 leading-7 text-muted">${escapeHtml(product.description)}</p>
            <a href="#preorder" class="mt-7 inline-flex w-full justify-center rounded-full bg-ube px-6 py-4 text-sm font-extrabold text-white transition hover:bg-ube/90 focus:outline-none focus:ring-4 focus:ring-ube/20">Request ${escapeHtml(product.name)}</a>
          </div>
        </article>`;
      })
      .join("");
  }

  function renderPreorderSection() {
    setText("preorder-eyebrow", CONFIG.preorder.sectionEyebrow);
    setText("preorder-heading", CONFIG.preorder.sectionHeading);
    setText("preorder-blurb", CONFIG.preorder.sectionBlurb);
    setText("preorder-instructions", CONFIG.preorder.instructions);
    setText("preorder-ig-handle-label", `DM us on Instagram: ${CONFIG.preorder.instagramHandleLabel}`);
    setHref("preorder-ig-dm-link", CONFIG.preorder.instagramDmUrl);
  }

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

  function renderHowItWorks() {
    setText("how-it-works-eyebrow", CONFIG.howItWorks.eyebrow);
    setText("how-it-works-heading", CONFIG.howItWorks.heading);
    const stepsEl = $("how-it-works-steps");
    if (!stepsEl) return;
    stepsEl.innerHTML = CONFIG.howItWorks.steps
      .map(
        (step, i) => `<article class="rounded-[1.5rem] bg-creamSoft p-7 shadow-sm">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-mango text-lg font-extrabold text-ink">${i + 1}</div>
          <h3 class="mt-6 font-display text-2xl font-bold">${escapeHtml(step.title)}</h3>
          <p class="mt-3 leading-7 text-muted">${escapeHtml(step.body)}</p>
        </article>`
      )
      .join("");
  }

  function renderFaqSection() {
    setText("faq-eyebrow", CONFIG.faq.eyebrow);
    setText("faq-heading", CONFIG.faq.heading);
    const list = $("faq-list");
    if (!list) return;
    list.innerHTML = CONFIG.faq.items
      .map(
        (item) =>
          `<details class="group rounded-2xl border border-ube/10 bg-creamSoft p-6"><summary class="cursor-pointer list-none font-display text-xl font-bold text-ink">${escapeHtml(item.q)}</summary><p class="mt-4 leading-7 text-muted">${escapeHtml(item.a)}</p></details>`
      )
      .join("");
  }

  function renderLegal() {
    const el = $("legal-notice");
    if (!el) return;
    const notice = (CONFIG.legal && (CONFIG.legal.cottageFoodNotice || CONFIG.legal.allergenNotice)) || "";
    if (!notice) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = notice;
  }

  function renderFooter() {
    setText("footer-brand", CONFIG.business.name);
    setText("footer-tagline", CONFIG.footer.tagline);
    setText("footer-location", CONFIG.business.locationLabel);

    const ig = $("footer-instagram");
    const tt = $("footer-tiktok");
    if (ig) {
      if (CONFIG.social.instagramUrl) {
        ig.parentElement.hidden = false;
        ig.setAttribute("href", CONFIG.social.instagramUrl);
      } else {
        ig.parentElement.hidden = true;
      }
    }
    if (tt) {
      if (CONFIG.social.tiktokUrl) {
        tt.parentElement.hidden = false;
        tt.setAttribute("href", CONFIG.social.tiktokUrl);
      } else {
        tt.parentElement.hidden = true;
      }
    }
  }

  function renderAvailabilityBanner() {
    const banner = $("availability-banner");
    if (!banner) return;
    const mode = (CONFIG.pickup && CONFIG.pickup.availabilityMode) || "open";
    if (mode === "open") {
      banner.hidden = true;
      banner.textContent = "";
      return;
    }
    const fallback =
      mode === "paused"
        ? "Preorders are paused this week. Follow on Instagram for the next drop."
        : "Preorders open soon. Follow on Instagram for the next drop announcement.";
    banner.hidden = false;
    banner.textContent = CONFIG.pickup.pausedMessage || fallback;
  }

  function getProductByName(name) {
    return CONFIG.menu.products.find((p) => p.name === name);
  }

  function getProductByValue(value) {
    return CONFIG.menu.products.find((p) => p.slug === value || p.name === value);
  }

  function populateProductSelect() {
    const productSelect = $("product");
    if (!productSelect) return;
    productSelect.innerHTML = CONFIG.menu.products
      .map(
        (p, i) =>
          `<option value="${escapeHtml(p.slug || p.name)}" ${i === 0 ? "selected" : ""}>${escapeHtml(p.name)}</option>`
      )
      .join("");
  }

  function populateSizeSelect(productValue) {
    const sizeSelect = $("size");
    if (!sizeSelect) return;
    const product = getProductByValue(productValue) || CONFIG.menu.products[0];
    const sizes = (product && product.sizes) || [];
    const previous = sizeSelect.value;
    sizeSelect.innerHTML = sizes
      .map((s) => `<option value="${escapeHtml(s.label)}">${escapeHtml(s.label)}</option>`)
      .join("");
    const match = sizes.find((s) => s.label === previous);
    if (match) sizeSelect.value = match.label;
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
    if (!product) return 0;
    const size = (product.sizes || []).find((s) => s.label === sizeLabel);
    return size ? size.price : 0;
  }

  function getProductDisplayName(productValue) {
    const product = getProductByValue(productValue);
    return product ? product.name : productValue;
  }

  function isDateSelectable(date) {
    return date.status === "open" || date.status === "limited";
  }

  function getSelectedDate() {
    return CONFIG.pickup.dates.find((d) => d.id === state.selectedDateId);
  }

  function getFormValues() {
    const quantityInput = $("quantity");
    const quantity = Math.max(1, Number.parseInt(quantityInput.value, 10) || 1);
    const productValue = $("product").value;
    const size = $("size").value;
    const selectedDate = getSelectedDate();
    return {
      name: $("customer-name").value.trim(),
      product: getProductDisplayName(productValue),
      size,
      quantity,
      total: getUnitPrice(productValue, size) * quantity,
      paymentMethod: $("payment-method").value,
      pickupDate: selectedDate ? `${selectedDate.weekday} ${selectedDate.dateLabel}` : "",
      pickupTime: state.selectedTime
    };
  }

  function buildMessage(values) {
    return [
      "Hi! I’d like to place a preorder.",
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

  function formatHour(hour) {
    const suffix = hour >= 12 ? "PM" : "AM";
    const normalizedHour = hour % 12 || 12;
    return `${normalizedHour} ${suffix}`;
  }

  function getHourlyTimeOptions(pickupWindow) {
    const match = pickupWindow.match(/(\d+)\s*(AM|PM)\s*-\s*(\d+)\s*(AM|PM)/i);
    if (!match) return [];
    let startHour = Number.parseInt(match[1], 10);
    let endHour = Number.parseInt(match[3], 10);
    const startPeriod = match[2].toUpperCase();
    const endPeriod = match[4].toUpperCase();
    if (startPeriod === "PM" && startHour !== 12) startHour += 12;
    if (startPeriod === "AM" && startHour === 12) startHour = 0;
    if (endPeriod === "PM" && endHour !== 12) endHour += 12;
    if (endPeriod === "AM" && endHour === 12) endHour = 0;
    const options = [];
    for (let hour = startHour; hour < endHour; hour += 1) options.push(formatHour(hour));
    return options;
  }

  function getTimeOptionsForDate(date) {
    return date.timeOptions && date.timeOptions.length > 0
      ? date.timeOptions
      : getHourlyTimeOptions(date.pickupWindow);
  }

  function renderDateOptions() {
    const dateOptions = $("pickup-date-options");
    if (!dateOptions) return;
    dateOptions.innerHTML = "";

    CONFIG.pickup.dates.forEach((date) => {
      const selectable = isDateSelectable(date);
      const isSelected = state.selectedDateId === date.id;
      const button = document.createElement("button");
      button.type = "button";
      button.role = "radio";
      button.setAttribute("aria-checked", String(isSelected));
      button.disabled = !selectable;
      button.dataset.dateId = date.id;
      button.className = [
        "rounded-[1.5rem] border p-4 text-left transition focus:outline-none focus:ring-4 focus:ring-ube/15 sm:p-5",
        isSelected ? "border-ube bg-ube text-white shadow-soft" : "border-blushDeep/20 bg-blush text-ink hover:border-ube/35",
        selectable ? "cursor-pointer" : "cursor-not-allowed opacity-55 grayscale"
      ].join(" ");

      const detailClass = isSelected ? "text-white/80" : "text-muted";
      const statusBadgeClass = isSelected ? "bg-white/15 text-mango" : "bg-white/80 text-ube";
      const iconClass = isSelected ? "bg-white/15 text-mango" : "bg-white text-ube";

      button.innerHTML = `
        <span class="flex items-start justify-between gap-4">
          <span class="flex items-start gap-3">
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconClass} text-xs font-black uppercase tracking-wider">Cal</span>
            <span>
              <span class="block font-display text-3xl font-bold leading-none">${escapeHtml(date.weekday)}</span>
              <span class="mt-1 block text-lg font-extrabold">${escapeHtml(date.dateLabel)}</span>
            </span>
          </span>
          <span class="rounded-full px-3 py-1 text-xs font-extrabold ${statusBadgeClass}">${escapeHtml(STATUS_TEXT[date.status] || date.status)}</span>
        </span>
        <span class="mt-4 grid gap-2 sm:grid-cols-2">
          <span class="rounded-2xl ${isSelected ? "bg-white/10" : "bg-white/70"} px-4 py-3">
            <span class="block text-xs font-extrabold uppercase tracking-[0.14em] ${detailClass}">Pickup window</span>
            <span class="mt-1 block text-sm font-extrabold">${escapeHtml(date.pickupWindow)}</span>
          </span>
          <span class="rounded-2xl ${isSelected ? "bg-white/10" : "bg-white/70"} px-4 py-3">
            <span class="block text-xs font-extrabold uppercase tracking-[0.14em] ${detailClass}">Preorder cutoff</span>
            <span class="mt-1 block text-sm font-extrabold">${escapeHtml(date.preorderCutoffLabel)}</span>
          </span>
        </span>
      `;

      if (selectable) {
        button.addEventListener("click", () => {
          state.selectedDateId = date.id;
          state.selectedTime = "";
          setText("preorder-status", "");
          setText("selected-date-note", `${date.weekday} ${date.dateLabel}`);
          setText("selected-time-note", "No time selected");
          renderDateOptions();
          renderTimeOptions();
          updatePreview();
        });
      }

      dateOptions.appendChild(button);
    });
  }

  function renderTimeOptions() {
    const timeOptions = $("pickup-time-options");
    if (!timeOptions) return;
    timeOptions.innerHTML = "";
    const selectedDate = getSelectedDate();

    if (!selectedDate) {
      const prompt = document.createElement("p");
      prompt.className =
        "rounded-2xl border border-dashed border-ube/20 bg-white/70 p-4 text-sm font-semibold text-muted sm:col-span-2";
      prompt.textContent = "Select an available pickup date to view preferred pickup times.";
      timeOptions.appendChild(prompt);
      return;
    }

    getTimeOptionsForDate(selectedDate).forEach((time) => {
      const isSelected = state.selectedTime === time;
      const button = document.createElement("button");
      button.type = "button";
      button.role = "radio";
      button.setAttribute("aria-checked", String(isSelected));
      button.className = [
        "rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-4 focus:ring-ube/15",
        isSelected ? "border-ube bg-ube text-white shadow-soft" : "border-ube/10 bg-white text-ink hover:border-ube/35",
        "cursor-pointer"
      ].join(" ");
      button.innerHTML = `
        <span class="block font-extrabold">${escapeHtml(time)}</span>
        <span class="mt-1 block text-sm ${isSelected ? "text-white/80" : "text-muted"}">Preferred pickup time</span>
      `;

      button.addEventListener("click", () => {
        state.selectedTime = time;
        setText("preorder-status", "");
        setText("selected-time-note", time);
        renderTimeOptions();
        updatePreview();
      });

      timeOptions.appendChild(button);
    });
  }

  function validatePreorder() {
    const values = getFormValues();
    const missingFields = [];
    if (!values.name) missingFields.push("your name");
    if (!values.pickupDate) missingFields.push("a pickup date");
    if (!values.pickupTime) missingFields.push("a pickup time");
    if (missingFields.length > 0) {
      setText("preorder-status", `Almost there. Please add ${missingFields.join(", ")} before copying.`);
      return null;
    }
    return values;
  }

  async function copyPreorderMessage() {
    const values = validatePreorder();
    if (!values) return;
    const message = buildMessage(values);
    try {
      await navigator.clipboard.writeText(message);
      setText("preorder-status", "Preorder message copied. Open Instagram DM and paste it there.");
    } catch (error) {
      setText("preorder-status", "Copy did not work in this browser. You can still select and copy the preview text.");
    }
  }

  function wirePreorderForm() {
    const form = $("preorder-form");
    if (!form) return;

    form.addEventListener("input", (event) => {
      if (event.target && event.target.id === "product") {
        populateSizeSelect($("product").value);
      }
      setText("preorder-status", "");
      updatePreview();
    });

    form.addEventListener("change", (event) => {
      if (event.target && event.target.id === "product") {
        populateSizeSelect($("product").value);
      }
      setText("preorder-status", "");
      updatePreview();
    });

    const copyButton = $("copy-message");
    if (copyButton) copyButton.addEventListener("click", copyPreorderMessage);
  }

  function init() {
    if (!CONFIG) {
      console.error("[sweetdropkitchen] window.SITE_CONFIG is missing. Did site.config.js fail to load?");
      return;
    }
    renderMeta();
    renderHeader();
    renderHero();
    renderAbout();
    renderAvailabilityBanner();
    renderMenuSection();
    renderPreorderSection();
    renderHowItWorks();
    renderPaymentSection();
    renderFaqSection();
    renderLegal();
    renderFooter();

    populateProductSelect();
    populateSizeSelect($("product") ? $("product").value : "");
    populatePaymentSelect();
    renderDateOptions();
    renderTimeOptions();
    wirePreorderForm();
    updatePreview();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
