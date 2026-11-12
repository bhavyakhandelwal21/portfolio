const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      nav.classList.remove("is-open");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

/* Scroll reveal */
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)) return;

  const elements = document.querySelectorAll(
    ".intro-grid > *, .section-heading, .project-card, .experience-card, " +
    ".skill-group, .credential-item, .education-content, .contact-main, .contact-side"
  );

  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting, boundingClientRect } of entries) {
      if (isIntersecting) {
        if (!target.classList.contains("scroll-reveal-pending")) continue;
        target.classList.remove("scroll-reveal-pending");
        target.classList.add("scroll-reveal-playing");
      } else if (boundingClientRect.top >= window.innerHeight) {
        target.classList.remove("scroll-reveal-playing");
        target.classList.add("scroll-reveal-pending");
      }
    }
  });

  for (const element of elements) {
    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.classList.add("scroll-reveal-pending");
    }
    observer.observe(element);
  }
})();

/* Screenshot viewer */
const screenshotViewer = document.querySelector("#screenshot-viewer");
if (typeof screenshotViewer?.showModal === "function") {
  const screenshotTitle = screenshotViewer.querySelector("#screenshot-title");
  const fullScreenshot = screenshotViewer.querySelector(".screenshot-full");
  const originalScreenshot = screenshotViewer.querySelector(".screenshot-original");

  for (const link of document.querySelectorAll("[data-screenshot]")) {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const thumbnail = link.querySelector("img");
      screenshotTitle.textContent = thumbnail.alt;
      fullScreenshot.alt = thumbnail.alt;
      fullScreenshot.src = link.href;
      originalScreenshot.href = link.href;
      screenshotViewer.showModal();
    });
  }
}
