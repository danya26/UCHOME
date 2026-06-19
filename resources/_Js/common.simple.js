/* https://jscompress.com/ */
var console = window.console || { log: function() {} };
var browser = (function() {
	var userAgent = navigator.userAgent, s = userAgent.toLowerCase();
	var match = /(webkit)[ \/](\w.]+)/.exec(s) || 		  /(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) || 		  /(msie) ([\w.]+)/.exec(s) ||                		  /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||		 [];
	function matchMediaQuery(query) {		return "matchMedia" in window ? matchMedia(query).matches : false; 	}
	opera = window.opera && window.opera.buildNumber;	android = /Android/.test(userAgent);	webkit = /WebKit/.test(userAgent);
	ie = !webkit && !opera && (/MSIE/gi).test(userAgent) && (/Explorer/gi).test(navigator.appName);
	ie = ie && /MSIE (\w+)\./.exec(userAgent)[1];
	ie11 = userAgent.indexOf('Trident/') != -1 && (userAgent.indexOf('rv:') != -1 || navigator.appName.indexOf('Netscape') != -1) ? 11 : false;
	ie12 = (userAgent.indexOf('Edge/') != -1 && !ie && !ie11) ? 12 : false;
	ie = ie || ie11 || ie12;
	gecko = !webkit && !ie11 && /Gecko/.test(userAgent);
	mac = userAgent.indexOf('Mac') != -1;
	iDevice = /(iPad|iPhone)/.test(userAgent);
	fileApi = "FormData" in window && "FileReader" in window && "URL" in window && !!URL.createObjectURL;
	phone = matchMediaQuery("only screen and (max-device-width: 480px)") && (android || iDevice);
	tablet = matchMediaQuery("only screen and (min-width: 800px)") && (android || iDevice);
	windowsPhone = userAgent.indexOf('Windows Phone') != -1;
	if ( ie12 ) {
		webkit = false;
	}
	return {
		name: match[1] || "", version: match[2] || "0",
		opera: opera,	webkit: webkit,		ie: ie,		gecko: gecko,		mac: mac,		iOS: iDevice,		android: android,
		documentMode: ie && !ie12 ? (document.documentMode || 7) : 10, fileApi: fileApi, desktop: !phone && !tablet,	windowsPhone: windowsPhone
	};
}());

/*
Object.create = function (o) {
	function F() {
	}
	F.prototype = o;
	return new F();
}
// */

function isMobile(){
	var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
	for (var info in mobileKeyWords) {
		if(navigator.userAgent.match(mobileKeyWords[info]) != null) {
			return true;
		}
	}
	return false;
}

var latestFocus = null;var fcsChk = true;
function callLatestFocus() {
	latestFocus =(event.srcElement.tagName=="A" || event.srcElement.tagName=="BUTTON")? $(event.srcElement) : $($(event.srcElement).parents("a,button").get(0)) ;
}

var _userAgent_ = navigator.userAgent;var isIe6 = (/msie 6/i).test(_userAgent_);var isIe7 = (/msie 7/i).test(_userAgent_);var isIe9 = (/msie 9/i).test(_userAgent_); var isComptMode = (/compatible/i).test(_userAgent_);
var docChkTimer = null;var DOC_COMPLET = null;
function docLoading(loadFunc) {
	clearTimeout(docChkTimer);
	if(document.readyState=="loaded" || document.readyState=="complete"){
		DOC_COMPLET = true;
		if(loadFunc!=undefined) loadFunc();
	}
	else{
		docChkTimer = setTimeout(function(){docLoading(loadFunc);},500);
	}
}

// 낮은 브라우저 사이즈 계산오류 보정
function lowReloadCheck(func,load_obj) {
	clearTimeout( load_obj.Timer );
	if (!_isLowBr_) return  true;
	try {
		if ( _isLowBr_ && load_obj.cnt < load_obj.limit ) {
			if ( $("body").width() > wsize.win.w ) {
				load_obj.cnt++;
				load_obj.Timer = setTimeout(func,250);
				return false;
			} else {
				load_obj.cnt = 0;
				return true;
			}
		}
		if(load_obj.cnt== load_obj.limit) {
			load_obj.cnt = 0;
		}
		return true;
	} catch(e) {
	}
	return true;
}

