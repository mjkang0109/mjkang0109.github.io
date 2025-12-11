const JS = (() => {
    const $ = (el) => {
        if (!el) {
            return;
        }

        const element = document.querySelector(el);

        if (!element) {
            return;
        }

        return element;
    };

    const $$ = (el) => {
        if (!el) {
            return;
        }

        const elements = document.querySelectorAll(el);

        if (elements.length === 0) {
            return;
        }

        return elements;
    };

    let objSwiper = {};

    const bindSwiper = () => {
        const swipers = $$('.swiper');
        const thumbSwipers = $$('.thumb-swiper');

        if (!swipers) {
            return;
        }

        const objThumb = {};

        if (thumbSwipers) {
            thumbSwipers.forEach((thumb, i) => {
                const id = thumb.getAttribute('id');
                const optsThumb = {};

                optsThumb.slidesPerView = thumb.dataset.perView ?? 4;

                objThumb[id] = new Swiper(thumb, {
                    freeMode: true, ...optsThumb,
                });
            });
        }

        swipers.forEach((swiper, i) => {
            const thumb = swiper.dataset.thumb;
            const id = swiper.getAttribute('id');
            const hideNavigation = swiper.dataset.hideNavi;
            const scrollbar = swiper.dataset.scrollbar;
            const change = swiper.dataset.change;
            const loop = swiper.dataset.loop;
            const center = swiper.dataset.center;
            const autoplay = swiper.dataset.autoplay;
            const theme = swiper.dataset.theme;
            const controller = swiper.parentElement.querySelector('.button-stop, .button-play');
            const optsSwiper = {};

            optsSwiper.spaceBetween = swiper.dataset.gap ?? 30;
            optsSwiper.slidesPerView = swiper.dataset.perView ?? 1;

            if (thumb) {
                optsSwiper.thumbs = {
                    swiper: objThumb[thumb],
                };
            }

            if (!thumb) {
                optsSwiper.pagination = {
                    el: swiper.parentElement.querySelector('.pagination'), clickable: true,
                };
            }

            if (!hideNavigation) {
                optsSwiper.navigation = {
                    nextEl: swiper.parentElement.querySelector('.button-next'),
                    prevEl: swiper.parentElement.querySelector('.button-prev'),
                };
            }

            if (scrollbar) {
                optsSwiper.scrollbar = {
                    el: swiper.parentElement.querySelector('.scrollbar'), draggable: true, dragSize: 80,
                };

                Object.assign(optsSwiper, {
                    breakpoints: {
                        1200: {
                            spaceBetween: 25, scrollbar: {
                                dragSize: 80,
                            },
                        }, 0: {
                            spaceBetween: 12, scrollbar: {
                                dragSize: 40,
                            },
                        },
                    },
                });
            }

            if (id === 'mainPoster') {
                Object.assign(optsSwiper, {
                    breakpoints: {
                        1200: {
                            spaceBetween: 30, slidesPerView: 5,
                        }, 0: {
                            spaceBetween: 20, slidesPerView: 2,
                        },
                    },
                });
            }

            if (change) {
                Object.assign(optsSwiper, {
                    effect: 'fade', fadeEffect: {
                        crossFade: true,
                    },
                });
            }

            if (loop) {
                optsSwiper.loop = true;
            }

            if (center) {
                optsSwiper.centeredSlides = true;
            }

            if (autoplay) {
                optsSwiper.autoplay = {
                    speed: Number.isInteger(autoplay) ? autoplay : 5000,
                };
            }

            if (id === 'swiperLarge') {
                Object.assign(optsSwiper, {
                    breakpoints: {
                        1200: {
                            spaceBetween: 40, slidesPerView: 5,
                        }, 0: {
                            spaceBetween: 28, slidesPerView: 3,
                        },
                    },
                });
            }

            if (id === 'swiperLives') {
                Object.assign(optsSwiper, {
                    breakpoints: {
                        1200: {
                            spaceBetween: 40,
                        }, 0: {
                            spaceBetween: 20,
                        },
                    },
                });
            }

            if (id === 'guideSwiper') {
                console.log(optsSwiper);
            }

            objSwiper[id] = new Swiper(swiper, {
                ...optsSwiper,
            });

            if (theme) {
                const target = $(`#${swiper.dataset.themeTarget}`);

                objSwiper[id].on('slideChangeTransitionEnd', () => {
                    const currentSlide = objSwiper[id].slides[objSwiper[id].activeIndex];
                    target.dataset.theme = currentSlide.dataset.theme;
                });
            }

            if (controller) {
                let isStop = controller.classList.contains('button-stop');

                controller.addEventListener('click', () => {
                    controller.setAttribute('class', isStop ? 'button-play' : 'button-stop');

                    objSwiper[id].autoplay[isStop ? 'stop' : 'start']();

                    isStop = !isStop;

                    controller.querySelector('.sound-only').textContent = isStop ? '정지' : '재생';
                });
            }
        });
    };

    const updateSwiper = (id) => {
        if (!id) {
            return;
        }

        const target = $(`#${id}`);

        if (!target) {
            return;
        }

        objSwiper[id].update();
        objSwiper[id].slideTo(0);
    };

    const KEY = {
        RIGHT: 39, LEFT: 37,
    };

    const setTabs = () => {
        const tabs = document.querySelectorAll('[role="tab"]');
        const tabList = document.querySelector('[role="tablist"]');

        if (tabs.length === 0) {
            return;
        }

        if (!tabList) {
            return;
        }

        let tabFocus = 0;

        const onChangeElement = ({
            target,
        }) => {
            if (!target) {
                return;
            }

            const targetEl = document.getElementById(target);

            if (!targetEl) {
                return;
            }

            const parent = targetEl.parentElement;
            const prev = parent.querySelector(`${targetEl.tagName}:not([hidden])`);
            prev.setAttribute('hidden', true);
            targetEl.removeAttribute('hidden');

            console.log(prev, targetEl);

        };

        const onChangeTab = (e) => {
            const target = e.target;
            const parent = target.parentElement;
            const grand = parent.parentElement;
            const visual = target.dataset.visual;
            const marker = target.dataset.marker;

            grand
                .querySelectorAll('[aria-selected="true"]')
                .forEach(t => {
                    t.setAttribute('aria-selected', 'false');
                    t.classList.remove('active');
                });

            target.setAttribute('aria-selected', 'true');
            target.classList.add('active');

            let grandParent = grand.parentElement;
            let allPanel;

            allPanel = grandParent.querySelectorAll('[role="tabpanel"]:not([hidden]), [role="tabpanel"].show');

            while (allPanel.length === 0) {
                grandParent = grandParent.parentElement;

                if (allPanel.length > 0) {
                    return false;
                }

                allPanel = grandParent.querySelectorAll('[role="tabpanel"]:not([hidden]), [role="tabpanel"].show');
            }

            grandParent.querySelectorAll('[role="tabpanel"]:not([hidden]), [role="tabpanel"].show')
                .forEach(p => {
                    Object.assign(p, {
                        hidden: 'true', tabIndex: '-1',
                    });

                    p.classList.remove('show');
                });

            grandParent.querySelector(`#${target.getAttribute('aria-controls')}`)
                .removeAttribute('hidden');

            grandParent.querySelector(`#${target.getAttribute('aria-controls')}`)
                .setAttribute('tabindex', '0');

            grandParent.querySelector(`#${target.getAttribute('aria-controls')}`)
                .classList
                .add('show');

            if (visual) {
                onChangeElement({target: visual});
            }

            if (marker) {
                onChangeElement({target: marker});
            }
        };

        const kbdNavigation = (e) => {
            const keyCode = e.keyCode;
            const isHorizontal = Object.values(KEY).some(k => k === Number(keyCode));

            if (!isHorizontal) {
                return;
            }

            tabs[tabFocus].setAttribute('tabindex', '-1');

            if (keyCode === KEY['RIGHT']) {
                tabFocus++;

                if (tabFocus >= tabs.length) {
                    tabFocus = 0;
                }
            }

            if (keyCode === KEY['LEFT']) {
                tabFocus--;

                if (tabFocus < 0) {
                    tabFocus = tabs.length - 1;
                }
            }

            tabs[tabFocus].setAttribute('tabindex', '0');
            tabs[tabFocus].focus();
        };

        tabs.forEach(tab => tab.addEventListener('click', onChangeTab));
        tabList.addEventListener('keydown', kbdNavigation);
    };

    const toggleTable = (thisEl) => {
        const _this = thisEl;
        let currentElement = _this.parentElement;

        while (currentElement.tagName !== 'TR') {
            currentElement = currentElement.parentElement;
        }

        const nextElement = currentElement.nextElementSibling;
        const grandElement = currentElement.parentElement;

        if (!nextElement) {
            return;
        }

        grandElement.querySelector('.show')?.classList.remove('show');
        nextElement.classList.add('show');

    };

    const init = () => {
        bindSwiper();
        setTabs();
    };

    return {
        init, bindSwiper, updateSwiper, toggleTable,
    };
})();

