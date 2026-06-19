const vChatCloud = new VChatCloud();
let channel, userNick, userKey, profileJson = {}, channelKey="";
let profileImgPath = {
	"1": "/resources/_Plugin/vChatCloud/kakao/img/profile/1.png"
	,"2": "/resources/_Plugin/vChatCloud/kakao/img/profile/2.png"
	,"3": "/resources/_Plugin/vChatCloud/kakao/img/profile/3.png"
	,"4": "/resources/_Plugin/vChatCloud/kakao/img/profile/4.png"
	,"5": "/resources/_Plugin/vChatCloud/kakao/img/profile/5.png"
};
var getParameters = function (paramName) {
	// 리턴값을 위한 변수 선언
	var returnValue;
	// 현재 URL 가져오기
	var url = location.href;
	// get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
	var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
	// 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
	for ( var i = 0; i < parameters.length; i++ ) {
		var varName = parameters[i].split('=')[0];
		if (varName.toUpperCase() == paramName.toUpperCase()) {
			returnValue = parameters[i].split('=')[1];
			return decodeURIComponent(returnValue);
		}
	}
};
// ** channelKey = getParameters('channelKey');
channelKey = "dyADasDvWI-6eAPGrv1x4-20220523162856";
$(function() {
	let p = $('#vcContainer.vChatKakao div.login').show();
	let c = $('#vcContainer.vChatKakao div.talk_field').hide();
	// 프로필 이미지 선택
	$("#vcContainer.vChatKakao .login .profile ul li a").click(function () {
		$('#vcContainer.vChatKakao .login .profile ul li a').attr('class', '');
		$(this).attr('class', 'active');
	});
	$('button.popupbtn', p).click(function() {
		let r = {nick: $('input#name', p).val() };
		if ( r.nick ) {
			joinRoom(
				channelKey
				, 'xxxxxxxx'.replace(/[xy]/g, function(a, b) { return (b = Math.random() * 16
				, (a == 'y' ? b & 3 | 8 : b | 0).toString(16)) })
				, r.nick
				, function(err, history) {
					if ( err ) {
						openError(err.code, function() {
							p.show();
							c.hide();
							vChatCloud.disconnect();
						});
					} else {
						// 채팅영역에 글쓰기가 활성화될시 활성화
						let noticeMsgCnt = 0;
						if ( typeof write == 'function' ) {
							history && history.forEach(function(m) {
								if ( m.messageType == "notice" ) {
									if ( noticeMsgCnt == 0 ) {
										noticeMsgCnt++;
										write(m, 'notice', true);
									}
								} else {
									write(m,'' ,true);
								}
							});
						}
						p.hide();
						c.show();
						// 이벤트 바인딩 시작
						chatInit();
						personalInit();
						msgInit();
						var param = {
							"profile": $('#vcContainer.vChatKakao div.login div.profile a.active').attr("profile")
						};
						channel.sendCustom({
							message: JSON.stringify(param)
							,type : "profile"
						});
					}
				}
			);
		} else {
		}
	});
})

function joinRoom( roomId, clientKey, nickName, callback ) {
	// vchatcloud 객체
	channel = vChatCloud.joinChannel({
		roomId : roomId
		, clientKey : clientKey
		, nickName : nickName
	}, function( error, history ) {
		$('#vcContainer.vChatKakao div.talk_contents div.content1 div').remove();
		if ( error ) {
			if ( callback ) {
				return callback(error, null);
			}
			return error;
		}
		if ( callback ) {
			callback(null, history);
		}

		// 채팅영역에 글쓰기가 활성화될시 활성화
		if ( typeof write == 'function' ) {
			write("vChatCloud 오픈채팅방에 입장하셨습니다.", 'join');
		} else {
		}
	});
	console.groupEnd();
}
function openError(code, callback) {
    let p = $('div.errorpopup').hide();
    if(errMsg[code] == undefined){
        $('p:nth-child(2)', p).text(code);
    } else {
        $('p:nth-child(2)', p).text(errMsg[code].kor);
    }
    $('a', p).off().click(function() { p.hide(); if (typeof callback == 'function') { callback() } });
    p.show();
}