// 이메일 주소 선택
function email_domain( email_domain, value ) {
	var f_obj = document.getElementById( email_domain );
	f_obj.value = value;
	if ( value == "" ) {
		f_obj.style.display = "";
		$(f_obj).next().removeClass("expand");
	} else {
		f_obj.style.display = "none";
		$(f_obj).next().addClass("expand");
	}
}

function add_option( obj, t_name,t_value ) {
	var idx = obj.length;
	obj.length= idx + 1;
	obj.options[idx].text = t_name;
	obj.options[idx].value= t_value;
}

function getBrowsertInfo() {
	var $agent = navigator.userAgent;
	var $s = "";
	var $br = {browser:"",browserType:"",browserVer:[]};
    if((/msie 5.0[0-9]*/i).test($agent))			{ $s = "MSIE 5.0"; }
    else if((/msie 5.5[0-9]*/i).test($agent))		{ $s = "MSIE 5.5"; }
    else if((/msie 6.0[0-9]*/i).test($agent))		{ $s = "MSIE 6.0"; }
    else if((/msie 7.0[0-9]*/i).test($agent))		{ $s = "MSIE 7.0"; }
    else if((/msie 8.0[0-9]*/i).test($agent))		{ $s = "MSIE 8.0"; }
    else if((/msie 9.0[0-9]*/i).test($agent))		{ $s = "MSIE 9.0"; }
	else if((/msie 10.0[0-9]*/i).test($agent))		{ $s = "MSIE 10.0"; }
	else if((/windows*/i).test($agent) && (/rv:11.0[0-9]*/i).test($agent))	{ $s = "MSIE 11.0"; }
    else if((/msie 4.[0-9]*/i).test($agent))		{ $s = "MSIE 4.x"; }
    else if((/firefox/i).test($agent))				{ $s = "FireFox"; }
    else if((/safari/i).test($agent))				{ $s = "FireFox"; }
    else if((/x11/i).test($agent))					{ $s = "Netscape"; }
    else if((/opera/i).test($agent))				{ $s = "Opera"; }
    else if((/gec/i).test($agent))					{ $s = "Gecko"; }
    else if((/bot|slurp/i).test($agent))			{ $s = "Robot"; }
    else if((/internet explorer/i).test($agent))	{ $s = "IE"; }
    else if((/mozilla/i).test($agent))				{ $s = "Mozilla"; }
    else { $s = ""; }
	$br.browser = $s;
	if ( (/msie/i).test($s) ) {
		$br.browserType = "IE";
		$br.browserVer =  $s.replace("MSIE ","").split(".");
	}
	return $br;
}

var $wbr =getBrowsertInfo();
var wsize = null;	//윈도우 사이즈 정보
var psize = null;	//컨텐츠 사이즈 정보
var lowIeChk = {	old_w:0,old_h:0 }
function getWindowSizeObj() {
	var sizeObj = {
	scr : {w:screen.width,h:screen.height},
	availscr : {w:screen.availWidth,h:screen.availHeight},
	win : (_isLowBr_)? {w:$(window).width(),h:$(window).height()}	: {w:window.innerWidth,h:window.innerHeight}	//스크롤사이즈 제외(윈도우 8부터 아래버전에서 확인안됨.ㅠㅠ)
	}
	return sizeObj;
}

function getPageSizeObj() {
	var sizeObj = {
		doc : { w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight }
		, scroll : {
			x:document.documentElement.scrollLeft
			, y:document.documentElement.scrollTop
			, top:$(window).scrollTop()
			, left:$(window).scrollLeft()
		}	////모바일에서는 안잡힘..
		, header : { h:$("#header-wrap").height() }
		, footer : { h:$("#footer-wrap").height() + 1 }
	};
	return sizeObj;
}

function getWindowSize() {
	wsize =getWindowSizeObj();
}

function getPageSize() {
	psize = getPageSizeObj();
	printWinSizeInfo();
}

