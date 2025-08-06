/**
 * 로그인 이미지 호출
 * msg : 메시지 내용
 * w : 가로 사이즈
 * h : 세로 사이즈
 */
function lodingFixedOn(msg, w, h) {
    var l = (window.innerWidth - w) / 2;
    var t = (window.innerHeight - h) / 2;

    var str = '<div class="loding_line" style="position:fixed; z-index:10000; left:' + l + 'px; top:' + t + 'px; width:' + w + 'px; height:' + h + 'px; background-color:#fff; border-radius:5px 5px">' +
        '<div class="loading loding_line" style="top:' + (h / 2 - 10) + 'px;">' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
        '</div>' +
        '<div class="loading_txt" style="padding-left:' + (w * 0.3) + 'px;height:' + h + 'px;">' +
        msg + '<br>잠시만 기다려 주세요.' +
        '</div>' +
        '</div>' +
        '<div class="ui-widget-overlay ui-front loding_line" style="position:fixed; top:0; left:0; width:100%; height:100%; z-index:9999; background:repeat-x scroll 50% 50% #AAA; opacity:0.3;"></div>';

    $(document.body).css('overflow-y', 'hidden');
    $(document.body).append(str);
}

/**
 * 로딩 이미지 제거
 * target : 타겟 Object
 */
function lodingOff(target) {
    $(target).css('overflow-y', 'auto');
    $(target).find('.loding_line').remove();
}

function lodingFixedOn() {
    $('#load').css('display', 'block');
}

function lodingOff() {
    $('#load').css('display', 'none');
}