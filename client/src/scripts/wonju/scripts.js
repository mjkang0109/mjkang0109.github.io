const JS = (() => {
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

    };

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