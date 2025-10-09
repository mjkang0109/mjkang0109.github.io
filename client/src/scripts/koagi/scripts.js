$(document).ready(function () {
    /* show popup when load */
    if (window.location.href.split('#')[1]) {
        $('#' + window.location.href.split('#')[1]).addClass('active');
        $('#' + window.location.href.split('#')[1]).css('top', '0');
    }
    /* //show popup when load */

    /* scroll */
    $(window).scroll(function () {
        var winSc = $(document).scrollTop();
        if (winSc >= 1)
            $('body').addClass('scrolling');
        else
            $('body').removeClass('scrolling');
    });
    /* //scroll */

    /* gnb */
    if ($('#wrap').width() > 768) {
        $('.mGnb .list > li').on('mouseenter focus', function () {
            $(this).addClass('hover');
        });
        $('.mGnb .list > li').on('mouseleave', function () {
            $('.mGnb .list > li').removeClass('hover');
        });
    }
    $('.jsBtnMenu1').on('click', function () {
        $($(this).attr('href')).addClass('active');
        $('body').addClass('hiddenScroll');
        return false;
    });
    $('.mSitemap1 .list .dep1 a:not(.link)').on('click', function () {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
        $('.mSitemap1 .list .dep2').addClass('hidden');
        $($(this).attr('href')).removeClass('hidden');
        return false;
    });
    $('.mSitemap1 .list .dep2 > ul > li button').on('click', function () {
        if ($(this).next().css('display') == 'block') {
            $(this).next().slideUp();
            $(this).parent().removeClass('active');
        } else {
            $(this).parent().parent().children('li').removeClass('active');
            $(this).parent().addClass('active');
            $(this).parent().parent().children('li').children('.dep3').slideUp();
            $(this).next().slideDown();
        }
        return false;
    });
    $('.mSitemap1 .title .close').on('click', function () {
        $(this).parent().parent().removeClass('active');
        $('body').removeClass('hiddenScroll');
        return false;
    });
    /* //gnb */

    /* lnb */
    $('.mLnb .list > li button.dep1').on('click', function () {
        if ($(this).next().css('display') == 'block') {
            $(this).next().slideUp();
        } else {
            $(this).parent().parent().children('li').children('.dep1').next().slideUp();
            $(this).next().slideDown();
        }
        return false;
    });
    $('.mLnb .dep2 > li > button').on('click', function () {
        if ($(this).next().css('display') == 'block') {
            $(this).parent().removeClass('show');
            $(this).next().slideUp();
        } else {
            $(this).parent().parent().children('li').children('.dep1').next().slideUp();
            $(this).next().slideDown();
            $(this).parent().siblings('li').removeClass('show');
            $(this).parent().addClass('show');
        }
        return false;
    });
    /* //lnb */

    /* show/hide */
    $('.jsBtnAnswer1').on('click', function () {
        $($(this).attr('href')).toggleClass('active');
        return false;
    });
    /* //show/hide */

    /* faq */
    $('.jsFaq1 .q button').on('click', function () {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().parent().children('.q').removeClass('active').next().slideUp();
        } else {
            $(this).parent().parent().children('.q').removeClass('active').next().slideUp();
            $(this).parent().addClass('active').next().slideDown();
        }
    });
    /* //faq */

});

/* isTablet */
function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function addMobileClass() {
    if (isMobile()) {
        $('html').addClass('isMobile');
    } else {
        $('html').removeClass('isMobile');
    }
}

window.addEventListener('load', addMobileClass);
window.addEventListener('resize', addMobileClass);
/* //isTablet */
