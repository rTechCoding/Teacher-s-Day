/* ==========================================================================
   Full Site Security & Content Protection Engine (js/security.js)
   Blocks Right-Click, Inspect Element, Code Copying, DevTools, & Shortcuts
   SILENT BACKGROUND PROTECTION (No blocking modal popups)
   ========================================================================== */

(function () {
  "use strict";

  // Check if target is an interactive form element (allow typing)
  function isInteractiveElement(target) {
    if (!target) return false;
    const tagName = target.tagName ? target.tagName.toLowerCase() : "";
    return tagName === "input" || tagName === "textarea" || target.isContentEditable;
  }

  // Toast Notification Helper
  function notifySecurity(msg) {
    if (window.showToast) {
      window.showToast(msg);
    } else {
      console.warn(msg);
    }
  }

  /* --------------------------------------------------------------------------
     1. Disable Right-Click Context Menu
     -------------------------------------------------------------------------- */
  document.addEventListener("contextmenu", (e) => {
    if (!isInteractiveElement(e.target)) {
      e.preventDefault();
      notifySecurity("Right-click & Inspect are disabled for security 🔒");
      return false;
    }
  });

  /* --------------------------------------------------------------------------
     2. Disable Code Copying, Cutting, Dragging, & Selection
     -------------------------------------------------------------------------- */
  document.addEventListener("copy", (e) => {
    if (!isInteractiveElement(e.target)) {
      e.preventDefault();
      notifySecurity("Code copying is restricted! 🔒");
      return false;
    }
  });

  document.addEventListener("cut", (e) => {
    if (!isInteractiveElement(e.target)) {
      e.preventDefault();
      notifySecurity("Code cutting is restricted! 🔒");
      return false;
    }
  });

  document.addEventListener("dragstart", (e) => {
    if (!isInteractiveElement(e.target)) {
      e.preventDefault();
      return false;
    }
  });

  document.addEventListener("selectstart", (e) => {
    if (!isInteractiveElement(e.target)) {
      const tagName = e.target.tagName ? e.target.tagName.toLowerCase() : "";
      if (tagName !== "button" && tagName !== "a" && tagName !== "label") {
        e.preventDefault();
        return false;
      }
    }
  });

  /* --------------------------------------------------------------------------
     3. Block Inspect Element & Developer Keyboard Shortcuts (Silent Toast)
     -------------------------------------------------------------------------- */
  document.addEventListener("keydown", (e) => {
    const key = e.key ? e.key.toLowerCase() : "";
    const keyCode = e.keyCode || e.which;

    // F12 key (Inspect DevTools)
    if (key === "f12" || keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      notifySecurity("Developer Tools (F12) are blocked 🔒");
      return false;
    }

    // PrintScreen / PrtScn Key
    if (key === "printscreen" || keyCode === 44 || key === "prntscrn") {
      e.preventDefault();
      notifySecurity("Screenshot capture attempt detected 🔒");
      return false;
    }

    // Ctrl + Shift + I / Cmd + Option + I (Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === "i" || keyCode === 73)) {
      e.preventDefault();
      notifySecurity("Inspect Element shortcut is blocked 🔒");
      return false;
    }

    // Ctrl + Shift + J / Cmd + Option + J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === "j" || keyCode === 74)) {
      e.preventDefault();
      notifySecurity("Developer Console is blocked 🔒");
      return false;
    }

    // Ctrl + Shift + C / Cmd + Option + C (Inspect Element Mode)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === "c" || keyCode === 67)) {
      e.preventDefault();
      notifySecurity("Element Selection mode is blocked 🔒");
      return false;
    }

    // Ctrl + U / Cmd + Option + U (View Page Source)
    if ((e.ctrlKey || e.metaKey) && (key === "u" || keyCode === 85)) {
      e.preventDefault();
      notifySecurity("View Source Code is blocked 🔒");
      return false;
    }

    // Ctrl + S / Cmd + S (Save Webpage)
    if ((e.ctrlKey || e.metaKey) && (key === "s" || keyCode === 83)) {
      e.preventDefault();
      notifySecurity("Saving webpage code is restricted 🔒");
      return false;
    }

    // Ctrl + P / Cmd + P (Print Page)
    if ((e.ctrlKey || e.metaKey) && (key === "p" || keyCode === 80)) {
      e.preventDefault();
      notifySecurity("Printing webpage is restricted 🔒");
      return false;
    }
  });

})();
