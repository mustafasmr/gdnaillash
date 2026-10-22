/**
 * GAMZE DURMAZ NAIL STUDIO - CORE APPLICATION LOGIC
 * Theme management (Always defaults to Light White Marble), navigation, FAQ & UI interactions (No Emojis)
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initHeaderScroll();
  initFAQ();
  setCurrentYear();
});

// FAQ Accordion Handler
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;
    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach(i => {
        i.classList.remove("active");
        const icon = i.querySelector(".faq-icon");
        if (icon) icon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
      });
      if (!isActive) {
        item.classList.add("active");
        const icon = item.querySelector(".faq-icon");
        if (icon) icon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      }
    });
  });
}

// Theme Toggle (Always opens in Light White Marble Theme as requested)
function initTheme() {
  const themeBtn = document.getElementById("themeToggleBtn");
  // Always open in Light theme
  let currentTheme = "light";
  document.documentElement.setAttribute("data-theme", "light");
  sessionStorage.removeItem("gdn_theme");
  localStorage.removeItem("gdn_theme");
  updateThemeIcon("light");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const active = document.documentElement.getAttribute("data-theme") || "light";
      currentTheme = active === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", currentTheme);
      updateThemeIcon(currentTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const iconSpan = document.getElementById("themeIcon");
  if (!iconSpan) return;

  // Use clean SVGs instead of emojis
  if (theme === "dark") {
    // Show Sun icon to switch to light
    iconSpan.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    iconSpan.setAttribute("title", "Aydınlık Mermer Moduna Geç");
  } else {
    // Show Moon icon to switch to dark
    iconSpan.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    iconSpan.setAttribute("title", "Karanlık Moduna Geç");
  }
}

// Header Scroll State
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

// Navigation & Mobile Menu
function initNavigation() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("mobileDrawerCloseBtn");
  const navBackdrop = document.getElementById("navBackdrop");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-link, .mobile-drawer-cta a, .concierge-insta-link");

  function openMenu() {
    if (!navLinks) return;
    navLinks.classList.add("mobile-open");
    navLinks.setAttribute("aria-hidden", "false");
    if (navBackdrop) navBackdrop.classList.add("active");
    document.body.classList.add("menu-open");
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "true");
      menuBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    }
  }

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove("mobile-open");
    navLinks.setAttribute("aria-hidden", "true");
    if (navBackdrop) navBackdrop.classList.remove("active");
    document.body.classList.remove("menu-open");
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks && navLinks.classList.contains("mobile-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMenu);
  }

  links.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

  // Active Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add("active");
        } else {
          navItem.classList.remove("active");
        }
      }
    });
  });
}

function setCurrentYear() {
  const yearElem = document.getElementById("currentYear");
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}
