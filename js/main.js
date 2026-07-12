/* ============================================================
   Computer Camp Website — shared behavior
   - Scroll-reveal animations (IntersectionObserver)
   - Staggered reveals for groups
   - Sticky nav background on scroll
   - Mobile nav toggle
   - Active nav link highlighting
   - Smooth fade page transitions
   - FAQ accordion
   No dependencies / no build step required.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Page transition: fade in on load ---------- */
  window.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loaded");
  });

  /* ---------- Page transition: fade out before navigating ---------- */
  // Intercept clicks on internal links so we can fade out first.
  document.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (!link) return;

    var href = link.getAttribute("href");
    if (!href) return;

    var isInternalPage =
      href.endsWith(".html") ||
      href === "index.html" ||
      href === "/" ||
      (href.startsWith("./") && href.endsWith(".html"));

    var opensNewTab = link.target === "_blank";
    var isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    var isAnchor = href.startsWith("#");
    var isExternal = href.startsWith("http") || href.startsWith("mailto:");

    if (isInternalPage && !opensNewTab && !isModified && !isAnchor && !isExternal) {
      e.preventDefault();
      document.body.classList.add("is-leaving");
      window.setTimeout(function () {
        window.location.href = href;
      }, 450);
    }
  });

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var revealEls = document.querySelectorAll("[data-reveal], [data-reveal-group]");

    if (!("IntersectionObserver" in window)) {
      // Fallback: just show everything.
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          var el = entry.target;

          // Staggered children for groups.
          if (el.hasAttribute("data-reveal-group")) {
            var children = el.children;
            for (var i = 0; i < children.length; i++) {
              (function (child, index) {
                child.style.transitionDelay = index * 90 + "ms";
              })(children[i], i);
            }
          }

          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Sticky nav background ---------- */
  function initNavScroll() {
    var nav = document.querySelector(".nav");
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 20) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav__toggle");
    var links = document.querySelector(".nav__links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });

    // Close menu when a link is tapped.
    links.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link")) {
        toggle.classList.remove("open");
        links.classList.remove("open");
      }
    });
  }

  /* ---------- Active nav link ---------- */
  function initActiveLink() {
    var current = window.location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".nav__link");
    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === current || (current === "" && href === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    var items = document.querySelectorAll(".faq__item");
    items.forEach(function (item) {
      var q = item.querySelector(".faq__q");
      var a = item.querySelector(".faq__a");
      if (!q || !a) return;

      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        if (isOpen) {
          item.classList.remove("open");
          a.style.maxHeight = null;
        } else {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- Team page showcase (no page scroll) ---------- */
  function initTeamShowcase() {
    var slides = document.querySelectorAll(".team-slide");
    var prevBtn = document.querySelector("[data-team-prev]");
    var nextBtn = document.querySelector("[data-team-next]");
    var counter = document.querySelector("[data-team-counter]");
    if (!slides.length || !prevBtn || !nextBtn || !counter) return;

    var current = 0;

    function showSlide(index) {
      slides[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      counter.textContent = current + 1 + " / " + slides.length;
    }

    prevBtn.addEventListener("click", function () {
      showSlide(current - 1);
    });

    nextBtn.addEventListener("click", function () {
      showSlide(current + 1);
    });

    document.addEventListener("keydown", function (e) {
      if (!document.body.classList.contains("team-page")) return;
      if (e.key === "ArrowLeft") showSlide(current - 1);
      if (e.key === "ArrowRight") showSlide(current + 1);
    });
  }

  /* ---------- Init all ---------- */
  function init() {
    initReveal();
    initNavScroll();
    initMobileNav();
    initActiveLink();
    initFaq();
    initTeamShowcase();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