function printWinSizeInfo() {
	var str = "";
	// str +="screen [w : "+wsize.scr.w+", h:"+wsize.scr.h+"]<br/>";
	// str +="availscr [w : "+wsize.availscr.w+", h:"+wsize.availscr.h+"]<br/>";
	str +="window [w : "+wsize.win.w+", h:"+wsize.win.h+"] ";		//스크롤바 포함한 브라우저 윈도우  높이
	str +="doc [w : "+psize.doc.w+", h:"+psize.doc.h+"]<br/>";
	// str +="scrollpos [w : "+psize.scroll.x+", h:"+psize.scroll.y+"]<br/>";
	// str +="scrollpos2 [left : "+psize.scroll.x+", top:"+psize.scroll.y+"]<br/>";
	$("#testBox").html("[" + $wbr.browser +"]" + str +" /" + $(".div-conts").width());
}

function setLowBrowser() {
	$("body").removeClass("isIE7");
	try {
		if ( $wbr.browserType=="IE" && $wbr.browserVer[0] <= 8 ) {
			_isLowBr_ = true;
			$("body").addClass("isIE7");
			$("li").each(function(){
				if($(this).index() ==0) $(this).addClass("is-first");
				if($(this).index() ==($(" > li",$(this).parent()).length -1)) $(this).addClass("is-last");
			});
			/*
			$("a > span").each(function(){
				if($(this).attr("onclick")==undefined || $(this).attr("onclick")==""){
					$(this).bind("click",function(){
						$($(this).parents("a").get(0)).click();
					});
				}
			});
			*/
		}
	}catch(e){
	}
}

// 문자열 길이 구하기
function calByte(msg) {
	var t;
	var msgLen = 0;
	for ( var i=0; i<msg.length; i++ ) {
		t = msg.charAt(i);
		if(escape(t).length > 4) {
			msgLen += 2;
		} else if(t != "\r") {
			msgLen++;
		}
	}
	return msgLen;
}

function trim(v) {
	return	$.trim(v);
}

function addBookmarkProgram(obj) {
	title = $(document).attr("title");
	url = location.href;
	var _isMobile_ = false;
	if ( _isMobile_ ) {
		return true;
	} else {
		try {
			window.external.AddFavorite(url,title);
		} catch(e) {
			alert('이 브라우저에서는 즐겨찾기 기능을 사용할 수 없습니다.\n크롬에서는 Ctrl 키와 D 키를 동시에 눌러서 즐겨찾기에 추가할 수 있습니다.');
		}
		return false;
	}
}

function pagePrint() {
	try{
		window.print();
	}catch(e){
		alert("미지원 브라우저입니다.\n웹 브라우저의 인쇄 기능을 이용해주시기 바랍니다.");
	}
}

// 검색시 데이터 로딩 화면
function $alert( msg, options ) {
	var options = $.extend({},{w:300,h:120,"btn_label":"확인","btn":false},options);
	var printMsg = msg.replace(/\b\n\b/i,'<br/>');
	if ( options.btn ) {
		var msgHTML = "<div class='popErrorBox'><div class='popErrorMsg'><div class=''>"+printMsg+"</div><div class='popErrorBtns mg10t'><button type='buttom' class='sp-btn closeBtn'><span>확인</span></button></div></div>";
	} else {
		var msgHTML = printMsg;
	}
	$("body").layerPopup({"message":msgHTML,"width":options.w,"height":options.h});
}

function $alertLoading( msg ) {
	if(msg==undefined) var msg = "데이터 처리중입니다.";
	var printMsg = msg.replace(/\b\n\b/i,'<br/>');
	var msgHTML = "<div class='popErrorBox'><div class='popErrorMsg'><div class=''><img src='/_Img/Common/loading_img01.gif' alt=''/> "+printMsg+"</div></div><div class='popErrorBtns'></div></div>";
	$("body").layerPopup({"message":msgHTML,"width":300,"height":120});
}

function $alertLoadingClose() {
	try {
		$("body").layerPopup("closeLayerPopup");
	} catch(e){
	}
}

