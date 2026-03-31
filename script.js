(function () {
  "use strict";

  const doc = document.documentElement;
  const body = document.body;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const samePageLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
  const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
  const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
  const spotlightCards = Array.from(document.querySelectorAll("[data-spotlight]"));

  if (!prefersReducedMotion) {
    window.addEventListener("load", function () {
      doc.classList.add("enable-smooth-scroll");
    });
  }

  function closeNav() {
    body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  }

  function openNav() {
    body.classList.add("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "true");
    }
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  document.addEventListener("click", function (event) {
    if (!body.classList.contains("nav-open")) return;
    const clickedInsideNav = nav && nav.contains(event.target);
    const clickedToggle = navToggle && navToggle.contains(event.target);
    if (!clickedInsideNav && !clickedToggle) {
      closeNav();
    }
  });

  samePageLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    link.addEventListener("click", function (event) {
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const offset = header ? header.offsetHeight + 16 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      closeNav();
      history.replaceState(null, "", href);
    });
  });

  if (header) {
    let ticking = false;

    function updateHeaderState() {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const progress = Math.min(100, (scrollTop / maxScroll) * 100);
      doc.style.setProperty("--scroll-progress", progress.toFixed(2) + "%");
      header.classList.toggle("scrolled", scrollTop > 24);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderState);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHeaderState();
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
      element.classList.add("revealed");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -48px 0px",
      }
    );

    revealElements.forEach(function (element) {
      const section = element.closest("section");
      const siblings = section ? Array.from(section.querySelectorAll("[data-reveal]")) : [];
      const index = siblings.indexOf(element);
      element.style.setProperty("--reveal-delay", Math.max(0, index) * 70 + "ms");
      revealObserver.observe(element);
    });
  }

  if (navLinks.length && "IntersectionObserver" in window) {
    const sections = navLinks
      .map(function (link) {
        const href = link.getAttribute("href");
        return href ? document.querySelector(href) : null;
      })
      .filter(Boolean);

    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const activeId = "#" + entry.target.id;
          navLinks.forEach(function (link) {
            const isActive = link.getAttribute("href") === activeId;
            if (isActive) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        threshold: 0.45,
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  if (!prefersReducedMotion) {
    spotlightCards.forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty("--spotlight-x", x + "px");
        card.style.setProperty("--spotlight-y", y + "px");
      });
    });
  }
})();
