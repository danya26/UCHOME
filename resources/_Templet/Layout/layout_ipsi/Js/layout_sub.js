////////////////////////////////////////////////////
	var _isLowBr_ = false,_isMobile_ = false;
	var _thisPage_cfg  = {};

	// 레이아웃 셋팅(로딩완료된 후에만 1번만 처리)
	function initPageLayout() {
		//resetTabSize();
		setContAutoWidth();
		//_setLayoutFooter();
		resetImgZoom();
	}

	// 레이아웃 리셋
	function resetPageLayout() {
		mainNavi._reset();
		resetTabSize();   // 탭메뉴 사용시 주석제거
		resetImgZoom();
		setContAutoWidth();
		_resetFooterHeight();
	}

	// 레이아웃 높이 리셋
	function resizePageLayoutHeight() {
	}

	// 윈도우 회전시 실행할 함수
	function setWindowRotation() {
		if(typeof(thisPageRotation)=="function" && thisPageRotation!=undefined){  thisPageRotation(); }
		else {
			//기본 회전시 실행할 함수
			//resetPageLayout();
		}
	}
	//document.addEventListener('DOMContentLoaded', loaded, false);
	if('onorientationchange' in window) {
		window.addEventListener('onorientationchange', setWindowRotation, false);
	}

	$(document).ready(function() {
		//console.log("1.Ready");
		try{getWindowSize();	}catch(e){}
		try{getPageSize();	}catch(e){}
		if(_isMobile_) $alertLoading("Page Loading...");
		try{setLowBrowser();	}catch(e){	}
		try{setMediaObjectFunc();	}catch(e){	}
		try{ _thisLayout_style = getPageStyle(); }catch(e){}
		try{ resetTabSize(); }catch(e){}
		initNavigation();
		docLoading(function(){
			//console.log("3.docLoad");
			//initImgSizeInfo();
			initPageLayout();
			//resetImgZoom();

			renderKakaoMap();
		});
		subUtil.init();
		subUtilNavi.init();
	});
	$(window).load(function() {
		//console.log("2.Load");
	});
	$(window).resize(function(e) {
		//var resizeTimeGap = (_isLowBr_)?  250 : 10;
		var resizeTimeGap = 10;
		if(_isLowBr_) resizeTimeGap=100;
		clearTimeout(window.resizeEvt);
		window.resizeEvt = setTimeout(function() {
			//console.log("Resize");
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
		}, resizeTimeGap);
	});
	$(window).scroll(function() {
		clearTimeout(window.scrollEvt);
		window.scrollEvt = setTimeout(function() {
			////srolling
		}, 250);
	});
	try {
		$(window).scrollStopped(function() {
			//end sroll
		});
	} catch(e){
	}
////////////////////////////////////////////////////

// ** 서브페이지 공통
var subUtil = {
	init : function() {
		$cUtilWr = $("#contents .cont-top .cont-util");
		subUtil.hideImg();
		subUtil.snsPkg();
		subUtil.prtPkg();
	},
	hideImg : function() {	// ** 이미지 없을때
		$("img").each(function(){
			var $this = $(this);
			var wImgObj = $this.attr("src");
			if(wImgObj == null || wImgObj == ''){
				$this.css("display","none");
			}
		});
	},
	snsPkg : function() {
		// ** 페이지 타이틀 부분 SNS공유 유틸.
		$cUtilSnsTgler = $(".btn-share", $cUtilWr );
		$cUtilSnsList = $(".sns-list", $cUtilWr );
		$cUtilSnsCloser = $(".sns-closer", $cUtilWr );
		$cUtilSnsTgler.on("click", function() {
			if ( $(this).hasClass("is-open") ) {
				$cUtilSnsList.slideUp();
				$(this).removeClass("is-open");
			} else {
				$cUtilSnsList.slideDown();
				$(this).addClass("is-open");
			}
		});
		$cUtilSnsCloser.on("click", function() {
			$cUtilSnsList.slideUp();
			$cUtilSnsTgler.removeClass("is-open").focus();
		});
	},
	tabIsFull : function() {
		$cTabCore = $("body .c-tab01");
		$cTabStdL = 5;
		if($cTabCore.length > 0){
			$cTabLInum = $("> ul > li", $cTabCore).length;
			if($cTabLInum >= $cTabStdL){
				$cTabCore.addClass("has"+ $cTabLInum);
			}
		}
		$("> ul > li", $cTabCore).each(function() {
			$("span", $(this)).wrap("<span></span>");
		});
	},
	prtPkg : function() {
		// ** 페이지 타이틀 부분 프린트 유틸.
		$cUtilPrinter = $(".btn-print", $cUtilWr );
		$cUtilPrinter.on("click", function() {
			printCore();
		});
		function printCore() {
			try {
				window.print();
			} catch( e ) {
				alert("미지원 브라우저입니다.\n웹 브라우저의 인쇄 기능을 이용해주시기 바랍니다.");
			}
		}
	}
}

