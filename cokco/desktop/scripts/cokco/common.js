"use strict";

(function () {
  var CONSTANTS = {
    CLASS: {
      TOGGLE: 'on',
      LEFT_NAVIGATION: 'left-navigation',
      IS_SEARCH: 'is-search',
      DEPTH_CATEGORY: 'category-depth',
      SORT_ITEM: 'sort-item'
    }
  };
  var classes = CONSTANTS.CLASS;
  var toggleClass = classes.TOGGLE,
      leftNavigation = classes.LEFT_NAVIGATION,
      isSearch = classes.IS_SEARCH,
      depthCategory = classes.DEPTH_CATEGORY,
      sortItem = classes.SORT_ITEM;

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
      spaceBetween: 40,
      slidesPerView: 'auto'
    });
  };

  var fixTabSwiper = function fixTabSwiper() {
    var swiper = new Swiper('.fix-reference', {
      direction: 'horizontal',
      slideClass: 'btn-tab',
      wrapperClass: 'tabs',
      spaceBetween: 10,
      slidesPerView: 'auto'
    });
  };

  var storeTabSwiper = function storeTabSwiper() {
    var swiper = new Swiper('.store-detail', {
      direction: 'horizontal',
      slideClass: 'btn-tab',
      wrapperClass: 'tabs',
      spaceBetween: 10,
      slidesPerView: 'auto'
    });
  };

  var thumbsSwiper = function thumbsSwiper() {
    var thumbs = new Swiper('.thumbs-wrapper', {
      wrapperClass: 'thumbs-items',
      slideClass: 'thumbs-item',
      slidesPerView: 'auto',
      spaceBetween: 20,
      freeMode: true,
      watchSlidesProgress: true
    });
    var gallery = new Swiper('.gallery-wrapper', {
      wrapperClass: 'gallery-items',
      slideClass: 'gallery-item',
      slidesPerView: 'auto',
      thumbs: {
        swiper: thumbs
      }
    });
  };

  var fixThumbSwiper = function fixThumbSwiper() {
    var gallery = new Swiper('.fix-reference-swiper-wrap .fix-swiper-wrapper', {
      wrapperClass: 'fix-items',
      slideClass: 'fix-item',
      slidesPerView: 1,
      width: 650,
      pagination: {
        el: '.fix-swiper-pagination',
        clickable: true,
        renderBullet: function renderBullet(index, className) {
          return '<span class="' + className + '"><img src="https://via.placeholder.com/480" alt=""></span>';
        }
      }
    });
  };

  var bindCategory = function bindCategory(e) {
    if (!e) {
      return document.querySelectorAll(".".concat(depthCategory, "-1 > li.on")).forEach(function (el) {
        return el.classList.remove(toggleClass);
      });
    }

    if (!e.target.parentNode.querySelector(".".concat(depthCategory, "-2"))) {
      return;
    }

    if (e.target.tagName !== 'A') {
      return;
    }

    e.preventDefault();

    if (e.target.parentElement.getAttribute('class')) {
      return e.target.parentElement.classList.remove(toggleClass);
    }

    if (e.target.parentNode.parentNode.querySelector(".".concat(toggleClass))) {
      e.target.parentNode.parentNode.querySelector(".".concat(toggleClass)).classList.remove(toggleClass);
    }

    e.target.parentElement.classList.add(toggleClass);
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

      if (target.getAttribute('aria-controls') === 'panel-all') {
        return grandparent.parentNode.querySelectorAll('.panels [role="tabpanel"]').forEach(function (p) {
          p.classList.add(toggleClass);
          p.removeAttribute('hidden');
        });
      }

      grandparent.parentNode.querySelector("#".concat(target.getAttribute('aria-controls'))).removeAttribute('hidden');
      grandparent.parentNode.querySelector("#".concat(target.getAttribute('aria-controls'))).classList.add(toggleClass);
      bindCategory();
    };

    tabs.forEach(function (tab) {
      tab.addEventListener('click', changeTabs);
    });
  };

  var bindRadio = function bindRadio() {
    var radios = document.querySelectorAll('.radio-tabs input[type="radio"]');

    var changeRadios = function changeRadios(e) {
      var target = e.target;
      var parent = target.parentNode.parentElement;
      var grandparent = parent.parentNode;
      grandparent.querySelectorAll('.radio-panels > div').forEach(function (p) {
        p.classList.remove(toggleClass);
        p.setAttribute('hidden', true);
      });
      grandparent.parentNode.querySelector("#".concat(target.getAttribute('aria-controls'))).removeAttribute('hidden');
      grandparent.parentNode.querySelector("#".concat(target.getAttribute('aria-controls'))).classList.add(toggleClass);
    };

    radios.forEach(function (radio) {
      radio.addEventListener('click', changeRadios);
    });
  };

  var bindDropdown = function bindDropdown() {
    var close = function close(_ref) {
      var el = _ref.el;
      el.classList.remove(toggleClass);
    };

    var setSelected = function setSelected(e) {
      e.target.parentElement.querySelectorAll('button.on').forEach(function (b) {
        b.classList.remove(toggleClass);
      });
      e.target.classList.add(toggleClass);
      e.target.parentElement.parentElement.querySelector('.btn-current span').textContent = e.target.querySelector('span').textContent;
      close({
        el: e.target.parentElement.parentElement
      });
    };

    var toggleHandler = function toggleHandler(e) {
      if (e.target.parentElement.className.indexOf(' on') > -1) {
        return close({
          el: e.target.parentElement
        });
      }

      if (e.target.parentElement.className.indexOf('dropdown-items') > -1) {
        e.target.parentElement.classList.add(toggleClass);
      }

      e.target.parentNode.querySelectorAll(".".concat(sortItem)).forEach(function (s) {
        s.addEventListener('click', setSelected);
      });
    };

    document.querySelectorAll('.dropdown-items').forEach(function (d) {
      d.addEventListener('click', toggleHandler);
    });
  };

  var setQuantity = function setQuantity(_ref2) {
    var el = _ref2.el;

    if (el.length === 0) {
      return;
    }

    var handlerAmount = function handlerAmount(_ref3) {
      var amount = _ref3.amount,
          type = _ref3.type;

      if (!amount) {
        return;
      }

      if (type === 'decrease' && Number(amount.textContent) === 0) {
        return;
      }

      amount.textContent = Number(amount.textContent - (type === 'increase' ? -1 : +1));
    };

    el.forEach(function (element) {
      var amountEl = element.querySelector('.amount');
      element.querySelector('.btn-increase').addEventListener('click', function () {
        handlerAmount({
          amount: amountEl,
          type: 'increase'
        });
      });
      element.querySelector('.btn-decrease').addEventListener('click', function () {
        handlerAmount({
          amount: amountEl,
          type: 'decrease'
        });
      });
    });
  };

  var fixFormCategory = function () {
    var handlerCategory = function (e) {
      e.target.parentElement.parentElement.querySelector('.on').classList.remove('on');
      e.target.parentElement.classList.add('on');
    };

    Array.prototype.slice.call(document.querySelectorAll('.fix-form-categories li')).forEach(function (c, index) {
      c.addEventListener('click', handlerCategory);
    });
  };

  var onInit = function onInit() {
    visualSwiper();
    fixSwiper();
    thumbsSwiper();
    fixThumbSwiper();
    bindTab();
    bindRadio();
    bindDropdown();
    setQuantity({
      el: document.querySelectorAll('.quantity')
    });
    storeTabSwiper();
    fixTabSwiper();
    fixFormCategory();
  };

  if (document.readyState === 'complete') {
    onInit();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', onInit);
  }
})();