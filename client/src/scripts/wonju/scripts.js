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

    const bindSwiper = () => {
        const swiperThumb = new Swiper('.main-swiper .swiper-thumb', {
            loop               : true,
            spaceBetween       : 28,
            slidesPerView      : 3,
            watchSlidesProgress: true,
        });

        const swiper = new Swiper('.main-swiper .swiper-top', {
            loop        : true,
            spaceBetween: 0,
            navigation  : {
                nextEl: '.main-swiper .button-next',
                prevEl: '.main-swiper .button-prev',
            },
            thumbs      : {
                swiper: swiperThumb,
            },
        });

        swiper.on('activeIndexChange', () => {
            const wrapper = document.querySelector('.main-swiper .swiper-wrap');
            wrapper.dataset.index = swiper.realIndex + 1;
        });

        const swiperFooter = new Swiper('#footer .swiper-footer', {
            navigation   : {
                nextEl: '#footer .button-next',
                prevEl: '#footer .button-prev',
            },
            breakpoints: {
                0   : {
                    slidesPerView: 2.8,
                    spaceBetween : 20,
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween : 10,
                },
            }
        });

        const swiperQuick = new Swiper('.quick-nav .swiper-quick', {
            breakpoints: {
                0   : {
                    slidesPerView : 1.5,
                    spaceBetween  : 20,
                    centeredSlides: true,
                },
                1200: {
                    spaceBetween  : 0,
                    slidesPerView : 'auto',
                    centeredSlides: false,
                },
            },
            navigation : {
                nextEl: '.quick-nav .button-next',
                prevEl: '.quick-nav .button-prev',
            },
        });
    };

    window.addEventListener('resize', throttling(bindSwiper, 50));

    const init = () => {
        bindSwiper();
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