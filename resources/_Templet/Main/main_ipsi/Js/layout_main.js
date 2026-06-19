////////////////////////////////////////////////////
	var _thisSite = {};	var _thisPage = {};
	var _isLowBr_ = false,_isMobile_ = false;
	var _thisPage_cfg  = {};

	//레이아웃 리셋
	function resetPageLayout(){
		mainNavi._reset();
		_resetFooterHeight();

		//팝업이미지 리사이징에 따른 높이 처리
		if($(".top-wide-popups").attr("isOpen")=="1"){
			resetTopWidePopups();
		}
	}

	//레이아웃 높이 리셋
	function resizePageLayoutHeight(){
	}

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

	$(document).ready(function(){
		//console.log("1.Ready");

		//initPageCssFiles();
		try{getWindowSize();	}catch(e){}
		try{getPageSize();	}catch(e){}
		if(_isMobile_) $alertLoading("Page Loading...");
		try{setLowBrowser();	}catch(e){	}
		try{setMediaObjectFunc();	}catch(e){	}
		try{ _thisLayout_style = getPageStyle(); }catch(e){}
		initNavigation();
		docLoading(function(){
			// console.log("3.docLoad");
			// initImgSizeInfo();
		});
	});

	$(window).load(function(){
		//console.log("2.Load");
	});

	$(window).resize(function(e){
		//var resizeTimeGap = (_isLowBr_)?  250 : 10;
		var resizeTimeGap = 10;
		if(_isLowBr_) resizeTimeGap=100;
		clearTimeout(window.resizeEvt);
		window.resizeEvt = setTimeout(function()
		{
			//console.log("Resize");
			getWindowSize();
			getPageSize();
			try{
			if(old_wsize.win== undefined ||  wsize.win.w!=old_wsize.win.w){
				resetPageLayout();
			}else{
				resizePageLayoutHeight();
			}
			}catch(e){
				resetPageLayout();
			}
		}, resizeTimeGap);
	});
////////////////////////////////////////////////////