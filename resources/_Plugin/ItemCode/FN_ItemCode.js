
$(document).ready(function(){
	if($.trim($("#searchForm #searchItem1").val())!= ""){
		secondItemSearchForm($("#searchForm #searchItem1").val(),$("#searchForm #prg_code").val());	
	}
});

function onItemCategory(){
	if($("#searchForm #searchSiteCode").val() == ""){
		Alert("Information", "사이트코드를 선택해주세요", $("#searchForm #searchSiteCode"));
		return false;
	}
	$("#listWriteForm #site_code").prop("value",$("#searchForm #searchSiteCode").val());
	$("#listWriteForm #returnUrl").prop("value",document.location.href);
	$("#listWriteForm").prop("action",(window.ADMIN_URL_PREFIX||'/_Admin')+"/CMS/ItemCodeMgr/list.do");
	$("#listWriteForm").submit();
}

function secondItemSearchForm(parent_code,prg_code){
	
	//console.log(prg_code +"//"+$("#listWriteForm #searchSiteCode").val()+"//"+parent_code);
	
	if(parent_code == ""){
		$("#searchForm #searchItem2").hide();
	}else{
		$.ajax({
			type:"post",
			url:(window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/ItemCodeMgr/secondItem.json",
			data: {
				 prg_code		: prg_code
				,site_code      : $("#listWriteForm #searchSiteCode").val()
				,parent_code    : parent_code
			},
			dataType:"json", // TEXT 형의 JSON으로 받음 
			success : function(obj) {
				
				var selected = "";
				if(obj.result.secondList.length > 0){
					
					$("#searchForm #searchItem2").show();
					var optionHtml = "<option value=''>--&lt;2차 메뉴&gt;--</option>";
						for(var i=0; i < obj.result.secondList.length; i++){
							if($.trim($("#listWriteForm #searchItem2").val())!= ""){
								if(obj.result.secondList[i].code == $("#listWriteForm #searchItem2").val()){
									selected = "selected";
								}else{
									selected = "";
								}								
							}
						optionHtml += "<option value='"+obj.result.secondList[i].code+"' "+selected+">"+obj.result.secondList[i].code_name+"</option>";
					}
				}else{
					$("#searchForm #searchItem2").hide();
				}
				$("#searchForm #searchItem2").html(optionHtml);
			},	
			error : function(xhr, status, error) {
				//alert("에러발생:" + error + status + xhr);
				alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
			}
		});
	}
}


function secondRegulaItemSearchForm(parent_code,prg_code, level){
	
	//console.log(prg_code +"//"+$("#listWriteForm #searchSiteCode").val()+"//"+parent_code);
	
	if(parent_code == ""){
		if($("#searchForm #searchItem1").val() == ""){
			$("#searchForm #searchItem2").hide();
			$("#searchForm #searchItem3").hide();
			$("#searchForm #searchItem4").hide();
		}
		if($("#searchForm #searchItem2").val() == ""){
			$("#searchForm #searchItem3").hide();
			$("#searchForm #searchItem4").hide();
		}
		
		if($("#searchForm #searchItem3").val() == ""){
			$("#searchForm #searchItem4").hide();
		}
	}else{
		if(level == 2){
			parent_code = $("#searchForm #searchItem1").val();
			$("#searchForm #searchItem3").hide();
			$("#searchForm #searchItem4").hide();
			
		}else if(level == 3){
			parent_code = $("#searchForm #searchItem2").val();
			$("#searchForm #searchItem4").hide();
			
			
		}
		$.ajax({
			type:"post",
			url:(window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/ItemCodeMgr/secondItem.json",
			data: {
				 prg_code		: prg_code
				,site_code      : $("#listWriteForm #searchSiteCode").val()
				,parent_code    : parent_code
				,level    : level
			},
			dataType:"json", // TEXT 형의 JSON으로 받음 
			success : function(obj) {
				
				var selected = "";
				if(obj.result.secondList.length > 0){
					
					$("#searchForm #searchItem"+level).show();
					var optionHtml = "<option value=''>--&lt;"+level+"차 메뉴&gt;--</option>";
						for(var i=0; i < obj.result.secondList.length; i++){
							if($.trim($("#listWriteForm #searchItem"+level).val())!= ""){
								if(obj.result.secondList[i].code == $("#listWriteForm #searchItem"+level).val()){
									selected = "selected";
								}else{
									selected = "";
								}								
							}
						optionHtml += "<option value='"+obj.result.secondList[i].code+"' "+selected+">"+obj.result.secondList[i].code_name+"</option>";
					}
				}else{
					
					$("#searchForm #searchItem"+level).hide();
				}
				$("#searchForm #searchItem"+level).html(optionHtml);
			},	
			error : function(xhr, status, error) {
				//alert("에러발생:" + error + status + xhr);
				alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
			}
		});
	}
}
function secondItemWriteForm(parent_code){

	//console.log($("#writeSaveForm #prg_code").val() +"//"+$("#writeSaveForm #site_code").val()+"//"+parent_code);
	
	if(parent_code == ""){
		$("#itemcode2").hide();
	}else{
		$.ajax({
			type:"post",
			url:(window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/ItemCodeMgr/secondItem.json",
			data: {
				 prg_code		: $("#writeSaveForm #prg_code").val()
				,site_code      : $("#writeSaveForm #site_code").val()
				,parent_code    : parent_code
			},
			dataType:"json", // TEXT 형의 JSON으로 받음 
			success : function(obj) {
				var selected = "";
				if(obj.result.secondList.length > 0){
					$("#itemcode2").show();
					var optionHtml = "<option value=''>--&lt;2차 메뉴&gt;--</option>";
						for(var i=0; i < obj.result.secondList.length; i++){
							
						if($("#pointerItemcode2").val() != ""){
							if(obj.result.secondList[i].code == $("#pointerItemcode2").val()){
								selected = "selected";
							}else{
								selected = "";
							}
						}
						optionHtml += "<option value='"+obj.result.secondList[i].code+"' "+selected+">"+obj.result.secondList[i].code_name+"</option>";
					}
				}else{
					$("#itemcode2").hide();
				}
				$("#itemcode2").html(optionHtml);
			},	
			error : function(xhr, status, error) {
				//alert("에러발생:" + error + status + xhr);
				alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
			}
		});
	}
}


function secondRegulaItemWriteForm(parent_code,level){
	
	//console.log($("#writeSaveForm #prg_code").val() +"//"+$("#writeSaveForm #site_code").val()+"//"+parent_code);

	if(parent_code == ""){
		if($("#itemcode1").val() == ""){
			$("#itemcode2").hide();
			$("#itemcode3").hide();
			$("#itemcode4").hide();
		}
		if($("#itemcode2").val() == ""){
			$("#itemcode3").hide();
			$("#itemcode4").hide();
		}
		
		if($("#itemcode3").val() == ""){
			$("#itemcode4").hide();
		}
	}else{
		if(level == 2){
			parent_code = $("#itemcode1").val();
			$("#itemcode3").hide();
			$("#itemcode4").hide();
			
		}else if(level == 3){
			parent_code = $("#itemcode2").val();
			$("#itemcode4").hide();
			
			
		}
			
		
		$.ajax({
			type:"post",
			url:(window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/ItemCodeMgr/secondItem.json",
			data: {
				 prg_code		: $("#writeSaveForm #prg_code").val()
				,site_code      : $("#writeSaveForm #site_code").val()
				,parent_code    : parent_code
			
			},
			dataType:"json", // TEXT 형의 JSON으로 받음 
			success : function(obj) {
				var selected = "";
				if(obj.result.secondList.length > 0){
					$("#itemcode"+level).show();
					var optionHtml = "<option value=''>--&lt;"+level+"차 메뉴&gt;--</option>";
						for(var i=0; i < obj.result.secondList.length; i++){
							
						if($("#pointerItemcode"+level).val() != ""){
							if(obj.result.secondList[i].code == $("#pointerItemcode"+level).val()){
								selected = "selected";
							}else{
								selected = "";
							}
						}
						optionHtml += "<option value='"+obj.result.secondList[i].code+"' "+selected+">"+obj.result.secondList[i].code_name+"</option>";
					}
				}else{
					$("#itemcode"+level).hide();
				}
				$("#itemcode"+level).html(optionHtml);
			},	
			error : function(xhr, status, error) {
				//alert("에러발생:" + error + status + xhr);
				alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
			}
		});
	}
}