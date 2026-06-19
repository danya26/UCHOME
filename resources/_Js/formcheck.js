/* 2014-10-24 최종수정 */
	function IsDigit() {

		// onkeydown="IsDigit()" style="ime-mode:disabled"
		if(
			((event.keyCode >= 48) && (event.keyCode <= 57)) ||	// keyboard
			((event.keyCode >= 96) && (event.keyCode <= 105)) ||	// keypad
			(event.keyCode == 9) ||	// tab
			(event.keyCode == 10)||	// enter
			((event.keyCode >= 35) && (event.keyCode <= 40)) ||	// arrow and home,end
			(event.keyCode == 45)||	(event.keyCode == 46)||	// insert, delete
			(event.keyCode == 8) ||	(event.keyCode == 144)	// BS, NumLock
			) {
				event.returnValue = true;
			} else {
				event.returnValue = false;
			}
	}


	function ByteCount(input) { 
		var i, j=0; 

		for(i=0;i<input.length;i++) { 

			val=escape(input.charAt(i)).length; 

			if(val== 6) j++; 
			j++; 
		} 
		return j; 
	}
	
	function lengthCount(input) { 
		return input.length;
	}


	function trim(strValue)
	{
		var ReturnValue = "";

		if(strValue == "")
					return "";

		for(var i=0;i<strValue.length;i++)
		{
				if(strValue.charAt(i) != " ")
					  ReturnValue = ReturnValue + strValue.charAt(i);
		}

		return ReturnValue;
	}

	function is_binNo(num) { 
		if(num.length != 10) {
			return false;
		}
		var reg = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/; 
		if(!reg.test(num)) return false; 
		num = RegExp.$1 + RegExp.$2 + RegExp.$3; 
		var cVal = 0; 
		for (var i=0; i<8; i++) { 
			var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : (_tmp  == 1)? 3 : 7); 
			cVal += (parseFloat(num.substring(i,i+1)) * cKeyNum) % 10; 
		} 
		var li_temp = parseFloat(num.substring(i,i+1)) * 5 + '0'; 
		cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2)); 
		return (parseInt(num.substring(9,10)) == 10-(cVal % 10)%10); 
	} 

	function is_ssn(J) {
		var J1, J2, dash;

		J1 = J.substring(0,6);
		J2 = J.substring(6,6+7);

		var SUM  =0;
		if(J1 =="111111" || J2 =="1111118"){
			return false;
		} else {
			// 주민등록번호 1 ~ 6 자리까지의 처리
			// 주민등록번호에 숫자가 아닌 문자가 있을 때 처리
			for(i=0;i<J1.length;i++){
				if(J1.charAt(i) >= 0 && J1.charAt(i) <= 9) {
					// 숫자면 값을 곱해 더한다.
					if(i == 0){
						SUM = (i+2) * J1.charAt(i);
					}else{ 
						SUM = SUM +(i+2) * J1.charAt(i);
					}
				}else{
					// 숫자가 아닌 문자가 있을 때의 처리
					return false;
				}
			}
			for(i=0;i<2;i++){
				// 주민등록번호 7 ~ 8 자리까지의 처리
				if(J2.charAt(i) >= 0 && J2.charAt(i) <= 9) {
					SUM = SUM + (i+8) * J2.charAt(i);
				}else{
					// 숫자가 아닌 문자가 있을 때의 처리
					return false;
				}
			}
			for(i=2;i<6;i++){
				// 주민등록번호 9 ~ 12 자리까지의 처리
				if(J2.charAt(i) >= 0 && J2.charAt(i) <= 9) {
					SUM = SUM + (i) * J2.charAt(i);
				}else{
					// 숫자가 아닌 문자가 있을 때의 처리
					return false;
				}
			}
			// 나머지 구하기
			var checkSUM = SUM % 11;
			// 나머지가 0 이면 10 을 설정
			if(checkSUM == 0){
				var checkCODE = 10;
				// 나머지가 1 이면 11 을 설정
			}else if(checkSUM ==1){
				var checkCODE = 11;
			}else{
				var checkCODE = checkSUM;
			}
			// 나머지를 11 에서 뺀다
			var check1 = 11 - checkCODE;
			if(J2.charAt(6) >= 0 && J2.charAt(6) <= 9) {
				var check2 = parseInt(J2.charAt(6))
			}else{
				// 숫자가 아닌 문자가 있을 때의 처리
				return false;
			}
			if(check1 != check2){
				// 주민등록번호가 틀릴 때의 처리
				return false;
			}else{
				return true;
			} 
		}
	}

	function is_year(v){
		var regNum =/^[0-9]+$/; 
		if($.trim(v)!=""){
			if(!regNum.test(v) || $.trim(v).length!=4 || parseInt(v)==0)	 return false;
		}
		return true;

	}


	function is_month1(v){
		var regNum =/^[0-9]+$/; 
		if($.trim(v)!=""){
			if(!regNum.test(v))	 return false;
			else if(parseInt(v) < 1 || parseInt(v) > 12) return false;
			else if((v.length>1 && parseInt(v) <10))return false;
		}
		return true;

	}
	function is_month2(v){
		var regNum =/^[0-9]+$/; 
		if($.trim(v)!=""){
			if(!regNum.test(v))	 return false;
			else if(parseInt(v) < 1 || parseInt(v) > 12) return false;
			else if(v.length!=2) return false;
		}
		return true;

	}
	function is_day1(v){
		var regNum =/^[0-9]+$/; 
		if($.trim(v)!=""){
			if(!regNum.test(v))	 return false;
			else if(parseInt(v) < 1 || parseInt(v) > 31) return false;
			else if((v.length>1 && parseInt(v) <10))return false;
		}
		return true;

	}
	function is_day2(v){
		var regNum =/^[0-9]+$/; 
		if($.trim(v)!=""){
			if(!regNum.test(v))	 return false;
			else if(parseInt(v) < 1 || parseInt(v) > 31) return false;
			else if(v.length!=2) return false;
		}
		return true;
	}
	function is_time1(v,max){
		var regNum =/^[0-9]+$/; 
		if($.trim(v)!=""){
			if(!regNum.test(v))	 return false;
			else if(parseInt(v) < 0 || parseInt(v) > max) return false;
			else if((v.length>1 && parseInt(v) <10))return false;
		}
		return true;
	}
	function is_time2(v,max){
		var regNum =/^[0-9]+$/; 
		if($.trim(v)!=""){
			if(!regNum.test(v))	 return false;
			else if(parseInt(v) < 0 || parseInt(v) > max) return false;
			else if(v.length!=2) return false;
		}
		return true;
	}



	function checkspace(id)
	{
		if(id.indexOf(" ") >= 0) return false;
		return true;
	}

	var issubmit = false;


	function FormElOptionCheck(currEl,f){
		
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

		if(getDataAttribute(currEl,"options")!=undefined  && getDataAttribute(currEl,"options")!=""){
			var chkOptions = getDataAttribute(currEl,"options").split(" ");
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


		if(getDataAttribute(currEl,"option") != undefined  && getDataAttribute(currEl,"option") != null && currEl.value != "") { 
				if(getDataAttribute(currEl,"option") == "email" && !regMail.test(currEl.value)) { 
						return ErrMsg(currEl, "email", form); 
				} 
				if(getDataAttribute(currEl,"option") == "domain" && !regDomain.test(currEl.value)) { 
						return ErrMsg(currEl, "domain", form); 
				} 
				if(getDataAttribute(currEl,"option") == "phone" && !regPhone.test(currEl.value)) { 
						return ErrMsg(currEl, "phone", form); 
				} 
				if(getDataAttribute(currEl,"option") == "hangul" && !regHangulOnly.test(currEl.value)) { 
						return ErrMsg(currEl, "hangul", form); 
				} 
				if(getDataAttribute(currEl,"option") == "idpass" && !regIdPass.test(currEl.value)) { 
						return ErrMsg(currEl, "idpass", form); 
				} 
				if(getDataAttribute(currEl,"option") == "passwd"){ 
					//return isValid_passwd(currEl,"");
					return getPasswordLevel(currEl,document.getElementById(currEl.id + "_chk"),true);
					//	return ErrMsg(currEl, "idpass", form); 
				} 
				if(getDataAttribute(currEl,"option") == "number" && !regNum.test(currEl.value)) { 
						return ErrMsg(currEl, "number", form); 
				} 
				if(getDataAttribute(currEl,"option") == "float" && !regFloat.test(currEl.value)) { 
						return ErrMsg(currEl, "float", form); 
				} 

				if(getDataAttribute(currEl,"option") == "year" && !is_year(currEl.value)) { 
						return ErrMsg(currEl, "year",form); 
				} 

				if(getDataAttribute(currEl,"option")  == "month1" && !is_month1(currEl.value)) { 
						return ErrMsg(currEl, "month1",form); 
				} 
				if(getDataAttribute(currEl,"option")  == "month2" && !is_month2(currEl.value)) { 
						return ErrMsg(currEl, "month2",form); 
				} 
				if(getDataAttribute(currEl,"option")  == "day1" && !is_day1(currEl.value)) { 
						return ErrMsg(currEl, "day1",form); 
				} 
				if(getDataAttribute(currEl,"option")  == "day2" && !is_day2(currEl.value)) { 
						return ErrMsg(currEl, "day2",form); 
				} 
				if(getDataAttribute(currEl,"option") == "hour1" && !is_time1(currEl.value,24)) { 	return ErrMsg(currEl, "hour1",form); 	} 
				if(getDataAttribute(currEl,"option") == "hour2" && !is_time2(currEl.value,24)) { 	return ErrMsg(currEl, "hour2",form); 	} 
				if(getDataAttribute(currEl,"option") == "time1" && !is_time1(currEl.value,60)) { 	return ErrMsg(currEl, "time1",form); 	} 
				if(getDataAttribute(currEl,"option") == "time2" && !is_time2(currEl.value,60)) { 	return ErrMsg(currEl, "time2",form); 	} 


				if(getDataAttribute(currEl,"option") == "ssn" && !is_ssn(currEl.value)) { 
						return ErrMsg(currEl, "ssn", form); 
				} 
				if(getDataAttribute(currEl,"option") == "binno" && !is_binNo(currEl.value)) { 
						return ErrMsg(currEl, "binno", form); 
				} 
				if(getDataAttribute(currEl,"option") == "noqt" && regQuote.test(currEl.value)) { 
						return ErrMsg(currEl, "noqt", form); 
				}
				if(getDataAttribute(currEl,"option")  == "searchstr" && !regSearchstr.test(currEl.value)) { 
						return ErrMsg(currEl, "searchstr",form); 
				}

		}
		

			if(getDataAttribute(currEl,"option")=="dchk"){
				//중복확인한 값과 입력된 값이 같은지 체크
				chk_id = getDataAttribute(currEl,"dchkid");
				chk_value = document.getElementById(chk_id).value;
				if(chk_value=="" || chk_value!=currEl.value)
				{
					return ErrMsg(currEl,"dchk",form);
				}
				
			}

			if(getDataAttribute(currEl,"ssame") != undefined && getDataAttribute(currEl,"ssame") != null && currEl.value != "") { 
					ssameEI = eval("form." + currEl.ssame + ".value"); 
					if(currEl.value != ssameEI) { 
							return ErrMsg(currEl, "ssame", form); 
					} 
			} 

			if(getDataAttribute(currEl,"nospace") != undefined && getDataAttribute(currEl,"nospace") != null && !checkspace(currEl.value)) { 
					return ErrMsg(currEl, "nospace", form); 
			} 
			
			
			
			if(getDataAttribute(currEl,"minsize") != undefined && getDataAttribute(currEl,"minsize") != null && currEl.value != "") { 
					if(getDataAttribute(currEl,"minsize") > ByteCount(currEl.value)) { 
							return ErrMsg(currEl, "minsize", form); 
					} 
			} 
			if(getDataAttribute(currEl,"minlength") != undefined && getDataAttribute(currEl,"minlength") != null && currEl.value != "") { 
				if(parseInt(getDataAttribute(currEl,"minlength"))>0){
					if(getDataAttribute(currEl,"minlength") > lengthCount(currEl.value)) { 
							return ErrMsg(currEl, "minlength", form); 
					} 
				}
			} 

			if(getDataAttribute(currEl,"maxsize") != undefined && getDataAttribute(currEl,"maxsize") != null && currEl.value != "") { 
					if(getDataAttribute(currEl,"maxsize") < ByteCount(currEl.value)) { 
							return ErrMsg(currEl, "maxsize", form); 
					} 
			} 					

			if(getDataAttribute(currEl,"maxlength") != undefined && getDataAttribute(currEl,"maxlength") != null && currEl.value != "") { 
					if(parseInt(getDataAttribute(currEl,"maxlength"))>0){
					if(getDataAttribute(currEl,"maxlength") < lengthCount(currEl.value)) { 
							return ErrMsg(currEl, "maxlength", form); 
					} 
					}
			} 
			
			if(getDataAttribute(currEl,"type")=="checkbox" && ((getDataAttribute(currEl,"maxcheck") != null &&  parseInt(getDataAttribute(currEl,"maxcheck"))>0)|| (getDataAttribute(currEl,"mincheck") != null &&  parseInt(getDataAttribute(currEl,"mincheck"))>0))) { 
				var chkCount = countCheckboxSelect(form,getDataAttribute(currEl,"name"));
				if(getDataAttribute(currEl,"maxcheck") != null &&  parseInt(getDataAttribute(currEl,"maxcheck"))>0 && chkCount >parseInt(getDataAttribute(currEl,"maxcheck"))){
					return ErrMsg(currEl, "maxcheck", form); 
				}

				if(getDataAttribute(currEl,"mincheck") != null &&  parseInt(getDataAttribute(currEl,"mincheck"))>0 && chkCount < parseInt(getDataAttribute(currEl,"mincheck"))){
					return ErrMsg(currEl, "mincheck", form); 
				}


			}

			

		 if(getDataAttribute(currEl,"type")=="file"){
				var maxFileSize =(getDataAttribute(currEl,"maxfilesize")!=undefined)? getDataAttribute(currEl,"maxfilesize") : 0;

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
	function FormElCheck(currEl,form){

//				var regNum =/^[0-9]+$/; 
//				var regPhone =/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$/; 
//				var regMail =/^[\._a-zA-Z0-9-]+@[\._a-zA-Z0-9-]+\.[a-zA-Z]+$/; 
//				var regDomain =/^ftp|http|https:\/\/[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/; 
//				var regAlpha =/^[a-zA-Z]+$/; 
//				var regIdPass =/^[a-zA-Z0-9_]+$/; 
//				var regHost =/^[a-zA-Z-]+$/; 
//				var regHangul =/[가-힣]/; 
//				var regHangulOnly =/^[가-힣 ]*$/; 
//				var regQuote =/["]/; 
//

	
			if(getDataAttribute(currEl,"initValue")!=undefined && getDataAttribute(currEl,"initValue")!=""){
				if(getDataAttribute(currEl,"initValue")==$(currEl).val()){
					$(currEl).val("");
				}
			}


			//필수 입력 기본 체크
			var chkRequired= ((getDataAttribute(currEl,"required") != undefined && getDataAttribute(currEl,"required") != null && getDataAttribute(currEl,"required")!="") || getDataAttribute(currEl,"frequired") != undefined && getDataAttribute(currEl,"frequired") != null && getDataAttribute(currEl,"frequired")!=""	)? true : false;
	
			if(chkRequired) { 
				if(getDataAttribute(currEl,"type") == "checkbox"){
					if(!checkRadioSelect(form,getDataAttribute(currEl,"name"))){
						return ErrMsg(currEl,'check',form); 
					}
				}
				
				if(getDataAttribute(currEl,"option") == "check" && currEl.value == "")
				{
					return ErrMsg(currEl,'check',form); 
				}

				if(getDataAttribute(currEl,"type")=="radio"){
					if(!checkRadioSelect(form,getDataAttribute(currEl,"name"))){
						return ErrMsg(currEl,'radio',form); 
					}
					
				}else if(getDataAttribute(currEl,"type")=="file"){
					//수정일때는 원본파일에 대한 체크 항목 검색
					if(getDataAttribute(currEl,"chkEl")!=null){
						var chkFileDel = document.getElementById(getDataAttribute(currEl,"chkEl"));

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
			
			if(getDataAttribute(currEl,"requireds") != undefined && getDataAttribute(currEl,"requireds") != null){ 
				
				if(trim(currEl.value).length < 1) { 
					
					//if(getDataAttribute(currEl,"title")!="" && getDataAttribute(currEl,"title")!=undefined)
					//{
						//alert(getDataAttribute(currEl,"title"));
					//}else{
						alert("'"+getDataAttribute(currEl,"hname") + "' 항목은 필수입니다.");
					//}
					return false;
				} 
			}

		
			var optionChk = FormElOptionCheck(currEl);

			if(!optionChk) return false;
		
			
			 
			return true;


	}

	function FormCheck(form) { 
		

			if(issubmit) {
				//alert("처리중입니다. 잠시만 기다려 주세요.");
				//return false;
			}

			for(var i = 0;i < form.elements.length;i++) { 
					var currEl = form.elements[i]; 

					if(!FormElCheck(currEl,form)) return false;
			} 
		//var msg = "입력하신 내용을 전송하시겠습니까?";
		//if(confirm(msg)) {
			issubmit=true;

			return true;
		//}
		//return false;

	} 
	function ErrMsg(el, type, form) { 
	    var bgColor = '#FEFCEF'; 
		var name = (getDataAttribute(el,"hname")) ? getDataAttribute(el,"hname") : el.getAttribute("name"); 
		var 	focus_target = el;
		var focus_target_id="";
		switch(type) { 
			case "ssame": 
					var sameFld = getDataAttribute(el,"ssame");
					//eval("var samename = (form."+el.ssame+".hname) ? form."+el.ssame+".hname : form."+el.ssame+".name");
	 				var samename = getDataAttribute($("[name='"+sameFld+"']",form),"hname") ;
					if(typeof(samename)!="undefined"){
					alert("'"+ name + "' 항목은 '" + samename + "' 항목과 같아야 합니다."); 
					}else{
						alert("'"+ name + "' 항목의 입력값을 확인해주시기 바랍니다."); 
					}
					break; 
			case "email": 
					alert("'"+ name + "'의 형식이 올바르지 않습니다."); 
					break;  
			case "dchk": 
					focus_target_id = el.dchkid;
					if(getDataAttribute(el,"dchkid2")!=undefined && getDataAttribute(el,"dchkid2")!=""){
						focus_target_id = getDataAttribute(el,"dchkid2");
					}
					focus_target = document.getElementById(focus_target_id);
					alert("이미 사용중인 "+ name + " 이거나, 중복확인을 하지 않으셨습니다."); 
					break;
			case "domain": 
					alert("'"+ name + "'의 형식이 올바르지 않습니다\n\nhttp://로 시작하는 도메인을 입력하세요"); 
					break; 
			case "phone": 
					alert("'"+ name + "'의 형식이 올바르지 않습니다\n02-1234-5678형식으로 입력하세요"); 
					break; 
			case "number": 
					alert("'"+ name + "' 항목은 숫자만 입력하실 수 있습니다.");
					break;
			case "float": 
					alert("'"+ name + "' 항목은 숫자만(소수점포함) 입력하실 수 있습니다.");
					break;
			case "year": 
					alert("'"+ name + "' 항목은 년도를 4자리 숫자로만 입력하실 수 있습니다.");
					break;
			case "month1": 
					alert("'"+ name + "' 항목은 1~12까지의 날짜(월)을 숫자로만 입력하실 수 있습니다.");
					break;
			case "month2": 
					alert("'"+ name + "' 항목은 01~12까지의 날짜(월)을 2자리 숫자로만 입력하실 수 있습니다.");
					break;
			case "day1": 
					alert("'"+ name + "' 항목은 1~31까지의 날짜(일)을 숫자로만 입력하실 수 있습니다.");
					break;
			case "day2": 
					alert("'"+ name + "' 항목은 01~31까지의 날짜(일)을 2자리 숫자로만 입력하실 수 있습니다.");
					break;
			case "hour1": 
					alert("'"+ name + "' 항목은 0~24까지의 숫자로만 입력하실 수 있습니다.");
					break;
			case "hour2": 
					alert("'"+ name + "' 항목은 00~24까지의 2자리 숫자로만 입력하실 수 있습니다.");
					break;
			case "shour1": 
					alert("'"+ name + "' 항목은 0~12까지의 숫자로만 입력하실 수 있습니다.");
					break;
			case "shour2": 
					alert("'"+ name + "' 항목은 00~12까지의 2자리 숫자로만 입력하실 수 있습니다.");
					break;
			case "time1": 
					alert("'"+ name + "' 항목은 0~59까지의 숫자로만 입력하실 수 있습니다.");
					break;
			case "time2": 
					alert("'"+ name + "' 항목은 00~59까지의 2자리 숫자로만 입력하실 수 있습니다.");
					break;
			case "hangul": 
					alert("'"+ name + "' 항목은 한글만 입력할 수 있습니다"); 
					break; 
			case "english": 
					alert("'"+ name + "' 항목은 영문만 입력하실 수 있습니다"); 
					break; 
			case "idpass": 
					alert("'"+ name + "' 항목은 영문, 숫자, _ 만 입력하실 수 있습니다"); 
					break; 

			case "mincheck": 
					if(getDataAttribute(el,"grname")!=undefined && getDataAttribute(el,"grname")!=""){
						name = getDataAttribute(el,"grname");
					}
					alert("'"+ name + "' 항목은 " + getDataAttribute(el,"mincheck") + "개 이상 선택해주시기 바랍니다."); 
					break; 
			case "maxcheck": 
					if(getDataAttribute(el,"grname")!=undefined && getDataAttribute(el,"grname")!=""){
						name = getDataAttribute(el,"grname");
					}
					alert("'"+ name + "' 항목은 최대 " + getDataAttribute(el,"maxcheck") + "개까지만 선택가능 합니다."); 
					break; 

			case "minlength": 
					alert("'"+ name + "' 항목은 " + getDataAttribute(el,"minlength") + "자 이상이어야 합니다."); 
					break; 
			case "minsize": 
					alert("'"+ name + "' 항목은 " + getDataAttribute(el,"minsize") + "자 이상이어야 합니다."); 
					break; 
			case "maxsize": 
					alert("'"+ name + "' 항목은 " + getDataAttribute(el,"maxsize") + "자 이하이어야 합니다."); 
					break; 
			case "maxlength": 
					alert("'"+ name + "' 항목은 " + getDataAttribute(el,"maxlength") + "자 이하이어야 합니다."); 
					break; 
			case "ssn": 
					alert("주민등록번호가 올바르지 않습니다."); 
					break; 
			case "binno": 
					alert("사업자등록번호가 올바르지 않습니다."); 
					break; 
			case "nospace": 
					alert("'"+ name+"' 항목에는 빈칸이 올 수 없습니다."); 
					break; 
			case "check": 
					alert("'"+ name+"' (을)를 체크해 주세요"); 

					break;
			case "radio": 
					alert("'"+ name+"' (을)를 선택해 주세요"); 

					break;
			case "file":
					alert("'"+ name+"' (을)를 첨부해 주세요"); 
					break;
			case "noqt":
					alert("'"+ name+"' 항목에 큰따옴표는 입력불가능합니다."); 
					break;
			case "searchstr":
					alert("'"+ name+"' 항목에 입력불가능한 문자가 포함되어 있습니다."); 
					break;
			default: 
					//if(getDataAttribute(el,"title")!="" && getDataAttribute(el,"title")!=null)
					//{
					//	alert(getDataAttribute(el,"title"));
					//}else{
						alert("'"+ name + "' 항목은 필수입니다."); 
					//}
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



/*데이터 입력 유효성 검사*/

function checkValue(opt,v){
	var pattern = new Array();

	pattern["id"] = /^[a-zA-Z]{1}[a-zA-Z0-9]{3,39}$/g;

	switch(opt){
		case "id":	return pattern[opt].test(v);		break;
	}
}
// IP 입력 유효성 검사
function valid_ip(ip) {
	if(ip.match("^[0-9]{1,3}(\.)[0-9]{1,3}(\.)[0-9]{1,3}(\.)[0-9]{1,3}$") == null){
		return false;
	} else {
		return true;
	}
}

function ipaddr_chk(ip_addr)
{
	var pattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g;
	return pattern.test(ip_addr);
}


function pwd_chk(id_val){
	var pattern = /^[a-zA-Z0-9]{6,50}$/g;
	return pattern.test(id_val);
}

function email_chk(email_val){
	var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/g;
	return pattern.test(email_val);
}


function tel_no_chk(tel_no){
	var tel_pattern = /^[0-9]{2,4}-[0-9]{3,4}-[0-9]{4}$/g;
	var tel_valid = tel_pattern.test(tel_no);

	if(tel_valid) {
		// 동일 번호가 7자리 이상 반복되면 잘못된 전화 번호로 본다.
		var tel_only_no = tel_no.replace(/[-]/g, '');
		var dup_pattern = /([0]{7}|[1]{7}|[2]{7}|[3]{7}|[4]{7}|[5]{7}|[6]{7}|[7]{7}|[8]{7}|[9]{7})/g;
		var dup_value = dup_pattern.test(tel_only_no);

		if(dup_value) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

function domain_chk(dom_name, type_chk){
	var pattern;

	if(type_chk == true) {
		pattern = /^[-0-9a-zA-Z]+(\.[-0-9a-zA-Z]+)*(\.[0-9a-zA-Z]+)+$/g;
	} else {
		pattern = /^[-0-9a-zA-Z]{1}[-0-9a-zA-Z]{1,128}$/g;
	}
	return pattern.test(dom_name);
}




// space 가 있으면 true, 없으면 false
function checkSpace(str)
{
     if(str.search(/\s/) != -1){
     	return true;
     } else {
        return false;
     }
}

function isValid_passwd(str, msgID)
{
     var cnt = 0;

     if(str.value)
	 {
		/* check whether input value is included space or not  */
		 var retVal = checkSpace(str.value);
		 if(retVal){
			 var Msg = "비밀번호에는 공백이 있으면 안됩니다.";
			 if(msgID && $("#"+msgID)){
				 $("#"+msgID).html(Msg);
			 }else{
				alert(Msg);
			 }
			 str.select();
			 return false;
		 }
		 for(var i=0; i < str.value.length; ++i)
		 {
			 if(str.value.charAt(0) == str.value.substring(i, i+1)) ++cnt;
		 }
		 if(cnt == str.value.length){
			 var Msg = "보안상의 이유로 한 문자로 연속된 비밀번호는 허용하지 않습니다.";
			 if(msgID && $("#"+msgID)){
				 $("#"+msgID).html(Msg);
			 }else{
				alert(Msg);
			 }
			 str.value = "";
			 //$(str).focus();
			 str.focus();
			 return false;
		 }
		/*
		 var isPW = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{10,20}$/;
		 if(!isPW.test(str.value)){
			 var Msg = "비밀번호는 10~20자의 영문 대소문자와 숫자, 특수문자를 사용할 수 있습니다.";
			 if(msgID && $("#"+msgID)){
				 $("#"+msgID).html(Msg);
			 }else{
				alert(Msg);
			 }
			 str.select();
			 return false;
		 }
		 */
		 return true;
	 }
}

 /**
     * 비밀번호 보안등급 체크
 */
    function getPasswordLevel(elNewPasswd,elPasswordLevel,msgType) {
        
        //var elNewPasswd = f;
        //var elPasswordLevel = $(info);
	
	var valchk = isValid_passwd(elNewPasswd,$(elPasswordLevel).attr("id"));
	if(!valchk) return false;

//		if(!isValid_passwd(elNewPasswd.value,$(elPasswordLevel).attr("id"))) return false;

        var result_level = checkPassword.main(elNewPasswd.value);

        var level_color = '';
        var level_txt = '';

        switch(result_level['code']) {
            case 1:
                level_color = '#00D200';
                level_txt = '낮음';
                break;
            case 2:
                level_colorlevel_color = '#FF7837';
                level_txt = '보통';
                break;
            case 3:
                level_color = '#FF0000';'#FF0000'; 
                level_txt = '높음';
                break;
            case 1000:  // 10자리 미만의 숫자 또는 문자로만 이루어진 패스워드
            case 2000:  // 사용 불가능한 특수 문자 사용
            case 3000:  // 비밀번호 10자리 미만일 경우

			if(elPasswordLevel!=null)               elPasswordLevel.innerHTML = '<span class="cred">' + result_level['msg'] + '</span>';
				if(msgType!="") {
					alert(result_level['msg']);
					elNewPasswd.focus();
				}
                return false;
                break;
            default:
                //return false;
                break;
        }


		if(elPasswordLevel!=null)  elPasswordLevel.innerHTML = '보안등급 : <span  style="color:'+level_color+';font-weight:bold">'+level_txt+'</span>';

		if(result_level['code']==2 || result_level['code']==3) {
			return true;
		}
		else {
			alert("사용가능한 비밀번호가 아닙니다.\n비밀번호 보안등급 '보통' 이상으로 설정해주시기 바랍니다.\n(영문, 숫자, 특수문자를 조합 10자 이상)");
			return false;
		}
		//return true;
    }
    
    var checkPassword = {

        aResultSecure : [],
        sPassword : '',

        sCheckRegexp1 : /^[a-zA-Z]/,
        sCheckRegexp2 : /[a-zA-Z0-9\~\!\@\$\^\*\(\)\_\+\{\}\[\]]/,

        sRegexp1 : /[a-z]/,
        sRegexp2 : /[A-Z]/,
        sRegexp3 : /[0-9]/,
        sRegexp4 : /[\~\!\@\$\^\*\(\)\_\+\{\}\[\]]/, 

        main : function(sPassword) {

        this.aResultSecure['code'] = 0;
        this.aResultSecure['msg'] = false;
        this.sPassword = sPassword;
        this.sResultRegexp = this.checkRegexp();

        // 기본 검사
        if(this.checkDefaultPassword() == true) {

            // 낮은 단계 비밀번호 검사
            // 영어 또는 숫자로만 이루어진 10자리이상 비밀번호
            // return 1
            this.checkPasswordLevel1();

            // 중간 단계단계 비밀번호 검사
            // 영어, 숫자 2가지 조합으로 6자리 이상
            // 영어, 숫자, 특수문자 혼용으로 8자리 미만
            // return 2
            this.checkPasswordLevel2();

            // 높은 단계 비밀번호 검사검사 
            // 영어, 숫자 2가지 조합으로 14자리 이상
            // 문자그룹 중에서 특수문자 포함 3가지 이상 조합하여 8자리 이상
            // return 3
            this.checkPasswordLevel3();

            if(this.aResultSecure['code'] == 0) {
                this.aResultSecure['code'] = 1000;
                this.aResultSecure['msg'] = '영문+숫자, 혹은 영문+특수문자 등 비밀번호를 조합하여 입력해 주세요.';
            }
        }
        
        return this.aResultSecure;
    },
    
    // 사용된 문자 확인.
    checkRegexp : function() {

        var rStr = '';
        if(this.sRegexp1.test(this.sPassword)) {   // 소문자 사용
            rStr += '1';
        }
        if(this.sRegexp2.test(this.sPassword)) {   // 대문자 사용
            rStr += '2';
        }
        if(this.sRegexp3.test(this.sPassword)) {   // 숫자 사용
            rStr += '3';
        }
        if(this.sRegexp4.test(this.sPassword)) {   // 특수 문자 사용
            rStr += '4';
        }

        return rStr;
    },

    // 기본 비밀번호 조건 확인
    checkDefaultPassword : function() {

        if(this.sCheckRegexp1.test(this.sPassword)) {
            var sTemp = '';
            for (var x=0; x<this.sPassword.length; x++) {
                sTemp = this.sPassword.substr((x*1),1);
                if(!this.sCheckRegexp2.test(sTemp)) {
                     this.aResultSecure['code'] = 2000;
                     this.aResultSecure['msg'] = '['+sTemp+']는 사용 불가능한 특수문자입니다.';
                     return false;false; 
                }
            }
        }
        
        if(this.sPassword.length < 10) {
            this.aResultSecure['code'] = 3000;
            this.aResultSecure['msg'] = '비밀번호를 10자 이상 입력해입력해 주세요.';
            return false;
        }
        return true;
    },
    
    // 낮은 단계 비밀번호 검사
    // 영어 또는 숫자로만 이루어진 6자리이상 비밀번호
    // return 1
    checkPasswordLevel1 : function() {
        if(this.sPassword.length >= 10){//&& this.sPassword.length < 8
            if(this.sResultRegexp.length < 2) {   // 두가지 조합
                this.aResultSecure['code'] = 1;
            }
        }
    },
    
    // 중간 단계단계 비밀번호 검사
    // 영어, 숫자 2가지 조합으로 10자리 이상
    // 영어, 숫자, 특수문자 혼용으로 14자리 미만
    // return 2
    checkPasswordLevel2 : function() {
        if(this.sPassword.length >= 10){//&& this.sPassword.length < 14
            if(this.sResultRegexp.length == 2) {
                this.aResultSecure['code'] = 2;
            }
        }
        if(this.sPassword.length >= 10) {
            if(this.sResultRegexp == '123') {
                this.aResultSecure['code'] = 2;
            }
        }
    },

    // 높은 단계 비밀번호 검사검사 
    // 영어, 숫자 2가지 조합으로 14자리 이상
    // 문자그룹 중에서 특수문자 포함 3가지 이상 조합하여 8자리 이상
    // return 3
    checkPasswordLevel3 : function() {
        if(this.sPassword.length >= 14) {
            if(this.sResultRegexp.length == 2) {   // 두가지 조합에 14자리 이상
                this.aResultSecure['code'] = 3;
            }
        }
        
        if(this.sPassword.length >= 10) {
            if(this.sResultRegexp == '123') {    // 세가지 이상 조합 (특수문자 제외). 
                this.aResultSecure['code'] = 3;
            }
        }

        if(this.sPassword.length >= 10) {
            if(this.sResultRegexp.length >= 2 && this.sResultRegexp.indexOf('4') > -1) {   // 세가지 이상 조합, 특수문자 포함
                this.aResultSecure['code'] = 3;
            }
        }
    }
}


//##############################################################################//
// 한글/ 숫자만 입력받게 하는 함수
// STYLE="IME-MODE:ACTIVE;"		: 한글만 kr
// STYLE="IME-MODE:DISABLED;"	: 숫자만 nu
// STYLE="IME-MODE:INACTIVE;"	: 영문만 en
// 위 스타일과 같이 사용함
//##############################################################################//
function onlyNumber() { 

if(((event.keyCode < 48) || (57 < event.keyCode)) && (45 != event.keyCode))event.returnValue=false; 
} 
function onlyHan() { 
if((event.keyCode > 0))event.keyCode = '0'; return false; 
} 

function pre_set(form){

	for(var i = 0;i < form.elements.length;i++) { 
		var currEl = form.elements[i]; 
		if(getDataAttribute(currEl,"option") != null && getDataAttribute(currEl,"option")=="number") { 
			
			currEl.onkeydown=function(){

				if((event.keyCode<48 || event.keyCode>57)&& !(event.keyCode==8 ||event.keyCode==9 || event.keyCode==37 || event.keyCode==39 || event.keyCode==127 ||event.keyCode==27  || event.keyCode==46  ))				{

						return false;
				}
			}
		}
	}

}


function setFormValue(){
	var inputs = $("[data-initValue],[initValue]");

	for (i=0;i<=inputs.length ;i++)
	{
		if($(inputs[i]).val()=="") {
			$(inputs[i]).css("color","#AAA");
			$(inputs[i]).val(getDataAttribute($(inputs[i]),"initValue"));
		}
		$(inputs[i]).focus(function(){	
			if($(this).val()==getDataAttribute(this,"initValue")){
				$(this).val("");	
				$(this).css("color","");
			}
		});
		$(inputs[i]).blur(function(){	if(trim($(this).val())=="")  {$(this).val(getDataAttribute(this,"initValue"));	$(this).css("color","#AAA");}});
	}

}


//라디오폼 선택 체크
function checkRadioSelect(f,radioname){
	var objs = f[radioname];
	var chkNums = 0;
	for (var i=0;i<objs.length ;i++)
	{
		if(objs[i].checked==true) chkNums ++;
	}
	if(chkNums<1) return false;
	else return true;
}

function countCheckboxSelect(f,chkname){
	var objs = f[chkname];
	var chkNums = 0;
	for (var i=0;i<objs.length ;i++)
	{
		if(objs[i].checked==true) chkNums ++;
	}
	return chkNums;

}


function checkFileAPI(){
	if(window.File && window.FileReader && window.FileList && window.Blob) {
		return true;
	}else{
		return false;
	}
}

if(typeof(getDataAttribute)!="function"){
	var getDataAttribute = function (el,fld){
		if(typeof($(el).attr("data-"+fld)) !="undefined") return  $(el).attr("data-"+fld);
		else return $(el).attr(fld);
	}
}


function fn_FldEtc(chk,val1, id, val2,idx){
	var dataVal = val2.slice(0,-1);
	var len2 = $('input:radio[name='+id+']').length;
	var splitVal = dataVal.split(",");
	
	if(chk){
		if(val2.indexOf(val1.trim()) > -1){
			$("#"+id+"_span_"+idx).show();
			for(var i=0; i <len2; i++){
				for(var j=0; j<splitVal.length; j++){
					if(val1.trim() == splitVal[j].trim()  && idx == i){
						$("#"+id+"_etc"+i).attr("required","required");
					}else{
						if(idx != i){
							$("#"+id+"_span_"+i).hide();
							$("#"+id+"_etc"+i).removeAttr("required");
							$("#"+id+"_etc"+i).val("");
						}
						
					}
				}
			}
			
		}else{
			for(var i=0; i <len2; i++){
				var dataChkVal = $("#"+id+"_"+(i)+":checked").val();
				for(var j=0; j<splitVal.length; j++){
					if(val1.trim() == splitVal[j].trim()){
						$("#"+id+"_etc"+i).attr("required","required");
						$("#"+id+"_span_"+i).show();
					}else{
							$("#"+id+"_etc"+i).removeAttr("required");
							$("#"+id+"_span_"+i).hide();
							$("#"+id+"_etc"+i).val("");
					}
				}
			}
		}
	 }
 }


	function file_size(num){
		var n = parseInt(num);
		var n1 = n;
		var u = "KB";

		 if(n < 1048576)	n1 =  n / 1024;
		 else if(n<1073741824) { n1 = n/1048576;  u = "MB"; }
		 else {n1 = n/1073741824 ; u = "GB";}

		n1 = parseInt(n1 * 100)/100;
		return n1 + u;
	}

	function fn_FileCheck(id, fileApplySize, fileApplyExt){
		var fileSize = document.getElementById(id).files[0].size;
		var fileExt = document.getElementById(id).value;
		fileExt = fileExt.slice(fileExt.indexOf(".")+1).toLowerCase();
		var maxSize = fileApplySize * 1024 * 1024;//2MB
		if(fileSize > maxSize){
			 alert("첨부파일용량 사이즈는 "+file_size(maxSize)+" 이내로 등록 가능합니다. ");
			 $("#"+id).val("");
			 return false;
		 }else{
			 if(fileApplyExt.indexOf(fileExt) == -1){
				 alert("첨부파일 허용된 확장자가 아닙니다.\n해당하는 첨부파일 확장자는"+fileApplyExt+"입니다.");
				 $("#"+id).val("");
				 return false;
			 }

		 }
	}


	function fn_EtcCheckBoxOpnion(chk,val1, id, val2, idx, chkMax, flag){
		
		var len = $('input:checkbox[name='+id+']:checked').length; 
		var len2 = $('input:checkbox[name='+id+']').length;
		var msg = "'"+$("label[for='"+id+"']").text()+"' 항목은 최대 "+chkMax+"까지만 선택가능 합니다.";
		if(flag == "Y"){
			if(len > chkMax){
				alert(msg);
				$("#"+id+"_"+idx).prop('checked',false);
				return false;
			}else{
				var dataVal = val2.slice(0,-1);
				var splitVal = dataVal.split(",");
				if(chk){
					if(val2.indexOf(val1.trim()) > -1){
						$("#"+id+"_span_"+idx).show();
						for(var i=0; i <len2; i++){
							if($("#"+id+"_"+(i)).is(":checked") == true){
								var dataChkVal = $("#"+id+"_"+(i)+":checked").val();
								for(var j=0; j<splitVal.length; j++){
									if(dataChkVal ==splitVal[j]){
										$("#"+id+"_etc"+i).attr("required","required");
										
									}
								}
								
							}
						}
					}else{
						$("#"+id+"_span_"+idx).hide();
						for(var i=0; i <len2; i++){
							if($("#"+id+"_"+(i)).is(":checked") == true){
								var dataChkVal = $("#"+id+"_"+(i)+":checked").val();
							
								for(var j=0; j<splitVal.length; j++){
									if(dataChkVal ==splitVal[j])
										$("#"+id+"_etc"+i).attr("required","required");
								
								}
								
							}else{
								$("#"+id+"_etc"+(i)).removeAttr("required");
								$("#"+id+"_etc"+(i)).val("");
							}
						}
					}
				}else{
					$("#"+id+"_span_"+idx).hide();
					for(var i=0; i<len2; i++){
						if($("#"+id+"_"+(i)).is(":checked") == true)
							$("#"+id+"_etc"+(i+1)).attr("required","required");
						else
							$("#"+id+"_etc"+(i+1)).removeAttr("required");
					}
				}
			}
		}else if(flag == "ALL"){
			var dataVal = val2.slice(0,-1);
			var splitVal = dataVal.split(",");
	
			if(chk){
				if(val2.indexOf(val1.trim()) > -1){
					$("#"+id+"_span_"+idx).show();
					for(var i=0; i <len2; i++){
						if($("#"+id+"_"+(i)).is(":checked") == true){
							var dataChkVal = $("#"+id+"_"+(i)+":checked").val();
							for(var j=0; j<splitVal.length; j++){
								if(dataChkVal ==splitVal[j]){
									$("#"+id+"_etc"+i).attr("required","required");
									
								}
							}
							
						}
					}
					
				}else{
				
					$("#"+id+"_span_"+idx).hide();
					for(var i=0; i <len2; i++){
						if($("#"+id+"_"+(i)).is(":checked") == true){
							var dataChkVal = $("#"+id+"_"+(i)+":checked").val();
							for(var j=0; j<splitVal.length; j++){
								if(dataChkVal ==splitVal[j])
									$("#"+id+"_etc"+i).attr("required","required");
								else{
									$("#"+id+"_etc"+(i)).removeAttr("required");
								
								}
							}
						}else{
							$("#"+id+"_etc"+(i)).removeAttr("required");
							$("#"+id+"_etc"+(i)).val("");
						}
					}
				}
			}else{
				$("#"+id+"_span_"+idx).hide();
				for(var i=0; i <len2; i++){
					if($("#"+id+"_"+(i)).is(":checked") == true){
						var dataChkVal = $("#"+id+"_"+(i)+":checked").val();
						for(var j=0; j<splitVal.length; j++){
							if(dataChkVal ==splitVal[j])
								$("#"+id+"_etc"+i).attr("required","required");
							else{
								$("#"+id+"_etc"+(i)).removeAttr("required");
							
							}
						}
					}else{
						$("#"+id+"_etc"+(i)).removeAttr("required");
						$("#"+id+"_etc"+(i)).val("");
					}
				}
			}

		}else{
			if(len > chkMax){
				alert(msg);
				$("#"+id+"_"+idx).prop('checked',false);
				return false;
			}else{
				return true;
			}
		}

	}

	function fn_FldEtc2(val1, id, val2){
		var dataVal = val2.slice(0,-1);
		var splitVal = dataVal.split(",");
		var len2 = $("#"+id + " option").size();
		var index = $("#"+id + " option").index($("#"+id+ " option:selected"));
		if(len2 > 0){
			for(var i=0; i <len2; i++){
				for(var j=0; j<splitVal.length; j++){

					if(val1.trim() == splitVal[j].trim()){
						$("#"+id+"_span_"+index).show();
						$("#"+id+"_etc"+index).attr("required","required");
					}else{
						
						$("#"+id+"_span_"+i).hide();
						$("#"+id+"_etc"+(i)).removeAttr("required");
					}
				}
			}
		}
		

	}
	
	
	function fn_TextLenChange(id, minlen, maxlen){
		var textLen = $("#"+id).val().length;
		var msg = "'"+$("label[for='"+id+"']").text()+"' 항목은 최소 "+minlen+"자 에서 최대 "+maxlen+"자까지만 선택가능 합니다.";
		if(  minlen > 0 && textLen < minlen){
			alert(msg);
			$("#"+id).focus();
			return false;
		}

		if(   maxlen > 0 &&  textLen > maxlen){
			alert(msg);
			$("#"+id).focus();
			return false;
		}

	}