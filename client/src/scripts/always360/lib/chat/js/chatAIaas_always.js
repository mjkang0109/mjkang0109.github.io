var projectId = "gmup";
var greetQuery;
var pushQuery;
var errorMsg = "죄송합니다. 문의하신 내용을 찾는데 문제가 발생했습니다.<br>잠시 후 다시 질문해주시기 바랍니다.";
var question_top_html = "<li class=\"new_message_balloon_area answer_area\">";
question_top_html += "<div>";

var question_bottom_html = "</div>";
question_bottom_html += "<p class='chat_time _q'>1</p>";
question_bottom_html += "</li>";

var answer_top_html = "";
answer_top_html += "<li class=\"new_message_balloon_area \">";
answer_top_html += "<div class=\"message_balloon \">";
answer_top_html += "<p class=\"question_tit\">경기도아동언제나돌봄</p>";
answer_top_html += "<p class=\"txt_conversation\" aria-label=\"알림 내용\">";

var answer_bottom_html = "</p></div>";
answer_bottom_html += "<p class=\"chat_time\"></p>";
answer_bottom_html += "<div class=\"category\">";
answer_bottom_html += "<ul class=\"link_list\">";
answer_bottom_html += "<li><a href=\"/always360/childcare/rsvtForm.do?key=2411190006\">돌봄<br/>신청하기</a></li>";
answer_bottom_html += "<li><a href=\"/always360/user/mypage/preInfoRegList.do?key=2401020023\">사전<br/>아동등록</a></li>";
answer_bottom_html += "<li><a href=\"/always360/childcareMap/search.do?key=2401020011\">아동돌봄 <br/> 서비스 지도</a></li>";
answer_bottom_html += "</ul>";
answer_bottom_html += "</div>";
answer_bottom_html += "<div class=\"ansCate\"></div>";
answer_bottom_html += "</li>";

var loading_html = "<li class='new_message_balloon_area' id='loading'>";
loading_html += "<p class='txt_conversation' style='line-height:24px;' aria-label='알림 내용'>";
loading_html += "<div class='loading_wrap'>";
loading_html += "</p></div>";
loading_html += "<p class='chat_time'></p>";
loading_html += "</li>";

var ansCate = "";
/*var ansCate = "<div class='btn_link_wrap'>";
ansCate += "<button class='bull_link'>www.naver.com</button>";
ansCate += "<button>2023년 지방세법령 일부 개정</button>";
ansCate += "</div>";
ansCate += "<div class='answer_box'>";
ansCate += "<p class='answer_box_tit'>2023년 지방세법령 일부 개정</p>";
ansCate += "2023년 지방세법령 일부 개정으로 올해 부터 주택 재산세 부분에 대하여 달라지는 내용은 아래 3가지이다.<br /><br />";
ansCate += "1. 별장 재산세 중과제도 폐지(지방세법 제111조 제1항 3호 가목 폐지)<br />";
ansCate += "- 중과세(4%) 폐지 → 일반 과세 <br /><br />";
ansCate += "2. 1세대 1주택 재산세 공정시장가액비율 인하(지방세법 시행령  제109조)<br />";
ansCate += "- 공시가격 3억이하 43%, 3억~6억이하 44%, 6억초과 45%";
ansCate += "</div>";*/

// 사용자 대기 이벤트
var userWaitTime = 60 * 1000;
var eventBool = true;
var timer;

// 마지막으로 사용된 고유 번호를 추적하는 전역 변수
var lastUsedNumber = 0;
var hasGreeted = false; // 플래그 변수 선언
var typingFinished = false; // 타이핑 완료 여부를 나타내는 플래그
var user_ip = "";
// var chatUrl = "https://ai.ontime.co.kr:10444/"; //운영 URL 로봇과학관
//var chatUrl = "https://chat-saas.ontime.co.kr:28200/"; //운영 URL 신협
// var chatUrl = "https://chat-saas.ontime.co.kr:28300/"; //운영 URL 강남힐링
var chatUrl = "https://chat-saas.ontime.co.kr:28500/"; //운영 URL 경기도아동언제나돌봄

