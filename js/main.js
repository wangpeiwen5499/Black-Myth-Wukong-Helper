/* ==========================================================================
   Black Myth: Wukong Guide - Shared JavaScript
   Language toggle, mobile hamburger menu, navbar scroll shadow
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initLanguageToggle();
    initMobileMenu();
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
      lang = browserLang.indexOf('zh') === 0 ? 'zh' : 'en';
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
    localStorage.setItem('bmw-lang', lang);
    document.documentElement.lang = lang;

    var elements = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el.getAttribute('data-lang') === lang) {
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
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('lang-toggle__btn--active');
      } else {
        btn.classList.remove('lang-toggle__btn--active');
      }
    }
  }

  /* ------------------------------------------------------------------------
     Mobile Hamburger Menu
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.navbar__links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('hamburger--open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('hamburger--open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* ------------------------------------------------------------------------
     Navbar Scroll Shadow
     ------------------------------------------------------------------------ */
  function initNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 10) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
