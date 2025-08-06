/**
 * 전화번호 형 변환
 * @param num
 * @param type
 * @returns
 */
function phoneFomatter(num) {
    var mobTelNo = num;

    if (mobTelNo != null && mobTelNo.length > 0) {
        // 일단 기존 - 전부 제거
        mobTelNo = replaceAll(mobTelNo, '-', '');

        if (mobTelNo.length == 11) {
            // 010-1234-1234
            mobTelNo = mobTelNo.substring(0, 3) + '-' + mobTelNo.substring(3, 7) + '-' + mobTelNo.substring(7);

        } else if (mobTelNo.length == 8) {
            // 1588-1234
            mobTelNo = mobTelNo.substring(0, 4) + '-' + mobTelNo.substring(4);
        } else if (mobTelNo.length == 7) {
            // 715-1234
            mobTelNo = mobTelNo.substring(0, 3) + '-' + mobTelNo.substring(3);
        } else if (mobTelNo.length > 8) {
            if (mobTelNo.startsWith('02')) { // 서울은 02-123-1234
                if (mobTelNo.length == 10) {
                    mobTelNo = mobTelNo.substring(0, 2) + '-' + mobTelNo.substring(2, 6) + '-' + mobTelNo.substring(6);
                } else {
                    mobTelNo = mobTelNo.substring(0, 2) + '-' + mobTelNo.substring(2, 5) + '-' + mobTelNo.substring(5);
                }
            } else if (mobTelNo.length == 12) {
                //0507-1234-1234
                mobTelNo = mobTelNo.substring(0, 4) + '-' + mobTelNo.substring(4, 8) + '-' + mobTelNo.substring(8);
            } else {
                // 그외는 012-123-1345
                mobTelNo = mobTelNo.substring(0, 3) + '-' + mobTelNo.substring(3, 6) + '-' + mobTelNo.substring(6);
            }
        }
    }

    return mobTelNo;
}

/**
 * 생년월일 형 변환
 * @param num
 * @returns
 */
function brdtFomatter(str) {
    var mobBrdt = str;
    if (mobBrdt.length() == 8) {
        mobBrdt = mobBrdt.substring(0, 4) + '-' + mobBrdt.substring(4, 6) + '-' + mobBrdt.substring(6);
    }
    return mobBrdt;
}

