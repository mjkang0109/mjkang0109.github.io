$(document).ready(function () {


    // 메인 비주얼 슬라이드
    const mainSwiper1 = new Swiper('.main_swiper1', {
        pagination: {
            el  : '.main_swiper1_wrap .swiper-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.main_swiper1_wrap .swiper_button_next',
            prevEl: '.main_swiper1_wrap .swiper_button_prev',
        },

        autoplay: {
            delay               : 3000,  // 3초마다 자동 재생
            disableOnInteraction: false,  // 사용자 상호작용 후에도 자동 재생 유지
        },
        loop    : true,
    });


    // 자녀정보 스와이퍼
    const mainSwiper2 = new Swiper('.section1 .child_info_swiper', {
        slidesPerView: 1,
        spaceBetween : 20,
        navigation   : {
            nextEl: '.section1 .child_info_swiper .swiper_button_next',
            prevEl: '.section1 .child_info_swiper .swiper_button_prev',
        },

        pagination: {
            el  : '.section1 .child_info_swiper .swiper-pagination',
            type: 'fraction',
        },
    });

    var sw = 0;
    $('.btn_pause').click(function () {
        if (sw == 0) {
            $('.btn_pause').addClass('on');
            mainSwiper1.autoplay.stop();
            sw = 1;
            $(this).addClass('off').attr('title', '재생');
        } else {
            $('.btn_pause').removeClass('on');
            mainSwiper1.autoplay.start();
            sw = 0;
            $(this).removeClass('off').attr('title', '정지');

        }
    });


    // 공지사항 스와이퍼
    const notice_link_wrap = new Swiper('.notice_link_wrap', {
        spaceBetween : 10,
        slidesPerView: 1,
        direction    : 'vertical',
        pagination   : {
            el  : '.notice_link_wrap .swiper-pagination',
            type: 'bullets',
        },
        navigation   : {
            nextEl: '.notice_link_wrap .swiper_button_next',
            prevEl: '.notice_link_wrap .swiper_button_prev',
        },

        autoplay   : {
            delay               : 4000,  // 3초마다 자동 재생
            disableOnInteraction: false,  // 사용자 상호작용 후에도 자동 재생 유지
        },
        breakpoints: {
            // 768px 이상에서는 3개의 슬라이드를 보여줌
            360: {
                slidesPerView: 1,
                spaceBetween : 10,
            },
            // 1024px 이상에서는 5개의 슬라이드를 보여줌
            960: {
                slidesPerView: 1,
                spaceBetween : 30,
            },
        },

        loop: true,
    });


    // 스크롤 위로
    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) {

            $('.top_btn').fadeIn();
        } else {
            $('.top_btn').fadeOut();
        }
    });

    // 돌봄종합정보 탭
    $('.main_tab_wrap ul li a').click(function () {
        $('.main_tab_wrap ul li a').removeClass('active').attr('title', '');
        $(this).addClass('active').attr('title', '선택됨');
        ;
        let idx = $(this).parent().index();

        $('.main_info_wrap').hide();
        $('.main_info_wrap').eq(idx).show();
    });

    // 접근성 추가
    $('.info_wrap .search_btn').on('click', function () {
        const firstResult = $('.list_area ul li:first-child a');
        if (firstResult.length) {
            firstResult.focus();
        }
    });

});
