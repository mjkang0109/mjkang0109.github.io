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
    var swiper = new Swiper('.fix-item-wrapper', {
      direction: 'horizontal',
      wrapperClass: 'fix-items',
      slideClass: 'item',
      slidesPerView: 'auto'
    });
  };

  var bindLeftCategory = function bindLeftCategory(_ref) {
    var trigger = _ref.trigger,
        el = _ref.el;

    if (!trigger) {
      return;
    }

    if (!el) {
      return;
    }

    var btnClose = el.querySelectorAll('.btn-close');

    var close = function close() {
      el.classList.remove(toggleClass);
      btnClose.forEach(function (btn) {
        btn.removeEventListener('click', close);
      });
      trigger.addEventListener('click', open);
    };

    var open = function open() {
      el.classList.add(toggleClass);
      trigger.removeEventListener('click', open);
      btnClose.forEach(function (btn) {
        btn.addEventListener('click', close);
      });
    };

    var windowHandler = function windowHandler(e) {
      if (e.target.className.indexOf(leftNavigation) > -1) {
        close();
      }
    };

    trigger.addEventListener('click', open);
    el.addEventListener('click', windowHandler);
  };

  var bindSearch = function bindSearch(_ref2) {
    var trigger = _ref2.trigger,
        el = _ref2.el;

    if (!trigger) {
      return;
    }

    if (!el) {
      return;
    }

    var setSearch = function setSearch() {
      trigger.parentNode.classList.add(isSearch);
      el.focus();
      window.addEventListener('click', windowHandler);
    };

    var hideSearch = function hideSearch() {
      trigger.parentNode.classList.remove(isSearch);
      window.removeEventListener('click', windowHandler);
    };

    var windowHandler = function windowHandler(e) {
      e.preventDefault();
      var returnClasses = ['btn-search', 'input-search', 'btn-toggle-search'];

      if (returnClasses.indexOf(e.target.className) === -1) {
        return hideSearch();
      }
    };

    trigger.addEventListener('click', setSearch);
  };

  var bindTab = function bindTab() {
    var tabs = document.querySelectorAll('[role="tab"]');

    var changeTabs = function changeTabs(e) {
      var target = e.target;
      var parent = target.parentNode;
      var grandparent = parent.parentNode;
      parent.querySelectorAll('[aria-selected="true"]').forEach(function (t) {
        t.classList.remove(toggleClass);
        t.setAttribute('aria-selected', false);
      });
      target.setAttribute('aria-selected', true);
      target.classList.add(toggleClass);
      grandparent.querySelectorAll('[role="tabpanel"]').forEach(function (p) {
        p.classList.remove(toggleClass);
        p.setAttribute('hidden', true);
      });
      grandparent.parentNode.querySelector("#".concat(target.getAttribute('aria-controls'))).removeAttribute('hidden');
      grandparent.parentNode.querySelector("#".concat(target.getAttribute('aria-controls'))).classList.add(toggleClass);
    };

    tabs.forEach(function (tab) {
      tab.addEventListener('click', changeTabs);
    });
  };

  var onInit = function onInit() {
    visualSwiper();
    fixSwiper();
    bindLeftCategory({
      trigger: document.querySelector('header .btn-category'),
      el: document.querySelector('.left-navigation')
    });
    bindSearch({
      trigger: document.querySelector('header .btn-toggle-search'),
      el: document.querySelector('header .input-search')
    });
    bindTab();
  };

  if (document.readyState === 'complete') {
    onInit();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', onInit);
  }
})();