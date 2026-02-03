(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Smooth scroll: enable only when not reduced-motion ---
  if (!prefersReducedMotion) {
    window.addEventListener("load", function () {
      document.documentElement.classList.add("enable-smooth-scroll");
    });
  }

  // --- Header scroll state (single throttled listener; no animation, just class) ---
  const header = document.querySelector(".site-header");
  if (header) {
    let ticking = false;
    const SCROLL_THRESHOLD = 24;

    function updateHeaderScrolled() {
      header.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateHeaderScrolled);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHeaderScrolled();
  }

  // --- Scroll reveal with IntersectionObserver; optional stagger ---
  const revealElements = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (el) {
      el.classList.add("revealed");
    });
  } else {
    const staggerStep = 50; // ms between siblings in same section
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("revealed");
          observer.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el, index) {
      const section = el.closest("section");
      const siblingsInSection = section ? section.querySelectorAll("[data-reveal]") : [];
      const siblingIndex = section ? Array.from(siblingsInSection).indexOf(el) : 0;
      const delayMs = siblingIndex * staggerStep;
      el.style.setProperty("--reveal-delay", delayMs + "ms");
      revealObserver.observe(el);
    });
  }

  // --- Anchor link smooth scroll with header offset (no overlap) ---
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === "#") return;

    link.addEventListener("click", function (e) {
      const id = href.slice(1);
      const target = id ? document.getElementById(id) : document.getElementById("top");
      if (!target) return;

      e.preventDefault();
      const headerEl = document.querySelector(".site-header");
      const offset = headerEl ? headerEl.offsetHeight + 16 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      if (target.id) {
        try {
          target.focus({ preventScroll: true });
        } catch (_) {}
      }
    });
  });

  // --- Mobile nav ---
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".site-nav a");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      document.body.classList.toggle("nav-open", !isExpanded);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (!document.body.classList.contains("nav-open")) return;
    const nav = document.querySelector(".site-nav");
    const isInsideNav = nav && nav.contains(event.target);
    const isToggle = navToggle && navToggle.contains(event.target);
    if (!isInsideNav && !isToggle) {
      document.body.classList.remove("nav-open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }
  });
})();
