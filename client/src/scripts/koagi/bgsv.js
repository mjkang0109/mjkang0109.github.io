const JS = (() => {
    const throttling = (callback = () => {
    }, timing = 100) => {
        let timer;

        return (...args) => {
            if (!timer) {
                timer = setTimeout(() => {
                    callback(...args);
                    timer = null;
                }, timing);
            }
        };
    };
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

    const header = $('.header');

    const calculatorMaxHeight = ({
        elements,
    }) => {
        if (!elements.length) {
            return;
        }

        const arrHeight = [];

        elements.forEach(el => {
            arrHeight.push(el.clientHeight);
        });

        return Math.max(...arrHeight);
    };

    const headerHandler = () => {
        if (!header) {
            return;
        }

        const categories = $$('.header .category');
        const subCategories = $$('.header .sub-categories');
        header.removeAttribute('style');
        const headerHeight = header.clientHeight;
        const isSmall = window.innerWidth < 1200;

        if (isSmall) {
            header.classList.remove('expended');
            return header.style.height = `${headerHeight}px`;
        }

        const calculatorHeight = () => {
            const tempHeight = +header.dataset.height;

            if (Number.isInteger(tempHeight)) {
                return header.style.height = `${tempHeight}px`;
            }

            const maxHeight = calculatorMaxHeight({
                elements: subCategories,
            });

            header.dataset.height = headerHeight + maxHeight;
            header.style.height = `${headerHeight + maxHeight}px`;
        };

        categories.forEach(cate => {
            cate.addEventListener('mouseenter', (e) => {
                header.classList.add('expended');
                calculatorHeight();
            });
        });

        header.addEventListener('mouseleave', (e) => {
            header.classList.remove('expended');
            header.style.height = `${headerHeight}px`;
        });
    };

    const toggleCategory = () => {
        const category = $('#jsCategory');

        if (!category) {
            return;
        }

        const isVisible = category.classList.contains('show');

        category.classList[isVisible ? 'remove' : 'add']('show');
    };

    const bindSwiper = () => {
        const swipers = $$('.swiper');

        if (!swipers) {
            return;
        }

        let objSwiper = {};

        swipers.forEach((swiper, i) => {
            const id = swiper.getAttribute('id');
            const optsSwiper = {};
            const autoplay = swiper.dataset.autoplay;

            optsSwiper.spaceBetween = swiper.dataset.gap ?? 30;
            optsSwiper.slidesPerView = swiper.dataset.perView ?? 1;

            optsSwiper.pagination = {
                el       : swiper.parentElement.querySelector('.pagination'),
                clickable: true,
            };

            if (autoplay) {
                optsSwiper.autoplay = {
                    speed: Number.isInteger(autoplay) ? autoplay : 5000,
                };
            }

            objSwiper[id] = new Swiper(swiper, {
                ...optsSwiper,
            });
        });
    };

    const init = () => {
        headerHandler();
        bindSwiper();

        window.addEventListener('resize', throttling(headerHandler, 100));
        console.log('init');

    };

    return {
        init,
        toggleCategory,
    };
})();

if (document.readyState === 'complete') {
    JS.init();
} else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', JS.init);
}