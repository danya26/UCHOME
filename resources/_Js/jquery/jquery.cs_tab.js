$(function() {
	cTabMenu.init();
	bTabMenu.init();
});

var cTabMenu = {
	init : function() {
		$(window).on("load", function() {
			cTabMenu.getTabState();
		});
		this.mTabCast();
		this.mTabAbtnCast();
		this.mBrResize();
	},
	getTabState : function() {
		var thiss = this;
		if ( $(window).width() <= 800 ) {
			$("body .c-tab01").each(function() {
				if ( $(this).hasClass("noAutoTab") ) {
					return false;
				} else {
					thiss.setMtab( $(this), "set" );
				}
			});
			$("body .c-tab02").each(function() {
				if ( $(this).hasClass("noAutoTab") ) {
					return false;
				} else {
					thiss.setMtab( $(this), "set" );
				}
			});
			$("body .uoPart-wr .upTab").each(function() {
				thiss.setMtab( $(this), "set" );
			});
			$("body .hasManualTab1").each(function() {
				if ( $(this).hasClass("noAutoTab") ) {
					return false;
				} else {
					thiss.setMtab( $(this), "set" );
				}
			});
		} else if ( $(window).width() > 800 ) {
			$("body .c-tab01").each(function() {
				if ( $(this).hasClass("noAutoTab") ) {
					return false;
				} else {
					thiss.setMtab( $(this), "release" );
				}
			});
			$("body .c-tab02").each(function() {
				if ( $(this).hasClass("noAutoTab") ) {
					return false;
				} else {
					thiss.setMtab( $(this), "release" );
				}
			});
			$("body .uoPart-wr .upTab").each(function() {
				thiss.setMtab( $(this), "release" );
			});
			$("body .hasManualTab1").each(function() {
				if ( $(this).hasClass("noAutoTab") ) {
					return false;
				} else {
					thiss.setMtab( $(this), "release" );
				}
			});
		}
	},
	setMtab : function( $obj, action ) {
		var num = util.getNumberOnly( $obj.attr("class").split(" ")[0] );
		var txt = $("ul li.over a span", $obj ).text();
		if ( txt == "" ) {
			txt = "하위메뉴 선택하기";
		}
		if ( action == "set" ) {
			$obj.addClass("mSet");
			if ( $obj.find(".ctab" + num + "Ctrl").length <= 0 ) {
				$obj.prepend("<button class='ctab" + num + "Ctrl'><span>" + txt + "</span></button>");
			}
			$("ul", $obj).hide();
			$("button", $obj ).removeClass("over");
		} else if ( action == "release" ) {
			$obj.removeClass("mSet");
			if ( $obj.find(".ctab" + num + "Ctrl").length >= 1 ) {
				$obj.find(".ctab" + num + "Ctrl").remove();
			}
			$("ul", $obj).show();
		}
	},
	mTabCast : function() {
		$(document).on("click", ".mSet > button", function() {
			var thisb = $(this);
			$tabUL = $(this).next();
			if ( $(this).hasClass("over") ) {
				$(this).removeClass("over");
				$tabUL.slideUp();
			} else {
				$(this).addClass("over");
				$tabUL.slideDown();
			}
			$(".mSet").each(function() {
				$notThisb = $(".mSet > button").not( thisb );
				if ( $notThisb.hasClass("over") ) {
					$notThisb.removeClass("over");
					$notThisb.next().slideUp();
				}
			});
		});
		$(".mSet ul li a").on("click", function() {
			$txtMsg = $("span", $(this) ).text();
			$(this).closest("ul").prev().find("span").text( $txtMsg );
			$(this).closest("ul").prev().trigger("click");
		});
	},
	mTabAbtnCast : function() {
		var mTabAbtn = $(".mSet ul li a");
		mTabAbtn.on("click", function() {
			$(this).closest("ul").prev().removeClass("over");
			$(this).closest("ul").slideUp();
		});
	},
	mBrResize : function() {
		var cTabWidth = $(window).width();
		$(window).resize(function() {
			if ( cTabWidth != $(window).width() ) {
				cTabMenu.getTabState();
				cTabWidth = $(window).width();
			}
		});
	}
}