var util = {
	init : function() {
	},
	alertWsize : function() {
		alert($(window).width() + " / " + $(window).height());
		// 갤탭 768 * 896
	},
	isPC : function() {
		var filter = "win16|win32|win64|mac|macintel";
		if(navigator.platform){
			if(filter.indexOf(navigator.platform.toLowerCase())< 0){
				return false;
			} else {
				return true;
			}
		}
	},
	isIOS : function() {
		var varUA = navigator.userAgent.toLowerCase();
		if(varUA.indexOf("iphone")>-1||varUA.indexOf("ipad")>-1||varUA.indexOf("ipod")>-1) {
			return true;
		} else {
			return false;
		}
	},
	isAND : function() {
		var varUA = navigator.userAgent.toLowerCase();
		if(varUA.match('android') != null) {
			return true;
		} else {
			return false;
		}
	},
	isNull : function($obj){
		if(typeof $obj != "undefined" && $obj != null && $obj != ""){
			return false;
		} else {
			return true;
		}
	},
	Eraser : function($obj, type){
		if(type == "hide"){
			$obj.hide();
		} else if(type != "hide"){
			$obj.addClass(type);
		}
	},
	conBottomEraser : function($obj){
		$obj.css({ "padding-bottom":0, "margin-bottom":0 });
	},
	getQueryStr : function(paramName){
		var _tempUrl = window.location.search.substring(1);	// ** url에서 처음부터 ? 제외 uri
		var returnVal = "";
		if(_tempUrl == ""){
			returnVal = "fail";
		} else if(_tempUrl.indexOf("&") >= 0 || _tempUrl.indexOf("?") >= 0){
			var _tempArray = _tempUrl.split("&");
			for (var i=0; i<_tempArray.length; i++){
				var _keyValuePair = _tempArray[i].split("=");
				if(_keyValuePair[0] == paramName){
					returnVal = _keyValuePair[1];
				}
			}
		} else {
			var _tempArray = _tempUrl.split("=");
			if(_tempArray[0] == paramName)	returnVal = _tempArray[1];
		}
		return returnVal;
	},
	isLang : function() {
		$pageUri = location.href;
		if($pageUri.indexOf("/kor/") > 0)return "kor";
		else if($pageUri.indexOf("/eng/") > 0)return "eng";
	},
	getNumberOnly : function(str_txt) {
		val = new String(str_txt);
		var regex = /[^0-9]/g;
		val = val.replace(regex, '');
		return val;
	},
	getHash : function() {
		if(window.location.hash) {
			var hashVal = "";
			var hash = window.location.hash.substring(1);
			if(hash.length === 0) {
				return false;
			} else {
				if(hash.indexOf("&") >=0){
					hashVal = hash.split("&")[0];
				} else {
					hashVal = hash;
				}
				return hashVal;
			}
		} else {
			return false;
		}
	},
	frontEndTrimming : function(s){
		s += ''; // 숫자라도 문자열로 변환
		return s.replace(/^\s*|\s*$/g, '');
	},
	convertTimestamp : function($obj){	// ** 타임스탬프 형식으로 변경.
		var dateTmp;
		var convertTimeStamp;
		if(typeof $obj == "object"){
			var cArrayIdx = 0;
			var convertResult = new Array();
			$.each($obj, function(index, item){
				if(item != null){
					dateTmp = item.split("-");
					convertTimeStamp = dateTmp[1] + "/" + dateTmp[2] + "/" + dateTmp[0];
					convertResult[cArrayIdx] = new Date(convertTimeStamp).getTime();
					cArrayIdx++;
				}
			});
		} else if(typeof $obj == "string"){
			var convertResult = "";
			dateTmp = $obj.split("-");
			convertTimeStamp = dateTmp[1] + "/" + dateTmp[2] + "/" + dateTmp[0];
			convertResult = new Date(convertTimeStamp).getTime();
		}
		return convertResult;
	},
	convertDatestring : function($str){	// ** 2019-10-21 형식으로 변경.
		var d = new Date($str);
		var s = util.leadingZeros(d.getFullYear(), 4) + "-" + util.leadingZeros(d.getMonth() + 1, 2) + "-" + util.leadingZeros(d.getDate(), 2);
		return s;
	},
	leadingZeros : function(n, digits){	// ** 리딩제로 형식으로 변경.
		var zero = '';
		n = n.toString();
		if(n.length < digits){
			for (i=0; i<digits-n.length; i++)	zero += '0';
		}
		return zero + n;
	},
	setCss : function( href ) {
		$linkTags = $('<link/>',
			{
				rel : "stylesheet",
				type : "text/css",
				href : href
			}
		).appendTo( "head" );
	},
	setJs : function( src ) {
		$scriptTags = $('<script/>',
			{
				src : src
			}
		).appendTo( "head" );
	}
}

