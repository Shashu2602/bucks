/* ==========================================================================
   BRAZEN — site JS
   Catalog data (synced from kdp-personal-finance-roadmap (1).md), rendering,
   and every interaction from the build spec. Vanilla JS, no dependencies.
   ========================================================================== */

"use strict";

/* --------------------------------------------------------------------------
   Catalog data — source of truth: kdp-personal-finance-roadmap (1).md.
   `status` is hand-set: only flip to "available" when books/NN-slug/output/*.pdf
   actually exists in the repo. Never auto-compute from date.
   -------------------------------------------------------------------------- */
const PILLARS = [
  { id: "irregular-income", label: "Irregular / Non-Traditional Income", accent: "var(--accent-amber)" },
  { id: "life-transitions", label: "Life Transitions", accent: "var(--accent-red)" },
  { id: "household-structure", label: "Household Structure", accent: "var(--accent-acid)" },
  { id: "specific-circumstances", label: "Specific Circumstances", accent: "var(--accent-red)" },
  { id: "life-stage", label: "Life Stage", accent: "var(--accent-amber)" },
];

const PILLAR_DESCRIPTIONS = {
  "irregular-income": "Freelancers, gig workers, seasonal income. Money systems for paychecks that move.",
  "life-transitions": "Divorce, new baby, retirement, relocation. A plan for the moment everything changes.",
  "household-structure": "Single parents, merging couples, caregivers. Budgets shaped like your actual household.",
  "specific-circumstances": "Neurodivergence, disability income, immigration, military life. Advice that fits the circumstance.",
  "life-stage": "Teens, students, 40+ late starters, retirees. The right move for right now.",
};

/* Raw hex per accent token — used for box-shadow glows where var() can't
   be composed into rgba() */
const ACCENT_HEX = {
  "var(--accent-amber)": "rgba(245, 166, 35, 0.35)",
  "var(--accent-red)": "rgba(230, 57, 70, 0.35)",
  "var(--accent-acid)": "rgba(180, 255, 58, 0.30)",
};