// 3자리 콤마 찍기(정규식)
function commma(num) {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 오늘알지 가져오기
 * jmw
 * (v) param 옵션 : "" or 0001 / 0002 / 0003
 * 리턴값
 * "" 또는 0001  : 2022-02-25
 * 0002 : 2022/02/25
 * 0003 : 20220225
 */
function getToDate(key) {
    //오늘날짜가져오기(년,월,일)
    var nowDate = new Date();
    var _year = nowDate.getFullYear() + '';	//년도
    var _month = (nowDate.getMonth() + 1) + '';		//월
    var _date = nowDate.getDate() + '';		//날짜

    if (key == '0002') {
        return _year + '/' + (parseInt(_month) < 10 ? '0' + _month : _month) + '/' + (parseInt(_date) < 10 ? '0' + _date : _date);
    } else if (key == '0003') {
        return _year + '' + (parseInt(_month) < 10 ? '0' + _month : _month) + '' + (parseInt(_date) < 10 ? '0' + _date : _date);
    }
    return _year + '-' + (parseInt(_month) < 10 ? '0' + _month : _month) + '-' + (parseInt(_date) < 10 ? '0' + _date : _date);
}

//현재시간 가져오기 HH:mm:ss 형식으로 리턴
function getToTime() {
    var today = new Date();
    var hours = today.getHours(); // 시
    var minutes = today.getMinutes();  // 분
    var seconds = today.getSeconds();  // 초
    //var milliseconds = today.getMilliseconds(); // 밀리초

    return hours + ':' + minutes + ':' + seconds;
}

/**
 * 디엑시트 cms 공통 검색 등록일 조건 > 시작일이 종료일보다 클경우 알림!
 */

if ($('#sc_wDateS, #sc_wDateE').prop('tagName') != undefined) {
    $(document).ready(function () {
        $('#sc_wDateS, #sc_wDateE').change(function () {
            var sDate = $('#sc_wDateS').val();
            var eDate = $('#sc_wDateE').val();
            sDate = sDate.replace(/-/gi, '');
            eDate = eDate.replace(/-/gi, '');
            if (sDate != '' && eDate != '') {
                if (parseInt(sDate) > parseInt(eDate)) {
                    alert('시작일 이후 날짜를 선택하시기 바랍니다.');
                    $('#sc_wDateS').val('');
                    $('#sc_wDateE').val('');
                    //$("#sc_wDateS").focus();
                }
            }
        });
    });
}

/**
 * summerNote 셋팅정보
 */
var summNoteOp = {
    height : 300,
    toolbar: [
        // [groupName, [list of button]]
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link', /*'picture', */'video']],
        ['view', ['fullscreen', 'codeview', 'undo', 'redo']],
    ],/*
	callbacks: {
		onBlurCodeview: function(contents, $editable) {
			$(this).html(contents);
		}
	}*/
};

/**
 * 배열의 모든 정보 조회
 */
var print_r = function (tar) {
    var str = '';
    for (var p in tar) {
        var tmp = tar[p];
        if (tmp != null && tmp.toString != null && tmp.toString() != '') {
            if (str != '') str += ', ';
            str += p.toString() + ' = ' + tmp.toString();
        }
    }
    return str;
};

/**
 * 쿠키 정보 저장
 */
function SetCookie(name, value, expiredays) {
//	var argv = SetCookie.arguments;
//	var argc = SetCookie.arguments.length;
//	var expires = (2 < argc) ? argv[2] : new Date(getDatePlus(365));	// 365일 동안 쿠키 저장
//	var path = (3 < argc) ? argv[3] : null;
//	var domain = (4 < argc) ? argv[4] : null;
//	var secure = (5 < argc) ? argv[5] : false;
//	document.cookie = name + "=" + escape (value) +
//		((expires == null) ? "" :
//		("; expires=" + expires.toUTCString())) +
//		((path == null) ? "" : ("; path=" + path)) +
//		((domain == null) ? "" : ("; domain=" + domain)) +
//		((secure == true) ? "; secure" : "");
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toGMTString() + ';';
}

/**
 * 쿠키 정보 저장
 */
function SetCookie(name, value) {
    var argv = SetCookie.arguments;
    var argc = SetCookie.arguments.length;
    var expires = (2 < argc) ? argv[2] : new Date(getDatePlus(365));	// 365일 동안 쿠키 저장
    var path = (3 < argc) ? argv[3] : null;
    var domain = (4 < argc) ? argv[4] : null;
    var secure = (5 < argc) ? argv[5] : false;
    document.cookie = name + '=' + escape(value) +
        ((expires == null) ? '' :
            ('; expires=' + expires.toUTCString())) +
        ((path == null) ? '' : ('; path=' + path)) +
        ((domain == null) ? '' : ('; domain=' + domain)) +
        ((secure == true) ? '; secure' : '');
}

/**
 * 쿠키 정보 조회
 */
function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
};

/**
 * 문자열의 특수문자로 치환
 * @param {Object} str
 * @param {Object} s1
 * @param {Object} s2
 */
function replaceAll(str, s1, s2) {
    return str.split(s1).join(s2);
}

/**
 * 엔티티코드를 일반 태그로 변경
 */
function unhtmlspecialchars(str) {
    str = replaceAll(str, '&amp;', '&');
    str = replaceAll(str, '&#039;', '\'');
    str = replaceAll(str, '&quot;', '\"');
    str = replaceAll(str, '&lt;', '<');
    str = replaceAll(str, '&gt;', '>');
    str = replaceAll(str, '&middot;', 'ㆍ');

    return str;
}

/**
 * INPUT 유효성 검사
 */
function isEmpty(input) {
    var checkType = false;
    var result = false;

    if (input.length) {
        if (input.length > 0) {
            if (input[0].type == 'checkbox' || input[0].type == 'radio') {
                checkType = true;
            }
        }
    }

    if (checkType) {
        for (var i = 0; i < input.length; i++) {
            if (!input[i].checked) {
                result = true;
            } else {
                result = false;
                break;
            }
        }
    } else {
        if (input.value == null || input.value.replace(/ /gi, '') == '') {
            result = true;
        }
    }

    return result;
}

/**
 * 전체 선택 체크 박스 선택시 리스트 체크박스 전체 채크
 */
function toggleCheck(obj) {

    if ($('.chkKey') == undefined) {

    } else {
        $('.chkKey').each(function (idx, item) {
            $(this).prop('checked', obj.checked);
        });
    }
}