function getIPAddress(callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var response = JSON.parse(xhr.responseText);
			callback(response.ip);
		}
	};
	xhr.open("GET", "https://api64.ipify.org?format=json", true);
	xhr.send();
}

// Get the IP address when the page loads and store it in the user_ip variable
getIPAddress(function (ip) {
	user_ip = ip;
	setApiKey();
});


const secretKey = "jk+EVDJNhUyCLHYXYc9mnCTs8dceocB1lnaGIzeG2DGNh7WF08NZVmwFXIL5bU1t";


function encrypt(value) {
	const key = CryptoJS.SHA256(secretKey);
	const iv = CryptoJS.lib.WordArray.random(16); // Generate random IV

	// AES Encryption with CBC mode and PKCS5 padding
	const encrypted = CryptoJS.AES.encrypt(value, key, {
		iv: iv,
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC
	});

	// Combine IV and encrypted message into one string
	const encryptedData = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
	return encryptedData;
}

function getFormattedLocalDateTime() {
	const now = new Date();

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(now.getDate()).padStart(2, '0');

	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function setApiKey() {
	const now = new Date();
	const formatDateTime = getFormattedLocalDateTime();
	// Prepare the data to be encrypted
	const keyVal = {
		name_id: "sample",
		service_id: "sample service",
		user_ip: user_ip,
		date_time: formatDateTime // Format the date
	};

	const jsonKey = JSON.stringify(keyVal);
	API_KEY = encrypt(jsonKey);
}

function callMsg(type) {
	var query = type;
	var index = $("#index").val();
	var chatmodel = $("#chatmodel").val();

	setApiKey();

	if (!typingFinished) {
		$.ajax({
			url: chatUrl + '/api_cs_chatbot_common',
			type: 'POST',
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: 'json',
			data: {message: query, index: index, model: chatmodel, user_ip: user_ip, API_KEY: API_KEY},
			beforeSend: function beforeSend() {
				//질문 박스					
				var tempStr = "";
				tempStr += question_top_html;
				var sentenceValue = query;
				tempStr += escapeHtml(sentenceValue);
				tempStr += question_bottom_html;
				tempStr += loading_html;

				$(".chat_list").append(tempStr);
				$(".chat_time._q:last").text(getHour());
				$(".chat_time:last").text(getHour());
				// 250408 수정
				$(".chat_list").scrollTop($('.chat_list')[0].scrollHeight);
			},
			success: function (jsonData) {
				ajaxAnswerSuccess(jsonData, 'Y');
			},
			error: function error(request, status, error) {
				doAnswer(errorMsg);
			}
		});
	}

}

function decodeHtmlEntities(text) {
	var textArea = document.createElement('textarea');
	textArea.innerHTML = text;
	return textArea.value;
}


$(document).ready(function () {

	greetQuery = projectId + '_g';
	pushQuery = projectId + '_p';

	async.waterfall([
		function (callback) {
			// IP 체크
			//allowIpChk();
			// IP 체크

			greet = true;
			oneWayQuery(greet);
		}], function (err) {
		if (err) {
			
		} else {
			// 기본 메시지의 시간을 현재 시간으로 변경
			$(".time:last").text(getHour());
			// 질문창 포커스
			$("#sentence").focus();
		}
	});

	let lastClickedTargetId = ""; // 마지막으로 클릭된 항목의 targetId를 저장할 변수
	// 질문 클릭시 답변 노출 효과 적용
	$(document).on('click', '.question-btn', function () {
		var currentTargetId = $(this).data('target'); // 현재 클릭된 항목의 targetId
		var answerText = $('#' + currentTargetId).text();

		var index = $("#index").val();
		var chatmodel = $("#chatmodel").val();

		setApiKey();

		if (!typingFinished) {
			$.ajax({
				url: chatUrl + '/api_cs_chatbot_common',
				type: 'POST',
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				dataType: 'json',
				data: {
					message: answerText,
					index: index,
					model: chatmodel,
					faqAdd: true,
					user_ip: user_ip,
					API_KEY: API_KEY
				},
				beforeSend: function beforeSend() {
					// 질문 박스
					var tempStr = "";
					tempStr += question_top_html;
					var sentenceValue = answerText;
					tempStr += escapeHtml(sentenceValue);
					tempStr += question_bottom_html;
					tempStr += loading_html;
					$(".chat_list").append(tempStr);
					$(".chat_time._q:last").text(getHour());
					// 250408 수정
					$(".chat_list").scrollTop($('.chat_list')[0].scrollHeight);
				},
				success: function (jsonData) {
					ajaxAnswerSuccess(jsonData, 'Y');
					$(".chat_time:last").text(getHour());
				},
				error: function error(request, status, error) {
					doAnswer(errorMsg);
				}
			});
		}
	});

	// 답변 새로 만들기
	$(document).on('click', '.btn_replay', function () {
		var $clickedBtn = $(this);
		var $answerBottom = $clickedBtn.closest('.evalution_area');
		var $messageBalloon = $answerBottom.closest('.message_balloon');

		// 클릭된 버튼 영역 위에 있는 가장 가까운 .new_message_balloon_area.answer_area를 찾음
		var $previousAnswerArea = $messageBalloon.closest('li').prevAll('.new_message_balloon_area.answer_area').first();
		var questionText = $previousAnswerArea.find('div').text().trim();

		if (!questionText) {
			return; // 텍스트를 가져오지 못하면 함수 종료
		}

		var alreadyClicked = $answerBottom.data('already-clicked');

		// 이미 선택한 경우에는 아무것도 하지 않음
		if (alreadyClicked) {
			return;
		}

		// 다중 클릭 방지를 위해 alreadyClicked 값을 true로 설정
		$answerBottom.data('already-clicked', true);

		var index = $("#index").val();
		var chatmodel = $("#chatmodel").val();

		setApiKey();

		if (!typingFinished) {
			$.ajax({
				url: chatUrl + '/api_cs_chatbot_common',
				type: 'POST',
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				dataType: 'json',
				data: {
					message: questionText,
					index: index,
					model: chatmodel,
					user_ip: user_ip,
					API_KEY: API_KEY,
					Srh_Pre_Faq: false
				},
				beforeSend: function beforeSend() {
					// 질문 박스
					var tempStr = "";
					tempStr += question_top_html;
					var sentenceValue = questionText;
					tempStr += escapeHtml(sentenceValue);
					tempStr += question_bottom_html;
					tempStr += loading_html;
					$(".chat_list").append(tempStr);
					$(".chat_time._q:last").text(getHour());
					// 250408 수정
					$(".chat_list").scrollTop($('.chat_list')[0].scrollHeight);
				},
				success: function (jsonData) {
					ajaxAnswerSuccess(jsonData, 'Y');
					$(".chat_time:last").text(getHour());
				},
				error: function error(request, status, error) {
					doAnswer(errorMsg);
				}
			});
		}
	});


	$(document).on('click', '.btn_good, .btn_bad', function () {
		var $clickedBtn = $(this);
		var type = $clickedBtn.data('type');
		var $answerBottom = $clickedBtn.closest('.evalution_area');
		var escapedMessage = $answerBottom.data('escaped-message');

		var escapedReply = $answerBottom.data('escaped-reply');
		var alreadyClicked = $answerBottom.data('already-clicked'); // 이미 선택한 경우를 나타내는 데이터 속성

		// 이미 선택한 경우에는 아무것도 하지 않음
		if (alreadyClicked) {
			return;
		}

		setApiKey();

		// AJAX 호출
		$.ajax({
			url: chatUrl + '/cx_evaluate',
			type: 'POST',
			data: {
				message: encodeURIComponent(escapedMessage),
				index: $("#index").val(),
				cx_eval: type,
				API_KEY: API_KEY,
				assistant_reply: encodeURIComponent(escapedReply)
			},
			success: function (response) {
				// 성공 시, 현재 .answer_bottom 내에서만 클래스 조작
				if (type === 'like') {
					$answerBottom.find('.btn_good').addClass('on').siblings('.btn_bad').removeClass('on');
				} else if (type === 'dislike') {
					$answerBottom.find('.btn_bad').addClass('on').siblings('.btn_good').removeClass('on');
				}
				$answerBottom.data('already-clicked', true);
			},
			error: function (error) {
				
			}
		});
	});
});

var oneWayQuery = function (greet) {
	if (hasGreeted) {
		return; // 함수 실행 중지
	}
	var index = $("#index").val();
	var query = greet ? greetQuery : pushQuery;
	var chatmodel = $("#chatmodel").val();

	$('#sentence').off('keydown');

	if (query == 'gmup_g') {
		$.ajax({
			url: chatUrl + '/api_client_set',
			type: 'POST',
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: 'json',
			data: {index: index},
			success: function (data) {
				const jsonData = {
					msg: 'first',
					topQuest: data.client_settings.top_recommend,
					reply: data.client_settings.introduction,
					title: data.client_settings.title
				}
				ajaxAnswerSuccess(jsonData, 'N');
			},
			error: function error(request, status, error) {
			}
		})
	} else {

		setApiKey();

		$.ajax({
			url: chatUrl + '/api_cs_chatbot_common',
			type: 'POST',
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: 'json',
			data: {message: query, index: index, chatmodel: chatmodel, user_ip: user_ip},
			beforeSend: function beforeSend() {
				//질문 박스
				var tempStr = "";
				tempStr += loading_html;
				$(".chat_list").append(tempStr);
				$(".chat_time:last").text(getHour());
				// 250408 수정
				$(".chat_list").scrollTop($('.chat_list')[0].scrollHeight);
			},
			success: function (jsonData) {
				ajaxAnswerSuccess(jsonData, 'N');
			},
			error: function error(request, status, error) {
				doAnswer(errorMsg);
			}
		});
	}


	hasGreeted = true; // 첫 실행 후 플래그를 true로 설정하여 중복 실행 방지

};

function allowIpChk() {
	var index = $("#index").val();
	var chatmodel = $("#chatmodel").val();
	$.ajax({
		url: '/cmm/ChatIpChk.do',
		type: 'POST',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		dataType: 'json',
		data: {index: index, chatmodel: chatmodel},
		success: function (jsonData) {
			if (jsonData.status == 'allow') {
				location.href = "/cmm/error.do";
			}

		},
		error: function error(request, status, error) {
		}
	});
}


function getHour() {
	return convert12H(checkTime(new Date().getHours()) + ':' + checkTime(new Date().getMinutes()));
}

function doQuestion(q) {
	document.getElementById("sentence").value = q;
	if (q != "") {
		question();
	}
}

var removedSuffix = '';

function typing(originalTextContent, element, pass, callback) {
	let modifiedTextContent = replaceHtmlEntities(originalTextContent);
	if (modifiedTextContent.endsWith('_A')) {
		textContent = modifiedTextContent.slice(0, -2);
		removedSuffix = 'A';
	} else {
		textContent = modifiedTextContent;
		removedSuffix = '';
	}

	let txtIdx = 0;
	let delay = getRandomDelay(20, 100);
	let sentenceEnd = findSentenceEnd(textContent, txtIdx);
	let startTime = Date.now();
	let brCount = 0;

	function getRandomDelay(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function findSentenceEnd(text, startIdx) {
		let endIdx = text.indexOf('.', startIdx);
		if (endIdx === -1) endIdx = text.length;
		return endIdx;
	}

	function replaceHtmlEntities(text) {
		if (typeof text !== 'string') {
			return ''; // 기본값으로 빈 문자열 반환
		}
		return text.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&apos;/g, "'")
			.replace(/\n/g, '<br>'); // \n을 <br>로 변환;;
	}

	function updateScroll() {
		var chatArea = document.querySelector('.chat_area'); // 적절한 선택자로 변경
		if (chatArea) {
			chatArea.scrollTop = chatArea.scrollHeight;
		}
	}

	function typeChar() {
		typingFinished = true;
		if (txtIdx >= textContent.length) {
			if (pass !== "Y") {
				if ($("#index").val() !== "ddm3") {
					$(".ansCate:last").append(ansCate);
				}
			}
			if (callback) {
				callback();
			}
			typingFinished = false;
			return;
		}

		let currentTime = Date.now();
		let elapsedTime = (currentTime - startTime) / 1000;

		if (elapsedTime > 5) {
			delay = getRandomDelay(10, 20);
		} else if (txtIdx > sentenceEnd) {
			delay = getRandomDelay(10, 30);
			sentenceEnd = findSentenceEnd(textContent, txtIdx);
			brCount = 0;
		}

		let remainingText = textContent.substring(txtIdx);

		if (remainingText.startsWith("<br>")) {
			if (brCount < 2) {
				element.appendChild(document.createElement('br'));
				brCount++;
			}
			txtIdx += 4;
			delay = 50; // 고정된 지연 시간 사용
		} else if (remainingText.startsWith("<a href=")) {
			// <a> 태그의 시작을 찾는다.
			let endOfLinkTag = remainingText.indexOf("</a>") + 4; // </a> 태그의 끝을 찾는다.
			let linkHtml = remainingText.substring(0, endOfLinkTag); // 전체 <a> 태그를 추출한다.
			let tempDiv = document.createElement('div');
			tempDiv.innerHTML = linkHtml; // HTML로 파싱한다.
			while (tempDiv.firstChild) {
				element.appendChild(tempDiv.firstChild); // 요소를 element에 추가한다.
			}
			txtIdx += endOfLinkTag; // <a> 태그 전체를 건너뛴다.
		} else {
			element.appendChild(document.createTextNode(remainingText[0]));
			txtIdx++;
			brCount = 0;
		}

		setTimeout(function () {
			typeChar(); // 다음 글자를 타이핑
			updateScroll(); // 이 위치에서 스크롤 업데이트
		}, delay);

	}

	typeChar();
}


// reply 문자열에서 URL을 찾아 링크로 변환하는 함수

function unescapeText(text) {
	if (typeof text !== 'string') {
		return '';
	}
	// \\n -> \n로 복원
	return text.replace(/\\n/g, '\n');
}

function convertUrlsToLinks(text) {
	if (typeof text !== 'string') {
		return '';
	}

	// \\n을 \n로 복원
	const unescapedText = unescapeText(text);

	// URL 정규식
	const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|](?=\s|[\n]|$)|\bwww\.[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|])/ig;

	const convertedText = unescapedText
		.replace(urlPattern, function (url) {
			const prefixedUrl = url.startsWith('www.') ? `http://${url}` : url;
			return `<a href="${prefixedUrl}" target="_blank" style="color:#ff7d14;">${url}</a>`;
		})
		.replace(/\n/g, '<br>'); // 개행 문자를 <br>로 변환
	return convertedText;
}