// =========================

function ajaxFormSubmit(f,callbackS,callbackE){

	var $f = $(f);
	var ajaxFrmData = null;

	if(typeof(callbackS)=="undefined")  var callbackS = defaultAjaxFrmSubmitSuccess;

	//파일폼 ajax submit
	try{
		var isTxtFormData = false;

		if( $("[name='prcCode']",$f).length>0) $("[name='prcCode']",$f).val("ajax");
		else $f.append("<input type='hidden' name='prcCode' value='ajax'/>");

		var ajaxFrmData = new FormData(f);


		//에디터 입력 데이터 업데이트
		$("textarea.isEditorText",$f).each(function(){
			var v = $(this).val();
			$(this).val(v);
			ajaxFrmData.set($(this).attr("name"),v);
		});


	}catch(e){
		console.log("defaultFormSubmit" + e);
		var isTxtFormData = true;
		if($("[type='file']",f).length>0){

			var ajaxFrmData = null;


		}else{
			if( $("[name='prcCode']",$f).length>0) $("[name='prcCode']",$f).val("ajax");
			else $f.append("<input type='hidden' name='prcCode' value='ajax'/>");

			var ajaxFrmData = $f.serialize();
		}
		//alert("IE10 상위버전의 브라우저를 이용해주시기 바랍니다.");
	}



	if('noloading' in f === false || f.noloading.value!=1)	$alertLoading();
	if( ajaxFrmData!=null){
		var ajaxCfg = isTxtFormData? {} : {dataType:'text',			processData: false,			contentType: false};
		try{
		$.ajax($.extend({},ajaxCfg,{
			url : $f.attr("action"),data:ajaxFrmData,
			files      : $("[type='file']",f),
			type: 'POST',
				success: function (rst) {

document.location.ref="?"

				try{ callbackS(rst);}catch(e){}
				try{ $alertLoadingClose();}catch(e){}

			   },
			   error: function (jqXHR) {

				 console.log('error');
				 try{
					   callbackE(jqXHR);
				 }catch(e){
					 alert("Error!! 다시 시도해 주시기바랍니다.");
					 try{ $alertLoadingClose();}catch(e){}
				 }
			   }
		},{}));
		}catch(e){
			alert(e);
		}
		return false;
	}else{
		if( $("[name='prcCode']",$f).length>0)  $("[name='prcCode']",$f).val("");
		$(f).get(0).submit();
		return false;
		//return true;
	}


}

function defaultAjaxFormSubmit(f,callbackS,callbackE){
	var chk = FormCheck(f);
	if(chk){
		chk = ajaxFormSubmit(f,callbackS,callbackE);
	}
	return chk;
}
function defaultAjaxFrmSubmitSuccess(r){
	var rst = $.trim(r).split("|");
	console.log(r);

	if(typeof(rst[1])!="undefined"){
		alert(rst[1]);
	}

	if(rst[0]=="O" ){
		document.location.reload();
	}
	$alertLoadingClose();
}

function defaultSearchFrmSubmit (f){
	var $f = $(f);
	$("select",$f).each(function(){
		if($("option:selected",this).length<1 || $("option:selected",this).val()==""){
			$(this).prop("disabled",true);
		}
	});
	$("input[type='text'], input[type='hidden']",$f).each(function(){
		if($(this).val()==""){
			$(this).prop("disabled",true);
		}
	});
	return true;
}
function	defaultSearchFrmRest (f){
	var $f = $(f);
	$("select,input[type='text']",$f).prop("disabled",true);
	$f.submit();
	return true;

}


