//-------------------------------------------------
	var _thisLayout_style = {};var _orgLayout_style = {};
	function checkPageStyle(){
		_orgLayout_style =  $.extend({},_thisLayout_style);  _thisLayout_style = getPageStyle();
	}
	function getPageStyle(){
		var pg_type = {};
		var chkW = $("#header").width();
		if(_isLowBr_ && chkW >999) chkW = wsize.win.w;
		return pg_type;
	}
	function _resetFooterHeight(){
		if($("#fsitemap").hasClass("is-open")){
			var toH = $("#fsitemap .fsitemenu").outerHeight();
			$("#fsitemap").css({"height":toH + 40});
		}
	}
	function _getLayoutHeaderHeight(){
		return	$("#header-wrap").outerHeight();
	}
	function resetTabSize(){
		var tabLimit = 6;
		try{
			if(_thisPage_cfg.tab_line_limit!=undefined && _thisPage_cfg.tab_line_limit) tabLimit = _thisPage_cfg.tab_line_limit;
		}catch(e){}
		setContTabmenu();
	}
	function setContTabmenu(){
		//$(".c-tab01").rspnsvTab_fauto({height:50,line_limit:6,wsize_data:[{"wsize":740,"list_mod":4},{"wsize":600,"list_mod":3},{"wsize":480,"list_mod":2},{"wsize":360,"list_mod":1}]});
		//$(".c-tab01").rspnsvTab_fauto({height:64,line_limit:6,wsize_data:[{"wsize":999,"list_mod":4},{"wsize":700,"list_mod":1}]});
		//$(".c-tab02").not(".noAutoTab").rspnsvTab_auto({height:40,showCtrlBtns:true,ctrlBtnWidth:40,line_limit: 5});
		/*
		$(".b-tab01").not(".noAutoTab").rspnsvTab_auto({height:58,showCtrlBtns:true,ctrlBtnWidth:51,line_limit:5});
		$(".b-tab01#multi-tab01 .first-row").each(function(){
			var ctWidth = $(this).width() - 2;
			var ct_w = $(this).width();
			$(this).css({width:ctWidth});
		});
		*/
	}
	function setContAutoWidth(){
		if($(".is-wauto-box").length>0 ) {
			if( typeof(setMinWidthAutoScrollBox) !="function" )  $.getScript("/resources/_Js/jquery/jquery.cs_wauto.js",function(){ setMinWidthAutoScrollBox(); });
			else{ setMinWidthAutoScrollBox(); }
		}
	}
	function resetImgZoom(){
		var zwObj =  $('.img-zoom');
		zwObj.each(function(){
			var this_s = $(this);
			var zwObjImg = this_s.children("img");
			var zwObjUrl = zwObjImg.attr("src");
			var win_w = $(window).innerWidth();
			if ( win_w <= 768 ) {
				if ( $(".btn-zoom", this_s).length < 1 ) {
					this_s.append("<a href='" + zwObjUrl + "' class='btn-zoom' target='_blank' title='새창열림'><span class='blind'>이미지 확대보기</span></a>");
					zwObjImg.addClass("zoom");
				}
			} else {
				$(".btn-zoom, .btn-down", $(this).parent()).remove();
				zwObjImg.removeClass("zoom");
			}
		});
	}
//-------------------------------------------------

