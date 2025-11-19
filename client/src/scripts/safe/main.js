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

    const stopSwiper = () => {
        const swiper = new Swiper('.swiper')

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
