var pageSNSShare ={
	init:function(settings){
		if(typeof(settings)!="undefined"){
			this.cfg = $.extend({},{},settings);
		}

	},
	sendToNaver:function(title,url){
		//2017-08-30
		var sUrl = encodeURIComponent(url);
		var sTitle = encodeURI(title);
		var shareURL = "http://share.naver.com/web/shareView.nhn?url=" + sUrl + "&title=" + sTitle;

		

		this.openShareWin(shareURL);
	},
	sendToBand:function(title,url){
		//2017-08-30
		var sUrl = encodeURIComponent(url);
		var sTitle = encodeURI(title);
		var shareURL = "http://band.us/plugin/share??url=" + sUrl + "&body=" + sTitle + " " + url  + "&route=" + url;

		this.openShareWin(shareURL);
	},
	sendToFacebook:function(title,url,share){
		if(typeof(share)=="undefined") var share  = {};


		//2017-08-30
		var sUrl = encodeURIComponent(url);
		var sTitle = encodeURI(title);
		var shareURL = "http://www.facebook.com/sharer/sharer.php?u=" + sUrl + "";
		
		this.openShareWin(shareURL);
	},
	sendToTwitter:function(title,url,share){
			if(typeof(share)=="undefined") var share  = {};
		//2017-08-30
		var sendTxt = "[" + title +"] " + url;
		var sUrl = encodeURIComponent(url);
		var sTitle = encodeURI(title);

		var shareURL = "http://twitter.com/intent/tweet?text=" + sTitle+"&url="+ sUrl ;

		this.openShareWin(shareURL);


	},
		sendToGoogle:function(title,url,share){
			if(typeof(share)=="undefined") var share  = {};
		//2017-08-30
		var sendTxt = "[" + title +"] " + url;
		var sUrl = encodeURIComponent(url);
		var sTitle = encodeURI(title);

		var shareURL = "https://plus.google.com/share?url="+ sUrl ;

		this.openShareWin(shareURL);


	},
	initKaKao:function(){
		Kakao.init(this.cfg.kakao_api_key);
	},
	sendToKakaoStory:function(title,url,share){
		var shareData ={
			"url":url,
			"text": title
		  };
		if(_isMobile_){
			Kakao.Story.open(shareData);		//앱으로 공유
		}else{
			Kakao.Story.share(shareData);	//웹으로 공유
		}
    },
	
	sendToKakao:function(title,url,share){
		
		if(_isMobile_){
			try{ this.initKaKao();}catch(e){}
			try{
				
				Kakao.Link.sendScrap({
					requestUrl: url
				});
			}catch(e){
				alert(e);
				alert("카카오톡이 설치된 스마트폰에서만 지원됩니다");
			}
		}else{
			alert("스마트폰에서만 지원됩니다");
		}


    },

	openShareWin:function(url){
		var wp = window.open(url, 'shareWin', 'width=450,height=600');
		if(wp){
			wp.focus();
		}

	}
}