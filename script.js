// Enable smooth scrolling only after page load
window.addEventListener("load", () => {
  document.documentElement.classList.add("enable-smooth-scroll");
});

const revealElements = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("revealed"));
} else {
  const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    document.body.classList.toggle("nav-open", !isExpanded);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (document.body.classList.contains("nav-open")) {
      document.body.classList.remove("nav-open");
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});

// Close mobile nav when clicking outside
document.addEventListener("click", (event) => {
  if (!document.body.classList.contains("nav-open")) return;

  const nav = document.querySelector(".site-nav");
  const isInsideNav = nav && nav.contains(event.target);
  const isToggle = navToggle && navToggle.contains(event.target);

  if (!isInsideNav && !isToggle) {
    document.body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  }
});
