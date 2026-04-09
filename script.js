const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleText = document.querySelector(".theme-toggle-text");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const progressFills = document.querySelectorAll(".progress-fill");
const tiltCards = document.querySelectorAll(".tilt-card");
const contactForm = document.querySelector(".contact-form");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  body.classList.add("dark-mode");
}

const syncThemeLabel = () => {
  if (!themeToggleText) return;
  themeToggleText.textContent = body.classList.contains("dark-mode") ? "Light" : "Dark";
};

syncThemeLabel();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("portfolio-theme", body.classList.contains("dark-mode") ? "dark" : "light");
    syncThemeLabel();
  });
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");

      if (entry.target.classList.contains("skills-bars")) {
        progressFills.forEach((fill) => {
          fill.style.width = fill.dataset.width || "0%";
        });
      }

      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button");

    if (button) {
      const originalText = button.textContent;
      button.textContent = "Message Ready";

      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1800);
    }

    contactForm.reset();
  });
}
