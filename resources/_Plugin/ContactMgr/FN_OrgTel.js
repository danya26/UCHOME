function secondOrgCode2(parent_code){
	
	//console.log($("#writeSaveForm #prg_code").val() +"//"+$("#writeSaveForm #site_code").val()+"//"+parent_code);
	if(parent_code == ""){
		$("#org_code2").hide();
	}else{
		$.ajax({
			type:"post",
			url:(window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/ContactMgr/secondOrgCode.json",
			data: {
				parent_code    : parent_code
				,site_code      : $("#writeSaveForm #site_code").val()
			},
			dataType:"json", // TEXT 형의 JSON으로 받음 
			success : function(obj) {
				var selected = "";
				//console.log(obj.result.secondList.length);
				if(obj.result.secondList.length > 0){
					$("#org_code2").show();
					var optionHtml = "<option value=''>--&lt;2차 분류&gt;--</option>";
						for(var i=0; i < obj.result.secondList.length; i++){
							
						if($("#pointerOrgCode2").val() != ""){
							if(obj.result.secondList[i].code == $("#pointerOrgCode2").val()){
								selected = "selected";
							}else{
								selected = "";
							}
						}
						optionHtml += "<option value='"+obj.result.secondList[i].code+"' "+selected+">"+obj.result.secondList[i].depart_kor_name+"</option>";
					}
				}else{
					$("#org_code2").hide();
				}
				$("#org_code2").html(optionHtml);
			},	
			error : function(xhr, status, error) {
				//alert("에러발생:" + error + status + xhr);
				alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
			}
		});
	}
}


function secondOrgCode3(parent_code){
	
	//console.log($("#writeSaveForm #prg_code").val() +"//"+$("#writeSaveForm #site_code").val()+"//"+parent_code);
	if(parent_code == ""){
		$("#org_code3").hide();
	}else{
		$.ajax({
			type:"post",
			url:(window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/ContactMgr/secondOrgCode.json",
			data: {
				parent_code    : parent_code
				,site_code      : $("#writeSaveForm #site_code").val()
			},
			dataType:"json", // TEXT 형의 JSON으로 받음 
			success : function(obj) {
				var selected = "";
				//console.log(obj.result.secondList.length);
				if(obj.result.secondList.length > 0){
					$("#org_code3").show();
					var optionHtml = "<option value=''>--&lt;3차 분류&gt;--</option>";
						for(var i=0; i < obj.result.secondList.length; i++){
							
						if($("#pointerOrgCode3").val() != ""){
							if(obj.result.secondList[i].code == $("#pointerOrgCode3").val()){
								selected = "selected";
							}else{
								selected = "";
							}
						}
						optionHtml += "<option value='"+obj.result.secondList[i].code+"' "+selected+">"+obj.result.secondList[i].depart_kor_name+"</option>";
					}
				}else{
					$("#org_code3").hide();
				}
				$("#org_code3").html(optionHtml);
			},	
			error : function(xhr, status, error) {
				//alert("에러발생:" + error + status + xhr);
				alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
			}
		});
	}
}


function secondOrgCode4(parent_code){

	
	//console.log($("#writeSaveForm #prg_code").val() +"//"+$("#writeSaveForm #site_code").val()+"//"+parent_code);
	if(parent_code == ""){
		$("#org_code4").hide();
	}else{
		$.ajax({
			type:"post",
			url:(window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/ContactMgr/secondOrgCode.json",
			data: {
				parent_code    : parent_code
				,site_code      : $("#writeSaveForm #site_code").val()
			},
			dataType:"json", // TEXT 형의 JSON으로 받음 
			success : function(obj) {
				var selected = "";
				//console.log(obj.result.secondList.length);
				if(obj.result.secondList.length > 0){
					$("#org_code4").show();
					var optionHtml = "<option value=''>--&lt;4차 분류&gt;--</option>";
						for(var i=0; i < obj.result.secondList.length; i++){
							
						if($("#pointerOrgCode4").val() != ""){
							if(obj.result.secondList[i].code == $("#pointerOrgCode4").val()){
								selected = "selected";
							}else{
								selected = "";
							}
						}
						optionHtml += "<option value='"+obj.result.secondList[i].code+"' "+selected+">"+obj.result.secondList[i].depart_kor_name+"</option>";
					}
				}else{
					$("#org_code4").hide();
				}
				$("#org_code4").html(optionHtml);
			},	
			error : function(xhr, status, error) {
				//alert("에러발생:" + error + status + xhr);
				alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
			}
		});
	}
}


function secondOrgCode5(parent_code){

	//console.log($("#writeSaveForm #prg_code").val() +"//"+$("#writeSaveForm #site_code").val()+"//"+parent_code);
	if(parent_code == ""){
		$("#org_code5").hide();
	}else{
		$.ajax({
			type:"post",
			url:(window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/ContactMgr/secondOrgCode.json",
			data: {
				parent_code    : parent_code
				,site_code      : $("#writeSaveForm #site_code").val()
			},
			dataType:"json", // TEXT 형의 JSON으로 받음 
			success : function(obj) {
				var selected = "";
				//console.log(obj.result.secondList.length);
				if(obj.result.secondList.length > 0){
					$("#org_code5").show();
					var optionHtml = "<option value=''>--&lt;5차 분류&gt;--</option>";
						for(var i=0; i < obj.result.secondList.length; i++){
							
						if($("#pointerOrgCode5").val() != ""){
							if(obj.result.secondList[i].code == $("#pointerOrgCode5").val()){
								selected = "selected";
							}else{
								selected = "";
							}
						}
						optionHtml += "<option value='"+obj.result.secondList[i].code+"' "+selected+">"+obj.result.secondList[i].depart_kor_name+"</option>";
					}
				}else{
					$("#org_code5").hide();
				}
				$("#org_code5").html(optionHtml);
			},	
			error : function(xhr, status, error) {
				//alert("에러발생:" + error + status + xhr);
				alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
			}
		});
	}
}