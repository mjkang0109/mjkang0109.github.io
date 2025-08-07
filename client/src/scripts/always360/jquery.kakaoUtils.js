/** 카카오 주소 공통 */
(function ($) {
    $.fn.searchAddr = function (callback, isSearchMap) {
        this.click(function () {
            // 주소 검색 API 호출
            new daum.Postcode({
                oncomplete: function (data) {
                    /*
                    // 전북 주소지가 아닐경우
                    if (!data.sigunguCode || !data.sigunguCode.startsWith("52")) {
                        alert('전북 주소지만 입력 가능합니다.');
                        return false;
                    }
                    */

                    let addr = ''; // 주소 변수
                    let extraAddr = ''; // 참고항목 변수

                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;

                        // 법정동명이 있을 경우 추가 (마지막 문자 : "동/로/가")
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열 생성
                        if (extraAddr !== '') {
                            extraAddr = ' (' + extraAddr + ')';
                        }
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }
                    data.addr = addr;
                    data.extraAddr = extraAddr;
                    data.sggNm = data.sigungu;
                    data.areaCd = data.sigunguCode;

                    /* 위도 경도 조회 여부 */
                    if (isSearchMap) {
                        new kakao.maps.services.Geocoder().addressSearch(addr, (result, status) => {
                            // 정상적으로 검색이 완료됐으면
                            if (status === kakao.maps.services.Status.OK) {
                                data.insttLa = result[0].y;
                                data.insttLo = result[0].x;
                                data.b_code = result[0].address.b_code;

                                if (data.b_code && data.b_code.length > 8) {
                                    data.legaldong = data.b_code.substring(0, 8);
                                }
                            }
                            // 콜백 함수 호출
                            if (callback && typeof callback === 'function') {
                                callback(data);
                            }
                        });
                    } else {
                        // 콜백 함수 호출
                        if (callback && typeof callback === 'function') {
                            callback(data);
                        }
                    }
                },
            }).open();
        });
    };
}(jQuery));