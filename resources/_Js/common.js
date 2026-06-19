/** 메세지박스 for 일반 */
$(function(){     

	/** Set Value */
	window.fn_setValue = function(obj, val) {
		$('#'+obj).val(val);
	};
	
	/** Alert */
	window.Alert = function(title, msg, obj) {
		$('<div title="'+title+'"><p>'+msg+'</p></div>').dialog({
			autoOpen: true,
			width: 500,
			resizable: false,
			modal: true,
			closeOnEscape: false,
			buttons: [{text: "확인", click: function() {
					$(this).dialog("close");
					if(obj) {
						obj.focus();
					}
			}}]
		});
	};
	

	/** Form Submit */
	window.fn_submitPage = function(obj, url) {
		$(obj).parents('form').attr('onSubmit', '');
		$(obj).parents('form').attr('action', url);
		$(obj).parents('form').submit();
	};
	
	
	
	/** Form Submit */
	window.fn_submitPage2 = function(obj, url) {
		$("#"+obj).attr('onSubmit', '');
		$("#"+obj).attr('action', url);
		$("#"+obj).submit();
		
	};
	
	
	/** Form Submit */
	window.fn_submitPage3 = function(obj) {
		$("#"+obj).attr('onSubmit', '');
		$('.bp-btn').attr("disabled","disabled").val("처리중...");
		$("#"+obj).submit();
		
	};
	
	window.fn_LayerPopup = function(url, param){
		var option = {
				url : url
				, parameter :  param
		};
		$("body").layerPopup("reload", option);
		return false;
	};
	
	window.fn_DelLinkUrl= function(url){
		location.href=url;
	}
	
	/** 메세지박스 for 삭제 */
	window.ConfirmLayor = function(title, msg, url, param) {
		$('<div title="'+title+'"><p>'+msg+'</p></div>').dialog({
			autoOpen: true,
			width: 350,
			resizable: false,
			modal: true,
			closeOnEscape: false,
			buttons: [{text: "예", click: function() {
				$(this).dialog("close");
				fn_LayerPopup(url,param);
			}
		},{text: "아니오", click: function() {
					$(this).dialog("close");
				}
			}]
		});
		
	};
	
	/** 메세지박스 for 삭제 */
	window.ConfirmContetsTempletLayor = function(title, msg, id, val) {
		$('<div title="'+title+'"><p>'+msg+'</p></div>').dialog({
			autoOpen: true,
			width: 350,
			resizable: false,
			modal: true,
			closeOnEscape: false,
			buttons: [{text: "예", click: function() {
				$(this).dialog("close");
				if(id != "") fn_setValue(id, val);
				$("body").layerPopup("closeLayerPopup");
			}
		},{text: "아니오", click: function() {
					$(this).dialog("close");
				}
			}]
		});
		
	};
	
	
	/** 메세지박스 for 삭제 */
	window.ConfirmBoard = function(title, msg, obj) {
		$('<div title="'+title+'"><p>'+msg+'</p></div>').dialog({
			autoOpen: true,
			width: 500,
			resizable: false,
			modal: true,
			closeOnEscape: false,
			buttons: [{text: "예", click: function() {
				$(this).dialog("close");
				fn_submitPage3(obj);
			}
		},{text: "아니오", click: function() {
					$(this).dialog("close");
				}
			}]
		});
		
	};
	

	
	
	
	/** 메세지박스 for 삭제 */
	window.Confirm = function(title, msg, obj, url, id, val, id2, val2, submit) {
		$('<div title="'+title+'"><p>'+msg+'</p></div>').dialog({
			autoOpen: true,
			width: 350,
			resizable: false,
			modal: true,
			closeOnEscape: false,
			buttons: [{text: "예", click: function() {
					$(this).dialog("close");
					if(id != "") fn_setValue(id, val);
					if(id2 != "") fn_setValue(id2, val2);
					if(submit == "1")  fn_submitPage(obj, url);
					else fn_submitPage2(obj, url);
				}
			}, {text: "아니오", click: function() {
					$(this).dialog("close");
				}
			}]
		});	
	};
	

	/** 메세지박스 for 삭제 */
	window.DelAlert = function(title, msg, obj, url, id, val, id2, val2, submit) {
		$('<div title="'+title+'"><p>'+msg+'</p></div>').dialog({
			autoOpen: true,
			width: 500,
			resizable: false,
			modal: true,
			closeOnEscape: false,
			buttons: [{text: "예", click: function() {
					$(this).dialog("close");
					if(id != "") fn_setValue(id, val);
					if(id2 != "") fn_setValue(id2, val2);
					if(submit == "1")  fn_submitPage(obj, url);
					else fn_submitPage2(obj, url);
				}
			}, {text: "아니오", click: function() {
					$(this).dialog("close");
				}
			}]
		});	
	};
	
	
	/** 메세지박스 for 삭제 */
	window.DelLink = function(title, msg,  url) {
		$('<div title="'+title+'"><p>'+msg+'</p></div>').dialog({
			autoOpen: true,
			width: 500,
			resizable: false,
			modal: true,
			closeOnEscape: false,
			buttons: [{text: "예", click: function() {
					$(this).dialog("close");
					 fn_DelLinkUrl(url);
				}
			}, {text: "아니오", click: function() {
					$(this).dialog("close");
				}
			}]
		});	
	};

	
	$("#allCheck").click(function(){ 
		 if($("#allCheck").prop("checked")) { 
			 $("input[name=chk]").prop("checked",true); 
		  } else {
			  $("input[name=chk]").prop("checked",false);
			}
	})
	
	//레이어팝업 열기
	window.openLayerPage = function(url,width,height,page_title){
		frmWin = new msgPopupWin({w:width+"px",h:height+"px",setStyle:true,title:page_title});
		$.get(url,function(r){
			frmWin.setContents(r);
		});
	}
	
	
	
	
	window.sprintf2 = function(zero,text){
		len = zero.length;
		r_txt = zero + text;
		f_len = r_txt.length;
		s_len = f_len - len;
		r_txt = r_txt.slice(s_len,f_len);
		return r_txt;
	}
	
	
	window.search_day = function(opt,s_date_frm,e_date_frm){
		var date=new Date();	 //현재 날짜

		if(opt=='yesterday')	{
			sDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()-1);
			eDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()-1);
		}else if(opt=='today')	{
			sDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());
			eDate = date;
		}
		else if(opt=='thisweek')	{
			sDate = new Date(date.getFullYear(),date.getMonth(),date.getDate() - date.getDay());
			eDate = date;
		}
		else if(opt=='thismonth')	{
			sDate = new Date(date.getFullYear(),date.getMonth(),1);
			eDate = date;
		}
		else if(opt=='lastmonth')	{
			sDate = new Date(date.getFullYear(),date.getMonth()-1,1);
			eDate = new Date(date.getFullYear(),date.getMonth(),0);
		}else{
			sDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());
			eDate = new Date(date.getFullYear(),date.getMonth(),date.getDate() + (opt * 1));

		}

		var	sy = sprintf2("0000",sDate.getFullYear());
		var	ey = sprintf2("0000",eDate.getFullYear());

		var	sm =  sprintf2("00",sDate.getMonth()+1);
		var	em =  sprintf2("00",eDate.getMonth()+1);

		var	sd= sprintf2("00",sDate.getDate());
		var	ed = sprintf2("00",eDate.getDate());
		
		var rDate = {"sy":sy,"sm":sm,"sd":sd,"ey":ey,"em":em,"ed":ed};
		$(s_date_frm).val(rDate.sy+"-"+rDate.sm+"-"+rDate.sd);
		$(e_date_frm).val(rDate.ey+"-"+rDate.em+"-"+rDate.ed);

		return rDate;
	}
	
	window.search_day2 =  function(opt,date_frm){
		var date=new Date();	 //현재 날짜
		var	sDate = new Date(date.getFullYear(),date.getMonth(),date.getDate() + (opt * 1));

		var	sy = sprintf2("0000",sDate.getFullYear());
		var	sm =  sprintf2("00",sDate.getMonth()+1);
		var	sd = sprintf2("00",sDate.getDate());

		var rDate = {"sy":sy,"sm":sm,"sd":sd};
		$("#"+date_frm).val(rDate.sy+"-"+rDate.sm+"-"+rDate.sd);
	}
	
	//사이트관리 링크
	window.goSiteManager = function(sCode){
		$("#siteGoForm").attr("action",(window.ADMIN_URL_PREFIX||'/_Admin')+"/CMS/SiteMgr/Main.do?site_code="+ sCode);
		$("#siteGoForm").attr("target","_blank");
		$("#siteGoForm").submit();

	}
	
	//홈페이지새창 띄우기
   window.onHomepageLink = function(isDevelopMode, defaulthost){
	   
	   var newURL = window.location.protocol + "//" + window.location.host ;

	   $.ajax({
			type:"post",
			url:(window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/SiteMgr/siteInfo.json",
			data: {
				site_code		: $("#goSite").val()
			},
			dataType:"json", // TEXT 형의 JSON으로 받음 
			success : function(obj) {
				if(isDevelopMode == "Y")
					$("#homeLinkForm").attr("action",newURL+"/"+obj.result.siteInfo.site_code);
				else
					$("#homeLinkForm").attr("action","http://"+obj.result.siteInfo.domain);
				
					$("#homeLinkForm").attr("target","_blank");
					$("#homeLinkForm").submit();
			},
			error : function(xhr, status, error) {
				//alert("에러발생:" + error + status + xhr);
				alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
			}
		});
  
  }
	
	//null 처리
	 window.nullToBlank = function(sValue)
     {	
     	if(new String(sValue).valueOf() == "undefined") return '';
         if(sValue == null) return '';
         var v_ChkStr = new String(sValue);
         
         // v_ChkStr 값이 null 이거나 "" 인경우 true 리턴.
         if(v_ChkStr == null || v_ChkStr.trim() == "") return '';

         if(v_ChkStr.toString().length == 0)return '';

         return sValue;
     }
	 
	 
	// 이메일 유효성검사
	 window.email_check = function(email){
	     var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	     return (email != '' && email != 'undefined' && regex.test(email));
	  
	 }
	 
	 window.FormElOptionCheck = function(currEl,f){
			
			var $currEl = $(currEl);
			var form = f || $currEl.parents("form").get(0);

			var regNum =/^[0-9]+$/; 
			var regFloat =/^[.0-9]+$/; 
			var regPhone =/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$/; 
			var regMail =/^[\._a-zA-Z0-9-]+@[\._a-zA-Z0-9-]+\.[a-zA-Z]+$/; 
			var regDomain =/^ftp|http|https:\/\/[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/; 
			var regAlpha =/^[a-zA-Z]+$/; 
			var regIdPass =/^[a-zA-Z0-9_]+$/; 
			var regHost =/^[a-zA-Z-]+$/; 
			var regHangul =/[가-힣]/; 
			var regHangulOnly =/^[가-힣 ]*$/; 
			var regQuote =/["]/; 
			var regSearchstr =/^[a-zA-Z0-9가-힣-_\s]+$/; 

			if($currEl.attr("options")!=undefined  && $currEl.attr("options")!=""){
				var chkOptions = $currEl.attr("options").split(" ");
				for(i=0;i<chkOptions.length;i++){
					if(chkOptions[i]=="email" && !regMail.test(currEl.value)) { 
							return ErrMsg(currEl, "email",form); 
					} 
					if(chkOptions[i] == "domain" && !regDomain.test(currEl.value)) { 
							return ErrMsg(currEl, "domain",form); 
					} 
					if(chkOptions[i] == "phone" && !regPhone.test(currEl.value)) { 
							return ErrMsg(currEl, "phone",form); 
					} 
					if(chkOptions[i] == "hangul" && !regHangulOnly.test(currEl.value)) { 
							return ErrMsg(currEl, "hangul",form); 
					} 
					if(chkOptions[i] == "idpass" && !regIdPass.test(currEl.value)) { 
							return ErrMsg(currEl, "idpass",form); 
					} 
					if(chkOptions[i] == "passwd"){ 
						//return isValid_passwd(currEl,"");
						return getPasswordLevel(currEl,document.getElementById(currEl.id + "_chk"),true);
						//	return ErrMsg(currEl, "idpass",form); 
					} 
					if(chkOptions[i] == "number" && !regNum.test(currEl.value)) { 
							return ErrMsg(currEl, "number",form); 
					} 
					
					if(chkOptions[i] == "float" && !regFloat.test(currEl.value)) { 
							return ErrMsg(currEl, "float", form); 
					} 
					if(chkOptions[i] == "month1" && !is_month1(currEl.value)) { 
							return ErrMsg(currEl, "month1",form); 
					} 
					if(chkOptions[i] == "year" && !is_year(currEl.value)) { 
							return ErrMsg(currEl, "year",form); 
					} 
					if(chkOptions[i] == "month2" && !is_month2(currEl.value)) { 
							return ErrMsg(currEl, "month2",form); 
					} 
					if(chkOptions[i] == "day1" && !is_day1(currEl.value)) { 
							return ErrMsg(currEl, "day1",form); 
					} 
					if(chkOptions[i] == "day2" && !is_day2(currEl.value)) { 
							return ErrMsg(currEl, "day2",form); 
					} 
					if(chkOptions[i] == "hour1" && !is_time1(currEl.value,24)) { 	return ErrMsg(currEl, "hour1",form); 	} 
					if(chkOptions[i] == "hour2" && !is_time2(currEl.value,24)) { 	return ErrMsg(currEl, "hour2",form); 	} 
					if(chkOptions[i] == "time1" && !is_time1(currEl.value,60)) { 	return ErrMsg(currEl, "time1",form); 	} 
					if(chkOptions[i] == "time2" && !is_time2(currEl.value,60)) { 	return ErrMsg(currEl, "time2",form); 	} 

					if(chkOptions[i] == "ssn" && !is_ssn(currEl.value)) { 
							return ErrMsg(currEl, "ssn",form); 
					} 
					if(chkOptions[i] == "binno" && !is_binNo(currEl.value)) { 
							return ErrMsg(currEl, "binno",form); 
					} 
					if(chkOptions[i] == "noqt" && regQuote.test(currEl.value)) { 
							return ErrMsg(currEl, "noqt",form); 
					}
					if(chkOptions[i] == "searchstr" && !regSearchstr.test(currEl.value)) { 
							return ErrMsg(currEl, "searchstr",form); 
					}
				}
			}


			if($currEl.attr("option") != undefined  && $currEl.attr("option") != null && currEl.value != "") { 
					if($currEl.attr("option") == "email" && !regMail.test(currEl.value)) { 
							return ErrMsg(currEl, "email", form); 
					} 
					if($currEl.attr("option") == "domain" && !regDomain.test(currEl.value)) { 
							return ErrMsg(currEl, "domain", form); 
					} 
					if($currEl.attr("option") == "phone" && !regPhone.test(currEl.value)) { 
							return ErrMsg(currEl, "phone", form); 
					} 
					if($currEl.attr("option") == "hangul" && !regHangulOnly.test(currEl.value)) { 
							return ErrMsg(currEl, "hangul", form); 
					} 
					if($currEl.attr("option") == "idpass" && !regIdPass.test(currEl.value)) { 
							return ErrMsg(currEl, "idpass", form); 
					} 
					if($currEl.attr("option") == "passwd"){ 
						//return isValid_passwd(currEl,"");
						return getPasswordLevel(currEl,document.getElementById(currEl.id + "_chk"),true);
						//	return ErrMsg(currEl, "idpass", form); 
					} 
					if($currEl.attr("option") == "number" && !regNum.test(currEl.value)) { 
							return ErrMsg(currEl, "number", form); 
					} 
					if($currEl.attr("option") == "float" && !regFloat.test(currEl.value)) { 
							return ErrMsg(currEl, "float", form); 
					} 

					if($currEl.attr("option") == "year" && !is_year(currEl.value)) { 
							return ErrMsg(currEl, "year",form); 
					} 

					if($currEl.attr("option")  == "month1" && !is_month1(currEl.value)) { 
							return ErrMsg(currEl, "month1",form); 
					} 
					if($currEl.attr("option")  == "month2" && !is_month2(currEl.value)) { 
							return ErrMsg(currEl, "month2",form); 
					} 
					if($currEl.attr("option")  == "day1" && !is_day1(currEl.value)) { 
							return ErrMsg(currEl, "day1",form); 
					} 
					if($currEl.attr("option")  == "day2" && !is_day2(currEl.value)) { 
							return ErrMsg(currEl, "day2",form); 
					} 
					if($currEl.attr("option") == "hour1" && !is_time1(currEl.value,24)) { 	return ErrMsg(currEl, "hour1",form); 	} 
					if($currEl.attr("option") == "hour2" && !is_time2(currEl.value,24)) { 	return ErrMsg(currEl, "hour2",form); 	} 
					if($currEl.attr("option") == "time1" && !is_time1(currEl.value,60)) { 	return ErrMsg(currEl, "time1",form); 	} 
					if($currEl.attr("option") == "time2" && !is_time2(currEl.value,60)) { 	return ErrMsg(currEl, "time2",form); 	} 


					if($currEl.attr("option") == "ssn" && !is_ssn(currEl.value)) { 
							return ErrMsg(currEl, "ssn", form); 
					} 
					if($currEl.attr("option") == "binno" && !is_binNo(currEl.value)) { 
							return ErrMsg(currEl, "binno", form); 
					} 
					if($currEl.attr("option") == "noqt" && regQuote.test(currEl.value)) { 
							return ErrMsg(currEl, "noqt", form); 
					}
					if($currEl.attr("option")  == "searchstr" && !regSearchstr.test(currEl.value)) { 
							return ErrMsg(currEl, "searchstr",form); 
					}

			}
			

				if($(currEl).attr("option")=="dchk"){
					//중복확인한 값과 입력된 값이 같은지 체크
					chk_id = $(currEl).attr("dchkid");
					chk_value = document.getElementById(chk_id).value;
					if(chk_value=="" || chk_value!=currEl.value)
					{
						return ErrMsg(currEl,"dchk",form);
					}
					
				}

				if($(currEl).attr("ssame") != undefined && $(currEl).attr("ssame") != null && currEl.value != "") { 
						ssameEI = eval("form." + currEl.ssame + ".value"); 
						if(currEl.value != ssameEI) { 
								return ErrMsg(currEl, "ssame", form); 
						} 
				} 

				if($(currEl).attr("nospace") != undefined && $(currEl).attr("nospace") != null && !checkspace(currEl.value)) { 
						return ErrMsg(currEl, "nospace", form); 
				} 
				
				
				
				if($(currEl).attr("minsize") != undefined && $(currEl).attr("minsize") != null && currEl.value != "") { 
						if($(currEl).attr("minsize") > ByteCount(currEl.value)) { 
								return ErrMsg(currEl, "minsize", form); 
						} 
				} 
				if($(currEl).attr("minlength") != undefined && $(currEl).attr("minlength") != null && currEl.value != "") { 
					if(parseInt($(currEl).attr("minlength"))>0){
						if($(currEl).attr("minlength") > lengthCount(currEl.value)) { 
								return ErrMsg(currEl, "minlength", form); 
						} 
					}
				} 

				if($(currEl).attr("maxsize") != undefined && $(currEl).attr("maxsize") != null && currEl.value != "") { 
						if($(currEl).attr("maxsize") < ByteCount(currEl.value)) { 
								return ErrMsg(currEl, "maxsize", form); 
						} 
				} 					

				if($(currEl).attr("maxlength") != undefined && $(currEl).attr("maxlength") != null && currEl.value != "") { 
						if(parseInt($(currEl).attr("maxlength"))>0){
						if($(currEl).attr("maxlength") < lengthCount(currEl.value)) { 
								return ErrMsg(currEl, "maxlength", form); 
						} 
						}
				} 
				
				if($(currEl).attr("type")=="checkbox" && (($(currEl).attr("maxcheck") != null &&  parseInt($(currEl).attr("maxcheck"))>0)|| ($(currEl).attr("mincheck") != null &&  parseInt($(currEl).attr("mincheck"))>0))) { 
					var chkCount = countCheckboxSelect(form,$(currEl).attr("name"));
					if($(currEl).attr("maxcheck") != null &&  parseInt($(currEl).attr("maxcheck"))>0 && chkCount >parseInt($(currEl).attr("maxcheck"))){
						return ErrMsg(currEl, "maxcheck", form); 
					}

					if($(currEl).attr("mincheck") != null &&  parseInt($(currEl).attr("mincheck"))>0 && chkCount < parseInt($(currEl).attr("mincheck"))){
						return ErrMsg(currEl, "mincheck", form); 
					}


				}

				

			 if($(currEl).attr("type")=="file"){
					var maxFileSize =($(currEl).attr("maxfilesize")!=undefined)? $(currEl).attr("maxfilesize") : 0;

					//HTML5 지원여부 체크 후 파일 첨부 용량 및 파일 type 체크
					
					if(checkFileAPI() &&  maxFileSize>0){
						

						var chkFileEl = $(currEl).get(0);

						try{
						for(var fi = 0;fi<chkFileEl.files.length;fi++){
							var thisFile = chkFileEl.files[fi];
							if(thisFile.size > maxFileSize){
								alert("첨부가능한 용량("+file_size(maxFileSize)+")을 초과했습니다.\n첨부한 파일 용량 : "+file_size(thisFile.size));
								return false;
							}

							
						}
						}catch(e){}
					


					}
			 }



			return true;



		}
	 
	 window.FormElCheck = function(currEl,form){

//			var regNum =/^[0-9]+$/; 
//			var regPhone =/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$/; 
//			var regMail =/^[\._a-zA-Z0-9-]+@[\._a-zA-Z0-9-]+\.[a-zA-Z]+$/; 
//			var regDomain =/^ftp|http|https:\/\/[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/; 
//			var regAlpha =/^[a-zA-Z]+$/; 
//			var regIdPass =/^[a-zA-Z0-9_]+$/; 
//			var regHost =/^[a-zA-Z-]+$/; 
//			var regHangul =/[가-힣]/; 
//			var regHangulOnly =/^[가-힣 ]*$/; 
//			var regQuote =/["]/; 
//


		if($(currEl).attr("initValue")!=undefined && $(currEl).attr("initValue")!=""){
			if($(currEl).attr("initValue")==$(currEl).val()){
				$(currEl).val("");
			}
		}


		//필수 입력 기본 체크
		var chkRequired= (($(currEl).attr("required") != undefined && $(currEl).attr("required") != null && $(currEl).attr("required")!="") || $(currEl).attr("frequired") != undefined && $(currEl).attr("frequired") != null && $(currEl).attr("frequired")!=""	)? true : false;

		if(chkRequired) { 
				
			if($(currEl).attr("option") == "check" && currEl.value == "")
			{
				return ErrMsg(currEl,'check',form); 
			}

			if($(currEl).attr("type")=="radio"){
				if(!checkRadioSelect(form,$(currEl).attr("name"))){
					return ErrMsg(currEl,'radio',form); 
				}
				
			}else if($(currEl).attr("type")=="file"){
				//수정일때는 원본파일에 대한 체크 항목 검색
				if($(currEl).attr("chkEl")!=null){
					var chkFileDel = document.getElementById($(currEl).attr("chkEl"));

					//삭제체크 항목이 존재할경우
					if(chkFileDel!=undefined){
						//삭제 체크했을때는 파일 첨부 여부 체크함
						if(chkFileDel.checked && trim(currEl.value).length<1) return ErrMsg(currEl,'file',form); 
					}else{//삭제체크 항목이 존재하지 않을경우 할경우
						if(trim(currEl.value).length<1) return ErrMsg(currEl,'file',form); 
					}
				}else{
					if(trim(currEl.value).length<1) return ErrMsg(currEl,'file',form); 
				}

			}else if(trim(currEl.value).length < 1) { 
					return ErrMsg(currEl,'',form); 
			} 
		}

		//필수 입력 기본 체크 end
		
		if($(currEl).attr("requireds") != undefined && $(currEl).attr("requireds") != null){ 
			
			if(trim(currEl.value).length < 1) { 
				
				//if($(currEl).attr("title")!="" && $(currEl).attr("title")!=undefined)
				//{
					//alert($(currEl).attr("title"));
				//}else{
					alert("'"+$(currEl).attr("hname") + "' 항목은 필수입니다.");
				//}
				return false;
			} 
		}

	
		var optionChk = FormElOptionCheck(currEl);

		if(!optionChk) return false;
	
		
		 
		return true;


}
	 
	 
	window.ErrMsg = function(el, type, form) { 
	    var bgColor = '#FEFCEF'; 
		var name = ($(el).attr("hname")) ? $(el).attr("hname") : el.getAttribute("name"); 
		var focusId = $("#"+$(el).attr("id"));
		var 	focus_target = el;
		
		var focus_target_id="";
		switch(type) { 
			case "ssame": 
					eval("var samename = (form."+el.ssame+".hname) ? form."+el.ssame+".hname : form."+el.ssame+".name");
					Alert("Information","'"+ name + "' 항목은 '" + samename + "' 항목과 같아야 합니다.",focusId);
					break; 
			case "email": 
					Alert("Information","'"+ name + "'의 형식이 올바르지 않습니다.", "");
					break;  
			case "dchk": 
					focus_target_id = el.dchkid;
					if(el.getAttribute("dchkid2")!=undefined && el.getAttribute("dchkid2")!=""){
						focus_target_id = el.getAttribute("dchkid2");
					}
					focus_target = document.getElementById(focus_target_id);
					Alert("Information","이미 사용중인 "+ name + " 이거나, 중복확인을 하지 않으셨습니다.", focusId);
					break;
			case "domain": 
					Alert("Information","'"+ name + "'의 형식이 올바르지 않습니다\n\nhttp://로 시작하는 도메인을 입력하세요", focusId);
					break; 
			case "phone": 
					Alert("Information","'"+ name + "'의 형식이 올바르지 않습니다\n02-1234-5678형식으로 입력하세요", focusId);
					break; 
			case "number": 
					Alert("Information","'"+ name + "' 항목은 숫자만 입력하실 수 있습니다.", focusId);
					break;
			case "float": 
					Alert("Information","'"+ name + "' 항목은 숫자만(소수점포함) 입력하실 수 있습니다.", focusId);
					break;
			case "year": 
					Alert("Information","'"+ name + "' 항목은 년도를 4자리 숫자로만 입력하실 수 있습니다.", focusId);
					break;
			case "month1": 
					Alert("Information","'"+ name + "' 항목은 1~12까지의 날짜(월)을 숫자로만 입력하실 수 있습니다.", focusId);
					break;
			case "month2": 
					Alert("Information","'"+ name + "' 항목은 01~12까지의 날짜(월)을 2자리 숫자로만 입력하실 수 있습니다.", focusId);
					break;
			case "day1": 
					Alert("Information","'"+ name + "' 항목은 1~31까지의 날짜(일)을 숫자로만 입력하실 수 있습니다.", focusId);
					break;
			case "day2": 
					Alert("Information","'"+ name + "' 항목은 01~31까지의 날짜(일)을 2자리 숫자로만 입력하실 수 있습니다.",focusId);
					break;
			case "hour1": 
					Alert("Information","'"+ name + "' 항목은 0~24까지의 숫자로만 입력하실 수 있습니다.",focusId);
					break;
			case "hour2": 
					Alert("Information","'"+ name + "' 항목은 00~24까지의 2자리 숫자로만 입력하실 수 있습니다.",focusId);
					break;
			case "shour1": 
					Alert("Information","'"+ name + "' 항목은 0~12까지의 숫자로만 입력하실 수 있습니다.", focusId);
					break;
			case "shour2": 
					Alert("Information","'"+ name + "' 항목은 00~12까지의 2자리 숫자로만 입력하실 수 있습니다.", focusId);
					break;
			case "time1": 
					Alert("Information","'"+ name + "' 항목은 0~59까지의 숫자로만 입력하실 수 있습니다.", focusId);
					break;
			case "time2": 
					Alert("Information","'"+ name + "' 항목은 00~59까지의 2자리 숫자로만 입력하실 수 있습니다.", focusId);
					break;
			case "hangul": 
					Alert("Information","'"+ name + "' 항목은 한글만 입력할 수 있습니다", focusId);
					break; 
			case "english": 
					Alert("Information","'"+ name + "' 항목은 영문만 입력하실 수 있습니다", focusId);
					break; 
			case "idpass": 
					Alert("Information","'"+ name + "' 항목은 영문, 숫자, _ 만 입력하실 수 있습니다", focusId);
					break; 

			case "mincheck": 
					if(el.getAttribute("grname")!=undefined && el.getAttribute("grname")!=""){
						name = el.getAttribute("grname");
					}
					Alert("Information","'"+ name + "' 항목은 " + el.getAttribute("mincheck") + "개 이상 선택해주시기 바랍니다.", focusId);
					break; 
			case "maxcheck": 
					if(el.getAttribute("grname")!=undefined && el.getAttribute("grname")!=""){
						name = el.getAttribute("grname");
					}
					Alert("Information","'"+ name + "' 항목은 최대 " + el.getAttribute("maxcheck") + "개까지만 선택가능 합니다.", focusId);
					break; 

			case "minlength": 
					Alert("Information","'"+ name + "' 항목은 " + el.getAttribute("minlength") + "자 이상이어야 합니다.", focusId);
					break; 
			case "minsize": 
					Alert("Information","'"+ name + "' 항목은 " + el.getAttribute("minsize") + "자 이상이어야 합니다.", focusId);
					break; 
			case "maxsize": 
					Alert("Information","'"+ name + "' 항목은 " + el.getAttribute("maxsize") + "자 이하이어야 합니다.", focusId);
					break; 
			case "maxlength": 
					Alert("Information","'"+ name + "' 항목은 " + el.getAttribute("maxlength") + "자 이하이어야 합니다.", focusId);
					break; 
			case "ssn": 
					Alert("Information","주민등록번호가 올바르지 않습니다.",focusId);
					break; 
			case "binno": 
					Alert("Information","사업자등록번호가 올바르지 않습니다.", focusId);
					break; 
			case "nospace": 
					Alert("Information","'"+ name+"' 항목에는 빈칸이 올 수 없습니다.", focusId);
					break; 
			case "check": 
					Alert("Information","'"+ name+"' (을)를 체크해 주세요", focusId);

					break;
			case "radio": 
					Alert("Information","'"+ name+"' (을)를 선택해 주세요", focusId);

					break;
			case "file":
					Alert("Information","'"+ name+"' (을)를 첨부해 주세요", focusId);
					break;
			case "noqt":
					Alert("Information","'"+ name+"' 항목에 큰따옴표는 입력불가능합니다.", focusId);
					break;
			case "searchstr":
					Alert("Information","'"+ name+"' 항목에 입력불가능한 문자가 포함되어 있습니다.",focusId);
					break;
			default: 
					Alert("Information","'"+ name + "' 항목은 필수입니다.",focusId);
					
					break; 
		} 
		try{

		if(focus_target.style.display!="none" && focus_target.type!="hidden")
		{
					focus_target.focus(); 
		}
		}catch(e){
		}

		return false; 
	} 
	
	
	window.ValidUrl = function(url) {
		 var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

		    if(RegExp.test(url)){
		        return true;
		    }else{
		        return false;
		    }

	}

});

