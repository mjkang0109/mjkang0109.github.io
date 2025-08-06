//$(document).ready(function() {
// layer_popup();
// popupSwiper();
// });
window.onload = function () {
    layer_popup();
    popupSwiper();
};


function layer_popup() {
    var focusedElementBeforeModal;

    // 모든 팝업 버튼에 대해 이벤트 리스너 추가
    $('[id^="btn_popup"]').each(function (index, element) {
        var modalId = $(element).attr('id').split('_')[1]; // btn_ 부분을 제거하여 modalId를 가져옴
        var modalClass = '#' + modalId; // modalId를 사용하여 팝업의 ID를 생성
        var modal = document.querySelector(modalClass);
        var modalOverlay = document.querySelector('.bg_dimm');
        var modalToggle = element;

        modalToggle.addEventListener('click', function (e) {
            openModal(modal, modalOverlay);
            $('html, body').css({'overflow': 'hidden'});
            e.preventDefault();
        });
    });


    function openModal(modal, modalOverlay) {
        focusedElementBeforeModal = document.activeElement;

        if (!modal) {
            console.error('Modal element not found');
            return;
        }

        modal.addEventListener('keydown', trapTabKey);
        modalOverlay.addEventListener('click', function () {
            closeModal(modal, modalOverlay);
        });

        var signUpBtn = modal.querySelector('.btn_close');
        if (signUpBtn) {
            signUpBtn.addEventListener('click', function (e) {
                closeModal(modal, modalOverlay);
                $('html, body').css({'overflow': ''});
                e.preventDefault();
            });
        }

        // 모달 표시
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';

        // 포커스를 받을 수 있게 설정
        modal.setAttribute('tabindex', '0');

        // 모달 자체에 포커스
        setTimeout(function () {
            modal.focus();
        }, 0);

        function trapTabKey(e) {
            var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
            var focusableElements = modal.querySelectorAll(focusableElementsString);
            focusableElements = Array.prototype.slice.call(focusableElements);
            var firstTabStop = focusableElements[0];
            var lastTabStop = focusableElements[focusableElements.length - 1];

            if (e.keyCode === 9) {
                if (focusableElements.length === 0) {
                    e.preventDefault();
                    return;
                }

                if (e.shiftKey) {
                    if (document.activeElement === firstTabStop) {
                        e.preventDefault();
                        lastTabStop.focus();
                    }
                } else {
                    if (document.activeElement === lastTabStop) {
                        e.preventDefault();
                        firstTabStop.focus();
                    }
                }
            }

            if (e.keyCode === 27) {
                closeModal(modal, modalOverlay);
            }
        }
    }


    function closeModal(modal, modalOverlay) {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        focusedElementBeforeModal.focus();
    }
}


function popupSwiper() {
    // 팝업 스와이프
    const popupSwiper = new Swiper('.pupup_swiper_wrap', {
        slidesPerView     : 1.75,
        spaceBetween      : 10,
        centeredSlides    : false,
        slidesPerGroupSkip: 1,
        grabCursor        : true,
        keyboard          : {
            enabled: true,
        },
        breakpoints       : {
            960: {
                slidesPerView : 2.2,
                slidesPerGroup: 2,
            },
            320: {
                slidesPerView : 1.75,
                slidesPerGroup: 2,
            },
        },
        scrollbar         : {
            el: '.swiper-scrollbar',
        },
    });
}