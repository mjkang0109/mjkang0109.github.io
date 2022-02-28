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
      slidesPerView: 'auto'
    });
  };

  var storeCategoriesSwiper = function storeCategoriesSwiper() {
    var swiper = new Swiper('.store-categories-wrap', {
      direction: 'horizontal',
      wrapperClass: 'store-categories',
      slideClass: 'store-category-item',
      slidesPerView: 'auto'
    });
  };

  var thumbsSwiper = function thumbsSwiper() {
    var thumbs = new Swiper('.thumbs-wrapper', {
      wrapperClass: 'thumbs-items',
      slideClass: 'thumbs-item',
      slidesPerView: 'auto',
      freeMode: true,
      watchSlidesProgress: true
    });
    var gallery = new Swiper('.gallery-wrapper', {
      wrapperClass: 'gallery-items',
      slideClass: 'gallery-item',
      slidesPerView: 'auto',
      thumbs: {
        swiper: thumbs
      },
      on: {
        slideChange: function slideChange(a) {
          if (a.activeIndex > 2) {
            thumbs.slideTo(1);
          }

          if (a.activeIndex < 2) {
            thumbs.slideTo(0);
          }
        }
      }
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

      if (target.getAttribute('aria-controls') === 'panel-all') {
        return grandparent.parentNode.querySelectorAll('.panels [role="tabpanel"]').forEach(function (p) {
          p.classList.add(toggleClass);
          p.removeAttribute('hidden');
        });
      }

      grandparent.parentNode.querySelector("#".concat(target.getAttribute('aria-controls'))).removeAttribute('hidden');
      grandparent.parentNode.querySelector("#".concat(target.getAttribute('aria-controls'))).classList.add(toggleClass);
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
    var close = function close(_ref3) {
      var el = _ref3.el;
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

  var setQuantity = function setQuantity(_ref4) {
    var el = _ref4.el;

    if (el.length === 0) {
      return;
    }

    var handlerAmount = function handlerAmount(_ref5) {
      var amount = _ref5.amount,
          type = _ref5.type;

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

  const mySwiper = () => {
    var swiper = new Swiper('.img-swiper', {
      direction: 'horizontal',
      wrapperClass: 'images',
      slideClass: 'image',
      slidesPerView: 'auto',
      on: {
        init: (swiper) => {
          if (!swiper) {
            return;
          }

          swiper.$el[0].querySelector('.counter .total').textContent = swiper.slides.length;
        },
        slideChange: function slideChange(swiper) {
          if (!swiper) {
            return;
          }
            swiper.$el[0].querySelector('.counter .current').textContent = swiper.activeIndex + 1;
        }
      }

    });
  };

  const layer = ({
    trigger,
    el
  }) => {
    if (!trigger && !el) {
      return;
    }

    const onOpen = () => {
      el.classList.add('on');
      document.querySelector('body').classList.add('fixed');
    };

    const onClose = () => {
      el.classList.remove('on');
      document.querySelector('body').classList.remove('fixed');
    }

    trigger.addEventListener('click', onOpen);
    el.querySelector('.btn-close').addEventListener('click', onClose);

  };

  var onInit = function onInit() {
    visualSwiper();
    storeCategoriesSwiper();
    fixSwiper();
    thumbsSwiper();
    bindLeftCategory({
      trigger: document.querySelector('header .btn-category'),
      el: document.querySelector('.left-navigation')
    });
    bindSearch({
      trigger: document.querySelector('header .btn-toggle-search'),
      el: document.querySelector('header .input-search')
    });
    bindTab();
    bindRadio();
    bindDropdown();
    setQuantity({
      el: document.querySelectorAll('.quantity')
    });
    fixFormCategory();
    mySwiper();
    layer({
      trigger: document.querySelector('.detail .link-review'),
      el: document.querySelector('.popup-review')
    })
  };

  if (document.readyState === 'complete') {
    onInit();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', onInit);
  }
})();

var resizeTextarea = function(obj) {
  obj.style.height = "1px";
  obj.style.height = (12+obj.scrollHeight)+"px";
}