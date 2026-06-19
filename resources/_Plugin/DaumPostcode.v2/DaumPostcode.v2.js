// Daum(다음) 우편번호 검색
if(location.href.indexOf("https://") == 0){
	document.write("<script src='https://spi.maps.daum.net/imap/map_js_init/postcode.v2.js'></script>");	
}else{
	document.write("<script src='http://dmaps.daum.net/map_js_init/postcode.v2.js'></script>");
}

function OpenZipSearch(zip_id,addr1_id,addr2_id){
    daum.postcode.load(function(){
			
	//	window.open("/Share/zipsearch.php?zip_id="+ zip_id +"&addr1_id=" + addr1_id + "&addr2_id=" + addr2_id,"winZip", "left=50,top=50,width=400,height=350,scrollbars=1");
	 new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
		try{
					   // document.getElementById(zip_id).value = data.postcode1+"-" + data.postcode2;
						document.getElementById(zip_id).value = data.zonecode;
					   // document.getElementById(addr1_id).value = data.address;

						//전체 주소에서 연결 번지 및 ()로 묶여 있는 부가정보를 제거하고자 할 경우,
						//아래와 같은 정규식을 사용해도 된다. 정규식은 개발자의 목적에 맞게 수정해서 사용 가능하다.
						var addr = data.address.replace(/(\s|^)\(.+\)$|\S+~\S+/g, '');
						document.getElementById(addr1_id).value = addr;

						if(addr2_id!=undefined && addr2_id!=""){

							document.getElementById(addr2_id).focus();
						}else{
							document.getElementById(addr1_id).focus();
						}
		}catch(e){}
					}
				}).open();


});



}

// 우편번호 검색 (우편번호 검색을 2개 이용해야할 경우 subYn 변수값에 Y 를 넣어주면됨)
function execDaumPostcode(subYn) {
	var kind = "daum";
	if(kind == "daum"){
		new daum.Postcode({
	        oncomplete: function(data) {
	            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

	            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	            var fullAddr = ''; // 최종 주소 변수
	            var extraAddr = ''; // 조합형 주소 변수

	            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	            if(data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	                fullAddr = data.roadAddress;

	            } else { // 사용자가 지번 주소를 선택했을 경우(J)
	                fullAddr = data.jibunAddress;
	            }

	            // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
	            if(data.userSelectedType === 'R'){
	                //법정동명이 있을 경우 추가한다.
	                if(data.bname !== ''){
	                    extraAddr += data.bname;
	                }
	                // 건물명이 있을 경우 추가한다.
	                if(data.buildingName !== ''){
	                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                }
	                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
	                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
	            }

	            if(subYn == "Y"){
		            // 우편번호와 주소 정보를 해당 필드에 넣는다.
		            document.getElementById('zipcode').value = data.zonecode; //5자리 새우편번호 사용
		            document.getElementById('address1').value = fullAddr;

		            // 커서를 상세주소 필드로 이동한다.
		            document.getElementById('address2').focus();	            	
	            }else{
	            	// 우편번호와 주소 정보를 해당 필드에 넣는다.
	    			document.getElementById('zipcode_sub').value = data.zonecode; //5자리 새우편번호 사용
	    			document.getElementById('address1_sub').value = fullAddr;
	    			
	    			// 커서를 상세주소 필드로 이동한다.
	    			document.getElementById('address2_sub').focus();
	            }

	        }
	    }).open();
	}else{
		// 주소검색을 수행할 팝업 페이지를 호출합니다.
    	// 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(http://www.juso.go.kr/addrlink/addrLinkUrl.do)를 호출하게 됩니다.
    	var pop = window.open("/SearchAddress.do?subYn="+subYn,"pop","width=570,height=420, scrollbars=yes, resizable=yes");
	}
}

function jusoCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn, subYn){
	// 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다.
	// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	if(subYn == "Y"){
		$("#zipcode_sub").prop("value",zipNo);
		$("#address1_sub").prop("value",roadAddrPart1.replace("&#40;","(").replace("&#41;",")") + roadAddrPart2.replace("&#40;","(").replace("&#41;",")"));
		$("#address2_sub").prop("value",addrDetail.replace("&#40;","(").replace("&#41;",")"));
	    // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
	    $("#address2_sub").focus();
	}else{
		$("#zipcode").prop("value",zipNo);
		$("#address1").prop("value",roadAddrPart1.replace("&#40;","(").replace("&#41;",")") + roadAddrPart2.replace("&#40;","(").replace("&#41;",")"));
		$("#address2").prop("value",addrDetail.replace("&#40;","(").replace("&#41;",")"));
	    // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
	    $("#address2").focus();
	}
}