const BOOKS = [
  {
    id: 1, slug: "freelance-income-playbook",
    title: "The Freelance Income Playbook",
    subtitle: "Budgeting When Your Paycheck Changes Every Month",
    reader: "Gig/freelance workers", pillar: "irregular-income",
    angle: "Variable-income budgeting, not fixed-salary advice",
    length: "~18,000 words (~78 pp)", date: "2026-07-18", status: "available",
    blurb: "Your income moves. Every piece of advice built for a salary treats that as a problem to fix. It isn't — it's a fact to plan around. Three moving parts: a floor you budget against, a buffer that catches the bad months, and habits that keep both running without you.",
  },
  {
    id: 2, slug: "debt-free-by-45",
    title: "Debt-Free by 45",
    subtitle: "A Catch-Up System for Late Starters",
    reader: "Adults 40+ with no savings", pillar: "life-stage",
    angle: "Urgency + shame-free tone for late starters",
    length: "~16,000 words (~70 pp)", date: "2026-07-18", status: "coming-soon",
  },
  {
    id: 3, slug: "money-that-works-with-your-brain",
    title: "Money That Works With Your Brain",
    subtitle: "A No-Willpower Budgeting System for ADHD Adults",
    reader: "Neurodivergent adults", pillar: "specific-circumstances",
    angle: "Executive-function-friendly system, not generic budgeting",
    length: "~15,000 words (~65 pp)", date: "2026-07-21", status: "coming-soon",
  },
  {
    id: 4, slug: "quarterly-taxes-made-simple",
    title: "Quarterly Taxes Made Simple",
    subtitle: "A Freelance Creative's Guide to Not Owing the IRS",
    reader: "Freelance creatives", pillar: "irregular-income",
    angle: "Tax-specific, not general freelance finance",
    length: "~14,000 words (~61 pp)", date: "2026-07-21", status: "coming-soon",
  },
  {
    id: 5, slug: "pcs-money-moves",
    title: "PCS Money Moves",
    subtitle: "A Financial Playbook for Military Spouses Who Relocate Every Few Years",
    reader: "Military spouses", pillar: "specific-circumstances",
    angle: "Relocation-specific income/credit continuity",
    length: "~16,000 words (~70 pp)", date: "2026-07-24", status: "coming-soon",
  },
  {
    id: 6, slug: "two-incomes-one-plan",
    title: "Two Incomes, One Plan",
    subtitle: "Merging Finances Without Merging Fights",
    reader: "Newly cohabiting/married couples", pillar: "household-structure",
    angle: "Relationship + money combined framing",
    length: "~17,000 words (~74 pp)", date: "2026-07-24", status: "coming-soon",
  },
  {
    id: 7, slug: "the-cash-first-method",
    title: "The Cash-First Method",
    subtitle: "A Simple Money System for Teens and First Jobs",
    reader: "Teens/young adults", pillar: "life-stage",
    angle: "Analog-first, app-optional approach",
    length: "~12,000 words (~52 pp)", date: "2026-07-27", status: "coming-soon",
  },
  {
    id: 8, slug: "solo-parent-solid-plan",
    title: "Solo Parent, Solid Plan",
    subtitle: "Building a One-Income Household Budget",
    reader: "Single parents", pillar: "household-structure",
    angle: "Single-income household structure specifically",
    length: "~16,000 words (~70 pp)", date: "2026-07-27", status: "coming-soon",
  },
  {
    id: 9, slug: "flexible-income-from-home",
    title: "Flexible Income From Home",
    subtitle: "Side Work That Fits Around Nap Schedules",
    reader: "Stay-at-home parents", pillar: "household-structure",
    angle: "Portability/flexibility as the core constraint",
    length: "~15,000 words (~65 pp)", date: "2026-07-30", status: "coming-soon",
  },
  {
    id: 10, slug: "managing-money-on-disability-income",
    title: "Managing Money on a Fixed or Fluctuating Disability Income",
    subtitle: "",
    reader: "Adults on disability income", pillar: "specific-circumstances",
    angle: "Income-type-specific, rarely covered niche",
    length: "~15,000 words (~65 pp)", date: "2026-07-30", status: "coming-soon",
  },
  {
    id: 11, slug: "credit-from-zero",
    title: "Credit From Zero",
    subtitle: "A Newcomer's Guide to Building a U.S. Financial History",
    reader: "Immigrants new to the U.S.", pillar: "specific-circumstances",
    angle: "Credit-building from no history, not credit repair",
    length: "~15,000 words (~65 pp)", date: "2026-08-02", status: "coming-soon",
  },
  {
    id: 12, slug: "the-debt-free-wedding-planner",
    title: "The Debt-Free Wedding Planner",
    subtitle: "Budgeting Your Big Day Without the Big Loan",
    reader: "Engaged couples", pillar: "life-transitions",
    angle: "Event-specific budgeting niche",
    length: "~14,000 words (~61 pp)", date: "2026-08-02", status: "coming-soon",
  },
  {
    id: 13, slug: "the-sandwich-generations-money-guide",
    title: "The Sandwich Generation's Money Guide",
    subtitle: "Budgeting While Caring for Aging Parents",
    reader: "Adult caregivers", pillar: "household-structure",
    angle: "Dual-dependent financial planning",
    length: "~18,000 words (~78 pp)", date: "2026-08-05", status: "coming-soon",
  },
  {
    id: 14, slug: "summer-income-for-teachers",
    title: "Summer Income for Teachers",
    subtitle: "Side Work That Doesn't Eat Your Break",
    reader: "Teachers", pillar: "irregular-income",
    angle: "Seasonal, profession-specific income gap",
    length: "~13,000 words (~57 pp)", date: "2026-08-05", status: "coming-soon",
  },
  {
    id: 15, slug: "starting-over",
    title: "Starting Over",
    subtitle: "Rebuilding Your Finances After Divorce",
    reader: "Recently divorced adults", pillar: "life-transitions",
    angle: "Emotional + practical rebuild framing",
    length: "~17,000 words (~74 pp)", date: "2026-08-08", status: "coming-soon",
  },
  {
    id: 16, slug: "low-stimulation-income",
    title: "Low-Stimulation Income",
    subtitle: "Side Hustles for Neurodivergent Adults Living Paycheck to Paycheck",
    reader: "Neurodivergent adults", pillar: "specific-circumstances",
    angle: "Income generation angle — distinct from Title #3's budgeting angle",
    length: "~14,000 words (~61 pp)", date: "2026-08-08", status: "coming-soon",
  },
  {
    id: 17, slug: "earning-without-losing-aid",
    title: "Earning Without Losing Aid",
    subtitle: "A Student's Guide to Side Income That Won't Hurt Financial Aid",
    reader: "College students", pillar: "life-stage",
    angle: "Financial-aid-safe income, a real pain point",
    length: "~13,000 words (~57 pp)", date: "2026-08-11", status: "coming-soon",
  },
  {
    id: 18, slug: "50-plus-retirement-catch-up-plan",
    title: "The 50+ Retirement Catch-Up Plan for the Self-Employed",
    subtitle: "",
    reader: "Self-employed adults 50+", pillar: "life-stage",
    angle: "No employer 401(k) — self-employed-specific retirement",
    length: "~17,000 words (~74 pp)", date: "2026-08-11", status: "coming-soon",
  },
  {
    id: 19, slug: "retirement-isnt-the-end-of-income",
    title: "Retirement Isn't the End of Income",
    subtitle: "Part-Time and Passive Options After You Stop Working",
    reader: "Retirees", pillar: "life-stage",
    angle: "Post-retirement supplemental income, not pre-retirement saving",
    length: "~15,000 words (~65 pp)", date: "2026-08-14", status: "coming-soon",
  },
  {
    id: 20, slug: "the-new-baby-budget-reset",
    title: "The New Baby Budget Reset",
    subtitle: "Adjusting Your Finances for One Income (Temporarily or Permanently)",
    reader: "New/postpartum parents", pillar: "life-transitions",
    angle: "Transition-specific, distinct from general parent budgeting",
    length: "~15,000 words (~65 pp)", date: "2026-08-14", status: "coming-soon",
  },
];

