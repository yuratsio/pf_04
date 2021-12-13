'use strict';

window.addEventListener('DOMContentLoaded', () => {
  // =============================
  // common
  // =============================
  const body = document.querySelector('body');
  
  // =============================
  // loading
  // =============================
  window.onload = function() {
    const loader = document.querySelector('.loading');
    loader.classList.add('loaded');
  }

  // =============================
  // header move
  // =============================
  const header = document.querySelector('#header');
  const headerHeight = header.clientHeight;
  const fv = document.querySelector('.fv');
  const fvheight = fv.clientHeight;
  const headerMovePoint = headerHeight + fvheight;
  
  window.addEventListener('scroll', () => {
    const windowTop = window.pageYOffset;
    if(headerMovePoint < windowTop) {
      header.classList.add('header--move');
    } else {
      header.classList.remove('header--move');
    }
  });
  
  // =============================
  // hamburger menu
  // =============================
  const headerSmNav = document.querySelector('.header__sm-nav');
  const hamburgerMenu = document.querySelector('.header__hamburger');
  const closeButton = document.querySelector('.header__sm-nav-button');
  const smNavItems = document.querySelectorAll('.header__sm-nav-item');

  hamburgerMenu.addEventListener('click', () => {
    headerSmNav.classList.add('header__sm-nav--open');
    body.style.overflowY = 'hidden';
  });

  closeButton.addEventListener('click', () => {
    closeSmNav();
  });

  smNavItems.forEach(smNavItem => {
    smNavItem.addEventListener('click', () => {
      closeSmNav();
    });
  });

  
  function closeSmNav() {
    headerSmNav.classList.remove('header__sm-nav--open');
    body.style.overflowY = 'auto';
  }
  // =============================
  // cover slide
  // =============================
  const coverSlides = document.querySelectorAll('.cover-slide');
  const options = {
    threshold: .2,
  }
  const coverSlideObserver = new IntersectionObserver(callback, options);

  coverSlides.forEach(coverSlide => {
    coverSlideObserver.observe(coverSlide);
  });

  function callback(entrys, obs) {
    entrys.forEach(entry => {
      if(!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('cover-slide--active');
      obs.unobserve(entry.target);
    });
  }
  // =============================
  // fade in
  // =============================
  const fadeInTargets = document.querySelectorAll('.js-fade-in');
  const fadeInObserver = new IntersectionObserver(fadeIn, options);

  fadeInTargets.forEach(fadeInTarget => {
    fadeInObserver.observe(fadeInTarget);
  });

  function fadeIn(entrys, obs) {
    entrys.forEach(entry => {
      if(!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('js-fade-in--active');
      obs.unobserve(entry.target);
    });
  }

  // =============================
  // smooth scroll
  // =============================
  const ankerLinks = document.querySelectorAll('a[href^="#"]');
  ankerLinks.forEach(ankerLink => {
    ankerLink.addEventListener('click', (e) => {
      e.preventDefault();
      const elementTop = window.pageYOffset + document.querySelector(ankerLink.hash).getBoundingClientRect().top;
      const headerHeight = header.clientHeight;
      window.scroll({
        top: elementTop - headerHeight,
        behavior: "smooth",
      });
    });
  });
});
