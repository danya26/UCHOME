// 상단 와이드팝업
var twidepop ={

	cont_obj:null,numbtn_obj:null,subSeq:0,
	setBans:function(){
		var this_s = this;

		//각 탭에 해당하는 이미지 리스트 객체 및 버튼 객체 지정
		this.cont_obj = $("#toppop .popups .wpcont");
		this.numbtn_obj = $("#toppop .nicon");

		this.isPlay = true;

		$("#toppop .btn-play").hide();

		//번호 아이콘
		var numItems = $(this.numbtn_obj);
		for (var j=0;j<numItems.length ;j++)
		{
			$(numItems[j]).attr("seq",j+1);
			$(numItems[j]).bind("click",function(){	this_s.setBanner($(this).attr("seq"),false); return false; });
					}
		
		$("#toppop .btn-play").bind("click",function(){this_s.isPlay = true; $(this).hide(); $("#toppop .btn-stop").show(); this_s.setBanner(this_s.subSeq);return false;});
		$("#toppop .btn-stop").bind("click",function(){this_s.isPlay = false; $(this).hide();$("#toppop .btn-play").show(); this_s.stopBan();return false;});
		$("#toppop .btn-next").bind("click",function(){this_s.goNext();return false;});
		$("#toppop .btn-prev").bind("click",function(){this_s.goPrev();return false;});

		this.initBanner(0);
		this.setBanner(1);
		

		//this.getListStr();
	},
	

	initBanner:function(num){
		var this_s = this;
		if(num==undefined || num<1)	var num = 1;
		
		var subItems = $(this.cont_obj);
		for (var i=0;i<subItems.length ;i++)
		{
			$(subItems[i]).bind("mouseover",function(){ this_s.stopBan(); });

			$(subItems[i]).bind("mouseout",function(){ this_s.setBanner(this_s.subSeq); });
			$(">a",$(subItems[i])).each(function(){
				$(this).attr("subseq",i+1);
			});
			
			
		}
	

	},
	
	setBanner:function(num,func){
		clearTimeout(this.Timer);		
		var this_s = this;
		
		if(num==undefined)	num = 1 ;

		var subItems =  $(this.cont_obj);

		var numItems= $(this.numbtn_obj);
		
		if(this.subSeq!=num){
		for (var i=0; i<subItems.length; i++){
			var numImgObj = $("img",$(numItems[i]));
			if((i+1)==num){
				$(numItems[i]).stop().addClass("over");
				
				numImgObj.attr("src",numImgObj.attr("ovImg"));
				numImgObj.stop().animate({opacity:0},20);
				numImgObj.animate({opacity:1},500);

				$(subItems[i]).stop().css({"opacity":0}).show();
				var toH = $(subItems[i]).height();
				$(subItems[i]).stop().animate({"opacity":1},300);
				$(".wide-pop").stop().animate({height:toH},300);
			}else{
				$(numItems[i]).stop().removeClass("over");
				numImgObj.attr("src",numImgObj.attr("orgSrc"));
				$(subItems[i]).stop().hide();

			}
		}
		this.subSeq = num;
		}

		var nextNum = parseInt(num) + 1;
		if(nextNum> subItems.length){
			nextNum = 1;
		}
		

		if(func==undefined && this.isPlay) this_s.setNextBanImgs();
		else if(func==false) {
		}

	}	,
	setNextBanImgs:function(){
		clearTimeout(this.Timer);		
		var this_s = this;
		var nextNum = parseInt(this_s.subSeq) + 1;
		if(nextNum>  $(this_s.cont_obj).length){
			nextNum = 1;
		}

		this.Timer = setTimeout(function(){this_s.setBanner(nextNum);},$(".n"+this_s.subSeq+" #time").val());

	},
	stopBan:function(){clearTimeout(this.Timer);},
	goNext:function(){
		clearTimeout(this.Timer);		
		var this_s = this;
		var nextNum = parseInt(this_s.subSeq) + 1;
		if(nextNum>  $(this_s.cont_obj).length){
			nextNum = 1;
		}
		this_s.setBanner(nextNum);
	},
	goPrev:function(){
		clearTimeout(this.Timer);		
		var this_s = this;
		var nextNum = parseInt(this_s.subSeq) - 1;
		if(nextNum<1){
			nextNum =  $(this_s.cont_obj).length;
		}
		this_s.setBanner(nextNum);
	}
}