/* Testimonials — voice-consistent placeholder quotes for the slider */
const TESTIMONIALS = [
  {
    quote: "First budgeting book that didn't assume I get paid on the 1st and 15th. Built the three-account system in a weekend and stopped panic-checking my balance.",
    attrib: "Freelance designer, reader of Book #1",
  },
  {
    quote: "The floor-budget idea alone was worth it. I stopped planning around my average month and my bad months stopped feeling like emergencies.",
    attrib: "Rideshare + delivery driver",
  },
  {
    quote: "No lecture, no shame, no 'skip the lattes.' Just a system that assumes my income is what it is and works from there.",
    attrib: "Seasonal contractor",
  },
];

const PILLAR_BY_ID = Object.fromEntries(PILLARS.map((p) => [p.id, p]));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------------------
   Utilities
   -------------------------------------------------------------------------- */
function formatPlannedDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/* #21: relative-date text computed client-side */
function relativeDays(iso) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(iso + "T00:00:00");
  const diffDays = Math.round((target - now) / 86400000);
  if (diffDays > 1) return `in ${diffDays} days`;
  if (diffDays === 1) return "tomorrow";
  if (diffDays === 0) return "today";
  return null; // date passed but book not shipped — show nothing rather than lie
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* --------------------------------------------------------------------------
   Announcement banner (#5) — dismissal persisted in localStorage
   -------------------------------------------------------------------------- */
(function initBanner() {
  const banner = document.getElementById("announcementBanner");
  const dismiss = document.getElementById("dismissBanner");
  const KEY = "brazen-banner-dismissed";

  if (localStorage.getItem(KEY) === "1") {
    banner.classList.add("is-dismissed");
  }

  dismiss.addEventListener("click", () => {
    banner.classList.add("is-dismissed");
    localStorage.setItem(KEY, "1");
  });
})();

/* --------------------------------------------------------------------------
   Nav: shrink on scroll (#9, rAF-throttled) + hamburger + progress bar (#10)
   + parallax hero (#11) + back-to-top visibility (#20)
   -------------------------------------------------------------------------- */
(function initScrollEffects() {
  const nav = document.getElementById("siteNav");
  const progress = document.getElementById("scrollProgress");
  const heroBg = document.getElementById("heroBg");
  const backToTop = document.getElementById("backToTop");
  const hero = document.getElementById("hero");
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    nav.classList.toggle("scrolled", y > 8);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = docHeight > 0 ? `${(y / docHeight) * 100}%` : "0%";

    /* #11: parallax clamped to 40px max */
    if (!prefersReducedMotion && heroBg) {
      const shift = Math.min(y * 0.15, 40);
      heroBg.style.transform = `translateY(${shift}px)`;
    }

    backToTop.classList.toggle("is-visible", y > hero.offsetHeight);

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  onScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* Hamburger */
  const hamburger = document.getElementById("navHamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      navLinks.classList.remove("is-open");
      hamburger.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
})();

/* --------------------------------------------------------------------------
   Marquee (#6) — build the track as two identical halves, each at least as
   wide as the viewport, so the -50% keyframe loop is seamless and the banner
   never runs out at any screen width
   -------------------------------------------------------------------------- */
(function initMarquee() {
  const track = document.getElementById("marqueeTrack");
  const baseSet = track.innerHTML;

  function build() {
    track.innerHTML = baseSet;
    let copies = 1;
    while (track.scrollWidth < window.innerWidth * 1.2 && copies < 20) {
      track.innerHTML += baseSet;
      copies += 1;
    }
    /* duplicate the whole half once — two identical halves = seamless -50% loop */
    track.innerHTML += track.innerHTML;
  }

  build();

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 200);
  });
})();

