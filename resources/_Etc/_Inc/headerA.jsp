<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="ezen.common.AdminUrl" %>
<!doctype html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0,user-scalable=no,target-densitydpi=medium-dpi" />
	<meta http-equiv="Content-Style-Type" content="text/css" />
	<meta http-equiv="imagetoolbar" content="no" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="expries" content="0" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="title" content="국문홈페이지" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="shortcut icon" href="/resources/_Img/Common/favicon.ico">
	<link rel="icon"  href="/resources/_Img/Common/favicon.ico">
	<link rel="apple-touch-icon"  href="/resources/_Img/Common/favicon.ico">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/core/jquery-ui-1.9.2.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/popup.css" /><!-- 레이어팝업 & 윈도우 팝업 공통 스타일 -->
	<script charset="utf-8" src="/resources/_Js/core/jquery-1.11.3.min.js"> </script>
	<script charset="utf-8" src="/resources/_Js/core/jquery-ui-1.9.2.custom.min.js"></script>
	<script charset="utf-8" src="/resources/_Js/jquery-ui-timepicker-addon.js"></script>
	<script charset="utf-8" src='/resources/_Js/core/common_base_util.js'></script>
	<script charset="utf-8" src="/resources/_Js/browser.detect.js"></script><!-- 방문자통계에서 필요한 스크립트파일 -->
	<script charset="utf-8" src="/resources/_Plugin/jquery.TabMenu/jquery.TabMenu.js"></script><!-- 텝메뉴 플러그인 -->
	<script charset="utf-8" src="/resources/_Js/comm.LayerPopup.js"></script><!-- 레이어 팝업 플러그인 -->
	<!-- <script src="/resources/_Js/jquery/slick_v1.8.1.js"></script> -->
	<!-- <link rel="stylesheet" href="/resources/_Css/plugin/slick_v1.8.1.css" /> -->
	<link rel="stylesheet" type="text/css" href="/resources/_Css/Admin/common.css?">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/webfont.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/board.css?">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/prg.style.css?">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/core/core.common.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/core/core.style.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/core/core.program.default.style.css">
	<link rel="stylesheet" type="text/css" href="/resources/_Css/common/style.default.css">
	<script type="text/javascript">
		var currentAddress = location.href;
		var isDevelopMode = "Y"
		if(isDevelopMode != "Y" && false){
			if(currentAddress.indexOf("http://")> -1){
				currentAddress = currentAddress.replace("http://","https://");
				location.href = currentAddress;
			}
		}
	</script>
	<title>관리자 가이드</title>
	<link rel="stylesheet" media="all" href="/resources/_Css/Admin/layout.css" />
	<link rel="stylesheet" media="all" href="/resources/_Css/Admin/contents.css" />
	<script> var _isLowBr_ = false; </script>
	<script charset="utf-8" src="/resources/_Js/admin.csLeftAccordionMenu.js"></script>
	<script charset="utf-8" src="/resources/_Js/common.simple.js"></script>
	<!-- <script charset="utf-8" src="/resources/_Js/layout_sub.js"></script> -->
	<script charset="utf-8" src="/resources/_Js/common.js"></script>
