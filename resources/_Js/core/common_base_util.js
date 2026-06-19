//------------------------------------------------------------------------------------------------------------------------------------  기본 util :: 시작
function isNullOrBlank(obj){
	if(obj == null || obj == "")return true;
	else return false;
}

function isNull(obj){
	if(obj == null)return true;
	else return false;
}

function isBlank(obj){
	if(obj == "")return true;
	else return false;
}

//속성 만들기
function _createElement_formAdd(form, type, name, value){
	var buyIdObject = document.createElement("input");
	buyIdObject.setAttribute("type", type);
	buyIdObject.setAttribute("name", name);
	buyIdObject.setAttribute("value",value);
	form.appendChild(buyIdObject);
}

/*스크립트 날짜 포맷 자동 완성 함수*/
Date.prototype.format = function(f) {
    if(!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
//------------------------------------------------------------------------------------------------------------------------------------  기본 util :: 종료

//------------------------------------------------------------------------------------------------------------------------------------  팝업 띄우기
//팝업 띄우기 :: 공통
function popupOpen( option, form ) {
	var name = option.name;
	var url = "";
	if ( option.url != null && option.url != "" ) {
		url = option.url;
		if ( !isNullOrBlank(option.parameter) ) {
			var keys = Object.keys(option.parameter);
			for ( var index=0; index<keys.length; index++ ) {
				var key = keys[index];
				if ( index == 0 ) {
					url += "?" + key + "=" + option.parameter[key];
				} else {
					url += "&" + key + "=" + option.parameter[key];
				}
			}
		}
	}
	var option_str = "";
	//default 셋팅
	if ( isNullOrBlank(option.width) ) 			option.width = "400";
	if ( isNullOrBlank(option.height) ) 		option.height = "400";
	if ( isNullOrBlank(option.toolbar) ) 		option.toolbar = "no";
	if ( isNullOrBlank(option.menubar) ) 		option.menubar = "no";
	if ( isNullOrBlank(option.location) ) 		option.location = "no";
	if ( isNullOrBlank(option.scrollbars) )		option.scrollbars = "no";
	if ( isNullOrBlank(option.status) ) 		option.status = "no";
	if ( isNullOrBlank(option.resizable) ) 		option.resizable = "no";
	// 옵션 적용
	if ( !isNullOrBlank(option.width) ) 		option_str += "width=" + option.width
	if ( !isNullOrBlank(option.height) ) 		option_str += ", height=" + option.height
	if ( !isNullOrBlank(option.toolbar) ) 		option_str += ", toolbar=" + option.toolbar
	if ( !isNullOrBlank(option.menubar) ) 		option_str += ", menubar=" + option.menubar
	if ( !isNullOrBlank(option.location) )		option_str += ", location=" + option.location
	if ( !isNullOrBlank(option.scrollbars) ) 	option_str += ", scrollbars=" + option.scrollbars
	if ( !isNullOrBlank(option.status) ) 		option_str += ", status=" + option.status
	if ( !isNullOrBlank(option.resizable) ) 	option_str += ", resizable=" + option.resizable
	if ( !isNullOrBlank(option.fullscreen) ) 	option_str += ", fullscreen=" + option.fullscreen
	if ( !isNullOrBlank(option.channelmode) )	option_str += ", channelmode=" + option.channelmode
	if ( !isNullOrBlank(option.left) ) 			option_str += ", left=" + option.left
	if ( !isNullOrBlank(option.top) ) 			option_str += ", top=" + option.top
	var win_pop = window.open( url, name, option_str );
	if ( form != null && form !="" ) {
		form.target = name;
		form.submit();
	}
	return win_pop;
}

//팝업 띄우기 :: 공통
function popupOpenDecoration(option, form){
	var name = option.name;
	var url = "";
	if(option.url != null && option.url != "")url = option.url;
	var option_str = "";

	//default 셋팅
	if(isNullOrBlank(option.width)) 					option.width = "400";
	if(isNullOrBlank(option.height)) 					option.height = "400";
	if(isNullOrBlank(option.toolbar)) 					option.toolbar = "no";
	if(isNullOrBlank(option.menubar)) 					option.menubar = "no";
	if(isNullOrBlank(option.location)) 					option.location = "no";
	if(isNullOrBlank(option.scrollbars))				option.scrollbars = "no";
	if(isNullOrBlank(option.status)) 					option.status = "no";
	if(isNullOrBlank(option.resizable)) 				option.resizable = "no";

	// 옵션 적용
	if(!isNullOrBlank(option.width)) 					option_str += "width=" + option.width
	if(!isNullOrBlank(option.height)) 					option_str += ", height=" + option.height
	if(!isNullOrBlank(option.toolbar)) 					option_str += ", toolbar=" + option.toolbar
	if(!isNullOrBlank(option.menubar)) 					option_str += ", menubar=" + option.menubar
	if(!isNullOrBlank(option.location))					option_str += ", location=" + option.location
	if(!isNullOrBlank(option.scrollbars)) 				option_str += ", scrollbars=" + option.scrollbars
	if(!isNullOrBlank(option.status)) 					option_str += ", status=" + option.status
	if(!isNullOrBlank(option.resizable)) 				option_str += ", resizable=" + option.resizable
	if(!isNullOrBlank(option.fullscreen)) 				option_str += ", fullscreen=" + option.fullscreen
	if(!isNullOrBlank(option.channelmode))				option_str += ", channelmode=" + option.channelmode
	if(!isNullOrBlank(option.left)) 					option_str += ", left=" + option.left
	if(!isNullOrBlank(option.top)) 						option_str += ", top=" + option.top

	var win_pop = window.open(url, name, option_str);

	if(form != null && form !=""){
		form.target = name;
		form.submit();
	}

	return win_pop;
}

/*메뉴관리, 링크 탑입의 팝업 오픈*/
function menuPopup(url, width, height){
	var name = new Date();
	var option ={
			name : name,
			url : url,
			width : width,
			height : height,
			scrollbars : "yes",
			resizable : "yes"
		};
	popupOpen(option, null);
}

/*팝업존, 윈도우 팝업 기능*/
function open_popTop(sitecode, w, h, l, t, pop_seq){
	var hh = parseInt(h,10) +50;
	var option ={
			name : "open_menu_search",
			width : w,
			height : hh,
			left : l,
			top : t,
			scrollbars : "no",
			resizable : "no"
		};

	var obj_frm = document.createElement("form");
	obj_frm.setAttribute("method","post");
	obj_frm.action = "/" + sitecode + "/CMS/PopupMgr/popup.do";
	document.body.appendChild(obj_frm);

	_createElement_formAdd(obj_frm, "hidden", "pop_seq", pop_seq);

	popupOpen(option, obj_frm);

}

/*팝업존, 윈도우 팝업 기능*/
function open_popMain(sitecode, w, h, l, t, pop_seq){
	var hh = parseInt(h,10) +50;
	var option ={
			name : "open_menu_search",
			width : w,
			height : hh,
			left : l,
			top : t,
			scrollbars : "no",
			resizable : "no"
		};

	var obj_frm = document.createElement("form");
	obj_frm.setAttribute("method","post");
	obj_frm.action = "/" + sitecode + "/CMS/PopupMgr/popup.do";
	document.body.appendChild(obj_frm);

	_createElement_formAdd(obj_frm, "hidden", "pop_seq", pop_seq);

	popupOpen(option, obj_frm);

}
//------------------------------------------------------------------------------------------------------------------------------------  팝업 띄우기

//------------------------------------------------------------------------------------------------------------------------------------ 데이터 합하기
function setDataSum(data1, data2, data3, data4, result, hip){
	var v_data1 = $("#" + data1).val();
	var v_data2 = $("#" + data2).val();
	var v_data3 = $("#" + data3).val();
	var v_data4 = $("#" + data4).val();

	var result_value = "";

	if(hip == "-" && (v_data1 != null && v_data1 != "")&& (v_data2 != null && v_data2 != "")&& (v_data3 != null && v_data3 != "")){
		result_value = v_data1+ hip + v_data2 + hip + v_data3 ;
		$("#"+result).val(result_value);
	}else if(hip == "@" && (v_data1 != null && v_data1 != "")&& (v_data2 != null && v_data2 != "")){
		result_value = v_data1+ hip + v_data2;
		$("#"+result).val(result_value);
	}else if(hip == " " && (v_data1 != null && v_data1 != "")&& (v_data2 != null && v_data2 != "")){
		result_value = v_data1+ hip + v_data2;
		$("#"+result).val(result_value);
	}else if(hip == ":" && (v_data1 != null && v_data1 != "")&& (v_data2 != null && v_data2 != "")){
		result_value = v_data1+ hip + v_data2;
		$("#"+result).val(result_value);
	}
	else	$("#"+result).val("");
}
//------------------------------------------------------------------------------------------------------------------------------------ 데이터 합하기

//------------------------------------------------------------------------------------------------------------------------------------ 방문자 통계
function onVisit(site_code){
	var gScreenWidth        = screen.width;
    var gScreenHeight       = screen.height;
    var gScreenAvailWidth   = screen.availWidth;
    var gScreenAvailHeight  = screen.availHeight;
    var gScreenColor        = screen.colorDepth
    var gScreenDepth        = screen.pixelDepth
    var gNavigate           = $("#_Navigate").val();
    var gBrowser            = BrowserDetect.browser
    var gBrowserVersion     = BrowserDetect.version
    var gBrowserOS          = BrowserDetect.OS

    try {
      var gAppCodeName        = navigator.appCodeName
      var gAppMinorVersion    = navigator.appMinorVersion
      var gAppName            = navigator.appName
      var gAppVersion         = navigator.appVersion
      var gCookieEnabled      = navigator.cookieEnabled
      var gCpuClass           = navigator.cpuClass
      var gPlatform           = navigator.platform
      var gSystemLanguage     = navigator.systemLanguage
      var gUserAgent          = navigator.userAgent
      var gUserAgentOS        = navigator.userAgentOS
      var gUserLanguage       = navigator.userLanguage
    } catch (e) {   }
    if(!gLanguageID) var gLanguageID = ""
    if(location.href.toUpperCase().indexOf("/_") > 0) return false;
    if(location.href.toUpperCase().indexOf("/%5F") > 0) return false;

    $.ajax({
        type:"post",
        url:"/"+site_code+"/ajx_json/Visit/inputVisit.json",
        cache: false,
        data: {
        	navigate:gNavigate,
      	    screen_width:gScreenWidth,
      	    screen_height:gScreenHeight,
      	    screen_color:gScreenColor,
      	    browser:gBrowser,
      	    browser_version:gBrowserVersion,
      	    browser_os:gBrowserOS,
      	    system_language:gSystemLanguage,
      	    user_language:gUserLanguage,
    		agent:gUserAgent,
    		cpu:gCpuClass,
    		platform:gPlatform,
    		app_version:gAppVersion,
      	    url:location.href.replace("http://", "").replace(window.location.hostname, "").split("?")[0].toUpperCase(),
      	    postdata:location.href.replace("http://", "").replace(window.location.hostname, "").split("?")[1],
      	    pre_url:document.referrer
        },
        dataType:"json", // TEXT 형의 JSON으로 받음
        success : function(data) {
            if(data.result.result == "OK"){
                // 처리 완료되면 이쪽으로 옴
            }else{
                // 실패하면 이쪽으로 옴
            }
        },
        complete : function(data) {},        // 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.
        error : function(xhr, status, error) {
            alert("에러발생:" + error + status + xhr);
        }
    });
}
//------------------------------------------------------------------------------------------------------------------------------------ 방문자 통계


function twitter(url,msg) {
	var href = "http://twitter.com/home?status=" + encodeURIComponent(msg) + " " + encodeURIComponent(url);
	var a = window.open(href, 'twitter', 'top=100px,left=100px,height=400px,width=500px');
	if(a){
		a.focus();
	}
	return false;
}

function facebook(url,msg) {
	var href = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url)+ "&t=" + encodeURIComponent(msg);
	var a = window.open(href,'facebook','top=100px,left=100px,height=400px,width=500px');
	if(a){
		a.focus();
	}
	return false;
}

$(function(){
	$('.board-view-contents').each(function(){
		var $this = $(this);
		var t = $this.html();
	});
	$('.faq-contents').each(function(){
		var $this = $(this);
		var t = $this.html();
	});
	$('.contents_view_wrap').each(function(){
		var $this = $(this);
		var t = $this.html();
	});
	$('.privacy-cont').each(function(){
		var $this = $(this);
		var t = $this.html();
		$this.html(t.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"));
	});
});