/**
 * 전체 선택 체크 박스 선택시 리스트 체크박스 전체 채크(한 화면에 tab으로 나누어져 2개의 클래스를 사용할경우)
 */
function toggleCheck2(obj) {
    if ($('.chkKey2') == undefined) {

    } else {
        $('.chkKey2').each(function (idx, item) {
            $(this).prop('checked', obj.checked);
        });
    }
}

/**
 * 전체 선택 체크 박스 선택시 리스트 체크박스 전체 채크(한 화면에 tab으로 나누어져 3개의 클래스를 사용할경우)
 */
function toggleCheck3(obj) {
    if ($('.chkKey3') == undefined) {

    } else {
        $('.chkKey3').each(function (idx, item) {
            $(this).prop('checked', obj.checked);
        });
    }
}

/**
 * 정렬 정보 초기화
 */
function orderByReset(orderBy) {
    if ($('#data-table tbody td.dataTables_empty').length == 0) {
        // 순서 정보 초기화
        var orderArr = orderBy.split(' ');

        var sort = (orderArr[1] == 'desc') ? 'asc' : 'desc';
        $('#data-table').find('th').each(function (idx, item) {
            if ($(this).attr('id') == orderArr[0]) {
                $(this).attr('onclick', 'changeOrder(this, \'' + sort + '\');');
                $(this).attr('class', 'sorting_' + orderArr[1]);
            } else if ($(this).attr('id') == undefined) {

            } else {
                $(this).attr('onclick', 'changeOrder(this, \'asc\');');
                $(this).attr('class', 'sorting');
            }
        });
    }
}

/**
 * 정보 리스트 정렬 변경
 */
function changeOrder(obj, v) {
    var f = document.forms['frm'];

    f.orderBy.value = $(obj).attr('id') + ' ' + v;
    f.pageIndex.value = '1';
    f.method = 'get';
    f.submit();
}

if ($('#detailToggle').prop('tagName') != undefined) {
    $(document).ready(function () {
        $('#detailToggle').click(function () {
            var detailAt = $('#sc_detailAt').val();

            if (detailAt != '' && detailAt == 'Y') {
                $('#sc_detailAt').val('');
                $('.scDetail').hide();
                //$(".scDetail").find("input").val("");//주석처리 20210925 중복초기화됨
                $('.scDetail').find('.exit_datepicker').val('');
                $('.scDetail').find('select').val('');
                $('.scDetail').find('input[type=\'checkbox\']').prop('checked', false);
            } else {
                $('#sc_detailAt').val('Y');
                $('.scDetail').show();
            }
        });
    });
}

//관리자 리스트검색시 초기화버튼
if ($('#scAllReset').prop('tagName') != undefined) {
    $(document).ready(function () {
        $('#scAllReset').click(function () {
            $(this).parent().parent().find('input').val('');
            $(this).parent().parent().find('select').val('');
            $(this).parent().parent().find('input[type=\'checkbox\']').val('');
            $('.scDetail').find('.exit_datepicker').val('');
            $('.scDetail').find('select').val('');
            $('.scDetail').find('input[type=\'checkbox\']').prop('checked', false);
        });
    });
}

if ($('#data-table').prop('tagName') != undefined && $('#data-table tbody td.dataTables_empty').length == 0) {
    $('#data-table').DataTable({
        paging   : false,
        searching: false,
        ordering : false,
        language : {
            infoEmpty: '',
        },
    });
}

if ($('.exit_datepicker').prop('tagName') != undefined) {
    let today = new Date();

    let year = today.getFullYear() + 10;
    $('.exit_datepicker').datepicker({
        changeMonth       : true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.
        changeYear        : true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
        currentText       : '오늘 날짜', // 오늘 날짜로 이동하는 버튼 패널
        closeText         : '닫기',  // 닫기 버튼 패널
        minDate           : '1950-01-01',
        yearRange         : '1950:' + year,
        dateFormat        : 'yy-mm-dd', // 텍스트 필드에 입력되는 날짜 형식.
        showMonthAfterYear: true, // 월, 년순의 셀렉트 박스를 년,월 순으로 바꿔준다.
        dayNamesMin       : ['월', '화', '수', '목', '금', '토', '일'], // 요일의 한글 형식.
        monthNamesShort   : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], // 월의 한글 형식.
    });
}

/**
 * 파일 체크
 * 수정 2021.05.27 jmw
 */