function unsetFormStyle(target){
	var targetObj = (target==undefined)? document.documentElement : $(target);
	$("input[type=file]",targetObj).not(".dft-style").each(function(){
			var this_s = this;

			if($(this).parent().hasClass("is-file-sfrm")){
				$(".is-fnm",$(this).parent()).remove();
				$(".is-fbtn",$(this).parent()).remove();
				$(this).unwrap(".is-file-sfrm");
			}


		});


}
// 파일폼 디자인 스타일 변경
// 파일폼 동적 추가시에는 수동 호출 필요
function resetFormStyle(target){
	console.log('resetFormStyle');

	var targetObj = (target==undefined)? document.documentElement : $(target);

	$("[required]").each(function(){				$(this).removeAttr("required").attr("frequired","required");			});
	$("[readonly]").each(function(){				$(this).addClass("readonly");			});
	if(!_isLowBr_) {

		try{unsetFormStyle(targetObj);}catch(e){}

		//$("input.calendar",targetObj).datepicker({});


		$("input[type=file]",targetObj).not(".dft-style").each(function(){
			var this_s = this;


			if(!$(this).parent().hasClass("is-file-sfrm")){
				$(this).wrap("<span class='is-file-sfrm'></span>");


			$(this).parent().prepend("<button class='is-fbtn' type='button'><span>파일첨부</span></button><span class='is-fnm no-val' ></span>");
//			$(this).parent().append("");
			$(".is-fnm",$(this).parent()).attr("tabindex","0");
			$(this).bind("change",function(){
				if($(".is-fnm",$(this).parent()).length>0){
					if(this.value==""){
						$(".is-fnm",$(this).parent()).text("...").removeClass("in-val").addClass("no-val");
					}else{
						$(".is-fnm",$(this).parent()).text(this.value).removeClass("no-val").addClass("in-val");
					}

				}else{
					$(this).parent().prepend("<span class='is-fnm in-val'>"+this.value+"</span>");
				}
			});
				if(this.value!=""){
				if($(".is-fnm",$(this).parent()).length>0){
					if(this.value==""){
						$(".is-fnm",$(this).parent()).text("...").removeClass("in-val").addClass("no-val");
					}else{
						$(".is-fnm",$(this).parent()).text(this.value).removeClass("no-val").addClass("in-val");
					}

				}else{
					$(this).parent().prepend("<span class='is-fnm in-val'>"+this.value+"</span>");
				}


			}


			$(".is-fbtn",$(this).parent()).click(function(){				$(this).parent().find("input[type='file']").click();			});
			$(".is-fnm",$(this).parent()).click(function(){				$(this).parent().find("input[type='file']").click();			});
			}

		});




		$(".a-chk").each(function(){
			var this_s = this;

			if(!$(this).parent().hasClass("is-chk-sfrm")){
				$(this).wrap("<span class='is-chk-sfrm'></span>");
				$(this).parent().prepend("<span class='is-fnm' ></span>");

				$(this).bind("change",function(){

					var chked = $(this).prop("checked")? true:false;
					if(chked)			$(this).parent().addClass("is-checked");
					else $(this).parent().removeClass("is-checked");

					if($(".is-fnm",$(this).parent()).length<1){
						$(this).parent().prepend("<span class='is-fnm'></span>");
					}


				});
				$(".is-fbtn",$(this).parent()).click(function(){				$(this).parent().find("input[type='checkbox']").click();			});
				$(".is-fnm",$(this).parent()).click(function(){				$(this).parent().find("input[type='checkbox']").click();			});
		}
		});


	}

	$(".a-icbt").each(function(){
		if( $(this).prop("ovinit")!=true){
		$(this).prop("ovinit",true);
		$(this).bind("mouseover",function(){
			var toOffset ={top : $(this).offset().top - document.documentElement.scrollTop, left:$(this).offset().left  - document.documentElement.scrollLeft+ ($(this).width()/2)};
			if($(".a-icbt-lbl").length<1){
				$("body").append("<div class='a-icbt-lbl'></div>");
			}
			$(".a-icbt-lbl").text($(this).text()).css({position:"fixed",top:toOffset.top,left:toOffset.left}).show();
			$(".a-icbt-lbl").each(function(){ $(this).css({"margin-left":$(this).outerWidth()/2 * (-1),"margin-top":($(this).outerHeight() * -1)-5}); });
		}).bind("mouseout",function(){
			$(".a-icbt-lbl").hide();
		});
		$(this).bind("focus",function(){$(this).trigger("mouseover");	}).bind("blur",function(){ $(this).trigger("mouseout");});

		}
	});


}
