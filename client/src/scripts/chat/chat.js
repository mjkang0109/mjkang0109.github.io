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

    const a11yLayer = () => {
        const triggers = $$('.button-layer');
        const lengthTriggers = triggers.length;
        if (lengthTriggers === 0) {
            return;
        }

        let i = 0;
        for (i; i < lengthTriggers; i++) {
            const current = triggers[i];
            const target = $(`#${current.getAttribute('aria-controls')}`);

            if (!target) {
                continue;
            }

            const outerElements = $$(`.button-layer`);
            const focusableElements = target.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]');
            const lengthFocusableElements = focusableElements.length;
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[lengthFocusableElements - 1];

            current.addEventListener('click', (e) => {
                toggleLayer(e, {target, isOpen: true, firstFocusable, lastFocusable, outerElements});
            });

            const buttonClose = target.querySelector('.button-close');

            if (buttonClose) {
                buttonClose.addEventListener('click', (e) => {
                    toggleLayer(e, {target, prevElement: current, outerElements});
                });
            }
        }
    };

    const toggleLayer = (e, {
        target, isOpen, prevElement, firstFocusable, lastFocusable, outerElements,
    }) => {
        if (!target) {
            return;
        }

        target.querySelector('[tabindex]').setAttribute('tabIndex', isOpen ? 1 : -1);
        target.classList[isOpen ? 'add' : 'remove']('show');

        outerElements.forEach(out => {
            out.setAttribute('aria-hidden', !!isOpen);
            out.setAttribute('tabIndex', isOpen ? -1 : 1);
        });

        if (firstFocusable) {
            firstFocusable.focus();
        }

        if (!isOpen && prevElement) {
            prevElement.focus();
        }

        if (isOpen) {
            target.addEventListener('keydown', (e) => {
                focusTrap({
                    e, firstFocusable, lastFocusable,
                });
            });
        }
    };

    const focusTrap = ({
        e, firstFocusable, lastFocusable,
    }) => {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }

    };


    const init = () => {
        a11yLayer();
    };

    return {
        init,
    };
})();

if (document.readyState === 'complete') {
    JS.init();
} else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', JS.init);
}