function chkFile(obj, type, f, flag, size) {
    if ($(obj).val() == '') {
        return false;
    }

    var ext = obj.value.split('.').pop().toLowerCase();
    var imgArray = '*';

    if (type == 'img') {
        imgArray = new Array('jpg', 'jpeg', 'gif', 'png');
    } else if (type == 'ico') {
        imgArray = new Array('ico');
    } else if (type == 'bizr') {
        // 사업자등록증
        imgArray = new Array('jpg', 'jpeg', 'gif', 'png', 'pdf');
    } else if (type == 'movie') {
        // 영상
        imgArray = new Array('avi', 'mov', 'mp4');
    } else if (type == 'office') {
        imgArray = new Array('doc', 'docx', 'hwp', 'hwpx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'zip');
    } else if (type != 'file') {
        imgArray = new Array(type);
    }

    // 엑셀 파일이 아닐시 리턴
    if (imgArray != '*') {
        if (imgArray.length >= 1 && !array_search(ext, imgArray)) {
            alert(imgArray.toString() + ' 파일만 업로드 가능 합니다.');
            $(obj).val('');
            return false;
        }

        /**
         if(imgArray.length >= 1 != ext) {
         alert(imgArray.toString() + " 파일만 업로드 가능 합니다.");
         $(obj).val("");
         return false;
         }
         */
    }

    if (size == '' || size == null) {
        size = 10;
    }

    if (this.chkFileSize(obj, f, size) && flag) {
        //__setFileData(f);
    }
}

/**
 * 파일 확장자 체크
 * 수정 2021.05.27 jmw
 */
function array_search(str, arr) {
    var rst = true;
    for (var key in arr) {
        if (arr[key] == str) {
            //alert(arr[key] + " / " + str);
            //break;
            return true;
        }
        rst = false;
    }
    //return false || rst;
    //alert(rst);
    return rst;
}

// 모바일 기기 체크
function isMobile() {
    var returnAt = false;

    var filter = 'win16|win32|win64|macintel|mac|'; // PC일 경우 가능한 값
    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            returnAt = true;
        }
    }

    return returnAt;
}

// 아이디 정규식 유효성 검사
function idCheck(v) {
    var regularID = /^[a-zA-Z]+[_a-zA-Z0-9]{1,20}$/;
    return regularID.test(v);
}

// 아이디 정규식 유효성 검사 (영문자로 시작하는 5~15자 영문자+숫자 포함이어야 합니다)
function idCheck2(v) {
    var regularID = /^[a-zA-Z](?=.{0,28}[0-9])[0-9a-zA-Z]{4,14}$/;
    return regularID.test(v);
}

// 비밀번호체크
function chkPW(idObj, pwObj) {

    var pw = pwObj.value;
    var id = idObj.value;

    //var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{9,}$/; 	//9자리이상
    var reg = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; 	//8자리이상
    //var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/; 	//6자리이상
    var hangulcheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (!reg.test(pw)) {
        alert('비밀번호는 9자 이상이어야 하며, 영문/숫자/특수문자를 모두 포함해야 합니다.');
        return false;
    }

    if (/(\w)\1\1\1/.test(pw)) {
        alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
        return false;
    }

    if (pw.search(id) > -1) {
        alert('비밀번호에 아이디가 포함되었습니다.');
        return false;
    }

    if (pw.search(/\s/) != -1) {
        alert('비밀번호는 공백 없이 입력해주세요.');
        return false;
    }

    if (hangulcheck.test(pw)) {
        alert('비밀번호에 한글을 사용 할 수 없습니다.');
        return false;
    }

    return true;
}

//만나이 계산
function getAage(ssnNo) {

    var curDateObj = new Date();//날짜 obj생성
    var tmpSSN = ssnNo;	//주민번호앞
    var curDate = '';	//현재일자
    var tmpAge = 0;	//임시나이
    var y = curDateObj.getFullYear();	//현재년도

    var m = curDateObj.getMonth() + 1;	//현재월
    if (m < 10) {
        m = '0' + m;	//현재 월이 10보다 작을경우 0 문자와 합한다
    }

    var d = curDateObj.getDate();	//현재일
    if (d < 10) {
        d = '0' + d;	//현재 일이 10보다 작을경우 0 문자와 합한다
    }
    curDate = y + m + d;

    var getType = tmpSSN.substring(6, 7);	//주민번호 성별구분 문자 추출
    if (getType <= 2) {
        tmpAge = y - (1900 + parseInt(tmpSSN.substring(0, 2)));	//1,2 일 경우
    } else {
        tmpAge = y - (2000 + parseInt(tmpSSN.substring(0, 2)));	//그외일 경우
    }

    //alert("테스트 : " + tmpAge);
    var tmpBirthDay = tmpSSN.substring(2, 6);	//주민번호 4자리 생일문자 추출
    //alert("테스트 : " + curDate + " / " + (y + tmpBirthDay) );
    if (curDate < (y + tmpBirthDay)) {
        tmpAge--;
    }

    return tmpAge;
}

