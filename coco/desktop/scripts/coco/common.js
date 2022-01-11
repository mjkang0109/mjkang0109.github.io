"use strict";

(function () {
  var CONSTANTS = {
    CLASS: {
      TOGGLE: 'on',
      LEFT_NAVIGATION: 'left-navigation',
      IS_SEARCH: 'is-search'
    }
  };
  var classes = CONSTANTS.CLASS;
  var toggleClass = classes.TOGGLE,
      leftNavigation = classes.LEFT_NAVIGATION,
      isSearch = classes.IS_SEARCH;

  var visualSwiper = function visualSwiper() {
    var swiper = new Swiper('.visual-wrapper', {
      direction: 'horizontal',
      wrapperClass: 'visual-banners',
      slideClass: 'swiper',
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: '.visual-pagination',
        type: 'bullets'
      },
      loop: true
    });
  };

  var fixSwiper = function fixSwiper() {
    var swiper = new Swiper('.swiper-item-wrapper', {
      direction: 'horizontal',
      wrapperClass: 'swiper-items',
      slideClass: 'swiper-item',
      slidesPerView: 'auto'
    });
  };

  var onInit = function onInit() {
    visualSwiper();
    fixSwiper();
  };

  if (document.readyState === 'complete') {
    onInit();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', onInit);
  }
})();