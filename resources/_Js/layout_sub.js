var _thisPage_cfg  = {};
function _getHeaderHeight(){
	return $("#header-wrap").outerHeight();
}
function _getFooterHeight(){
	return 0;
//	return $("#header-wrap").outerHeight();
}
////////////////////////////////////////////////////
function topMenuToggle(){
	try {
		clearTimeout(window.scrollAfterEvt);
	} catch(e) {}
	var topMN = $('#topmenu');
	if ( topMN.hasClass("open") ) {
		topMN.removeClass("open");
	} else {
		topMN.addClass("open");
	}
	if ( $("#topmenu-wr").hasClass("open")) {
		$("#topmenu-wr").removeClass("open");
	} else {
		$("#topmenu-wr").addClass("open");
	}
	if($("#topmenu-wr").hasClass("simple")) {
	}
}
function setQuickMenuPosition(){
	var scrTop = $(window).scrollTop();
	var maxH = (wsize.win.h -  (_getHeaderHeight() + _getFooterHeight())) * 1;
	var toTop = scrTop - _getHeaderHeight() ;
	if(toTop < 0) toTop =0;
	$("#adm-side-wrap .quick-mn").css({"maxHeight":maxH,"top":toTop});
	if(scrTop > _getHeaderHeight()) {
		$("#topmenu-wr").addClass("simple");
		//if($("#topmenu").hasClass("open")) $("#topmenu").removeClass("open");
	} else {
		$("#topmenu-wr").removeClass("simple");
		if($("#topmenu").hasClass("open")) $("#topmenu").removeClass("open");
	}
}
function setSideWrapBox(){
	/*
	var winH = wsize.win.h;
	var sideH = winH -  ($("#header-wrap").outerHeight());
	$(".side-mn").css({"border":"1px solid red","height":sideH,"overflow":"hidden"});
	//$(".side-mn").mCustomScrollbar();
	*/
}
function setLayoutMinHeight(){
	$(".doc-wr").css({"minHeight":winH});
	var winH = wsize.win.h;
	var contH = winH -  (_getHeaderHeight() + _getFooterHeight());
	var orgContH = 0;
	$(".adm-contents > div").each(function(){ var thisH = $(this).outerHeight() + parseInt($(this).css("marginTop")) + parseInt($(this).css("marginBottom")); orgContH+=thisH; });
	var orgLmH = 0;
	$(".login-info-box, .side-mn").each(function(){ var thisH = $(this).outerHeight() + parseInt($(this).css("marginTop")) + parseInt($(this).css("marginBottom")); orgLmH+=thisH; });
	var lmH = $("#adm-side-wrap").outerHeight() ;
	var lmH = sideMn.isOpen? orgLmH : contH;
	var minH = (lmH <= orgContH)? lmH : orgContH;
	var maxH = (lmH >= orgContH)? lmH : orgContH;
	var toH = maxH;
	if(toH < contH) toH = contH;
	// console.log("min : " + minH +" / max : "+ maxH +" / orgCont : "+ orgContH+" / toH : "+ toH);
	// console.log(toH);
	// ** $("#container-wrap").css({"min-height":toH +"px"});
	// ** $("#adm-contents").css({"min-height":toH - _getFooterHeight()});
	//$("#container-wrap").css({"min-height":minH,"height":toH,"overflow":"auto"});
	// ** $("#adm-side-wrap .quick-mn").css({"maxHeight":winH -  (_getHeaderHeight() + _getFooterHeight())});
}
function setAdmContentStyle(){
	$(".a-tbl-list tbody tr:odd").addClass("tr1");
	$(".a-tbl-list2 tbody tr:odd").addClass("tr1");
	$(".a-tbl-list3 tbody tr:odd").addClass("tr1");
	if(!_isLowBr_) {
		$("input[type=file]").each(function(){
			var this_s = this;
			$(this).wrap("<span class='is-file-sfrm'></span>");
			$(this).parent().append("<button class='is-fbtn' type='button'><span>파일첨부</span></button>");;
			$(this).bind("change",function(){
				if($(".is-fnm",$(this).parent()).length>0){
					$(".is-fnm",$(this).parent()).text(this.value);
				}else{
					$(this).parent().prepend("<span class='is-fnm'>"+this.value+"</span>");
				}
			});
			$(".is-fbtn",$(this).parent()).click(function(){				$(this).parent().find("input[type='file']").click();			});
			$(".is-fnm",$(this).parent()).click(function(){				$(this).parent().find("input[type='file']").click();			});
		});
	}
}
var sideMn = {
	isOpen : true,
	wrap : null,
	container : null,
	_init:function(){
		this.container = $("#container-wrap");
		this.wrap = $("#adm-side-wrap");
	},
	open:function(){
		this.container.delay(500).removeClass("close");
		var scrFoot = $(window).scrollTop() + wsize.win.h;
			if($(window).scrollTop() > wsize.win.h){
				$(window).scrollTo(0,300);
			}
		this.isOpen = true;
			setTimeout(function(){setLayoutMinHeight();},400);
		},
	close:function(){
		this.isOpen = false;
		this.container.addClass("close");
			setTimeout(function(){setLayoutMinHeight();},400);
	},
	toggle:function(){
		if ( this.isOpen ) {
			this.close();
		} else {
			this.open();
		}
	}
}

