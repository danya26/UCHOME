$(function(){
	contSlide();
	fldPkg.init();
});

function number_format(data) {
    var tmp = '';
    var number = '';
    var cutlen = 3;
    var comma = ',';
	var i;
	if(parseInt(data)==0) return 0;
    data = String(data);
    len = data.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i=0; i<data.length; i++) {
        number = number + data.charAt(i);
        if(i < data.length - 1) {
            k++;
            if((k % cutlen) == 0) {
                number = number + comma;
                k = 0;
            }
        }
    }
    return number;
}

function sprintf2(zero,text) {
    len = zero.length;
    r_txt = zero + text;
    f_len = r_txt.length;
    s_len = f_len - len;
    r_txt = r_txt.slice(s_len,f_len);
    return r_txt;
}

function MobileCheck() {
    var $agent = navigator.userAgent;
    var MobileArray  = ["iphone","lgtelecom","skt","mobile","samsung","nokia","blackberry","android","android","sony","phone"];
    var checkCount = 0;
    for(var i=0; i<MobileArray.length; i++){
        var checkStr = $agent.toLowerCase().match(MobileArray[i]);
        if(checkStr!=null && checkStr==MobileArray[i]) {checkCount++; break; }
        //if(preg_match("/$MobileArray[$i]/", strtolower($_SERVER["HTTP_USER_AGENT"]))){ $checkCount++; break; }
    }
   return (checkCount >= 1) ? true : false;
}

// ** 쿠키 get / set / del
function getCookie(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length) {
		var y = (x+nameOfCookie.length);
		if(document.cookie.substring(x, y) == nameOfCookie){
			if((endOfCookie=document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x)+1;
		if(x == 0)
			break;
	}
	return "";
}

function setCookie(name, value, expiredays){
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value)+ "; path=/; expires=" +		todayDate.toGMTString() + ";"
}

function delCookie(name) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = name + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}

function setTabContents(tab_id,n) {
    if(n==undefined || n<1) n = 1;

    //메뉴 활성
    $("[id^='" + tab_id + "_tab']:not(#"+tab_id+"_tab"+n+")").removeClass("over");
    $("#"+tab_id+"_tab"+n).addClass("over");

    //컨텐츠 활성
    $("[id^='" + tab_id + "_sub']:not(#"+tab_id+"_sub"+n+")").hide();
    $("#"+tab_id+"_sub"+n).show();
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
	window.open( theURL, winName, features );
}

function validateEmail( email ) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
}

// ** 레이어팝업
function popHide( pop_cookie, pop_id ) {
	$(".layor-popups").removeClass("activate");
	if ( $("#chkpop"+pop_id).is(":checked") ) {
		setCookie( pop_cookie, "done", 1 );
	}
	document.getElementById("layerPop"+pop_id).style.display = "none";
}

function popClose( pop_id ) {
	$(".layor-popups").removeClass("activate");
	if(document.getElementById("chk"+pop_id).checked==true) {
		setCookie(pop_id, "done", 1);
	}
	this.close();
}

function checkPop( pop_id ) {
	if(getCookie(pop_id) != "done"){
		document.getElementById(pop_id).style.display = "";
	}else{
		document.getElementById(pop_id).style.display = "none";
	}
}

function setLayerPopup( popId, options ) {
	var pop = $("#"+popId);
	var pop_cont = $(".popup_layer_body",pop);
	//pop.siteLayerPopup(options);
}