/* --------------------------------------------------------------------------
   Page-load logo intro (#18) — once per session
   -------------------------------------------------------------------------- */
(function initIntro() {
  const KEY = "brazen-intro-played";
  if (!sessionStorage.getItem(KEY) && !prefersReducedMotion) {
    document.querySelector(".nav-logo").classList.add("intro-play");
    sessionStorage.setItem(KEY, "1");
  }
})();

/* --------------------------------------------------------------------------
   Cursor-follow hero glow (#24) — desktop pointers only
   -------------------------------------------------------------------------- */
(function initHeroGlow() {
  if (prefersReducedMotion) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const hero = document.getElementById("hero");
  const glow = document.getElementById("heroGlow");

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left}px`;
    glow.style.top = `${e.clientY - rect.top}px`;
    glow.classList.add("is-active");
  });

  hero.addEventListener("mouseleave", () => glow.classList.remove("is-active"));
})();

/* --------------------------------------------------------------------------
   Render: pillars grid + footer pillar links
   -------------------------------------------------------------------------- */
(function renderPillars() {
  const grid = document.getElementById("pillarsGrid");
  const footerLinks = document.getElementById("footerPillarLinks");

  PILLARS.forEach((pillar, i) => {
    const count = BOOKS.filter((b) => b.pillar === pillar.id).length;
    const card = el("button", "pillar-card reveal");
    card.style.setProperty("--pillar-accent", pillar.accent);
    card.style.setProperty("--pillar-glow", ACCENT_HEX[pillar.accent]);
    card.setAttribute("data-pillar", pillar.id);
    card.setAttribute("aria-label", `Filter catalog by ${pillar.label}`);
    card.innerHTML = `
      <span class="pillar-number">0${i + 1}</span>
      <span class="pillar-name">${escapeHtml(pillar.label)}</span>
      <span class="pillar-desc">${escapeHtml(PILLAR_DESCRIPTIONS[pillar.id])}</span>
      <span class="pillar-count">${count} title${count === 1 ? "" : "s"}</span>
    `;
    /* Pillar card click = jump to catalog pre-filtered to that pillar */
    card.addEventListener("click", () => {
      document.getElementById("catalog-coming-soon").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      setFilter(pillar.id);
    });
    grid.appendChild(card);

    const li = el("li", "", `<a href="#catalog-coming-soon" data-pillar-link="${pillar.id}">${escapeHtml(pillar.label)}</a>`);
    li.querySelector("a").addEventListener("click", () => setFilter(pillar.id));
    footerLinks.appendChild(li);
  });
})();

/* --------------------------------------------------------------------------
   Render: available book (Book #1) full-detail card
   -------------------------------------------------------------------------- */
(function renderAvailable() {
  const slot = document.getElementById("availableBookSlot");
  const book = BOOKS.find((b) => b.status === "available");
  if (!book) return;

  const pillar = PILLAR_BY_ID[book.pillar];
  const card = el("article", "available-card reveal");
  card.style.setProperty("--pillar-accent", pillar.accent);
  card.innerHTML = `
    <div class="book1-cover" role="img" aria-label="Cover of ${escapeHtml(book.title)}: white background, dark green title, copper accent rules">
      <div class="cover-rule"></div>
      <p class="cover-title">${escapeHtml(book.title)}</p>
      <p class="cover-subtitle">${escapeHtml(book.subtitle)}</p>
      <div class="cover-rule"></div>
      <p class="cover-imprint">BRAZEN</p>
    </div>
    <div class="available-info">
      <span class="badge">Available Now</span>
      <h3 class="book-title">${escapeHtml(book.title)}</h3>
      <p class="book-subtitle">${escapeHtml(book.subtitle)}</p>
      <div class="book-meta">
        <span>For: <strong>${escapeHtml(book.reader)}</strong></span>
        <span>Length: <strong>${escapeHtml(book.length)}</strong></span>
      </div>
      <p class="book-blurb">${escapeHtml(book.blurb)}</p>
      <div class="available-cta-row">
        <a href="#" data-todo="amazon-link" class="btn btn-primary" data-ripple>Read The Playbook</a>
        <button class="btn btn-ghost" data-ripple data-open-book="${book.id}">Look Inside</button>
      </div>
    </div>
  `;
  slot.appendChild(card);
})();

/* --------------------------------------------------------------------------
   Render: roadmap milestone timeline — releases grouped by drop date,
   diamond markers on an amber rail, compact clickable rows (#21 rel badges)
   -------------------------------------------------------------------------- */
(function renderTimeline() {
  const wrap = document.getElementById("timeline");
  const comingSoon = BOOKS
    .filter((b) => b.status === "coming-soon")
    .sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id);

  /* group by drop date, preserving date order */
  const groups = new Map();
  comingSoon.forEach((book) => {
    if (!groups.has(book.date)) groups.set(book.date, []);
    groups.get(book.date).push(book);
  });

  groups.forEach((books, date) => {
    const rel = relativeDays(date);
    const group = el("div", "timeline-group reveal");
    group.setAttribute("data-date", date);
    group.innerHTML = `
      <div class="timeline-marker" aria-hidden="true"></div>
      <div class="timeline-date">
        <span class="timeline-date-text">${formatPlannedDate(date)}</span>
        ${rel ? `<span class="timeline-rel">${rel}</span>` : ""}
      </div>
      <div class="timeline-books"></div>
    `;
    const booksWrap = group.querySelector(".timeline-books");

    books.forEach((book) => {
      const pillar = PILLAR_BY_ID[book.pillar];
      const entry = el("article", "timeline-entry");
      entry.style.setProperty("--pillar-accent", pillar.accent);
      entry.style.setProperty("--pillar-glow", ACCENT_HEX[pillar.accent]);
      entry.setAttribute("data-pillar", book.pillar);
      entry.setAttribute("tabindex", "0");
      entry.setAttribute("role", "button");
      entry.setAttribute("aria-label", `${book.title} — details`);
      entry.innerHTML = `
        <div class="timeline-entry-main">
          <h3 class="book-title">${escapeHtml(book.title)}</h3>
          ${book.subtitle ? `<p class="book-subtitle">${escapeHtml(book.subtitle)}</p>` : ""}
          <p class="timeline-entry-reader">For: <strong>${escapeHtml(book.reader)}</strong> — ${escapeHtml(book.angle)}</p>
        </div>
        <div class="timeline-entry-side">
          <span class="pillar-tag">${escapeHtml(pillar.label)}</span>
          <a href="#newsletter" class="notify-link">Notify Me</a>
        </div>
      `;

      entry.addEventListener("click", (e) => {
        if (e.target.closest(".notify-link")) return; // let the anchor scroll
        openModal(book.id);
      });
      entry.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(book.id);
        }
      });

      booksWrap.appendChild(entry);
    });

    wrap.appendChild(group);
  });
})();

/* --------------------------------------------------------------------------
   Filter tabs (#15) — sliding indicator + animated card filtering
   -------------------------------------------------------------------------- */
let setFilter; // exposed for pillar cards / footer links

(function initFilters() {
  const tabsWrap = document.getElementById("filterTabs");
  const timeline = document.getElementById("timeline");

  PILLARS.forEach((pillar) => {
    const tab = el("button", "filter-tab", escapeHtml(pillar.label));
    tab.setAttribute("data-filter", pillar.id);
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", "false");
    tabsWrap.appendChild(tab);
  });

  const indicator = el("div", "filter-indicator");
  tabsWrap.appendChild(indicator);

  function moveIndicator(tab) {
    indicator.style.left = `${tab.offsetLeft}px`;
    indicator.style.width = `${tab.offsetWidth}px`;
  }

  function applyFilter(filterId) {
    const entries = timeline.querySelectorAll(".timeline-entry");
    entries.forEach((entry) => {
      const match = filterId === "all" || entry.getAttribute("data-pillar") === filterId;
      if (match) {
        entry.classList.remove("is-hidden");
        /* next frame so the transition from filtered-out state runs */
        requestAnimationFrame(() => entry.classList.remove("is-filtered-out"));
      } else {
        entry.classList.add("is-filtered-out");
        /* hide after the fade/scale transition ends to free space */
        setTimeout(() => {
          if (entry.classList.contains("is-filtered-out")) entry.classList.add("is-hidden");
        }, prefersReducedMotion ? 0 : 350);
      }
    });

    /* collapse any date group whose entries are all filtered out */
    timeline.querySelectorAll(".timeline-group").forEach((group) => {
      const hasVisible = Array.from(group.querySelectorAll(".timeline-entry"))
        .some((entry) => filterId === "all" || entry.getAttribute("data-pillar") === filterId);
      setTimeout(() => {
        group.classList.toggle("is-hidden", !hasVisible);
      }, prefersReducedMotion || hasVisible ? 0 : 350);
    });
  }

  setFilter = function (filterId) {
    const tabs = tabsWrap.querySelectorAll(".filter-tab");
    tabs.forEach((t) => {
      const active = t.getAttribute("data-filter") === filterId;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
      if (active) moveIndicator(t);
    });
    applyFilter(filterId);
  };

  tabsWrap.addEventListener("click", (e) => {
    const tab = e.target.closest(".filter-tab");
    if (tab) setFilter(tab.getAttribute("data-filter"));
  });

  /* position indicator under "All" on load (after layout settles) */
  requestAnimationFrame(() => moveIndicator(tabsWrap.querySelector(".filter-tab.is-active")));
  window.addEventListener("resize", () => {
    const active = tabsWrap.querySelector(".filter-tab.is-active");
    if (active) moveIndicator(active);
  });
})();

/* --------------------------------------------------------------------------
   Scroll reveal (#7) + stat counters (#8) via IntersectionObserver
   -------------------------------------------------------------------------- */
(function initObservers() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

  /* #8: count-up, once, rAF + ease-out cubic */
  function animateCount(numNode) {
    const target = parseInt(numNode.getAttribute("data-target"), 10);
    const duration = prefersReducedMotion ? 1 : 1400;
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      numNode.textContent = String(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".stat-number").forEach(animateCount);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statObserver.observe(document.getElementById("heroStats"));
  statObserver.observe(document.querySelector(".proof-stats"));
})();

/* --------------------------------------------------------------------------
   Button ripple (#12)
   -------------------------------------------------------------------------- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-ripple]");
  if (!btn || prefersReducedMotion) return;

  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = el("span", "ripple");
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
});

/* --------------------------------------------------------------------------
   Book detail modal (#14) — focus-trapped, Esc/backdrop/close-button, scroll lock
   -------------------------------------------------------------------------- */
let openModal;

(function initModal() {
  const backdrop = document.getElementById("modalBackdrop");
  const modal = document.getElementById("modal");
  const body = document.getElementById("modalBody");
  const closeBtn = document.getElementById("modalClose");
  let lastFocused = null;

  function bookModalHtml(book) {
    const pillar = PILLAR_BY_ID[book.pillar];
    const isAvailable = book.status === "available";
    const rel = relativeDays(book.date);

    /* Book #1 only: "inside the book" strip using its locked interior palette */
    const previewStrip = isAvailable ? `
      <p class="kicker" style="margin-top: 8px;">Inside The Book</p>
      <div class="book1-preview">
        <div class="preview-box preview-box--reality-check">
          <span class="preview-label">Reality Check</span>
          You do not have a willpower problem. You have a mismatched-template problem.
        </div>
        <div class="preview-box preview-box--do-this-now">
          <span class="preview-label">Do This Now</span>
          Pull 6–12 months of actual deposits. Find your floor, average, and ceiling.
        </div>
        <div class="preview-box preview-box--the-math">
          <span class="preview-label">The Math</span>
          $2,100 floor − $2,035 fixed expenses = $65 surplus, even in your worst month.
        </div>
      </div>` : "";

    return `
      <span class="pillar-tag" style="--pillar-accent: ${pillar.accent};">${escapeHtml(pillar.label)}</span>
      <h3 class="book-title" id="modalTitle">${escapeHtml(book.title)}</h3>
      ${book.subtitle ? `<p class="book-subtitle">${escapeHtml(book.subtitle)}</p>` : ""}
      <div class="book-meta">
        <span>For: <strong>${escapeHtml(book.reader)}</strong></span>
        <span>Length: <strong>${escapeHtml(book.length)}</strong></span>
        <span>${isAvailable ? "<strong>Available now</strong>" : `Planned: <strong>${formatPlannedDate(book.date)}${rel ? ` (${rel})` : ""}</strong>`}</span>
      </div>
      <p class="book-blurb">${escapeHtml(book.blurb || book.angle)}</p>
      ${previewStrip}
      <div class="available-cta-row">
        ${isAvailable
          ? `<a href="#" data-todo="amazon-link" class="btn btn-primary" data-ripple>Read The Playbook</a>`
          : `<a href="#newsletter" class="btn btn-primary" data-ripple data-close-modal>Notify Me On Release</a>`}
      </div>
    `;
  }

  openModal = function (bookId) {
    const book = BOOKS.find((b) => b.id === bookId);
    if (!book) return;

    lastFocused = document.activeElement;
    body.innerHTML = bookModalHtml(book);
    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
    modal.focus();

    body.querySelectorAll("[data-close-modal]").forEach((node) => {
      node.addEventListener("click", closeModal);
    });
  };

  function closeModal() {
    backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (!backdrop.classList.contains("is-open")) return;

    if (e.key === "Escape") {
      closeModal();
      return;
    }

    /* focus trap */
    if (e.key === "Tab") {
      const focusables = modal.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* "Look Inside" button on the available card */
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-book]");
    if (trigger) openModal(parseInt(trigger.getAttribute("data-open-book"), 10));
  });
})();

/* --------------------------------------------------------------------------
   Testimonial slider (#17) — auto-advance, pause on hover/focus, dots, swipe
   -------------------------------------------------------------------------- */
(function initSlider() {
  const slider = document.getElementById("testimonialSlider");
  const track = document.getElementById("testimonialTrack");
  const dotsWrap = document.getElementById("testimonialDots");
  let index = 0;
  let timer = null;

  TESTIMONIALS.forEach((t, i) => {
    const slide = el("figure", "testimonial", `
      <blockquote class="testimonial-quote">&ldquo;${escapeHtml(t.quote)}&rdquo;</blockquote>
      <figcaption class="testimonial-attrib">${escapeHtml(t.attrib)}</figcaption>
    `);
    track.appendChild(slide);

    const dot = el("button", "testimonial-dot");
    dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll(".testimonial-dot");

  function goTo(i) {
    index = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
  }

  function startAuto() {
    if (prefersReducedMotion) return;
    stopAuto();
    timer = setInterval(() => goTo(index + 1), 5000);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);
  slider.addEventListener("focusin", stopAuto);
  slider.addEventListener("focusout", startAuto);

  /* basic pointer swipe */
  let startX = null;
  slider.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
  });
  slider.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? index + 1 : index - 1);
    startX = null;
  });

  goTo(0);
  startAuto();
})();

/* --------------------------------------------------------------------------
   Newsletter micro-interaction (#19) — client-side validation only
   -------------------------------------------------------------------------- */
(function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  const input = document.getElementById("newsletterEmail");
  const submit = document.getElementById("newsletterSubmit");
  const label = submit.querySelector(".btn-label");
  const message = document.getElementById("newsletterMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      input.classList.remove("is-invalid");
      /* force reflow so the shake animation can re-trigger on repeat errors */
      void input.offsetWidth;
      input.classList.add("is-invalid");
      message.textContent = "That email doesn't look right. Fix it and go again.";
      return;
    }

    input.classList.remove("is-invalid");
    submit.classList.add("is-success");
    label.textContent = "✓ You're In";
    message.textContent = "Done. You'll hear from us when the next title ships — not before.";
    input.value = "";

    setTimeout(() => {
      submit.classList.remove("is-success");
      label.textContent = "Notify Me";
    }, 2600);
  });

  input.addEventListener("input", () => input.classList.remove("is-invalid"));
})();