////////////////////////////////////////////////////
function setScrollEndLayout(){
	// setQuickMenuPosition();
	// setSidePosition();
}
////////////////////////////////////////////////////

//레이아웃 셋팅(ready 후에 1번만 처리)
function initPageLayout(){
	setLayoutMinHeight();
	setAdmContentStyle();
	sideMn._init();
	initNavigation();
	//$("#header-wrap");
}
function setPageLayout(){
	setLayoutMinHeight();
	setSideWrapBox();
}
//레이아웃 리셋
function resetPageLayout(){
	setLayoutMinHeight();
}
//레이아웃 높이 리셋
function resizePageLayoutHeight(){
}
////////////////////////////////////////////////////

//윈도우 회전시 실행할 함수
function setWindowRotation(){
	if(typeof(thisPageRotation)=="function" && thisPageRotation!=undefined){  thisPageRotation(); }
	else {
		//기본 회전시 실행할 함수
		//resetPageLayout();
	}
}
//document.addEventListener('DOMContentLoaded', loaded, false);
if('onorientationchange' in window){
	window.addEventListener('onorientationchange', setWindowRotation, false);
}

////////////////////////////////////////////////////

$(document).ready(function(){
	try{	getWindowSize();					}catch(e){}
	try{	getPageSize();						}catch(e){}
	try{	setLowBrowser();					}catch(e){}
	try{	setMediaObjectFunc();				}catch(e){}
	try{	initPageLayout();					}catch(e){}
	try{	_thisLayout_style = getPageStyle(); }catch(e){}
	docLoading(function(){
		//initImgSizeInfo();
		//initPageLayout();
	});
});
$(window).load(function(){
	setPageLayout();
});
$(window).resize(function(e){
	//var resizeTimeGap = (_isLowBr_)?  250 : 10;
	var resizeTimeGap = 10;
	if(_isLowBr_) resizeTimeGap=100;
	clearTimeout(window.resizeEvt);
	window.resizeEvt = setTimeout(function() {
		getWindowSize();getPageSize();
		try{
		if(old_wsize.win== undefined ||  wsize.win.w!=old_wsize.win.w){
			resetPageLayout();
		}else{
			resizePageLayoutHeight();
		}
		}catch(e){
			resetPageLayout();
		}
		try{
		$(msgPopArr).each(function(k,pp){
			pp._resize();
		});
		}catch(e){}
	}, resizeTimeGap);
});

$(window).scroll(function(){
	var scrTimeGap = 10;
	if(_isLowBr_) scrTimeGap=200;
	clearTimeout(window.scrollEvt);
	clearTimeout(window.scrollAfterEvt);
	window.scrollEvt = setTimeout(function() {
		////srolling
		setScrollEndLayout();
	}, scrTimeGap);
	window.scrollAfterEvt = setTimeout(function() {
		////srolling End After
		if($("#topmenu").hasClass("open")) $("#topmenu").removeClass("open");
	}, 5000);
});
try {
	$(window).scrollStopped(function(){
		//end sroll
	});
} catch(e){

}