$(function(){
	allPagePkg.init();
});
var allPagePkg = {
	init : function() {
		// ** body.loaded
		this.loadedFakeSet();

		// ** Gnavi 언어 UI.
		$gnaviWr = $("#gNavi");
		$gnaviLang = $(".langPkg", $gnaviWr );
		this.gNaviLangSet();

		// ** Footer 탑버튼.
		$footWr = $("#footer-wrap");
		$footTopBt = $(".topBt", $footWr );
		this.footTopBtnSet();

		// ** Footer 관련사이트 관련.
		$footRel = $(".fmlsPkg", $footWr );
		$footRelSite = $(".fSite", $footWr );
		this.footRelSiteSet( "Y" );

		// ** Footer 메뉴 모바일 UI
		this.footMenuUiCast();

		// ** Header & Footer 로고 이미지 사이즈셋( width, height )
		this.eachLogosSizeSet();
	}
	, loadedFakeSet : function() {
		setTimeout(function () {
			$("body").addClass("loaded");
		}, 400);
	}
	, gNaviLangSet : function() {
		if ( $gnaviLang.length > 0 ) {
			$(".caster", $gnaviLang ).on("click", function() {
				if ( $gnaviLang.hasClass("over") ) {
					$gnaviLang.removeClass("over");
					$(".langSet", $gnaviLang ).slideUp();
				} else {
					$gnaviLang.addClass("over");
					$(".langSet", $gnaviLang ).slideDown();
				}
			});
			$(".closer", $gnaviLang ).on("click", function() {
				$gnaviLang.removeClass("over");
				$(".langSet", $gnaviLang ).slideUp();
				$(".caster", $gnaviLang ).focus();
			});
		}
	}
	, footTopBtnSet : function() {
		$(window).scroll(function () {
			if ($(this).scrollTop() > $(window).height() * 0.2) {
				$footTopBt.addClass("over");
			} else {
				$footTopBt.removeClass("over");
			}
		});
		$footTopBt.click(function () {
			$("html, body").animate({
				scrollTop:  0
			}, 300);
			return false;
		});
	}
	, footRelSiteSet : function( mCsutomSCB ) {
		if ( mCsutomSCB == "Y" ) {
			$(window).on("load",function(){
				$(".sel", $footRel ).mCustomScrollbar();
			});
		}
		$footRelSite.each(function() {
			$("dt button", $(this) ).on("click", function(e){
				var linkWr = $(this).parent("dt").siblings("dd");
				if ( $(this).hasClass("is-open") ) {
					$(this).removeClass("is-open").focus();
					$(linkWr).slideUp("fast");
				} else {
					$(this).addClass("is-open");
					$(linkWr).slideDown("fast");

					$satisfyWr = $(".satisfy-wrap");
					if ( $satisfyWr.length > 0 ) {
						$satisfySnsBtn = $(".unit.unit-sns .btn-cast", $satisfyWr );
						if ( $satisfySnsBtn.hasClass("is-open") ) {
							$satisfySnsBtn.trigger("click");

						}
					}
				}
			});
			$("dd button", $(this) ).click(function(){
				$("button", $(this).parent().prev() ).removeClass("is-open").focus();
				$(this).parent().slideUp("fast");
			});
		});
	}
	, footMenuUiCast : function() {
		$footer = $("#footer-wrap");
		$fMenu = $(".fts-link", $footer );
		$fMenuUl = $("ul", $fMenu );
		$fMenuArrBtn = $("button", $fMenu );
		let fMenuVar = new FootMenu( $fMenuArrBtn, $fMenuUl );	// ** FootMenu 클래스 생성자.
	}
	, eachLogosSizeSet : function() {
		var logoHeadImg = $("#header .slogo img");
		var logoHeadCore = new LogoImgSizeSet( logoHeadImg );
		var logoFootImg = $("#footer-wrap .flogo img");
		var logoFootCore = new LogoImgSizeSet( logoFootImg );
	}
}

// ** 모바일 Footer
function FootMenu( fArr, fMenu ) {
	this.targetBtn = null;
	this.targetUl = null;
	this.targetUlscrollUnit = 50;
	this.init( fArr, fMenu );
	this.targetCast();
}
FootMenu.prototype.init = function( fArr, fMenu ) {
	this.targetBtn = fArr;
	this.targetUl = fMenu;
}
FootMenu.prototype.targetCast = function() {
	let fMenuUl = this.targetUl;
	let fMenuUlDist = this.targetUlscrollUnit;
	this.targetBtn.on("click", function() {
		let fMenuUlLeft = fMenuUl.scrollLeft();
		if ( $(this).hasClass("btn-prev") ) {
			fMenuUl.stop().animate({
				"scrollLeft" : fMenuUlLeft - fMenuUlDist
			});
		} else {
			fMenuUl.stop().animate({
				"scrollLeft" : fMenuUlLeft + fMenuUlDist
			});
		}
	});
}

// ** 이미지 사이즈 셋팅
function LogoImgSizeSet( target ) {
	this.target = null;
	this.init( target );
	this.initCast();
}
LogoImgSizeSet.prototype.init = function( target ) {
	this.target = target;
}
LogoImgSizeSet.prototype.initCast = function() {
	var imgW = this.target.width();
	var imgH = this.target.height();
	this.target.attr({ "width":imgW, "height":imgH, "data-size":"ok" });
}