//주민등록번호를 입력받아 현재일자와 비교하여 개월수 차이 구하기
function getAgeMonth(noF, noB) {
    var tmpNo_F = ''; //주민등록번호_앞
    var sexType = noB.substring(0, 1);//성별구분문자 추출
    if (sexType <= 2) {
        tmpNo_F = '19' + noF;//noF가 850426일때 : 19850426 로 저장
    } else {
        tmpNo_F = '20' + noF;//noF가 850426일때 : 20850426 로 저장
    }
    tmpNo_F = tmpNo_F.substring(0, 4) + '-' + tmpNo_F.substring(4, 6) + '-' + tmpNo_F.substring(6); //포맷변경 0000-00-00 타입으로

    //오늘날짜가져오기(년,월,일)
    var nowDate = new Date();
    var _year = nowDate.getFullYear() + '';	//년도
    var _month = nowDate.getMonth() + '';		//월
    var _date = nowDate.getDate() + '';		//날짜
    var nowYMD = _year + '-' + _month + '-' + _date;	//오늘일자 ex) 20210714

    //만들어진 주민등록번호 앞 과 오늘날짜의 개월수 차이를 구한다
    var sdd = tmpNo_F.split('-');
    var edd = nowYMD.split('-');
    var date1 = new Date(sdd[0], sdd[1], sdd[2]);
    var date2 = new Date(edd[0], edd[1], edd[2]);

    var interval = date2 - date1;
    var tmpDay = 1000 * 60 * 60 * 24;
    var tmpMonth = tmpDay * 30;
    var tmpYear = tmpMonth * 12;

    var rsDay = parseInt(interval / tmpDay);		  	//일 차이
    var rsMonth = parseInt(interval / tmpMonth);			//월 차이
    var rsYear = parseInt(interval / tmpYear);			//년 차이

    //리턴하고 싶은 결과값 골라서... 본 함수는 월차이 리턴

    return rsMonth;
}

//주민등록번호 앞뒤를 입력받아 실제생일을 구한다 ex) 입력 : 850426 , 1470617 -> 리턴 : 1985-04-26
function getRealBirthDay(birthF, birthB) {
    var tmpNo_F = ''; //주민등록번호_앞
    var sexType = birthB.substring(0, 1);//성별구분문자 추출
    if (sexType <= 2) {
        tmpNo_F = '19' + birthF;//noF가 850426일때 : 19850426 로 저장
    } else {
        tmpNo_F = '20' + birthF;//noF가 850426일때 : 20850426 로 저장
    }
    tmpNo_F = tmpNo_F.substring(0, 4) + '-' + tmpNo_F.substring(4, 6) + '-' + tmpNo_F.substring(6); //포맷변경 0000-00-00 타입으로

    return tmpNo_F;
}

//주민등록번호 앞뒤를 입력받아 실제생일을 구한다 ex) 입력 : 850426 , 1470617 -> 리턴 : 19850426
function getRealBirthDay2(birthF, birthB) {
    var tmpNo_F = ''; //주민등록번호_앞
    var sexType = birthB.substring(0, 1);//성별구분문자 추출
    if (sexType <= 2) {
        tmpNo_F = '19' + birthF;//noF가 850426일때 : 19850426 로 저장
    } else {
        tmpNo_F = '20' + birthF;//noF가 850426일때 : 20850426 로 저장
    }
    return tmpNo_F;
}

//입력받은 "yyyy-MM-dd" 10자리 형태의 일자에 입력받은 개월수를 더하여 결과를 리턴
function getRsAddMonthDay(ymd, monthCnt) {
    var rsYMD = '';
    if (ymd != null && ymd.length == 10) {
        var tmpArr = ymd.split('-');
        var date = new Date(tmpArr[0], tmpArr[1], tmpArr[2]);
        date.setMonth(date.getMonth() + monthCnt);
        rsYMD = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    }
    return rsYMD;
}