var bTabMenu = {
	init : function() {
		$bTab = $(".b-tab01");
		$bTabUL = $("ul", $bTab );
		$bTabLI = $("li", $bTabUL );
		$bTabMCSB = null;
		$bTabMcsbUnit = null;
		$bTabMCSB_ingFnc = null;
		if ( $bTab.hasClass("noAutoTab") ) {
			return false;
		} else {
			if ( $bTab.length > 0 ) {
				this.bTabCast();
			} else {
				return false;
			}
		}
	},
	bTabCast : function() {
		bTabMenu.tabConfig().done( function( message ) {
			// ** console.log( message );
			bTabMenu.tabGen();
			bTabMenu.disabledBtnCast();
		}).fail( function( error ) {
			// ** console.log( error );
		}).always( function() {
			// ** console.log( "완료" );
		});
	},
	tabConfig : function() {
		$deferred1 = $.Deferred();
		try {
			// ** 기본 b-tab01탭 구조 구성
			$("ul", $bTab ).wrap("<div class='tabinwr'></div>");
			$bTab.append("<div class='button-wr'><button class='btn-prev'><span class='blind'>이전</span></button><button class='btn-next'><span class='blind'>다음</span></button></div>");
			if ( $("li.all", $bTabUL ).length > 0 ) {
				$bTab.addClass("hasOutAll");
				if ( $("li.all", $bTabUL ).hasClass("over") ) {
					$bTabAllBtn = "<div class='outAll over'>" + $("li.all", $bTabUL ).html() + "</div>"
				} else {
					$bTabAllBtn = "<div class='outAll'>" + $("li.all", $bTabUL ).html() + "</div>"
				}
				$bTab.prepend( $bTabAllBtn );
				$("li.all", $bTabUL ).remove();
			} else {
				$bTab.removeClass("hasOutAll");
			}
			$deferred1.resolve( "tabConfig 성공" );
		} catch( err ) {
			$deferred1.reject( err )
		}
		return $deferred1.promise();
	},
	tabGen : function() {
		$bTabIN = $(".tabinwr", $bTab );
		$bTabLiAll = $("li.all", $bTabUL );
		$bTabLILen = $bTabLI.length;
		$bTabArr = $(".button-wr", $bTab );
		this.sizeSet();
		this.brResize();
	},
	disabledBtnCast : function() {
		// ** disabled 셋팅된 버튼클릭시 alert 생성.
		$("button", $bTabArr ).on("click", function() {
			if ( $(this).hasClass("disabled") ) {
				if ( $(this).hasClass("btn-prev") ) {
					alert( "이전 카테고리가 없습니다." );
				} else if ( $(this).hasClass("btn-next") ) {
					alert( "다음 카테고리가 없습니다." );
				}
			}
		});
	},
	brResize : function() {
		$resizeFnc = null;
		$(window).on("resize", function() {
			clearTimeout( $resizeFnc );
			$resizeFnc = setTimeout(
				function() {
					// $bTabLI.removeClass("removeBar");	// ** 화면당 최우측 바 제거 클래스 초기화후 삽입.
					bTabMenu.sizeSet();
				}
			, 300 );
		});
	},
	sizeSet : function() {
		$w_w = $(window).width();
		if ( 1400 <= $w_w ) {
			$bTabType = 5;
		} else if ( 1200 <= $w_w && $w_w < 1400 ) {
			$bTabType = 4;
		} else if ( 900 <= $w_w && $w_w < 1200 ) {
			$bTabType = 3;
		} else if ( 600 <= $w_w && $w_w < 900 ) {
			$bTabType = 2;
		} else {
			$bTabType = 1;
		}
		$bTabUL.css({ "left":0 });
		bTabMenu.setWidth( $bTabType );
	},
	setWidth : function( type ) {
		$bTabUnit = type;
		// ** console.log( "($bTabLILen-1) : " + ($bTabLILen-1) + " / type : " + type + " / $bTab.width() : " + $bTab.width() + " / $bTabUL.width() : " + $bTabUL.width() );
		// ** console.log( "($bTabLILen-1) : " + ($bTabLILen-1) + " / type : " + type + " / $bTab.outerWidth() : " + $bTab.outerWidth() + " / $bTabUL.outerWidth() : " + $bTabUL.outerWidth() );
		// ** console.log( "($bTabLILen-1) : " + ($bTabLILen-1) + " / type : " + type + " / $bTabIN.width() : " + $bTabIN.width() + " / $bTabUL.outerWidth() : " + $bTabUL.outerWidth() );
		// ** console.log( "($bTabLILen-1) : " + ($bTabLILen-1) + " / type : " + type + " / -- #3 -- $bTabIN.width() : " + $bTabIN.width() + " / $bTabUL.width() : " + $bTabUL.width() );
		if ( $bTabLILen <= type ) {		// ** 버튼개수가 구간별 선언개수보다 적으면
			// ** console.log( "버튼 제거" );
			$bTabArr.addClass("hide").removeClass("show");
			$bTab.addClass("arrKeyHide");
		} else {
			// ** console.log( "버튼 생성" );
			$bTabArr.addClass("show").removeClass("hide");
			$bTab.removeClass("arrKeyHide");
		}
		// ** console.log( "$bTabIN.width() : " + $bTabIN.width() + " / $bTabUnit : " + $bTabUnit + " = " + ( $bTabIN.width() / $bTabUnit ) );
		$bTabLIW = Math.floor( ( $bTabIN.width() ) / $bTabUnit * 1 ) / 1;
		$bTabLI.css({ "width":$bTabLIW+"px" });

		// ** mCSB snapAmount 갱신
		$bTabMCSB = $bTabIN
		$bTabMCSB.mCustomScrollbar("destroy");
		$bTabMCSB.mCustomScrollbar({
			axis : "x"
			, theme : "dark"
			, autoHideScrollbar : false
			, scrollbarPosition : "outside"
			, scrollInertia : 400
			, scrollButtons : {
				enable : true
				, scrollType : "stepped"
				, scrollAmount : $bTabLIW
			}
			, advanced : {
				autoExpandHorizontalScroll : false
			}
			, keyboard : {
				scrollType : "stepped"
			}
			, mouseWheel : {
				scrollAmount : $bTabLIW
			}
			, snapAmount : $bTabLIW
			, callbacks : {
				onInit : function(){
					// ** console.log( "setWidth - tabConfig" );
					if ( $("li.over", $(this) ).length > 0 ) {
						setTimeout( function() {
							$bTabMCSB.mCustomScrollbar("scrollTo", $("li.over", $bTabMCSB ) );
						}, 300 );
					} else {
						$bTabMCSB.mCustomScrollbar("scrollTo", $("li", $bTabMCSB ).first() );
					}

					$this_mCSB = this.mcs;
					bTabMenu.edgeDetectFnc( $bTabMCSB_ingFnc, $this_mCSB );
				}
				, whileScrolling : function() {
					$this_mCSB = this.mcs;
					bTabMenu.edgeDetectFnc( $bTabMCSB_ingFnc, $this_mCSB );
				}
			}
		});

		// ** console.log( "type : " + type + " / $bTabLILen : " + $bTabLILen );
		/*
		if ( $bTabLILen <= type ) {
			$bTabLI.last().addClass("removeBar");			// ** 브라우저 사이즈대비 기준개수보다 버튼노드의 개수보다 작을경우 마지막 노드에 구분선 제거 클래스 삽입.
		} else {
			$bTabLI.eq( $bTabUnit ).addClass("removeBar");	// ** 화면당 최우측 바 제거 클래스 삽입.
		}
		// */
		$bTab.addClass("stable");
		this.btnCast();
	},
	btnCast : function() {
		$("button", $bTabArr ).on("click", function() {
			if ( $(this).hasClass("btn-prev") ) {
				$bTabMCSB.mCustomScrollbar("scrollTo",["+=0", "+=" + $bTabLIW]);
			} else if ( $(this).hasClass("btn-next") ) {
				$bTabMCSB.mCustomScrollbar("scrollTo",["-=0", "-=" + $bTabLIW]);
			}
		});
	},
	edgeDetectFnc : function( edgeFnc, mcsb ) {
		// ** 좌측 / 우측 버튼 양 끝일경우 disabled 셋팅
		clearTimeout( edgeFnc );
		edgeFnc = setTimeout(
			function() {
				if ( mcsb.leftPct >= 100 ) {
					// ** console.log( "R disabled" );
					$(".btn-prev", $bTabArr ).removeClass("disabled");
					$(".btn-next", $bTabArr ).addClass("disabled");
				} else if ( mcsb.leftPct <= 0) {
					// ** console.log( "L disabled" );
					$(".btn-prev", $bTabArr ).addClass("disabled");
					$(".btn-next", $bTabArr ).removeClass("disabled");
				} else {
					$(".btn-prev", $bTabArr ).removeClass("disabled");
					$(".btn-next", $bTabArr ).removeClass("disabled");
				}
			}
		, 200 );
	}
}