// 이미지 슬라이드
function contSlide() {
	$imgSlide = $(".img-slide-wr");
	$imgSlide.each(function() {
		$tmpSld = $(".datalist", $(this) );
		$tmpSldUtil = $(".dataUtil", $(this) );
		$tmpSldDots = $(".dataDots", $tmpSldUtil );
		$tmpSldAuto = $(".dataAuto", $tmpSldUtil );
		$tmpSldDelay = 5000;
		$tmpSldSpeed = 750;
		$tmpIsAuto = true;
		if ( $(".item", $tmpSld ).length < 2 ) {
			$tmpSldLoop = false;
		} else {
			$tmpSldLoop = true;
			$tmpSldUtil.show();
		}
		$tmpSld.owlCarousel({
			items : 1
			, loop : $tmpSldLoop
			, nav : true
			, navElement : "button"
			, navText : ["이전", "다음"]
			, dots : true
			, dotsEach : true
			, dotsContainer : $tmpSldDots
			, autoplay : true
			, autoplayTimeout : $tmpSldDelay
			, autoplayHoverPause : false
			, smartSpeed : $tmpSldSpeed
			, onTranslated : onTransd
			, responsiveRate : 0
		});
		function onTransd( event ) {
			$element = $(event.target);
			$tmpThisElement = $element.closest(".owl-carousel");
			// ** console.log( $tmpIsAuto );
			if ( $tmpIsAuto ) {
				$tmpThisElement.trigger("stop.owl.autoplay");
				$tmpThisElement.trigger("play.owl.autoplay", [$tmpSldDelay]);
			}
		}
		$(".btn-stop", $tmpSldAuto ).on("click",function() {
			$tmpIsAuto = false;
			$(this).hide();
			$(this).next().show().focus();
			$(".owl-carousel", $(this).closest(".img-slide-wr") ).trigger("stop.owl.autoplay");
		});
		$(".btn-play", $tmpSldAuto ).on("click",function() {
			$tmpIsAuto = true;
			$(this).hide();
			$(this).prev().show().focus();
			$(".owl-carousel", $(this).closest(".img-slide-wr") ).trigger("play.owl.autoplay", [$tmpSldDelay]);
		});
	});
}

function setBoardTab(obj_id,num,evt) {
    var obj = document.getElementById(obj_id);
    var seq = 0;
    var tabs = Array();
    for (i=0; i<obj.childNodes.length; i++){
        if (obj.childNodes[i].tagName=="DL"){
            seq++;
            tabs[seq] = obj.childNodes[i];
        }
    }

    for ( i=1; i<tabs.length; i++ ) {
		var titImg = $("dt img",$(tabs[i]));
        if ( titImg.length > 0 ) {
            var ovImg = $(titImg).attr("ovImg");
            var orgSrc = $(titImg).attr("orgSrc");
        }
        if ( i == num ) {
            if($(tabs[i]).hasClass("isOn")){
                if(evt=="c") {
                    if($(".btn_more a",$(tabs[i])).attr("onclick")=="" || $(".btn_more a",$(tabs[i])).attr("onclick")==undefined){
                    document.location.href=$(".btn_more a",$(tabs[i])).attr("href");
                    }else{
                    $(".btn_more a",$(tabs[i])).click();
                    }
                }
            }else{
                $(tabs[i]).addClass("isOn");
            }
            //이미지
            if(ovImg!=undefined && orgSrc!=undefined){
                $(titImg).attr("src",ovImg);
            }
        } else {
            $(tabs[i]).removeClass("isOn");
            //이미지
            if(ovImg!=undefined && orgSrc!=undefined){
                $(titImg).attr("src",orgSrc);
            }
        }
    }
}

// ** FAQ용 다건/단건 폴딩겸용
var fldPkg = {
	init : function(){
		if ( $("#cont .fldList").length > 0 ) {
			this.fldEvtCast();
		}
	},
	fldEvtCast : function(){
		$fldPkg = $("#cont .fldList");
		$fldQbtn = $(".fldQbtn", $fldPkg );
		$fldQbtn.on("click", function() {
			$fldThisItem = $(this).closest("li");
			$fldThisA = $(".fldA", $fldThisItem );
			if ( $fldThisItem.hasClass("over") ) {
				$fldThisItem.removeClass("over");
				$fldThisA.slideUp();
			} else {
				$fldThisItem.addClass("over");
				$fldThisA.slideDown();
				$fldOtherItem = $fldThisItem.siblings();
				$fldOtherItem.removeClass("over");
				$fldOtherA = $(".fldA", $fldOtherItem );
				$fldOtherA.slideUp();
			}
		});
	}
}

function renderKakaoMap(){
	if(!$("#locationMap").length) return;

	var map = $("#locationMap");
	var timeStamp = map.attr("data-timestamp");
	var dataKey = map.attr("data-key");
	var mapNode = "<div id='daumRoughmapContainer" + timeStamp + "'class='root_daum_roughmap root_daum_roughmap_landing map_root map-viewer'></div>";

	map.append(mapNode);
	new daum.roughmap.Lander({
		"timestamp" : timeStamp,
		"key" : dataKey,
	}).render();
}