//현재 일자 구하기 "yyyy-MM-dd" 형식으로 리턴
function getNowDate() {
    var today = new Date();
    var year = today.getFullYear();//연도
    var month = ('0' + (today.getMonth() + 1)).slice(-2);//월
    var date = ('0' + today.getDate()).slice(-2);//일

    return year + '-' + month + '-' + date;
}

//현재 시간 구하기 "HH:mm:ss" 형식으로 리턴
function getNowTime() {
    var today = new Date();
    var hours = ('0' + today.getHours()).slice(-2);//시간
    var min = ('0' + today.getMinutes()).slice(-2);//분
    var sec = ('0' + today.getSeconds()).slice(-2);//초

    return hours + ':' + min + ':' + sec;
}

//ip 유효성체크
function ipCheck(inputText) {
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (ipformat.test(inputText)) {
        return true;
    } else {
        alert('입력하신 값은 IP형식이 아닙니다.');
        //$(this).focus();
        return false;
    }
}

// 이메일 체크
function isEmail(email) {
    let reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return reg.test(email);
}

// 전화번호 체크
function chkTelno(telno) {
    var regTel = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return regTel.test(telno);
}


/**
 * 특정 엘리먼트 ID의 셀렉트 박스에 정보 추가
 * objNm : 엘리먼트 ID
 * key : 옵션의 Key 값
 * name : 옵션의 Value 값
 * selected : 동일값 체크 true/false
 */
function addSelect(objNm, cd, cdNm, selected) {
    var addOpt = document.createElement('option');

    addOpt.value = cd;
    addOpt.selected = selected;
    addOpt.appendChild(document.createTextNode(cdNm));
    $(objNm).append(addOpt);
}

/**
 * 특정 엘리먼트 ID의 셀렉트 박스를 초기화
 */
function delSelect(objNm) {
    $(objNm).find('option').each(function () {
        $(this).remove();
    });
    $(objNm).find('optgroup').each(function () {
        $(this).remove();
    });
}

/**
 * 각종 화면 활성/비활성 설정
 */
function changeDisplay(cls, bln) {
    $('.' + cls).hide();

    if (bln)
        $('.' + cls).show();
}

/**
 * 셀렉트 박스 정보 이동
 */
function changeSelectedOp(afterId, beforeId) {
    $('#' + afterId + ' option:selected').remove().appendTo('#' + beforeId);
}

/**
 * 버전 체크 정규식
 */
function versionCheck(obj) {
    var re = /^(?:(?:[0-9]?[0-9][0-9]?)\.){2}(?:[0-9]?[0-9][0-9]?)$/;

    return re.test(obj.value);
}

/**
 * 날짜 형식 변수 숫자만 추출
 */
function getDateReplaceText(str) {
    str = replaceAll(str, '-', '');
    str = replaceAll(str, ':', '');
    str = replaceAll(str, ' ', '');
    return str;
}

/**
 * 컨텐츠 관리 > 헤더영역 textarea 또는 ck에디터 공백,널값 체크
 */
function contentCNcheck(val) {
    var checker = true;
    var ckSTR = val;
    ckSTR = ckSTR.replace(/ /g, '');
    ckSTR = ckSTR.replace(/<p>/ig, '');
    ckSTR = ckSTR.replace(/<\/p>/ig, '');
    ckSTR = ckSTR.replace(/<br \/>/ig, '');
    ckSTR = ckSTR.replace(/&nbsp;/ig, '');
    ckSTR = ckSTR.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, '');
    ckSTR = ckSTR.replace(/\n/g, '');

    if (ckSTR == '') {
        checker = false;
    }
    return checker;
}

/**
 * 문자열 길이 추출
 * Description : 등록된 길이가 설정된 길이보다 클시 해당 길이 만큼 자른다
 */
function getStrLength(obj, id, len) {
    var str = $(obj).val();
    var strLength = $(obj).val().length;
    if (strLength > len) {
        alert('최대 ' + len + '자까지 입력 가능 합니다.');
        $(obj).val(str.substring(0, len));
        strLength = len;
    }

    if (id != null && id.length > 0)
        $('#' + id).html('<strong>' + strLength + '</strong>/' + len + '자');
}

/**
 * 설정된 길이보다 문자가 길시 자름
 */
