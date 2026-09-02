const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

/* FILTRES */
const filterButtons = document.querySelectorAll(".filter");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach(item => {
      const matches =
        filter === "all" ||
        item.dataset.category === filter;

      item.classList.toggle("hidden", !matches);
    });
  });
});

/* LIGHTBOX */
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-photo img");
const lightboxTitle = document.querySelector(".lightbox-caption strong");
const lightboxSubtitle = document.querySelector(".lightbox-caption span");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let visibleItems = [];
let currentIndex = 0;

function getVisibleItems() {
  return [...galleryItems].filter(item => !item.classList.contains("hidden"));
}

function updateLightbox() {
  const item = visibleItems[currentIndex];
  if (!item) return;

  const img = item.querySelector("img");
  const title = item.querySelector("figcaption strong")?.textContent || "";
  const subtitle = item.querySelector("figcaption span")?.textContent || "";

  lightboxImage.src = img.getAttribute("src");
  lightboxImage.alt = img.getAttribute("alt") || title;
  lightboxTitle.textContent = title;
  lightboxSubtitle.textContent = subtitle;
}

function openLightbox(item) {
  visibleItems = getVisibleItems();
  currentIndex = visibleItems.indexOf(item);

  updateLightbox();

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

function changeImage(direction) {
  if (!visibleItems.length) return;

  currentIndex =
    (currentIndex + direction + visibleItems.length) %
    visibleItems.length;

  updateLightbox();
}

galleryItems.forEach(item => {
  item.addEventListener("click", () => openLightbox(item));
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => changeImage(-1));
lightboxNext?.addEventListener("click", () => changeImage(1));

lightbox?.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (!lightbox?.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") changeImage(-1);
  if (event.key === "ArrowRight") changeImage(1);
});

/* RETOUR EN HAUT */
const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", () => {
  backTop?.classList.toggle("visible", window.scrollY > 500);
});

backTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
