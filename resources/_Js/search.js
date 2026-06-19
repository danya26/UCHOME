
//쿠키////////////////////////////////////////////////
function getCookie(name)
{
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length)
	{
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

///////////////////////////////////////////////////////////

function in_array(arr,str){
	for (var i=0;i<arr.length;i++)
	{
		if(arr[i]==str) return true;
	}
	return false;
}
function remove_array(arr, item){
  var narr = $.grep(arr, function(value){
    return value != item;
  });
  return narr;
}

//내가 찾은 검색어////////////////////////////////////////////////

var mySearchKeywd = {

	init:function(){
		var mySrchStr = getCookie("myword");
		var mySrchArr = (mySrchStr.indexOf(",")>=0)? mySrchStr.split(",") : [mySrchStr];
		this.printList(mySrchArr);
	},
	printList:function(mySrchArr){
		$("#my-keywd").html("");
		var cnt = 0;
		for (var i=mySrchArr.length - 1; i > 0 ; i--) {
			var s =mySrchArr[i];
			if(s != ""){
				cnt++;
				$("#my-keywd").append("<li><a href='#n' onclick='moveTab(\"\", \""+s+"\");'><span class='txt'>"+s+"</span></a></li>");
			}
		}

		if(cnt == 0){
			$("#my-keywd").html("<li class='no-data'>최근 검색어가 없습니다.</li>");
		}
		
	},

	set:function(str){
		var s = str.trim();

		var mySrchStr = getCookie("myword");
		var mySrchArr = (mySrchStr.indexOf(",")>=0)? mySrchStr.split(",") : [mySrchStr];

		if(in_array(mySrchArr,s)){ return ; }
		else{
			mySrchArr.push(s);
		}

		var dt=new Date();
		dt=(new Date(dt.getFullYear(),dt.getMonth()+1,dt.getDate())).toGMTString();
		document.cookie="myword="+escape(mySrchArr.join(","))+";expires="+dt+";";

		if(mySrchArr.length > 7){
			mySearchKeywd.del(mySrchArr[0]);
		}

	},

	del:function(s){
		var mySrchStr = getCookie("myword");
		var mySrchArr = (mySrchStr.indexOf(",")>=0)? mySrchStr.split(",") : [mySrchStr];


		if(!in_array(mySrchArr,s)){ return ; }
		else{
			mySrchArr = remove_array(mySrchArr,s);
		}

		var dt=new Date();
		dt=(new Date(dt.getFullYear(),dt.getMonth()+1,dt.getDate())).toGMTString();
		document.cookie="myword="+escape(mySrchArr.join(","))+";expires="+dt+";";

		this.printList(mySrchArr);

	}

}

$(document).ready(function() {
	initLoad();
});

function initLoad() {
	mySearchKeywd.init();
}

function moveTab(category_code, searchKeyword ){	
	$("#category_code").val(category_code);
	$("#searchKeyword").val(searchKeyword);
	var frm = document.topSearchForm;
	frm.action = "/kor/CMS/TotalSearch/total.do";
	frm.submit();
	
}

function moveTabT(category_code, searchKeyword ){	
	$("#category_code").val(category_code);
	$("#searchKeyword").val(searchKeyword);
	$("#topSearchForm").submit();
	
}

function moveTabM(category_code, searchKeyword ){	
	$("#category_code").val(category_code);
	$("#searchKeyword").val(searchKeyword);
	$("#topSearchForm").submit();
	
}

function moveTabO(category_code, searchKeyword ){	
	$("#category_code").val(category_code);
	$("#searchKeyword").val(searchKeyword);
	$("#topSearchForm").submit();
	
}


function moveTabC(category_code, searchKeyword ){	
	$("#category_code").val(category_code);
	$("#searchKeyword").val(searchKeyword);
	$("#topSearchForm").submit();
	
}

function moveTab(category_code, searchKeyword ){	
	$("#category_code").val(category_code);
	$("#searchKeyword").val(searchKeyword);
	$("#topSearchForm").submit();
	
}

function checkSearchForm(f, tmplsitecode){

	var s = f.searchKeyword.value;

	if(s.trim()=="") {
		alert("키워드를 입력해주세요.");
		f.keyword.focus();
		return false;
	}
	mySearchKeywd.set(s);
	var category_code = $("#category_code").val();
	if(category_code != "")$("#topSearchForm").attr("action", "/" + tmplsitecode + "/CMS/TotalSearch/search.do");
	else $("#topSearchForm").attr("action", "/" + tmplsitecode + "/CMS/TotalSearch/total.do");
	return true;
}







	function setWeekDate(selectDate){


	    var year  = selectDate.substring(0,4); //선택된 년도

	    var month = selectDate.substring(4,6); //선택된 월

	    var day   = selectDate.substring(6,8); //선택된 일자

	    var week  = new Array("", "월", "화", "수", "목", "금", "토", "일");  // 아래 코드에서는 사용하지 않음

	    // 보통 0~6 까지가 일~토로 표현된다 하지만 월요일부터 표현하기 위해 0번째를 공백처리





		var currentDay1 = new Date(year, month-1, day);  
		var currentDay2 = new Date(year, month-1, day); 

		var theDayOfWeek = currentDay1.getDay();        // 요일을 숫자로 구해옴
		
		if(theDayOfWeek == 0){ //일요일이면
			currentDay1.setDate(currentDay1.getDate() - (6-theDayOfWeek));
			currentDay2.setDate(currentDay2.getDate() + (theDayOfWeek));
		}else{
			currentDay1.setDate(currentDay1.getDate() - (theDayOfWeek-1));
			currentDay2.setDate(currentDay2.getDate() + (7-theDayOfWeek));
		}

		

		var mm1 = Number(currentDay1.getMonth()+1) ;
		var dd1 = currentDay1.getDate();
		mm1 = String(mm1).length === 1 ? '0' + mm1 : mm1;
		dd1 = String(dd1).length === 1 ? '0' + dd1 : dd1;

		var mm2 = Number(currentDay2.getMonth()+1) ;
		var dd2 = currentDay2.getDate();
		mm2 = String(mm2).length === 1 ? '0' + mm2 : mm2;
		dd2 = String(dd2).length === 1 ? '0' + dd2 : dd2;

		var sdate = currentDay1.getFullYear() + "-" + mm1 + "-" + dd1;
		var edate = currentDay2.getFullYear() + "-" + mm2 + "-" + dd2;

		frm_search.sdate.value=sdate;
		frm_search.edate.value=edate;


	 }

	function setMonthDate(selectDate){
		 var year  = selectDate.substring(0,4); //선택된 년도

	    var month = selectDate.substring(4,6); //선택된 월

	    var day   = selectDate.substring(6,8); //선택된 일자
		var currentDay = new Date(year, month-1, day);  
		var lastDay = new Date(currentDay.getFullYear(), currentDay.getMonth()+1, 0) ;

		var mm1 = Number(lastDay.getMonth()+1) ;
		var dd1 = lastDay.getDate();
		mm1 = String(mm1).length === 1 ? '0' + mm1 : mm1;
		dd1 = String(dd1).length === 1 ? '0' + dd1 : dd1;

		var firstdate = lastDay.getFullYear() + "-" + mm1 + "-01";
		var lastdate = lastDay.getFullYear() + "-" + mm1 + "-" + dd1;

		frm_search.sdate.value=firstdate;
		frm_search.edate.value=lastdate;
	}
	
	
	function fn_uniOrgView(code, title,site_code){
		var frm  = $("#topSearchForm");
		var option = {
					url : "/"+site_code+"/ajx_json/UnivOrganMgr/layerView.do"
					, title : title+"상세보기"
					, width : "1200"
					, height : "370"
					, close_button_yn					: true
					, reload_button_yn					: false
					, minmaxsize_button_yn				: false
					, animate_open : 0
					, animate_close : 0
					, returnObj : frm
					, parameter : { code : code, site_code:site_code}
			};
			$("body").layerPopup(option);
	}