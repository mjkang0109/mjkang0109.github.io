const JS = (() => {
    const KEY = {
        RIGHT: 39, LEFT: 37,
    };

    const EL = {
        INPUT_FILES       : document.querySelectorAll('.input-file'),
        BUTTON_DELETE_FILE: document.querySelectorAll('.delete-file'),
    };

    const {
        INPUT_FILES,
        BUTTON_DELETE_FILE,
    } = EL;


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

    const deleteFile = () => {
        const length = BUTTON_DELETE_FILE.length;

        if (length === 0) {
            return;
        }

        for (let i = 0; i < length; i++) {
            BUTTON_DELETE_FILE[i].addEventListener('click', () => {
                const current = BUTTON_DELETE_FILE[i];
                const targetId = current.dataset.target;
                const targetEl = document.getElementById(`${targetId}`);

                if (!targetEl) {
                    return;
                }

                const pathId = targetEl.dataset.path;
                const pathEl = document.getElementById(pathId);

                targetEl.value = '';

                if (!pathEl) {
                    return;
                }

                pathEl.value = '';
            });
        }
    };

    const init = () => {
        setTabs();
        uploadFile();
        deleteFile();
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


_$(function () {
    _$('.input-datepicker').datepicker({
        showButtonPanel: true,
    });
});
