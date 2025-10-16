const scripts = (() => {
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

    const bindSwiper = () => {
        const swipers = $$('.swiper');
        const thumbSwipers = $$('.thumb-swiper');

        if (!swipers) {
            return;
        }

        const optsSwiper = {};
        const optsThumb = {};
        const objSwiper = {};
        const objThumb = {};

        if (thumbSwipers) {
            thumbSwipers.forEach((thumb, i) => {
                const id = thumb.getAttribute('id');

                optsThumb.slidesPerView = thumb.dataset.perView ?? 4;

                objThumb[id] = new Swiper(thumb, {
                    freeMode: true,
                    ...optsThumb,
                });
            });
        }

        swipers.forEach((swiper, i) => {
            const thumb = swiper.dataset.thumb;
            const id = swiper.getAttribute('id');
            const hideNavigation = swiper.dataset.hideNavi;
            const scrollbar = swiper.dataset.scrollbar;

            optsSwiper.spaceBetween = swiper.dataset.gap ?? 30;
            optsSwiper.slidesPerView = swiper.dataset.perView ?? 1;

            if (thumb) {
                optsSwiper.thumbs = {
                    swiper: objThumb[thumb],
                };
            }

            console.log(swiper);

            if (!thumb) {
                optsSwiper.pagination = {
                    el       : swiper.parentElement.querySelector('.pagination'),
                    clickable: true,
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
                    el       : swiper.parentElement.querySelector('.scrollbar'),
                    draggable: true,
                    dragSize : 80,
                };
            }

            objSwiper[id] = new Swiper(swiper, {
                ...optsSwiper,
            });
        });
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

        const onChangeTab = (e) => {
            const target = e.target;
            const parent = target.parentElement;
            const grand = parent.parentElement;

            grand
                .querySelectorAll('[aria-selected="true"]')
                .forEach(t => {
                    t.setAttribute('aria-selected', 'false');
                    t.classList.remove('active');
                });

            target.setAttribute('aria-selected', 'true');
            target.classList.add('active');

            grand
                .parentElement
                .querySelectorAll('[role="tabpanel"]:not([hidden]), [role="tabpanel"].show')
                .forEach(p => {
                    Object.assign(p, {
                        hidden: 'true', tabIndex: '-1',
                    });

                    p.classList.remove('show');
                });

            grand
                .parentElement
                .querySelector(`#${target.getAttribute('aria-controls')}`)
                .removeAttribute('hidden');

            grand
                .parentElement
                .querySelector(`#${target.getAttribute('aria-controls')}`)
                .setAttribute('tabindex', '0');

            grand
                .parentElement
                .querySelector(`#${target.getAttribute('aria-controls')}`)
                .classList
                .add('show');
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

    const init = () => {
        bindSwiper();
        setTabs();
    };

    return {
        init, bindSwiper,
    };
})();

if (document.readyState === 'complete') {
    scripts.init();
} else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', scripts.init);
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