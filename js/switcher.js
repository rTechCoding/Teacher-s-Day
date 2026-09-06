/* ==========================================================================
   Style Switcher Drawer & Theme Engine (js/switcher.js)
   Created & Designed by rTechCoding
   ========================================================================== */

(function () {
  "use strict";

  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  /* --------------------------------------------------------------------------
     1. Style Switcher Drawer Slide Toggle Logic (Global & Event Attached)
     -------------------------------------------------------------------------- */
  function openDrawer() {
    const drawer = $("#styleSwitcherDrawer") || $(".style-switcher-drawer");
    const overlay = $("#drawerOverlay") || $(".drawer-overlay");
    if (drawer) drawer.classList.add("open");
    if (overlay) overlay.classList.add("open");
  }

  function closeDrawer() {
    const drawer = $("#styleSwitcherDrawer") || $(".style-switcher-drawer");
    const overlay = $("#drawerOverlay") || $(".drawer-overlay");
    if (drawer) drawer.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
  }

  function toggleDrawer() {
    const drawer = $("#styleSwitcherDrawer") || $(".style-switcher-drawer");
    if (drawer && drawer.classList.contains("open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  // Attach to window object for fail-safe click handlers
  window.openStyleDrawer = openDrawer;
  window.closeStyleDrawer = closeDrawer;
  window.toggleStyleDrawer = toggleDrawer;

  function initDrawerToggle() {
    const toggleBtn = $("#styleSwitcherToggle") || $(".style-switcher-toggle");
    const overlay = $("#drawerOverlay") || $(".drawer-overlay");
    const closeBtn = $("#drawerCloseBtn");

    if (toggleBtn) {
      toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleDrawer();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeDrawer();
      });
    }

    if (overlay) {
      overlay.addEventListener("click", (e) => {
        closeDrawer();
      });
    }

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDrawer();
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Primary Theme Color Swatch Drop Switcher
     -------------------------------------------------------------------------- */
  function initColorSwatches() {
    const swatches = $$(".drop-swatch");
    const savedColor = localStorage.getItem("primaryColor") || "#7444ed";

    // Set saved initial color
    document.documentElement.style.setProperty("--purple", savedColor);

    swatches.forEach(swatch => {
      const color = swatch.dataset.color;
      if (color === savedColor) {
        swatches.forEach(s => s.classList.remove("active"));
        swatch.classList.add("active");
      }

      swatch.addEventListener("click", () => {
        swatches.forEach(s => s.classList.remove("active"));
        swatch.classList.add("active");

        document.documentElement.style.setProperty("--purple", color);
        localStorage.setItem("primaryColor", color);

        if (window.showToast) {
          const title = swatch.getAttribute("title") || "Theme";
          window.showToast(`Primary theme color set to ${title}! 🎨`);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Body Skin (Light Mode / Dark Mode Radios)
     -------------------------------------------------------------------------- */
  function initBodySkin() {
    const lightRadio = $("#skinLightRadio");
    const darkRadio = $("#skinDarkRadio");
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    if (isDark) {
      document.body.classList.add("dark-mode");
      if (darkRadio) darkRadio.checked = true;
    } else {
      document.body.classList.remove("dark-mode");
      if (lightRadio) lightRadio.checked = true;
    }

    if (lightRadio) {
      lightRadio.addEventListener("change", () => {
        if (lightRadio.checked) {
          document.body.classList.remove("dark-mode");
          localStorage.setItem("theme", "light");
          if (window.showToast) window.showToast("Light Mode Enabled ☀️");
        }
      });
    }

    if (darkRadio) {
      darkRadio.addEventListener("change", () => {
        if (darkRadio.checked) {
          document.body.classList.add("dark-mode");
          localStorage.setItem("theme", "dark");
          if (window.showToast) window.showToast("Dark Mode Enabled 🌙");
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     4. Layout Style (Wide / Boxed Radios)
     -------------------------------------------------------------------------- */
  function initLayoutStyle() {
    const wideRadio = $("#layoutWideRadio");
    const boxedRadio = $("#layoutBoxedRadio");
    const savedLayout = localStorage.getItem("layoutStyle") || "wide";

    if (savedLayout === "boxed") {
      document.body.classList.add("boxed-layout");
      if (boxedRadio) boxedRadio.checked = true;
    } else {
      document.body.classList.remove("boxed-layout");
      if (wideRadio) wideRadio.checked = true;
    }

    if (wideRadio) {
      wideRadio.addEventListener("change", () => {
        if (wideRadio.checked) {
          document.body.classList.remove("boxed-layout");
          localStorage.setItem("layoutStyle", "wide");
          if (window.showToast) window.showToast("Wide Layout Applied 📐");
        }
      });
    }

    if (boxedRadio) {
      boxedRadio.addEventListener("change", () => {
        if (boxedRadio.checked) {
          document.body.classList.add("boxed-layout");
          localStorage.setItem("layoutStyle", "boxed");
          if (window.showToast) window.showToast("Boxed Layout Applied 📦");
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     5. Section Separator Style Radios
     -------------------------------------------------------------------------- */
  function initSeparators() {
    const sepRadios = $$('input[name="separatorRadio"]');
    const savedSep = localStorage.getItem("separatorStyle") || "solid";

    sepRadios.forEach(radio => {
      if (radio.value === savedSep) radio.checked = true;

      radio.addEventListener("change", () => {
        const val = radio.value;
        localStorage.setItem("separatorStyle", val);
        document.body.dataset.separator = val;
        if (window.showToast) window.showToast(`Separator style updated: ${val.toUpperCase()} ✨`);
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. Background Canvas Animation Preset Cards
     -------------------------------------------------------------------------- */
  function initAnimCards() {
    const animCards = $$(".anim-card");
    const savedAnim = localStorage.getItem("bgAnimPreset") || "mesh";

    animCards.forEach(card => {
      const mode = card.dataset.anim;
      if (mode === savedAnim) {
        animCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
      }

      card.addEventListener("click", () => {
        animCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        localStorage.setItem("bgAnimPreset", mode);
        if (window.currentBgAnimMode !== undefined) {
          window.currentBgAnimMode = mode;
        }
        if (window.showToast) {
          const label = card.querySelector(".anim-label") ? card.querySelector(".anim-label").textContent : mode;
          window.showToast(`Background animation set to ${label}! 🎨`);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. Instant Initialization (Bypasses DOM Load Delay)
     -------------------------------------------------------------------------- */
  function startSwitcher() {
    initDrawerToggle();
    initColorSwatches();
    initBodySkin();
    initLayoutStyle();
    initSeparators();
    initAnimCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startSwitcher);
  } else {
    startSwitcher();
  }

})();
