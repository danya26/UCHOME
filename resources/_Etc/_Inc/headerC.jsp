<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!doctype html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0 ,maximum-scale=1.0, minimum-scale=1.0,user-scalable=no,target-densitydpi=medium-dpi" />
	<title>EzenCms 컨텐츠가이드</title>
	<link rel="shortcut icon" href="/resources/_Img/Common/favicon.ico">
	<link rel="apple-touch-icon" href="/resources/_Img/Common/favicon.png">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/webfont.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/plugin/owl.carousel.v2.3.4.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/common.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/style.default.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/content.default.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/board.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/prg.style.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/popup.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Etc/_Css/layout.css">
	<script src="/resources/_Js/core/jquery-1.11.3.min.js"></script>
	<script src="/resources/_Js/common.base.js"></script>
	<script src="/resources/_Js/jquery/owl.carousel.v2.3.4.js"></script>
	<script src="/resources/_Js/jquery/jquery.cs_tab.js"></script>
	<script src="/resources/_Js/jquery/jquery.cs_wauto.js"></script>
	<script src="/resources/_Templet/Layout/layout_kor/Js/common.js"></script>
	<script>
		$(document).ready(function(){
			//$("#board-tab").multiTab_auto({line_limit:5, height:62, showCtrlBtns:true, ctrlBtnWidth:62});
			setContAutoWidth();
			resetImgZoom();

			/*
			if ( $(".b-tab01").not(".noAutoTab").length > 0 ) {
				if ( $(window).width() > 599 ) {
					$(".b-tab01").not(".noAutoTab").rspnsvTab_auto({ height:56, showCtrlBtns:true, ctrlBtnWidth:56, line_limit:7 });
				} else {
					$(".b-tab01").not(".noAutoTab").rspnsvTab_auto({ height:56, showCtrlBtns:true, ctrlBtnWidth:56, line_limit:7 });
				}
			}
			// */
		});
		$(window).resize(function(e){
			var resizeTimeGap = 10;
			clearTimeout(window.resizeEvt);
			window.resizeEvt = setTimeout(function()	{
				resetImgZoom();
				setContAutoWidth();
			}, resizeTimeGap);
		});
		function setContAutoWidth(){
			if($(".is-wauto-box").length>0 ) {
				if( typeof(setMinWidthAutoScrollBox) !="function" )  $.getScript("/resources/_Js/jquery/jquery.cs_wauto.js",function(){ setMinWidthAutoScrollBox(); });
				else{ setMinWidthAutoScrollBox(); }
			}
		}
	</script>
	<script type="text/javascript" src="/resources/_Js/jquery/jquery.mCustomScrollbar.js"></script>
	<link rel="stylesheet" type="text/css" href="/resources/_Css/plugin/jquery.mCustomScrollbar.css" />
	<script src="/resources/_Js/common.simple.js"></script>
</head>
<body>