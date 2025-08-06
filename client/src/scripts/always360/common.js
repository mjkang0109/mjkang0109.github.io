$(document).ready(function () {


    // ===================  헤더 작동  ===================
    // 헤더 작동
    $('header .header_inner nav > ul > li').on('mouseover', function () {
        $(this).children('a').addClass('on');
        $(this).children('a').next('.depth2_wrap').addClass('active');
    }).on('mouseleave', function () {
        $(this).children('a').removeClass('on');
        $(this).children('a').next('.depth2_wrap').removeClass('active');
    });
    $('header .header_inner nav > ul > li a').on('focusin', function () {
        $(this).next('.depth2_wrap').addClass('active');
    });
    $('.depth2_wrap ul li:last-of-type a').on('focusout', function () {
        $(this).parent('li').parent('ul').parent('.depth2_wrap').removeClass('active');
    });

    // 사이트맵
    $('.menu_btn').click(function () {
        if ($(window).width() > 959) {
            $('.sitemap_wrap').addClass('active');
            $('.sitemap_wrap .close_btn').click(function () {
                $('.sitemap_wrap').removeClass('active');
                $('.menu_btn').focus();
            });
        } else {
            $('.mobile_side_wrap').addClass('active');
            $('.mobile_side_wrap .close_btn').click(function () {
                $('.mobile_side_wrap').removeClass('active');
            });
        }

    });

    // 모바일 메뉴
    $('.mob_depth1_wrap ul > li > a').click(function (e) {
        let $this = $(this);
        let $nextDepth2 = $this.next('.mob_depth2_wrap');

        // ★ 만약 다음 요소가 .mob_depth2_wrap이 아니면 (즉, 서브메뉴가 없으면), 아무것도 하지 않고 링크 이동 허용
        if ($nextDepth2.length === 0) return;

        e.preventDefault(); // 링크 이동 막기 (서브메뉴 있을 때만)

        if ($this.hasClass('active')) {
            $this.removeClass('active').attr('title', '');
            $nextDepth2.css('display', 'none'); // 2차 메뉴 숨기기
        } else {
            $('.mob_depth1_wrap ul > li > a').removeClass('active').attr('title', '');
            $this.addClass('active').attr('title', '선택됨');
            $('.mob_depth2_wrap').css('display', 'none');
            $nextDepth2.css('display', 'block'); // 2차 메뉴 표시
        }
    });


    // 자녀정보 스와이퍼
    const childSwiper = new Swiper('.mobile_side_wrap .child_info_swiper', {
        slidesPerView: 1,
        spaceBetween : 20,
        navigation   : {
            nextEl: '.mobile_side_wrap .child_info_swiper .swiper_button_next',
            prevEl: '.mobile_side_wrap .child_info_swiper .swiper_button_prev',
        },

        pagination: {
            el  : '.mobile_side_wrap .child_info_swiper .swiper-pagination',
            type: 'fraction',
        },
    });
    // ===================  // 헤더 ===================

    // 아코디언
    if ($('.accordion_wrap').length > 0) {
        $('.accordion_wrap .q_wrap').click(function () {
            let $this = $(this);
            let $answer = $this.next('.a_wrap');

            // 모든 아코디언 제목의 title 속성을 초기화
            $('.accordion_wrap .q_wrap').attr('title', '');

            if ($this.hasClass('open')) {
                $answer.stop(true, true).slideUp();
                $this.removeClass('open').attr('title', ''); // 선택 해제 시 title 제거
            } else {
                $('.accordion_wrap .a_wrap').stop(true, true).slideUp();
                $('.accordion_wrap .q_wrap').removeClass('open');

                $answer.stop(true, true).slideDown();
                $this.addClass('open').attr('title', '열림'); // 선택된 항목에 title 추가
            }
        });
    }


    // 탑버튼 동작
    $('.top_btn').click(function () {
        $('html, body').animate({
            scrollTop: 0,
        }, 400);
        return false;
    });

    // 기관 로그인 tab
    if ($('.white_tab_wrap').length > 0) {
        $('.white_tab_wrap ul li a').click(function () {
            let $this = $(this);
            let $tab = $this.parent();
            let $tab_wrap = $tab.parent();
            let idx = $tab.index();

            $('.white_tab_wrap ul li a').removeClass('selected').attr('title', '');
            $this.addClass('selected').attr('title', '선택됨');

        });
    }

    // 인풋 비밀번호 표시
    if ($('.password_type').length > 0) {
        $('.password_type .show_password').click(function () {
            let $this = $(this);
            let $input = $this.prev('input');
            if ($input.attr('type') == 'password') {
                $input.attr('type', 'text');
                $this.attr('title', '비밀번호 숨기기');
                $this.addClass('on');
            } else {
                $input.attr('type', 'password');
                $this.attr('title', '비밀번호 표시');
                $this.removeClass('on');
            }
        });
    }

    // 드롭다운
    if ($('.dropdown_wrap').length > 0) {
        $('.dropdown_wrap .dropdown_btn').click(function () {
            $(this).next('.dropdown_menu').toggleClass('open');
            $('.dropdown_menu li a').click(function () {
                $(this).parent().parent().removeClass('open');

                let $name = $(this).children('.name_wrap').children('.name').text();
                $(this).parent().parent().prev('.dropdown_btn').text($name);
            });
        });
    }

    // 탭 (탭 버튼 클릭 시 해당 탭 컨텐츠 보이기 / 숨기기)
    if ($('.page_tab_btn_area').length > 0) {
        // 접근성 추가
        if ($('.page_tab_btn_area a').hasClass('active')) {
            $('.page_tab_btn_area a.active').attr('title', '선택됨');
        }
        $('.page_tab_btn_area.type2 a').click(function (e) {
            e.preventDefault();
            $('.page_tab_btn_area.type2 a').removeClass('active').attr('title', '');
            $(this).addClass('active');
            3;
            $('.tab_cont_wrap .tab_cont').hide().attr('title', '');
            let idx = $(this).index();

            $('.page_tab_btn_area.type2 a').removeClass('selected').attr('title', '');
            $(this).attr('title', '선택됨');
            $('.tab_cont_wrap .tab_cont').eq(idx).show();
        });
    }
    // 챗봇 작동
    $('.bull_area.bull_area01 a').click(function () {
        $('.bg_dimm').fadeIn(300);
        $(this).next('.layer_wrap').addClass('active');
        $('.layer_wrap .close_btn').click(function () {
            $('.bg_dimm').fadeOut(300);
            $(this).parent().parent().parent().removeClass('active');
        });

    });
    // 접근성 추가
    $(window).on('load', function () {
        if ($('.paging_wrap').length > 0) {
            updatePagingTitle();
        }

        // 페이지 번호 클릭 시 title 및 active 동시 갱신
        $(document).on('click', '.paging_wrap a.num', function (e) {
            e.preventDefault(); // 링크 이동 방지

            $('.paging_wrap a.num').removeClass('active').removeAttr('title');
            $(this).addClass('active').attr('title', '현재 페이지(선택됨)');

            // 페이지 이동 로직 실행 (원래 있던 함수 호출)
            const pageNo = $(this).text();
            fn_egov_link_page(parseInt(pageNo));
        });
    });

    // 함수 분리: 현재 active에 title 부여
    function updatePagingTitle() {
        const $activePage = $('.paging_wrap a.num.active');
        if ($activePage.length > 0) {
            $activePage.attr('title', '현재 페이지(선택됨)');
        }
    }


// dropdown 기능 + 접근성 강화
    if ($('.dropdown_wrap').length > 0) {
        $('.dropdown_wrap').each(function () {
            const $wrap = $(this);
            const $button = $wrap.find('button');
            const $menu = $wrap.find('.dropdown');
            const $items = $menu.find('a');

            // 접근성 속성 부여
            $button
                .attr('type', 'button')
                .attr('aria-haspopup', 'true')
                .attr('aria-expanded', 'false');

            $menu
                .attr('role', 'menu')
                .removeClass('open') // 초기 숨김
                .hide();

            $items.attr('role', 'menuitem');

            // 버튼 클릭 시 열고 닫기
            $button.on('click', function (e) {
                e.stopPropagation();
                const isOpen = $menu.is(':visible');

                // 모든 드롭다운 닫기
                $('.dropdown').removeClass('open').hide();
                $('.dropdown_wrap > button').attr('aria-expanded', 'false');

                if (!isOpen) {
                    $menu.addClass('open').show();
                    $button.attr('aria-expanded', 'true');
                    $items.first().focus();
                }
            });

            // 키보드 접근성
            $button.on('keydown', function (e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    $menu.addClass('open').show();
                    $button.attr('aria-expanded', 'true');
                    $items.first().focus();
                }
            });

            $menu.on('keydown', function (e) {
                const index = $items.index(document.activeElement);
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    $items.eq((index + 1) % $items.length).focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    $items.eq((index - 1 + $items.length) % $items.length).focus();
                } else if (e.key === 'Escape') {
                    $menu.removeClass('open').hide();
                    $button.attr('aria-expanded', 'false').focus();
                }
            });
        });

        // 외부 클릭 시 닫기
        $(document).on('click', function () {
            $('.dropdown').removeClass('open').hide();
            $('.dropdown_wrap > button').attr('aria-expanded', 'false');
        });
    }

});
