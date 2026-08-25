document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".page-loader");
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const slides = [...document.querySelectorAll(".hero-slide")];
  const current = document.querySelector("#slideCurrent");
  const next = document.querySelector("#nextSlide");
  const prev = document.querySelector("#prevSlide");
  const backTop = document.querySelector("#backTop");
  const year = document.querySelector("#year");

  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("loaded"), 250);
  });

  year.textContent = new Date().getFullYear();

  // Mobile menu
  function closeMenu() {
    nav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

  // Hero slider
  let index = 0;
  let timer;

  function showSlide(nextIndex) {
    slides[index].classList.remove("is-active");
    index = (nextIndex + slides.length) % slides.length;
    slides[index].classList.add("is-active");
    current.textContent = String(index + 1).padStart(2, "0");
  }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(() => showSlide(index + 1), 7000);
  }

  next.addEventListener("click", () => {
    showSlide(index + 1);
    restartTimer();
  });

  prev.addEventListener("click", () => {
    showSlide(index - 1);
    restartTimer();
  });

  restartTimer();

  // Reveal on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Header + back-to-top
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle("scrolled", scrolled);
    backTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });

  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Graceful placeholder handling:
  // All image paths intentionally use "mettrePhotoIci".
  document.querySelectorAll(".image-box img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.opacity = "0";
    });
  });
});