// ** 서브페이지 나비
var subUtilNavi = {
	init : function() {
        this.navArrSet();
	},
	navArrSet : function() {
        // ** 변수선언부
        var sVis = $("#svisual-wrap");
        var mNavi = $("#mainNavi");
		$arrPrevBtnPkg = $(".contLnk-prev", sVis );
		$arrNextBtnPkg = $(".contLnk-next", sVis );

        // ** 현재페이지의 정보를 추출할필요가 없다.
        // ** drillDown에서 종말노드(자식하위가 없는 a태그의 부모 li)를 찾고, 이 종말노드의 over클래스가 있을때 그 메뉴가 현재페이지의 버튼이다.
        this.drillDown( mNavi );
	},
	drillDown : function( mNaviObj ) {
        // ** topmenu a태그 배열화. 단, 하위자식 ul>li 구조가 없는 a태그만으로 구성.
        var mNaviArr = new Array();
        var mNaviThisStr, mNaviThisLnk, mNaviThisTgt;
		var mNaviThisOver;
        var mNaviThisIdx, mNaviPrevIdx, mNaviNextIdx;
        var mNaviTerminalBtnNode = $("li > a", mNaviObj ).filter( function() { if( $(this).next().length < 1 ) return $(this) } );
        var mNaviTerminalBtnNodeLen = mNaviTerminalBtnNode.length;
		var mNaviHasOver = 1;						// ** over 클래스 존재여부 검사용 변수.
        mNaviTerminalBtnNode.each( function( index ) {
            mNaviThisStr = util.frontEndTrimming( $(this).text() );
            mNaviThisLnk = $(this).attr("href");
			mNaviThisTgt = ( $(this).attr("target") ) ? " | _blank":" | _self";
            if ( $(this).hasClass("over") ) {
                mNaviThisIdx = index;
                mNaviThisOver = " | over";
				mNaviHasOver = mNaviHasOver * 0;	// ** over클래스가 한번이라도 발견되면, mNaviHasOver변수는 그 순간부터 계속 [0] 유지.
            } else {
                mNaviThisOver = "";
				mNaviHasOver = mNaviHasOver * 1;	// ** over클래스가 발견되지 않으면, mNaviHasOver변수는 [1]로 유지되면서 each순회탐색 마무리.
            }
            mNaviArr[index] = index + " | " + mNaviThisStr + " | " + mNaviThisLnk + mNaviThisOver + mNaviThisTgt;
        });
		if ( mNaviHasOver ) return false;			// ** mNaviHasOver변수 셋팅과정 확인. ↑ [1]일 경우 over클래스가 발견되지 않은 케이스.

        // ** topmenu 배열화 임시 출력.
        /*
        console.group( "topmenu 링크 추출" );
        $.each( mNaviArr, function( index, item ) {
            console.log( "item : " + item );
        });
        console.groupEnd();
        // */

		// ** 현재노드는 반드시 존재한다. 없다면 위 mNaviHasOver의 조건에서 프로그램 탈출.
		mNaviThisNode = this.findLiNode( mNaviArr[mNaviThisIdx], mNaviObj );	2
		mNaviThisNode.addClass("node-Stdd");

        // ** 추출된 현재메뉴의 순번으로 이전, 다음메뉴의 순번을 구한다음 해당 index의 배열 value를 findLiNode로 전달
		// ** 현재노드가 종말노드중 첫번째일 경우
		mNaviPrevIdx = mNaviThisIdx - 1;
        if ( mNaviThisIdx == 0 ) {
			// ** console.log( "PREV is NULL" );
            mNaviPrevNode = null;
        } else {
            $arrPrevBtnPkg.show();
			mNaviPrevNode = this.findLiNode( mNaviArr[mNaviPrevIdx], mNaviObj );
            mNaviPrevNode.addClass("node-Prev");	// ** Prev노드 발견시 화면상 육안확인을 위한 클래스 셋팅
			this.setClosestNodeInfo( mNaviArr[mNaviPrevIdx], $arrPrevBtnPkg );   // ** 종말노드배열중의 정보로 이전메뉴 버튼 셋팅
        }

		// ** 현재노드가 종말노드중 마지막일 경우
		mNaviNextIdx = mNaviThisIdx + 1;
        if ( mNaviThisIdx == (mNaviTerminalBtnNodeLen-1) ) {
			// ** console.log( "NEXT is NULL" );
            mNaviNextNode = null;
        } else {
			$arrNextBtnPkg.show();
            mNaviNextNode = this.findLiNode( mNaviArr[mNaviNextIdx], mNaviObj );
			mNaviNextNode.addClass("node-Next");	// ** Next노드 발견시 화면상 육안확인을 위한 클래스 셋팅
			this.setClosestNodeInfo( mNaviArr[mNaviNextIdx], $arrNextBtnPkg );   // ** 종말노드배열중의 정보로 다음메뉴 버튼 셋팅
        }
	},
	setClosestNodeInfo : function( btnInfo, btnObj ) {
		var btnInfoArr = btnInfo.split(" | ");
		var arrTxt = btnInfoArr[1];
		var arrLnk = btnInfoArr[2];
		var arrTar = btnInfoArr[3];
		$("span", btnObj ).text( arrTxt );
		if ( arrTar == "_blank" ) {
			btnObj.attr({ "href":arrLnk, "target":arrTar, "title":"새창열기" });
		} else {
			btnObj.attr({ "href":arrLnk, "target":arrTar });
		}
	},
    findLiNode : function( strPkg, mNaviObj ) {
        // ** console.log( "strPkg : " + strPkg );
        var strArr = strPkg.split(" | ");
        var strNum = strArr[0];
        var strTit = strArr[1];
        var strLnk = strArr[2];
        // ** console.log( "strNum : " + strNum + " / strTit : " + strTit + " / strLnk : " + strLnk );
        $findTag = $("a", mNaviObj ).filter(
            function() {
                if ( $("span", $(this) ).text() == strTit && $(this).attr("href") == strLnk ) {
                    return $(this);
                }
            }
        ).parent();
        return $findTag;
    }
}