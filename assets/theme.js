/* Cat Punch theme — behaviour (no dependencies) */
(function () {
  "use strict";
  const T = window.theme || { routes: {}, strings: {}, moneyFormat: "£{{amount}}" };
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* Money ---------------------------------------------------- */
  function formatMoney(cents, format) {
    const fmt = format || T.moneyFormat || "£{{amount}}";
    const value = (cents / 100).toFixed(2);
    const [whole, dec] = value.split(".");
    const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const withDots = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const map = {
      amount: `${withCommas}.${dec}`,
      amount_no_decimals: withCommas,
      amount_with_comma_separator: `${withDots},${dec}`,
      amount_no_decimals_with_comma_separator: withDots,
      amount_with_space_separator: `${whole.replace(/\B(?=(\d{3})+(?!\d))/g, " ")},${dec}`,
      amount_no_decimals_with_space_separator: whole.replace(/\B(?=(\d{3})+(?!\d))/g, " "),
    };
    return fmt.replace(/\{\{\s*(\w+)\s*\}\}/, (_, key) => map[key] ?? map.amount);
  }
  const trimZeros = (s) => s.replace(/[.,]00(?=\D*$)/, "");

  /* Drawers / modals ----------------------------------------- */
  let lastFocus = null;
  function openLayer(id) {
    const el = document.getElementById(id);
    if (!el) return;
    lastFocus = document.activeElement;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
    const focusable = $("input, button:not([data-close]), a", el.querySelector(".drawer__panel, .modal__panel") || el);
    if (focusable) setTimeout(() => focusable.focus(), 50);
    $$(`[aria-controls="${id}"]`).forEach((b) => b.setAttribute("aria-expanded", "true"));
  }
  function closeLayer(el) {
    if (!el) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    if (!$(".drawer.is-open, .modal.is-open")) document.body.classList.remove("overflow-hidden");
    $$(`[aria-controls="${el.id}"]`).forEach((b) => b.setAttribute("aria-expanded", "false"));
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-open]");
    if (opener) {
      e.preventDefault();
      openLayer(opener.dataset.open);
      return;
    }
    const closer = e.target.closest("[data-close]");
    if (closer) {
      e.preventDefault();
      closeLayer(closer.closest(".drawer, .modal"));
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $$(".drawer.is-open, .modal.is-open").forEach(closeLayer);
  });

  /* Cart ------------------------------------------------------ */
  const cartDrawerContainer = () => document.getElementById("CartDrawerContainer");
  function renderCartSection(html) {
    const container = cartDrawerContainer();
    if (!container || !html) return;
    const wasOpen = $("#CartDrawer.is-open", container);
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const fresh = $("#CartDrawer", tmp);
    if (!fresh) return;
    if (wasOpen) {
      fresh.classList.add("is-open");
      fresh.setAttribute("aria-hidden", "false");
    }
    $("#CartDrawer", container).replaceWith(fresh);
    const count = $("[data-cart-count]", fresh);
    if (count) {
      $$("#CartIconBubble [data-cart-count]").forEach((b) => {
        b.textContent = count.textContent;
        b.classList.toggle("is-empty", count.textContent.trim() === "0");
      });
    }
    startCartTimer();
  }
  async function refreshCart() {
    const res = await fetch(`${T.routes.cart || "/cart"}?sections=cart-drawer`, { headers: { Accept: "application/json" } });
    const data = await res.json();
    renderCartSection(data["cart-drawer"]);
  }
  async function cartChange(key, quantity) {
    const drawer = document.getElementById("CartDrawer");
    drawer && drawer.classList.add("is-loading");
    try {
      const res = await fetch(T.routes.cartChange || "/cart/change.js", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ id: key, quantity, sections: "cart-drawer" }),
      });
      const data = await res.json();
      renderCartSection(data.sections && data.sections["cart-drawer"]);
    } finally {
      const d = document.getElementById("CartDrawer");
      d && d.classList.remove("is-loading");
    }
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cart-change]");
    if (!btn) return;
    e.preventDefault();
    cartChange(btn.dataset.cartChange, Math.max(0, parseInt(btn.dataset.qty, 10) || 0));
  });
  document.addEventListener("change", (e) => {
    const input = e.target.closest("[data-cart-qty]");
    if (!input) return;
    cartChange(input.dataset.cartQty, Math.max(0, parseInt(input.value, 10) || 0));
  });
  let timerInterval = null;
  function startCartTimer() {
    const el = $("[data-cart-timer]");
    if (timerInterval) clearInterval(timerInterval);
    if (!el) return;
    const minutes = parseInt(el.dataset.minutes, 10) || 10;
    const key = "cart-reserved-until";
    let ends = Number(sessionStorage.getItem(key) || 0);
    if (!ends || ends < Date.now()) {
      ends = Date.now() + minutes * 60000;
      sessionStorage.setItem(key, String(ends));
    }
    const tick = () => {
      let left = Math.floor((ends - Date.now()) / 1000);
      if (left <= 0) {
        // timer ran out: start a fresh reservation window
        ends = Date.now() + minutes * 60000;
        sessionStorage.setItem(key, String(ends));
        left = minutes * 60;
      }
      const out = $("[data-cart-timer-value]", el);
      if (out) out.textContent = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
    };
    tick();
    timerInterval = setInterval(tick, 1000);
  }
  startCartTimer();

  /* Product form ----------------------------------------------- */
  function initProduct(root) {
    const form = $("[data-product-form]", root);
    if (!form) return;
    const idInput = $("[data-variant-id]", form);
    const priceEl = $("[data-price]", root);
    const compareEl = $("[data-compare-price]", root);
    const badgeEl = $("[data-save-badge]", root);
    const saveAmountEl = $("[data-save-amount]", root);
    const atc = $("[data-add-to-cart]", form);
    const atcText = $("[data-atc-text]", form);
    const qtyInput = $("[data-qty-input]", form);
    const errorEl = $("[data-form-error]", form);

    // Bundle cards -> variant
    $$("[data-variant-radio]", form).forEach((radio) => {
      radio.addEventListener("change", () => {
        $$("[data-bundle-card]", form).forEach((c) => c.classList.toggle("is-selected", c.contains(radio)));
        idInput.value = radio.value;
        const price = parseInt(radio.dataset.price, 10);
        const compare = parseInt(radio.dataset.compare, 10) || 0;
        const available = radio.dataset.available === "true";
        if (priceEl) priceEl.textContent = formatMoney(price);
        if (compareEl) {
          compareEl.hidden = !(compare > price);
          compareEl.textContent = formatMoney(compare);
        }
        if (badgeEl) badgeEl.hidden = !(compare > price);
        if (saveAmountEl && compare > price) saveAmountEl.textContent = trimZeros(formatMoney(compare - price));
        if (atc) {
          atc.disabled = !available;
          if (atcText) atcText.textContent = available ? T.strings.addToCart || "Add to cart" : T.strings.soldOut || "Sold out";
        }
        const mediaId = radio.dataset.mediaId;
        if (mediaId && gallery) gallery.goToMedia(mediaId);
        if (window.history && window.history.replaceState && document.body.classList.contains("template-product")) {
          const url = new URL(window.location.href);
          url.searchParams.set("variant", radio.value);
          window.history.replaceState({}, "", url);
        }
      });
    });

    // Quantity
    $("[data-qty-minus]", form)?.addEventListener("click", () => (qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1)));
    $("[data-qty-plus]", form)?.addEventListener("click", () => (qtyInput.value = (parseInt(qtyInput.value, 10) || 1) + 1));
    qtyInput?.addEventListener("change", () => (qtyInput.value = Math.max(1, parseInt(qtyInput.value, 10) || 1)));

    // Add to cart (AJAX)
    async function addToCart() {
      if (atc.disabled) return;
      atc.classList.add("is-loading");
      atc.setAttribute("aria-disabled", "true");
      if (errorEl) errorEl.hidden = true;
      try {
        const fd = new FormData(form);
        fd.append("sections", "cart-drawer");
        const res = await fetch(T.routes.cartAdd || "/cart/add.js", { method: "POST", body: fd, headers: { Accept: "application/json" } });
        const data = await res.json();
        if (!res.ok || data.status) throw new Error(data.description || data.message || "Could not add to cart");
        renderCartSection(data.sections && data.sections["cart-drawer"]);
        if (!data.sections) await refreshCart();
        openLayer("CartDrawer");
      } catch (err) {
        if (errorEl) {
          errorEl.textContent = err.message;
          errorEl.hidden = false;
        }
      } finally {
        atc.classList.remove("is-loading");
        atc.removeAttribute("aria-disabled");
      }
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      addToCart();
    });

    // Gallery
    const gallery = initGallery($("[data-gallery]", root));

    // Sticky bar
    const sticky = $("[data-sticky-atc]", root.parentElement || root);
    if (sticky && atc) {
      const stickyBtn = $("[data-sticky-add]", sticky);
      stickyBtn?.addEventListener("click", addToCart);
      let last = null, raf = 0;
      const check = () => {
        raf = 0;
        const show = atc.getBoundingClientRect().bottom < 0;
        if (show === last) return;
        last = show;
        sticky.classList.toggle("is-visible", show);
        sticky.setAttribute("aria-hidden", String(!show));
        stickyBtn && (stickyBtn.tabIndex = show ? 0 : -1);
      };
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
      check();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
  }

  function initGallery(root) {
    if (!root) return null;
    const track = $("[data-gallery-track]", root);
    const slides = $$("[data-gallery-slide]", root);
    const dots = $$("[data-gallery-dot]", root);
    const thumbs = $$("[data-gallery-thumb]", root);
    const thumbsTrack = $("[data-thumbs-track]", root);
    const prev = $("[data-gallery-prev]", root), next = $("[data-gallery-next]", root);
    const tPrev = $("[data-thumbs-prev]", root), tNext = $("[data-thumbs-next]", root);
    const PER_VIEW = 5;
    let active = 0, thumbOffset = 0;
    const maxThumbOffset = Math.max(0, thumbs.length - PER_VIEW);

    function render() {
      track.style.transform = `translateX(-${active * 100}%)`;
      slides.forEach((s, i) => s.setAttribute("aria-hidden", String(i !== active)));
      dots.forEach((d, i) => d.classList.toggle("is-active", i === active));
      thumbs.forEach((t, i) => t.classList.toggle("is-active", i === active));
      if (prev) prev.disabled = active === 0;
      if (next) next.disabled = active === slides.length - 1;
      if (active < thumbOffset) thumbOffset = active;
      else if (active >= thumbOffset + PER_VIEW) thumbOffset = Math.min(active - PER_VIEW + 1, maxThumbOffset);
      if (thumbsTrack) thumbsTrack.style.transform = `translateX(calc(-${thumbOffset} * ((100% - 4 * var(--gap)) / 5 + var(--gap))))`;
      if (tPrev) tPrev.disabled = thumbOffset === 0;
      if (tNext) tNext.disabled = thumbOffset >= maxThumbOffset;
    }
    const go = (i) => { active = Math.max(0, Math.min(slides.length - 1, i)); render(); };
    prev?.addEventListener("click", () => go(active - 1));
    next?.addEventListener("click", () => go(active + 1));
    dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
    thumbs.forEach((t, i) => t.addEventListener("click", () => go(i)));
    tPrev?.addEventListener("click", () => { thumbOffset = Math.max(0, thumbOffset - 1); render(); });
    tNext?.addEventListener("click", () => { thumbOffset = Math.min(maxThumbOffset, thumbOffset + 1); render(); });
    let startX = null;
    const viewport = $(".gallery__viewport", root);
    viewport.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
    viewport.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
      startX = null;
    });
    render();
    return {
      go,
      goToMedia(id) {
        const i = slides.findIndex((s) => s.dataset.mediaId === String(id));
        if (i >= 0) go(i);
      },
    };
  }

  $$("[data-product-section]").forEach(initProduct);

  /* Delivery estimate: 3-5 days from the visitor's own clock/locale ------ */
  function initDeliveryEstimate(el) {
    const out = $("[data-delivery-dates]", el);
    if (!out) return;
    const min = parseInt(el.dataset.minDays, 10) || 3, max = parseInt(el.dataset.maxDays, 10) || 5;
    const fmt = new Intl.DateTimeFormat(undefined, { weekday: "short", day: "numeric", month: "short" });
    const plus = (d) => { const x = new Date(); x.setDate(x.getDate() + d); return x; };
    out.textContent = `${fmt.format(plus(min))} \u2013 ${fmt.format(plus(max))}`;
  }
  $$("[data-delivery-estimate]").forEach(initDeliveryEstimate);

  /* Marquee: clone the strip until it is wider than the screen, scroll by exact px --- */
  function initMarquee(m) {
    const track = $(".marquee__track", m);
    if (!track) return;
    const lists = $$(".marquee__list", track);
    if (!lists.length) return;
    const base = lists[0];
    lists.slice(1).forEach((l) => l.remove());
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const listW = base.getBoundingClientRect().width;
    const viewW = m.getBoundingClientRect().width;
    if (!listW || !viewW) return;
    const copies = Math.max(2, Math.ceil((viewW * 2) / listW) + 1);
    for (let i = 1; i < copies; i++) {
      const c = base.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      c.querySelectorAll("img").forEach((img) => img.setAttribute("loading", "eager"));
      track.appendChild(c);
    }
    const pxPerSec = parseFloat(m.dataset.speed) || 40;
    track.style.setProperty("--marquee-shift", `${listW}px`);
    track.style.setProperty("--marquee-duration", `${listW / pxPerSec}s`);
  }
  const marquees = $$("[data-marquee]");
  marquees.forEach(initMarquee);
  let marqueeResize = 0;
  window.addEventListener("resize", () => {
    clearTimeout(marqueeResize);
    marqueeResize = setTimeout(() => $$("[data-marquee]").forEach(initMarquee), 200);
  });

  /* Reveal ------------------------------------------------------ */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-shown"); io.unobserve(en.target); } });
    }, { threshold: 0.05 });
    reveals.forEach((r) => io.observe(r));
  } else reveals.forEach((r) => r.classList.add("is-shown"));

  /* Header hide on scroll down ---------------------------------- */
  const headerWrap = document.getElementById("HeaderWrapper");
  if (headerWrap) {
    let lastY = window.scrollY;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      headerWrap.style.transform = y > lastY && y > 200 ? "translateY(-100%)" : "";
      lastY = y;
    }, { passive: true });
  }

  /* Customer helpers -------------------------------------------- */
  $$("[data-toggle-recover]").forEach((b) => b.addEventListener("click", () => {
    const rec = document.getElementById("RecoverPassword"), login = document.getElementById("LoginForm");
    if (!rec || !login) return;
    const show = rec.hidden;
    rec.hidden = !show;
    login.hidden = show;
  }));
  $$("[data-confirm-delete]").forEach((b) => b.addEventListener("click", (e) => { if (!confirm("Delete this address?")) e.preventDefault(); }));
  $$("select[data-default]").forEach((s) => { if (s.dataset.default) s.value = s.dataset.default; });

  /* Theme editor: re-init sections when they load ----------------- */
  document.addEventListener("shopify:section:load", (e) => {
    $$("[data-product-section]", e.target).forEach(initProduct);
    $$("[data-delivery-estimate]", e.target).forEach(initDeliveryEstimate);
    $$("[data-marquee]", e.target).forEach(initMarquee);
    $$(".reveal", e.target).forEach((r) => r.classList.add("is-shown"));
  });
})();