function calculateValue(str, len) {
    var tcount = 0;
    var tmpStr = new String(str);
    var tmp = '';
    var onechar;
    for (var k = 0; k < tmpStr.length; k++) {
        onechar = tmpStr.charAt(k);
        tcount += (escape(onechar).length > 4) ? 2 : 1;
        if (len >= tcount)
            tmp += onechar;
    }

    return tmp;
}

/**
 * 문자의 바이트수 리턴
 */
function calculateBytes(str) {
    var tcount = 0;
    var tmpStr = new String(str);
    var onechar;
    for (var k = 0; k < tmpStr.length; k++) {
        onechar = tmpStr.charAt(k);
        tcount += (escape(onechar).length > 4) ? 2 : 1;
    }

    return tcount;
}

function checkImageWH(obj, w, h) {
    var file = obj.files[0];

    var wSize = Number(w);
    var hSize = Number(h);
    showImageSize(obj, file, wSize, hSize);
}

function showImageSize(obj, file, wSize, hSize) {
    var _URL = window.URL || window.webkitURL;

    if (file.type.indexOf('image') != -1) {
        var img = new Image();

        img.src = _URL.createObjectURL(file);
        img.onload = function () {

            if (hSize == 0) {
                if (img.width != wSize) {
                    alert('이미지 가로 허용 사이즈를 초과하였습니다.\n이미지 가로 크기 ' + wSize + '만 업로드 가능합니다.');
                    $(obj).val('');
                    return false;
                }
            } else {
                if (img.width != wSize || img.height != hSize) {
                    alert('이미지 가로세로 허용 사이즈를 초과하였습니다.\n이미지 가로x세로 크기 ' + wSize + 'x' + hSize + '만 업로드 가능합니다.');
                    $(obj).val('');
                    return false;
                }
            }
        };
    }
}

(function ($) {
    /*
     *
     * 같은 값이 있는 열을 병합함
     *
     * 사용법 : $('#테이블 ID').rowspan(0);
     *
     */
    $.fn.rowspan = function (colIdx, isStats) {
        return this.each(function () {
            var that;
            $('tr', this).each(function (row) {
                $('td:eq(' + colIdx + ')', this).filter(':visible').each(function (col) {
                    if ($(this).html() == $(that).html() && ((!isStats || isStats && $(this).prev().html() == $(that).prev().html())
                        && $(this).html() != '소계')) { // 값이 '소계' 이면 rowspan 안함.
                        rowspan = $(that).attr('rowspan') || 1;
                        rowspan = Number(rowspan) + 1;

                        $(that).attr('rowspan', rowspan);
                        // do your action for the colspan cell here
                        $(this).hide();
                        //$(this).remove();
                        // do your action for the old cell here
                    } else {
                        that = this;
                    }

                    //$('#roleTb').colspan(row); // row 돌때 마다 colspan

                    // set the that if not already set
                    that = (that == null) ? this : that;

                });
            });
        });
    };

    /*
     *
     * 같은 값이 있는 행을 병합함
     *
     * 사용법 : $('#테이블 ID').colspan (0);
     *
     */
    $.fn.colspan = function (rowIdx) {

        return this.each(function () {

            var that;
            $('tr', this).filter(':eq(' + rowIdx + ')').each(function (row) {
                $(this).find('td').filter(':visible').each(function (col) {
                    if ($(this).html() == $(that).html()) {
                        colspan = $(that).attr('colSpan') || 1;
                        colspan = Number(colspan) + 1;

                        $(that).attr('colSpan', colspan);
                        $(this).hide(); // .remove();
                    } else {
                        that = this;
                    }

                    // set the that if not already set
                    that = (that == null) ? this : that;

                });
            });
        });
    };
})(jQuery);

//랜덤 문자열 생성
function generateRandomString(length) {
    const CHARSET = 'abcdefghijklmnopqrstuvwxyz0123456789'; // 문자열로 사용할 문자셋

    let randomString = '';
    const bytes = new Uint8Array(Math.ceil((length * 6) / 8)); // 필요한 바이트 길이 계산

    crypto.getRandomValues(bytes); // 안전한 랜덤 값 가져오기

    for (let i = 0; i < length; i++) {
        randomString += CHARSET[bytes[i] % CHARSET.length]; // CHARSET 내에서 랜덤 문자 선택
    }

    return randomString.slice(0, length); // 문자열의 길이를 맞추기 위해 잘라내기
}