$(function(){
   var $window = $(window),
        $html   = $("html"),
        $header = $("#header"),
        $gnb    = $(".gnb"),
        $openBtn= $(".btn-menu"),
        $closeBtn=$(".btn-close");

    // --------------------------
    //  PC gnb (마우스 오버, 포커스)
    // --------------------------
    $gnb.find("> li > a").on("mouseenter focus", function(){
        $header.addClass("on");
    });
    $header.on("mouseleave", function(){
        $header.removeClass("on");
    });

    // --------------------------
    //  모바일 메뉴 (전체 메뉴 열기/닫기)
    // --------------------------
    $openBtn.on("click", function(){
        $html.addClass("open-menu");
    });
    $closeBtn.on("click", function(){
        $html.removeClass("open-menu");
    });

    // --------------------------
    //  스크롤 시 헤더 최소화/숨김
    // --------------------------
    minimize_header();

    function minimize_header() {
        var did_scroll     = null;
        var current_scroll = 0;
        var last_scroll    = 0;
        var move_scroll    = 10;

        $window.on('scroll ready load', function() {
            did_scroll = true;
            toggle_minimize();
        });

        toggle_minimize();

        setInterval(function() {
            if (did_scroll && !$html.hasClass('open-menu')) {
                has_scrolled();
                did_scroll = false;
            }
        }, 50);

        function toggle_minimize(){
            if ($window.scrollTop() > $header.height()) {
                $header.addClass('minimize');
            } else {
                $header.removeClass('minimize');
            }
        }

        function has_scrolled(){
            current_scroll = $window.scrollTop();

            if(Math.abs(last_scroll - current_scroll) <= move_scroll) return;

            if(current_scroll > last_scroll){ // scroll down
                if(current_scroll > $window.height()){
                    gsap.to($header, 0.4, { autoAlpha:0, y: -$header.outerHeight(), ease: Power3.easeOut });
                }
            } else { // scroll up
                gsap.to($header, 0.4, { autoAlpha:1, y: 0, ease: Power3.easeOut });
            }

            last_scroll = current_scroll;
        }
    }

    // 커튼 메뉴
    var $allmenuBtn = $(".allmenu"),
        $menuToggle = $(".menuToggle"),
        $closeBtn = $menuToggle.find(".close"),
        $body = $("body");

    $allmenuBtn.on("click", function () {
        $menuToggle.addClass("on").attr("aria-hidden", "false");
        $body.addClass("menu-open");

        // 메뉴 안 첫 포커스로 이동
        $closeBtn.focus();
    });

    $closeBtn.on("click", function () {
        $menuToggle.removeClass("on").attr("aria-hidden", "true");
        $body.removeClass("menu-open");

        //복귀
        $allmenuBtn.focus();
    });

    // ESC키 닫기
    $(document).on("keydown", function (e) {
        if (e.key === "Escape" && $menuToggle.hasClass("on")) {
            $closeBtn.trigger("click");
        }
    });

});
