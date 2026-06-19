$(function() {
	// 클릭 버튼
	$('div.btn_send').click(function(e) {
		channel.sendMessage({
			message: $('#content').text(),
			mimeType: "text"
		})
		$('#content').text('')
	})
	// 입력창 엔터
	$('#content').keydown(function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			channel.sendMessage({
				message: $(this).text(),
				mimeType: "text"
			})
			$(this).text('');
		}
	});
});
function chatInit() {
	// 신규 메시지 이벤트
	channel.onNotifyMessage = function(event) {
		if (event.grade == 'userManager'){
			write(event, 'userManager')
		}else {
			write(event)
		}
	}
}
function personalInit() {
	// 글쓰기 제한 이벤트
	channel.onPersonalMuteUser = function(event) {
		openError("글쓰기가 제한되었습니다.")
	}
	// 글쓰기 제한 해제 이벤트
	channel.onPersonalUnmuteUser = function(event) {
		openError("글쓰기 제한이 해제되었습니다.")
	}
}
function msgInit() {
	// 공지사항 메시지
	channel.onNotifyNotice = function(event) {
		write(event, 'notice')
	}
	// 유저 입장
	channel.onNotifyJoinUser = function(event) {
		if (channel.clientKey != event.clientKey) {
			write(event, 'join')
		}
	}
	// 유저 나감
	channel.onNotifyLeaveUser = function(event) {
		write(event, 'leave')
	}
	// 유저 추방
	channel.onNotifyKickUser = function(event) {
		write("<font color='blue'><b>" + event.nickName + "</b></font> 님이 채팅방에서 추방되었습니다.");
	}
	// 유저 추방 해제
	channel.onNotifyUnkickUser = function(event) {
		write("<font color='blue'><b>" + event.nickName + "</b></font> 님이 채팅방에서 추방 해제되었습니다.");
	}
	// 글쓰기 제한
	channel.onNotifyMuteUser = function(event) {
		write("<font color='blue'><b>" + event.nickName + "</b></font> 님의 글쓰기가 제한되었습니다.");
	}
	// 글쓰기 제한 해제
	channel.onNotifyUnmuteUser = function(event) {
		write("<font color='blue'><b>" + event.nickName + "</b></font> 님의 글쓰기가 제한 해제되었습니다.");
	}
	// 커스텀 메시지
	channel.onNotifyCustom = function(event) {
		// {"roomId":"QljHXvApdB-hSKvfNLD2y-20200902153935","message":"{\"msg\":\"이벤트에 응모하시겠습니까?\",\"msgType\":\"event\",\"type\":\"popup\"}","nickName":"운영자","clientKey":"","mimeType":"text","messageDt":"20200904162501","messageCount":17}
		let custom = JSON.parse(event.message)
		if (custom.type == "allExit") {
			vChatCloud.disconnect() // 클라이언트에서 채팅방을 나갈수 있도록 한다.
			write(event, 'allExit')
			return;
		}
		try {
			if(event.type =="profile"){
				profileJson[event.clientKey] = custom.profile;
				return;
			}
			if (custom.type == "popup") {
				openPopup(custom.msg, function(val) {
				}, false);
			} else if (custom.type == "notice") {
				write(custom.msg, 'notice')
			} else {
				openPopup(JSON.stringify(custom), function(val) {
				}, true);
			}
		} catch (e) {
			openPopup(JSON.stringify(event.message), function(val) {
			}, true);
		}
	};
}
// $('a:nth-child(1)', $('div.custompopup'))
function openPopup(msg, callback, option) {
	let p = $('div.custompopup').hide();
	$('p:nth-child(1)', p).text(msg);
	$('a:nth-child(2)', p).off().click(function() { p.hide(); if (typeof callback == 'function') { callback("확인") } });
	if (option) {
		$('a:nth-child(3)', p).hide();
	} else {
		$('a:nth-child(3)', p).show();
		$('a:nth-child(3)', p).off().click(function() { p.hide(); if (typeof callback == 'function') { callback("취소") } });
	}
	p.show();
}
function write(msg, tp, pre) {
	let cl = $('div.talk_field div.content1');
	let cc = $('<div>', { class: 'chat-content' });
	switch (tp) {
		case 'join':
			cc = $('<div>', { class: 'notice' });
			if(typeof msg == 'string'){
				cc.append($('<span>').html(msg));
			}else{
				cc.append($('<span>').html(msg.nickName + '님이 입장하셨습니다.'));
			}
			break;
		case 'leave':
			cc = $('<div>', { class: 'notice' });
			cc.append($('<span>').html(msg.nickName + '님이 나가셨습니다.'));
			break;
		case 'notice':
			cc = $('<div>', { class: 'notice' });
			cc.append($('<span><i class="fas fa-flag"></i></span>'));
			cc.append($('<span>').html(typeof msg == 'string' ? msg : msg.message));
			break;
		case 'allExit':
			cc = $('<div>', { class: 'entery' });
			cc.append($('<span>').html('<b>채팅방을 종료합니다.</b>'));
			break;
		case 'userManager':
			cc = $('<div>', { class: 'notice' });
			if (typeof msg == 'string') {
				cc.append($('<span>').html(msg));
			} else if (typeof msg == 'object' && msg.message) {
				if (channel.clientKey != msg.clientKey) {
					cc = $('<div>', { class: 'opponent' });
					cc.append(
						$('<ul>')
						.append($('<li>', { class: 'profile_img' }).append($('<img src="/resources/_Plugin/vChatCloud/kakao/img/profile/admin.png" alt="opponent" width="100%">')))
					);
					cc.append(
						$('<ul>', { class: 'opponent_talk' })
						.append($('<li>', { class: 'admin_kakao_name' }).html(msg.nickName))
						.append($('<li class="admin_text_balloon">').text(msg.message))
					);
				} else {
					cc = $('<div>', { class: 'user' });
					cc.append($('<div>')
						.append($('<ul>')
						.append($('<li>', { class: 'profile_img' }).append($('<img src="/resources/_Plugin/vChatCloud/kakao/img/profile/admin.png" alt="user" width="100%">'))))
						.append( $('<ul>', { class: 'user_talk' })
						.append($('<li>', { class: 'admin_kakao_name' }).html(msg.nickName))
						.append($('<li class="admin_text_balloon">').text(msg.message)))
					);
				}
			}
			break;
		default:
			let imgUrl = profileImgPath[profileJson[msg.clientKey]];
			if (imgUrl == undefined) {
				profileJson[msg.clientKey] = Math.round(Math.random() * 4) + 1;
				imgUrl = profileImgPath[profileJson[msg.clientKey]];
			}
			cc = $('<div>', { class: 'notice' });
			if (typeof msg == 'string') {
				cc.append($('<span>').html(msg));
			} else if (typeof msg == 'object' && msg.message) {
				if (channel.clientKey != msg.clientKey) {
					cc = $('<div>', { class: 'opponent' });
					cc.append(
						$('<ul>')
						.append($('<li>', { class: 'profile_img' }).append($('<img src="'+imgUrl+'" alt="opponent" width="100%">')))
					);
					cc.append(
						$('<ul>', { class: 'opponent_talk' })
						.append($('<li>', { class: 'opponent_name' }).html(msg.nickName))
						.append($('<li class="opponent_text_balloon">').text(msg.message))
					);
				} else {
					cc = $('<div>', { class: 'user' });
					cc.append($('<div>')
						.append($('<ul>')
						.append($('<li>', { class: 'profile_img' }).append($('<img src="'+imgUrl+'" alt="user" width="100%">'))))
						.append( $('<ul>', { class: 'user_talk' })
						.append($('<li>', { class: 'user_name' }).html(msg.nickName))
						.append($('<li class="user_text_balloon">').text(msg.message)))
					);
				}
			}
	};
	if(pre){
		cl.prepend(cc);
	} else {
		cl.append(cc);
	}
	$('div.talk_contents').scrollTop(cl.height());
}