if (document.readyState === 'complete') {
    JS.init();
} else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', JS.init);
}

$(document).ready(function () {
    /* show popup when load */
    if (window.location.href.split('#')[1]) {
        $('#' + window.location.href.split('#')[1]).addClass('active');
        $('#' + window.location.href.split('#')[1]).css('top', '0');
    }
    /* //show popup when load */

    /* scroll */
    $(window).scroll(function () {
        var winSc = $(document).scrollTop();
        if (winSc >= 1) $('body').addClass('scrolling'); else $('body').removeClass('scrolling');
    });
    /* //scroll */

    /* gnb */
    if ($('#wrap').width() > 768) {
        $('.mGnb .list > li').on('mouseenter focus', function () {
            $(this).addClass('hover');
        });
        $('.mGnb .list > li').on('mouseleave', function () {
            $('.mGnb .list > li').removeClass('hover');
        });
    }
    $('.jsBtnMenu1').on('click', function () {
        $($(this).attr('href')).addClass('active');
        $('body').addClass('hiddenScroll');
        return false;
    });
    $('.mSitemap1 .list .dep1 a:not(.link)').on('click', function () {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
        $('.mSitemap1 .list .dep2').addClass('hidden');
        $($(this).attr('href')).removeClass('hidden');
        return false;
    });
    $('.mSitemap1 .list .dep2 > ul > li button').on('click', function () {
        if ($(this).next().css('display') == 'block') {
            $(this).next().slideUp();
            $(this).parent().removeClass('active');
        } else {
            $(this).parent().parent().children('li').removeClass('active');
            $(this).parent().addClass('active');
            $(this).parent().parent().children('li').children('.dep3').slideUp();
            $(this).next().slideDown();
        }
        return false;
    });
    $('.mSitemap1 .title .close').on('click', function () {
        $(this).parent().parent().removeClass('active');
        $('body').removeClass('hiddenScroll');
        return false;
    });
    /* //gnb */

    /* lnb */
    $('.mLnb .list > li button.dep1').on('click', function () {
        if ($(this).next().css('display') == 'block') {
            $(this).next().slideUp();
        } else {
            $(this).parent().parent().children('li').children('.dep1').next().slideUp();
            $(this).next().slideDown();
        }
        return false;
    });
    $('.mLnb .dep2 > li > button').on('click', function () {
        if ($(this).next().css('display') == 'block') {
            $(this).parent().removeClass('show');
            $(this).next().slideUp();
        } else {
            $(this).parent().parent().children('li').children('.dep1').next().slideUp();
            $(this).next().slideDown();
            $(this).parent().siblings('li').removeClass('show');
            $(this).parent().addClass('show');
        }
        return false;
    });
    /* //lnb */

    /* show/hide */
    $('.jsBtnAnswer1').on('click', function () {
        $($(this).attr('href')).toggleClass('active');
        return false;
    });
    /* //show/hide */

    /* faq */
    $('.jsFaq1 .q button').on('click', function () {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().parent().children('.q').removeClass('active').next().slideUp();
        } else {
            $(this).parent().parent().children('.q').removeClass('active').next().slideUp();
            $(this).parent().addClass('active').next().slideDown();
        }
    });

    /* //faq */

    function bindDatepicker() {
        $('.jsDatepicker').each(function () {
            $(this).datepicker();
        });
    }

    bindDatepicker();
});

/* isTablet */
function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function addMobileClass() {
    if (isMobile()) {
        $('html').addClass('isMobile');
    } else {
        $('html').removeClass('isMobile');
    }
}

window.addEventListener('load', addMobileClass);
window.addEventListener('resize', addMobileClass);
/* //isTablet */