/*

/*
 * 답변 박스 생성 함수
 * @a 템플릿 wrapping한 string html data
 * @b 템플릿 wrapping 전 json
 */
var title = "";

function doAnswer(a, b, type) {
	/* a를 객체로 만들고
	 * a에 메세지에 스트링 값을 넣고
	 * 바텀 스와이퍼는 따로 조건문 추가하여 붙일 수 있도록
	 * d : json message
	 */
	var urlBtn = "";  // 기본값 설정
	$('#loading').remove();
	var likeBtn = "";
	if (b == 'first') {
	} else {
		var likeBtn = "<div class='evalution_area' data-escaped-message='" + escapeHtml(a.message) + "' data-escaped-reply='" + escapeHtml(a.reply) + "' data-already-clicked='false'>";
		likeBtn += "<button class='btn_good tooltip' data-type='like'><em class='bull_tail'></em><span class='tooltiptext tooltip-bottom'>좋아요</span><span class='screenOut'>좋아요</span></button>";
		likeBtn += "<button class='btn_bad tooltip' data-type='dislike'><em class='bull_tail'></em><span class='tooltiptext tooltip-bottom'>싫어요</span><span class='screenOut'>나뻐요</span></button>";
		likeBtn += "<button class='btn_replay tooltip' data-type='replace'><em class='bull_tail'></em><span class='tooltiptext tooltip-bottom'>응답 다시 생성</span><span class='screenOut'>replay</span></button>";
		likeBtn += "</div>";
		if ($("#chatmodel").val() == 'sLLM') {
			if (a && a.ref_url && a.ref_url.length > 1) {
				urlBtn = "<div class='btn_detail_wrap'><button class='btn_detail' onclick='goLink(\"" + a.ref_url + "\");'>상세 보러 가기</button></div>";
			}
		}
	}

	var tempStr = answer_top_html;
	tempStr += a.reply ? a.reply : a;
	tempStr += likeBtn;

	if (b != 'first' && type == 'Y') {
		var $tempStrElement = $(tempStr);
	}

	if (b == 'first') {
		tempStr += answer_bottom_html;
		$(".chat_list").append(tempStr.replace(/\\n/g, "<br>"));
	} else {
		$(".chat_list").append(tempStr.replace(/\n/g, "<br>"));
	}

	/*	// 카테고리 HTML 동적 생성
        if (Array.isArray(a.topQuest)) {
            var category_html = "";
            a.topQuest.forEach(function (item) {
                var escapedItem = item.replace(/'/g, "\\'"); // 작은따옴표 이스케이프
                category_html += "<li class=\"new_message_balloon_area answer_area\">";
                category_html += `<div onclick="javascript:callMsg('${escapedItem}')">${item}</div>`;
                category_html += "</li>";
            });

            // 초기 호출시 카테고리 노출
            if (b === 'first') {
                $(".category").append(category_html);
            } else {
                // 타이핑 효과 적용
                const newMessage = $(".chat_list .new_message_balloon_area:last .txt_conversation");
                const textContent = newMessage.html();
                newMessage.html(""); // 초기화
                //typing(convertUrlsToLinks(textContent), newMessage[0]);
                typing(convertUrlsToLinks(textContent), newMessage[0], '', function () {
                    // 타이핑이 끝난 후 urlBtn을 추가
                    if ($("#chatmodel").val() == 'sLLM') {
                        if (newMessage.length > 0 && urlBtn) {
                            newMessage.append(urlBtn);
                        }
                    }
                });
            }
        } else {
            const newMessage = $(".chat_list .new_message_balloon_area:last .txt_conversation");
            const textContent = newMessage.html().replace(/(?<!\d)\.(\s|\n)/g, '.<br>$1');
            newMessage.html(""); // 초기화
            //typing(convertUrlsToLinks(textContent), newMessage[0]);
            typing(convertUrlsToLinks(textContent), newMessage[0], '', function () {
                // 타이핑이 끝난 후 urlBtn을 추가
                if ($("#chatmodel").val() == 'sLLM') {
                    if (newMessage.length > 0 && urlBtn) {
                        newMessage.append(urlBtn);
                    }
                }
            });
        }*/

	// 타이틀 변경.
	if (title == '') {
		title = a.title;
	}
	/*
        $('.chat_id').append('<img src=<c:url value="/resource/www/lib/chat/images/childcare_icon/logo_icon.svg" />" alt="360돌봄">');
        $('.chat_id').text(title);
    */
	if (removedSuffix == 'A') {
		$(".chat_time:last").text(getHour()).css({'text-decoration': 'underline'});
	} else {
		$(".chat_time:last").text(getHour());
	}
	//$(".chat_time:last").text(getHour());
	$('#sentence').keydown();
	// 250408 수정
	$(".chat_list").scrollTop($('.chat_list')[0].scrollHeight);

	$('.chat_list li').attr("tabindex", "");
	// 250527 웹접근성 아동돌봄서비스지도 초점 2번 이동됨으로 주석처리
	//$('.chat_list li:last-of-type').attr("tabindex", "0").focus();
}