</head>
<body class="adm">
	<div id="doc">
		<div class="doc-wr">
			<div id="header-wrap" class="div-wrap header-wrap">
				<div id="header" class="header div-cont" >
					<div id="logo">
						<h1>
							<span class="glogo">
								<a href="<%= AdminUrl.prefix() %>/CMS/Main.do"><img src="/resources/_Img/Common/logo.png" class="logo" alt=""/></a>
							</span>
						</h1>
					</div>
				</div>
			</div>
			<div class="div-wrap" id="topmenu-wr">
				<div id="topmenu" class="div-cont">
					<ul>
						<li class="mn_l1">
							<a href="<%= AdminUrl.prefix() %>/CMS/CommonConfig/info.do?mcode=MA041" class="" >
								<span class="mn-ico mn-ico-1"></span>
								<span class="txt">환경설정</span>
							</a>
						</li>
						<li class="mn_l1">
							<a href="<%= AdminUrl.prefix() %>/CMS/MemberMgr/adminlist.do?mcode=MA082" class="" >
								<span class="mn-ico mn-ico-13"></span>
								<span class="txt">관리자관리</span>
							</a>
						</li>
						<li class="mn_l1">
							<a href="<%= AdminUrl.prefix() %>/CMS/MemberMgr/list.do?mcode=MA083" class="" >
								<span class="mn-ico mn-ico-6"></span>
								<span class="txt">통합 회원 관리</span>
							</a>
						</li>
						<li class="mn_l1">
							<a href="<%= AdminUrl.prefix() %>/CMS/SiteMgr/list.do?mcode=MA051" class="" >
								<span class="mn-ico mn-ico-2"></span>
								<span class="txt">사이트관리</span>
							</a>
						</li>
						<li class="mn_l1">
							<a href="<%= AdminUrl.prefix() %>/CMS/ContentMgr/list.do?mcode=MA088" class="" >
								<span class="mn-ico mn-ico-10"></span>
								<span class="txt">통합컨텐츠 관리</span>
							</a>
						</li>
						<li class="mn_l1">
							<a href="<%= AdminUrl.prefix() %>/CMS/Board/Config/search.do?mcode=MA091" class="" >
								<span class="mn-ico mn-ico-4"></span>
								<span class="txt">통합게시판 관리</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div id="container-wrap">
				<div id="adm-side-wrap"><!-- S : 사이트 영역 //-->
					<div class="login-info-box">
						<p><strong class="txt-nm">개발팀</strong></p>
						<p><span class="txt-id">csadmin</span></p>
						<form id="homeLinkForm" method="post" name="homeLinkForm" target="_blank">
							<a href="<%= AdminUrl.prefix() %>/CMS/Login/logout.do"><span>로그아웃</span></a>
						</form>
					</div>
					<div class="side-mn">
						<!-- Menu //-->
						<div class="sidemenu" id="admSideMenu">
							<ul class="mn_u1">
								<li class="mn_l1">
									<span class="mn_i1" style=""><span class="lm-ico"><a href="<%= AdminUrl.prefix() %>/CMS/CommonConfig/info.do?mcode=MA041"><span class="mn-ico mn-ico-1"></span></a></span> <a class="txt mn_a1" href="<%= AdminUrl.prefix() %>/CMS/CommonConfig/info.do?mcode=MA041"><span>환경설정</span></a> <span class="lm-btn"></span></span>
									<ul class="mn_u2">
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/CommonConfig/info.do?mcode=MA041"><span>시스템 기본설정</span></a></span></li>
										<li class="mn_l2">
											<span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/BaseCode/Category/list.do?mcode=MA123"><span>코드관리</span></a> <span class="lm-btn"></span></span>
											<ul class="mn_u3">
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/BaseCode/Category/list.do?mcode=MA123"><span>기초 코드관리</span></a></span></li>
											</ul>
										</li>
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/ProgramMgr/list.do?mcode=MA012"><span>프로그램관리</span></a></span></li>
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/AdminMenu/list.do?mcode=MA010"><span>관리 메뉴관리</span></a></span></li>
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/UploadMgr/list.do?mcode=MA013"><span>파일업로드관리</span></a></span></li>
										<li class="mn_l2">
											<span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/AuthenticMark/list.do?mcode=MA119"><span>CMS 공통링크 설정</span></a> <span class="lm-btn"></span></span>
											<ul class="mn_u3">
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/AuthenticMark/list.do?mcode=MA119"><span>인증 마크관리</span></a></span></li>
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/SiteLink/list.do?mcode=MA120"><span>관련사이트 관리</span></a></span></li>
											</ul>
										</li>
									</ul>
								</li>
								<li class="mn_l1">
									<span class="mn_i1" style=""><span class="lm-ico"><a href="<%= AdminUrl.prefix() %>/CMS/MemberMgr/adminlist.do?mcode=MA082"><span class="mn-ico mn-ico-13"></span></a></span> <a class="txt mn_a1" href="<%= AdminUrl.prefix() %>/CMS/MemberMgr/adminlist.do?mcode=MA082"><span>관리자관리</span></a> <span class="lm-btn"></span></span>
									<ul class="mn_u2">
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/MemberMgr/adminlist.do?mcode=MA082"><span>관리자 목록</span></a></span></li>
										<li class="mn_l2">
											<span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/LoginLogMgr/list.do?mcode=MA080"><span>관리자 로그 기록</span></a> <span class="lm-btn"></span></span>
											<ul class="mn_u3">
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/LoginLogMgr/list.do?mcode=MA080"><span>로그인</span></a></span></li>
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/SysLogMgr/list.do?mcode=MA081"><span>실행</span></a></span></li>
											</ul>
										</li>
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/AdminGroup/list.do?mcode=MA049"><span>관리자 그룹 관리</span></a></span></li>
									</ul>
								</li>
								<li class="mn_l1">
									<span class="mn_i1" style=""><span class="lm-ico"><a href="<%= AdminUrl.prefix() %>/CMS/MemberMgr/list.do?mcode=MA083"><span class="mn-ico mn-ico-6"></span></a></span> <a class="txt mn_a1" href="<%= AdminUrl.prefix() %>/CMS/MemberMgr/list.do?mcode=MA083"><span>통합 회원 관리</span></a> <span class="lm-btn"></span></span>
									<ul class="mn_u2">
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/MemberMgr/list.do?mcode=MA083"><span>회원 목록</span></a></span></li>
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/MemberMgr/memberGroupList.do?mcode=MA085"><span>회원그룹 관리</span></a></span></li>
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/UserLogMgr/list.do?mcode=MA151"><span>사용자 실행로그</span></a></span></li>
									</ul>
								</li>
								<li class="mn_l1">
									<span class="mn_i1" style=""><span class="lm-ico"><a href="<%= AdminUrl.prefix() %>/CMS/SiteMgr/list.do?mcode=MA051"><span class="mn-ico mn-ico-2"></span></a></span> <a class="txt mn_a1" href="<%= AdminUrl.prefix() %>/CMS/SiteMgr/list.do?mcode=MA051"><span>사이트관리</span></a> <span class="lm-btn"></span></span>
									<ul class="mn_u2">
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/SiteMgr/list.do?mcode=MA051"><span>전체 사이트 목록</span></a></span></li>
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/SiteCfgMgr/list.do?mcode=MA053"><span>사이트별 관리메뉴설정</span></a></span></li>
										<li class="mn_l2">
											<span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/PopupMgr/list.do?pop_type=TOP&mcode=MA112"><span>부가 관리</span></a> <span class="lm-btn"></span></span>
											<ul class="mn_u3">
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/PopupMgr/list.do?pop_type=TOP&mcode=MA112"><span>와이드 팝업관리</span></a></span></li>
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/PopupWindow/list.do?mcode=MA113"><span>윈도우 팝업관리</span></a></span></li>
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/PopupMgr/list.do?pop_type=MIDDLE&mcode=MA115"><span>메인 팝업존관리</span></a></span></li>
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/BannerMgr/list.do?mcode=MA116"><span>로고형 배너관리</span></a></span></li>
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/PageSatisfy/list.do?mcode=MA126"><span>페이지만족도 관리</span></a></span></li>
											</ul>
										</li>
										<li class="mn_l2">
											<span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/TempletMgr/list.do?mcode=MA182"><span>템플릿 관리</span></a> <span class="lm-btn"></span></span>
											<ul class="mn_u3">
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/TempletMgr/list.do?mcode=MA182"><span>전체 템플릿 관리</span></a></span></li>
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/TempletLayoutMgr/list.do?mcode=MA181"><span>전체 템플릿 레이아웃 관리</span></a></span></li>
												<li class="mn_l3"><span class="mn_i3" style=""><a class="txt mn_a3" href="<%= AdminUrl.prefix() %>/CMS/TempletLayoutMgr/Layout/list.do?mcode=MA191"><span>레이아웃 관리</span></a></span></li>
											</ul>
										</li>
									</ul>
								</li>
								<li class="mn_l1">
									<span class="mn_i1" style=""><span class="lm-ico"><a href="<%= AdminUrl.prefix() %>/CMS/ContentMgr/list.do?mcode=MA088"><span class="mn-ico mn-ico-10"></span></a></span> <a class="txt mn_a1" href="<%= AdminUrl.prefix() %>/CMS/ContentMgr/list.do?mcode=MA088"><span>통합컨텐츠 관리</span></a> <span class="lm-btn"></span></span>
									<ul class="mn_u2">
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/ContentMgr/list.do?mcode=MA088"><span>일반컨텐츠 관리</span></a></span></li>
									</ul>
								</li>
								<li class="mn_l1">
									<span class="mn_i1" style=""><span class="lm-ico"><a href="<%= AdminUrl.prefix() %>/CMS/Board/Config/search.do?mcode=MA091"><span class="mn-ico mn-ico-4"></span></a></span> <a class="txt mn_a1" href="<%= AdminUrl.prefix() %>/CMS/Board/Config/search.do?mcode=MA091"><span>통합게시판 관리</span></a> <span class="lm-btn"></span></span>
									<ul class="mn_u2">
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/Board/Config/search.do?mcode=MA091"><span>통합 게시판목록</span></a></span></li>
										<li class="mn_l2"><span class="mn_i2" style=""><a class="txt mn_a2" href="<%= AdminUrl.prefix() %>/CMS/Board/mgr/Board.do?mcode=MA095"><span>통합 게시물관리</span></a></span></li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
					<script>
						$(document).ready(function(){
							// 관리자 메뉴 스크립트 실행
							$("#admSideMenu").accordionMenu({});
						});
					</script>
					<div class="pms-info">
						<p class="tit">유지관리 문의</p>
						<p class="pimg"><img alt="(주)이엔아이" src="/resources/_Img/Admin/Layout/arimoa_logo.png"></p>
						<p class="tel">051-897-7810</p><a href="http://work.withein.com/PMS/" target="_blank" title="새창열림"><span>PMS 바로가기</span></a>
					</div>
				</div>
				<div id="adm-container">
					<div class="a-slide-ctrl-btns">
						<button type="button" data-action="collapse" class="close"><span>close</span></button>
						<button type="button" data-action="expand" class="open"><span>open</span></button>
					</div>
					<div class="adm-contents" id="adm-contents">
						<div class="cont-tab-menu">
							탭메뉴영역 <a onclick="$('.cont-tab-menu').hide();return false;" href="#"> 숨기기 </a>
						</div>
						<div class="smng-cont-top">
							<h2 class="cont-tit">
								<!-- <span class="mng-pg-nm">이엔아이 홈페이지 관리자</span> -->
								<span class="mng-pg-nm">관리자 Style Guide</span>
							</h2>
							<div class="cont-top-side">
								<form name="siteGoForm" id="siteGoForm" method="post" target="_blank">
									<div class="site-sel">
										<!--<a href="#n" class="btn-down"><span>관리자 메뉴얼</span></a>-->
										<select name="goSite" id = "goSite" class="a-sel">
											<option value="kor">국문홈페이지[kor]</option>
										</select>
										<button onclick="goSiteManager($('#goSite option:selected').val());"  type="button"><span>관리</span></button>
									</div>
								</form>
							</div>
						</div>