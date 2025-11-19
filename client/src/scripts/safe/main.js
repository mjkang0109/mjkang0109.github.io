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

    const KEY = {
        RIGHT: 39, LEFT: 37,
    };

    const setTabs = () => {
        const tabs = document.querySelectorAll('[role="tab"]');
        const tabList = document.querySelector('[role="tablist"]');
        const select = $('.mobile-select select');

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
                        hidden  : 'true',
                        tabIndex: '-1',
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

            if (select) {
                const index = target.getAttribute('aria-controls').replace('panel', '');
                select.options[index].selected = true;
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

        if (select) {
            select.addEventListener('input', () => {
                const target = select.options[select.selectedIndex].getAttribute('aria-controls');
                const tab = $(`button[aria-controls="${target}"`);

                const obj = {
                    target: tab,
                };

                onChangeTab(obj);
            });
        }
    };

    const stopSwiper = () => {
        const swiperEl = $('.safe-archive .swiper');
        const parent = swiperEl.parentElement;

        if (!swiperEl) {
            return;
        }

        const slides = parent.querySelectorAll('.swiper-slide');
        const controls = parent.querySelector('.controls');
        const currentIndex = controls.querySelector('.current');
        const total = controls.querySelector('.total');
        const buttons = controls.querySelector('.buttons');
        const buttonStop = controls.querySelector('.button-stop');
        const buttonPlay = controls.querySelector('.button-play');

        total.textContent = slides.length;

        const swiper = new Swiper('.swiper', {
            pagination: {
                el       : '.swiper-pagination',
                clickable: true,
            },
            autoplay  : true,
            on        : {
                slideChangeTransitionEnd: () => {
                    currentIndex.textContent = swiper.activeIndex + 1;
                },
            },
        });

        buttonStop.addEventListener('click', () => {
            swiper.autoplay.stop();
            buttons.dataset.state = 'stop';
        });

        buttonPlay.addEventListener('click', () => {
            swiper.autoplay.start();
            buttons.dataset.state = 'play';
        });

        swiper.init();
    };


    const init = () => {
        setTabs();
        stopSwiper();
    };

    return {
        init,
    };
})();

if (document.readyState === 'complete') {
    scripts.init();
} else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', scripts.init);
}
