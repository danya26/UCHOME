// const vChatCloud = new VChatCloud();
const vChatCloud = new VChatCloud(
{
	// url: "https://webrtc.onlinesymposium.kr:9001/eventbus",
	// serviceId: "vchatcloud@joytune.co.kr",
},
{
	constraints: {
		video: {
			width: { ideal: 320 },
			height: { ideal: 240 },
		},
		audio: true,
	}
}
);
let fabricWrapper, fileHelper, webrtc;
let channel, userNick, userKey, channelKey;
const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
// channelKey = 'VBrhzLZgGG-nAFo5CS7jp-20210802120142';
// channelKey = 'METAVERSESAMPLELOBBY';
// channelKey = 'xxxxxxxxxxxxxxxxxx';
// channelKey = 'VBrhzLZgGG-nAFo5CS7jp-20210802120142';
// channelKey = 'bwzDMnKGRj-qq0AgH6nDp-20220314141714';
// channelKey = 'MNAuBwVjEV-qoORyBBc5r-20211207104914';
// ** channelKey = params.channelKey || `zaOEAxXUjr-msAYwABDGi-20211201171211`; // ** 공식배포 Demo 포함 코드
channelKey = "kEynwmrABR-HQvq4eNMst-20220523163329";
$(function () {
	// 리소스 로드 res 변수명으로 동작
	if ( webrtc === undefined ) {
		webrtc = new webRTC('.toast_pop', 400, 3000, 800);
		webrtc.console.action('login.js >> ', 'init');
	}

	// 로그인 활성화
	webrtc.login.show();
	var enter = true;
	$('input', webrtc.login ).keyup(function (e) {
		if ( e.keyCode == 13 && enter ) {
			enter = false;
			$('button.rtc3_login_btn', webrtc.login).trigger('click');
		}
	});
	$('button.rtc3_login_btn', webrtc.login).click(function () {
		webrtc.console.action('login.js >> ', 'login start');
		let r = { nick: $('input#name', webrtc.login).val() };
		if (r.nick) {
			try {
				joinRoom(
					channelKey,
					'xxxxxxxxxxxx'.replace(/[xy]/g, function (a, b) {
						return (b = Math.random() * 16), (a == 'y' ? (b & 3) | 8 : b | 0).toString(16);
					}),
					r.nick,
					function (err, history) {
						if ( err ) {
							console.error(err);
							webrtc.login.hide();
							webrtc.alert_popup({ title: '오류', msg: errMsg[err.code].kor }, function () {
								webrtc.rtcLogout();
							});
						} else {
							webrtc.login.hide();
							// 기존 대화내용 삭제
							$('.chat_field > p').remove();
							webrtc.customInit(history, true);
							fabricWrapper = new FabricWrapper();
						}
					}
				);
			} catch (e) {
				console.error('조인 룸 오류');
			}
		}
		enter = true;
	});
	$('.exit.btn_on').click(function () {
		exit(p);
	});
});

// room 에 조인
function joinRoom(roomId, clientKey, nickName, callback) {
	// vchatcloud 객체
	channel = vChatCloud.joinChannel(
		{
			roomId : roomId
			, clientKey : clientKey
			, nickName : nickName
		}
		, function (error, history) {
			if ( error ) {
				if ( callback ) return callback(error, null);
				return error;
			}
			callback(error, history);
		}
	);
}
