const JS = (() => {
    const $ = (el) => {
        if (!el) {
            return;
        }

        if (!document.querySelector(el)) {
            return;
        }

        return document.querySelector(el);
    };

    const $$ = (el) => {
        if (!el) {
            return;
        }

        if (!document.querySelectorAll(el)) {
            return;
        }

        return document.querySelectorAll(el);
    };

    const INPUT_FILES = $$('.upload-file')

    const uploadFile = () => {
        const length = INPUT_FILES.length;

        if (length === 0) {
            return;
        }

        for (let i = 0; i < length; i++) {
            INPUT_FILES[i].addEventListener('change', () => {
                const current = INPUT_FILES[i];
                const pathId = current.dataset.path;
                const pathEl = document.getElementById(`${pathId}`);

                if (!pathEl) {
                    return;
                }

                pathEl.value = current.files[0]?.name;
            });
        }
    };

    const TAB = $('#jsTabs');

    const scrollTo = (e) => {
        if (!e.target) {
            return;
        }

        if (e.target.tagName !== 'BUTTON') {
            return;
        }

        const targetElement = $(e.target.dataset.target);

        if (!targetElement) {
            return;
        }

        targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const bindButtonEvent = () => {
        if (TAB) {
            TAB.addEventListener('click', scrollTo);
        }
    };

    const init = () => {
        bindButtonEvent();
        uploadFile();
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