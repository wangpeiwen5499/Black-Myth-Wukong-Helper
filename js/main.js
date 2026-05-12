/* ==========================================================================
   Black Myth: Wukong Guide - Shared JavaScript
   Language toggle, mobile hamburger menu, navbar scroll shadow
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initLanguageToggle();
    initMobileMenu();
    initTocToggle();
    initNavbarScroll();
  });

  /* ------------------------------------------------------------------------
     Language Toggle
     ------------------------------------------------------------------------ */
  function initLanguageToggle() {
    var saved = localStorage.getItem('bmw-lang');
    var lang;

    if (saved) {
      lang = saved;
    } else {
      var browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
      lang = browserLang.indexOf('zh') === 0 ? 'zh-CN' : 'en';
    }

    setLanguage(lang);

    var buttons = document.querySelectorAll('.lang-toggle__btn');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var selectedLang = this.getAttribute('data-lang');
        if (selectedLang) {
          setLanguage(selectedLang);
        }
      });
    }
  }

  function setLanguage(lang) {
    // Normalize: treat 'zh' as 'zh-CN' for consistency
    var normalizedLang = lang.indexOf('zh') === 0 ? 'zh-CN' : 'en';

    localStorage.setItem('bmw-lang', normalizedLang);
    document.documentElement.lang = normalizedLang;

    var elements = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el.getAttribute('data-lang') === normalizedLang) {
        el.style.display = '';
        el.setAttribute('aria-hidden', 'false');
      } else {
        el.style.display = 'none';
        el.setAttribute('aria-hidden', 'true');
      }
    }

    var buttons = document.querySelectorAll('.lang-toggle__btn');
    for (var j = 0; j < buttons.length; j++) {
      var btn = buttons[j];
      var btnLang = btn.getAttribute('data-lang');
      // Match 'zh' button to 'zh-CN' content
      var isMatch = btnLang === normalizedLang ||
        (btnLang === 'zh' && normalizedLang === 'zh-CN');
      if (isMatch) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  }

  /* ------------------------------------------------------------------------
     Mobile Hamburger Menu
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    var hamburger = document.querySelector('.navbar__hamburger');
    var navLinks = document.querySelector('.navbar__links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* ------------------------------------------------------------------------
     Walkthrough TOC Toggle (mobile)
     ------------------------------------------------------------------------ */
  function initTocToggle() {
    var tocToggle = document.querySelector('.toc-toggle');
    var tocSidebar = document.querySelector('.toc-sidebar');
    if (!tocToggle || !tocSidebar) return;

    tocToggle.addEventListener('click', function () {
      var isOpen = tocSidebar.classList.toggle('open');
      tocToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ------------------------------------------------------------------------
     Navbar Scroll Shadow
     ------------------------------------------------------------------------ */
  function initNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
