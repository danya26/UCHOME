/*
$(document).ready(function() {
	var userId = "";
	var nickname = "";
	$("#user_nickname").val("").focus();
	$("#user_id").val( getUserId() );
	$("#user_nickname").change(function() {
		userId = $("#user_id").val().trim();
		nickname = $("#user_nickname").val().trim();
	});
	$("#user_nickname").keydown(function(e) {
		if ( e.which == 13 ) {
			nickname = $("#user_nickname").val().trim();
			login();
		}
	});
	$("#btn_start").click(function() {
		login();
	});
	function login() {
		if ( nickname.isEmpty() ) {
			alert("Please enter user nickname");
			return;
		}
		window.location.href = "&userid=" + encodeURIComponent(userId) + "&nickname=" + encodeURIComponent(nickname) + "&sbChat=active";
	}
});
// */
$(document).ready(function() {
	var userId = "";
	var nickname = "";
	$("#user_nickname").val("");
	$("#user_id").val("");
	$("#user_nickname").change(function() {
		userId = $("#user_id").val().trim();
		nickname = $("#user_nickname").val().trim();
	});
	$("#user_nickname").keydown(function(e) {
		if ( e.which == 13 ) {
			nickname = $("#user_nickname").val().trim();
			login();
		}
	});
	$("#btn_start").click(function() {
		login();
	});
	function login() {
		if ( nickname.isEmpty() ) {
			alert("닉네임은 반드시 입력해주세요.");
			return;
		}
		var sbLink = $("#sbLink").val();
		var sbCode = $("#sbCode").val();
		window.location.href = sbLink + "?mCode=" + sbCode + "&userid=" + encodeURIComponent(userId) + "&nickname=" + encodeURIComponent(nickname) + "&sbChat=active";
	}
});