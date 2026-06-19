

//풀탭스크립트 jquery.cs_tab.js 필요
$(document).ready(function(){
	try{
		defaultTabSetting();
	}catch(e){}
});

function defaultTabSetting(){
	$("#multi-tab01").multiTab_fwidth({line_limit:4,height:56});
}

// 단일폴딩
function viewFolingItem(id,h){

	if($('#'+id).hasClass("isOpen")){
		$('#'+id).stop().animate({"height":0},400);
		$('#'+id).removeClass("isOpen");
		$("#"+id+"-tit a").removeClass("over");
	}else{
		$('#'+id).stop().animate({"height":h},400);
		$('#'+id).addClass("isOpen");
		$("#"+id+"-tit a").addClass("over");
	}

}
//다중폴딩 cms
$(function(){
	var foldObj = $(".foldings-wrap li");
	var foldBtn = $("a", foldObj);

	foldBtn.on("click",function(){
		if($(this).parent().parent().hasClass("over")){
			$(this).parent().parent().removeClass("over");
			$(this).parent().parent().find(".foldings-in-cont").slideUp("fast", function(){	$(this).removeClass("over")});
		} else {
			$(".foldings-wrap li .foldings-in-cont").not($(this).attr("href")).slideUp("fast", function(){$(this).removeClass("over")});
			$(".foldings-wrap li").not($(this)).removeClass("over");
			$($(this).attr("href")).addClass("over").slideDown("fast");
			$($(this),foldObj).parent().parent().addClass("over");
		}
	return false;
	});
});


// 상단으로 이동 버튼 효과
$(window).scroll(function () {
	if($(this).scrollTop() > $(window).height() * 1) {  // 나타나는 위치값
		$('.topBt').fadeIn();
	} else {
		$('.topBt').fadeOut();
	}
});

$('.topBt').click(function () {
	$('html, body').animate({ scrollTop: 0 }, 300);  // top 위치 및 속도
	return false;
});


// 반응형 테이블
function setMinWidthAutoScrollBox(){
	$(".is-wauto-box").each(function(){

		var obj = $(">*",$(this)).eq(0);
		var minW = parseInt(obj.css("min-width"));
		var objW = parseInt(obj.width());
		if(minW<=0) minW = objW;

		var this_s = $(this);

		if($(this).width() < minW){

			$(this).css({"overflow-x":"scroll"});//.attr("tabindex","0");
			if($(this).parent().hasClass("wauto-wrap")){
				$(".scroll-info",$(this).parent()).remove();
				$(this).unwrap();
			}
			$(this).wrap("<div class='wauto-wrap'></div>");


			if($(".scroll-info",$(this).parent()).length<1 	&& this_s.attr("srcbox")!="1"){
				$(this).parent().prepend("<div class='rsv-info'><p class='ico'>좌우로 스크롤하시면 내용이 보입니다.</p></div>");

				$(".scroll-info",$(this).parent()).css({"width":"100%","height":"100%","display":"block","z-index":"1000"})

				$(".scroll-info button",$(this).parent()).click(function(){
					this_s.attr("srcbox","1");
					$(this).parents(".is-wauto-box > *").eq(0).focus();
					$(this).parent().remove();
				});
			}

		}else{
			if($(this).parent().hasClass("wauto-wrap")){
				$(".scroll-info",$(this).parent()).remove();
				$(this).unwrap();
			}
			$(this).css({"overflow-x":"auto"});//.attr("tabindex","0");
		}
	});
}

$(document).ready(function(){

	setMinWidthAutoScrollBox();

});