function showAnsCate() {
	$(".ansCate:last").append(ansCate);
}

function moveToUrl(url) {
	//clearBottomButton();
	window.open(url, '_blank');
}

function doQuestion(_query, hidden_query) {
	var query = _query ? _query : $('#sentence').val();
	var index = $("#index").val();
	var blank_query = query;
	var chatmodel = $("#chatmodel").val();

	blank_query = blank_query.replace(/^\s+|\s+$/g, "");
	if (blank_query != "") {
		if (hidden_query == undefined) hidden_query = query;

		if (eventBool) {
			eventBool = false;
			$("#sentence").on("keydown", function () {
				clearInterval(timer);
				timer = window.setTimeout(oneWayQuery, userWaitTime);
			});
		}

		var ajaxSend = true;
		// var jsonData = undefined;
		hidden_query = hidden_query.replace(/<(\/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(\/)?>/gi, " ");	// html태그 없애기
		if (query.length > 0) {
			if (ajaxSend) {
				$.ajax({
					url: chatUrl + '/api_cs_chatbot_common',
					type: 'POST',
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					dataType: 'json',
					data: {message: query, index: index, model: chatmodel, user_ip: user_ip, API_KEY: API_KEY},
					beforeSend: function beforeSend() {
						//질문 박스
						var tempStr = "";
						tempStr += question_top_html;
						tempStr += decodeURIComponent(hidden_query);
						tempStr += question_bottom_html;
						tempStr += loading_html;

						$(".chat_list").append(tempStr);
						$(".chat_time:last").text(getHour());
						$("#sentence").val("");
						$('#hidden_query').val("");
						// 250408 수정
						$(".chat_list").scrollTop($('.chat_list')[0].scrollHeight);
					},
					success: ajaxAnswerSuccess,
					error: ajaxAnswerError
				});
			}
		}
	}
}

var isLoading = false; // 새로운 로딩 상태 플래그
// 질문하기
function question() {
	if (isLoading) {
		return; // 로딩 중이면 함수 실행을 중단
	}

	if (eventBool) {
		eventBool = false;
		$("#sentence").on("keydown", function () {
			clearInterval(timer);
			timer = window.setTimeout(oneWayQuery, userWaitTime);
		});
	}
	var ajaxSend = true;

	var paramObj = $('#question_frm');
	$('input[name="sentence"]', paramObj).val($('#sentence').val());

	var query = $('#sentence').val();
	var index = $("#index").val();
	var chatmodel = $("#chatmodel").val();

	if (!typingFinished) { // 타이핑 하고 있을때는 질문 불가
		if (query.length > 0) {
			if (ajaxSend) {
				isLoading = true; // 로딩 시작

				setApiKey();

				$.ajax({
					url: chatUrl + '/api_cs_chatbot_common',
					type: 'POST',
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					dataType: 'json',
					data: {message: query, index: index, model: chatmodel, user_ip: user_ip, API_KEY: API_KEY},
					beforeSend: function () {
						//질문 박스
						var tempStr = "";
						tempStr += question_top_html;
						var sentenceValue = $('#sentence').val();
						tempStr += escapeHtml(sentenceValue);
						tempStr += question_bottom_html;
						tempStr += loading_html;

						$(".chat_list").append(tempStr);
						$(".chat_time._q:last").text(getHour());
						$("#sentence").val("");
						// 250408 수정
						$(".chat_list").scrollTop($('.chat_list')[0].scrollHeight);
					},
					success: function (jsonData) {
						ajaxAnswerSuccess(jsonData, 'N');
					},
					error: ajaxAnswerError,
					complete: function () {
						isLoading = false; // 요청 완료 후 로딩 상태 해제
					}
				});
			}
		}
	}

}

//12시간변환
function convert12H(time) {
	let hour = parseInt(time.substring(0, 2));
	let suffix = hour < 12 ? "오전" : "오후";
	hour = hour % 12 || 12; // 12시와 0시를 모두 12로 처리
	return suffix + ' ' + ('0' + hour).slice(-2) + time.slice(-3);
}


//시간앞자리0맞춰주기
function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

Array.prototype.contains = function (elem) {
	for (var i in this) {
		if (this[i] == elem) return true;
	}
	return false;
}

function escapeHtml(str) {
	if (str === undefined || str === null) {
		return "";
	}
	return str.toString().replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

// 원본글의 상세 링크 이동
function goLink(link) {
	window.open(link, '_blank');
}

function ajaxAnswerSuccess(jsonData, type) {
	/*var escapedMessage = escapeHtml(jsonData.message);	
	var escapedReply = escapeHtml(jsonData.reply);*/
	//오디오 처리
	if (jsonData.audio == 'Y') {
		var file = jsonData.speech_file_path.replace('./', '/');
		var audio = new Audio(chatUrl + '' + file); // 파일 경로 수정
		audio.play();
	}

	if (JSON.stringify(jsonData) == "{}") {
		//callback('iChatResponseIsNone');
	} else {
		//답변박스
		var dataS = jsonData.reply.replace(/(?<!\d)\.(\s|\n)/g, '.<br>$1');
		var data = dataS.replace(/\n/g, "<br>");
		var msg = jsonData.msg;
		// 'out' 키의 내용을 조회
		var outContents = jsonData.out;
		if (outContents != undefined) {
			if ($("#index").val() != "ddm3") {
				ansCate = "<div class='btn_link_wrap'>";

				outContents.forEach(function (item) {
					if (item.질문 != "") {
						lastUsedNumber += 1; // 각 질문과 답변 쌍에 대해 고유 번호 증가
						var currentNumber = lastUsedNumber; // 현재 항목의 고유 번호를 변수에 저장
						// 각 질문에 고유 ID 부여
						ansCate += "<button class='question-btn' data-target='answer-" + currentNumber + "'>" + item.질문 + "</button>";
						// 해당하는 답변에 동일한 고유 ID 부여
						ansCate += "<div id='answer-" + currentNumber + "' class='answer_box' style='display:none;'>";
						ansCate += "<p class='answer_box_tit'>" + item.질문 + "</p>";
						var answerContent = item.답변.replace(/\n/g, "<br>").replace(/'/g, "&#39;");
						ansCate += "<div class='typing_effect' data-typing-content='" + encodeURIComponent(answerContent) + "'></div>"; // 타이핑 효과 적용을 위한 요소
						ansCate += "</div>";
					}
				});
				ansCate += "</div>";
			}
		}

		if (data != undefined) {
			try {
				var jAnswer = JSON.parse(data);
				doAnswer(wrapTemplate(jAnswer), jAnswer, type);
			} catch (e) {
				doAnswer(jsonData, msg, type);
			}
		} else {
			doAnswer(errorMsg);
		}
	}
}


function ajaxAnswerError(request, status, error) {
	doAnswer(errorMsg);
	//callback(null);
}