function toggleTopWidePopups(){
	if($(".toppop").attr("isOpen")=="1"){
		closeTopWidePopups();
	}else{
		openTopWidePopups();
		if(twidepop.isPlay)	$("#toppop .btn-pause").focus();
		else $("#toppop .btn-play").focus();
	}
}

function closeTopWidePopups(){

	try{setMenuTopPosSyncToppop(0);}catch(e){ }

	$(".toppop").stop().animate({height:0},400,function(){
		try{ resizePageLayoutHeight(); }catch(e){}
		$(".toppop").css({'display':'none'});
//		$(".btn-wopen").css({"display":"block"});
	});
	$(".toppop").attr("isOpen","0");

	//$(".btn-popups").html("popup zone");
	$("#toppop-ctrl button span").removeClass('closed').text("팝업존 열기");
	//$("#toppop_ctrl img").attr("src","/kor/_Img/Main/btn_wopen.png");
	//$("#toppop_ctrl img").attr("alt","팝업열기");

	twidepop.isPlay =false;
	twidepop.stopBan();
	try{resizePageLayoutHeight();}catch(e){}

	
	try{}catch(e){}
}
function openTopWidePopups(){
	
	
	if($(".popups li").length == 0)
		return;

	$(".toppop").attr("isOpen","1");
//		$(".btn-wopen").css({"display":"none"});
		$(".toppop").css({'opacity':1,'display':'block'});

	var maxHeight = 160; 
	$(".toppop .popups").each(function(){
		var h =$(this).height();
		if(h>maxHeight) maxHeight = h;
	});

	var chkSiteType = "W";
	try{ if(_site_type=="R") chkSiteType = _site_type;}catch(e){}
	if(chkSiteType=="R")
	{		
		topWidePopupResize();
	}else{

		$(".toppop").stop().animate({height:maxHeight + 0},400,function(){
			
		});

	}


	
	twidepop.isPlay =true;
	twidepop.setBanner(1);
	$("#toppop-ctrl .btn-wctrl span").addClass('closed').text("팝업존 닫기");

	//$("#toppop-ctrl button span").html("팝업닫기");
	//$("#toppop_ctrl img").attr("src","/kor/_Img/Main/btn_wclose.png");
	//$("#toppop_ctrl img").attr("alt","팝업 닫기");

	
	try{resizePageLayoutHeight();}catch(e){}


	
	try{}catch(e){}
	
	$(".toppop .close-btn").click(function(){	
		if($("#chk-close-wpopups").prop("checked")==true)
		{
			setCookie("toppop", "done", 1);
		}
		closeTopWidePopups(); 
	});
}

function callInitTopWidePopup(){
	

	if($(".popups li").length>0){
		$("#toppop-ctrl").show();
	}else{

		$("#toppop-ctrl").hide();
	}


	//팝업 스크립트 초기화
	twidepop.setBans();
	$(".btn-popups").off("click").on("click",function(){
		if($(".popups li").length>0){
			toggleTopWidePopups();
		}else{
			alert("등록된 팝업이 없습니다");

		} 
		return false;
	});

	//팝업 열기 체크
	var isMain = $("#toppop").hasClass("isMainY")? true :false;


	
	if(getCookie("toppop")!="done"){
	}

	 if(getCookie("toppop")=="done" || !isMain){		
			closeTopWidePopups();
	}else{
		if(getCookie("toppop")!="done"){
			openTopWidePopups();
			//setTimeout(closeTopWidePopups,3000);
		}
	}






}

$(document).ready(function(){

	callInitTopWidePopup();
});
