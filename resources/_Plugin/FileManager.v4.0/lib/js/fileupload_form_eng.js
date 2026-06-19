(function(factory){
	if(typeof define === "function" && define.amd){
		define([ "jquery" ], factory); // AMD. Register as an anonymous module.
	} else {
		factory(jQuery); // Browser globals
	}
}(function($){
	
	
var img_width =0;


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

function isFileTypeImage(FileName){
	var tmp_file_name = FileName.split(".");
	var tmp_tfile_name = tmp_file_name[ tmp_file_name.length - 1 ];
	var fileExt = tmp_tfile_name.toLowerCase().replace(".","");
	var fileIconExtArr ={
		"jpg":"img","jpeg":"img","jpe":"img","gif":"img","bmp":"img","png":"img"
	}
	var ftype = false;

	if(typeof(fileIconExtArr[fileExt])!="undefined"){
		var ftype = true;
	}
	
	return ftype;
}


function getFileTypeIcon(FileName){	// 파일 아이콘 설정
	var tmp_file_name = FileName.split(".");
	var tmp_tfile_name = tmp_file_name[ tmp_file_name.length - 1 ];
	var fileExt = tmp_tfile_name.toLowerCase().replace(".","");
	var fileIconExtArr ={
		"jpg":"img","jpeg":"img","jpe":"img","gif":"img","bmp":"img","png":"img"
		,"alz":"zip","zip":"zip"
		,"doc":"word","docx":"word"
		,"ppt":"ppt","pptx":"ppt"
		,"pdf":"pdf"
		,"xls":"xls","xlsx":"xls"
		,"hwp":"hwp"
		,"vod":"vod"
		,"wav":"wav"
	}
	var ficon = "";

	if(typeof(fileIconExtArr[fileExt])!="undefined"){
		var ficon = "ico_" + fileIconExtArr[fileExt] + ".gif";
	}else{
		var ficon = "ico_txt.gif";
	}
	return ficon;
}

function FormUploader() {
	this._defaults = {
		prg_code : ""
		, prg_sub_code : ""
		, prg_group_idx : ""
		, prg_modify_idx : ""
		, auto_load : true
		, upload_form : null
		, isUseEditor : false
		, editor_name : "contents_board"
		, isFileView  : false
		, isMainImg   : false
		, post_parameters : {}
		, org_file_items : {}
		, upload_url : ""
		, file_config_info : null
		, upload_sucess_file_cnt : 0
		, target_uploder : ""
		, target_items : ""
		, target_debug : ""			
		, f_size_text : null
		, data_list : new Array
		, debug : false
		, debug_textarea : ""
		, debug_obj : null
		, isHelpInfo : true
		, test : false
		, functionName :  null
	};
}

function clearjQueryCache(){
    for (var x in jQuery.cache){
        delete jQuery.cache[x];
    }
}

function CreateElement_Input(form, type, name, value){
	var customElement = document.createElement("input");
	customElement.setAttribute("type", type);
	customElement.setAttribute("name", name);
	customElement.setAttribute("value",value);

	if(form != null)
		form.appendChild(customElement);
	return customElement;
}

$.extend(FormUploader.prototype, {

	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
		return {
				id: id 
				, input: target // associated target
				, inline: inline
			};
	}

	, _attachFormUploader: function(target, settings) {
		$(target).append("<script type='text/javascript' src='/resources/_Plugin/FileManager.v4.0/lib/js/jquery.form.js'></script>");
		$(target).append("<link rel='stylesheet' href='/resources/_Plugin/FileManager.v4.0/lib/css/common.multiFileUpload.css' />");
	}
	, _getInst: function(target){
		try {
			return $.data(target, "fileuploader");
		}
		catch (err) {
			throw "Missing instance data for this fileuploader";
		}
	}
	, _get: function(inst, name) {
		return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
	}
	, _ConfigOperation: function(target, settings) {
		
		// 옵션 셋팅
		var nodeName, inline, inst;
		nodeName = target.nodeName.toLowerCase();
		inline = (nodeName === "div" || nodeName === "span");
		if(!target.id) {
			this.uuid += 1;
			target.id = "dp" + this.uuid;
		}
		inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, this._defaults, settings || {});
		$.data(target, "fileuploader", inst);
		
		
		// 기본 폼 생성
		this._CreateUploadStyle(target, inst);
		
		
		if(inst.settings.auto_load){
			// 파일업로드 모듈 자동 셋팅
			// 파일 업로드 관리 정보 호출
			this._LoadFileConfig(inst);
		}else{
			// 수동으로 등록
			this._FileSubmitProc(inst, inst.settings.org_file_items, "O");
		}
		
	}
	, _CreateUploadStyle : function(target, inst){	// 기본 폼 생성

		inst.settings.target = target;
		// 신규
		var upload_form = document.createElement("form");
		upload_form.setAttribute("method","post");
		upload_form.setAttribute("cache",false);
		upload_form.setAttribute("enctype","multipart/form-data");
		upload_form.action = "/"+inst.settings.site_code+"/ajx_json/UploadMgr/upload.json";
		inst.settings.upload_form = upload_form;
		
			var File_Element = CreateElement_Input(upload_form, "file", "file_item", "");
			$(File_Element).addClass("dft-style");
			$(File_Element).prop("multiple", true);
			$(File_Element).prop("accept", "jpg");
			$(File_Element).bind(	"change",	function(){ $.formuploader._OnClick_FileSelector(inst);	}	);
			$(File_Element).css({ "left" : "-9999em", "top" : "-9999em", "width" : "1px", "height": "1px", "overflow" : "hidden", "visibility" : "hidden", "position" : "absolute" });
			//$(upload_form).append(File_Element);
	
			var prg_code = CreateElement_Input(upload_form, "hidden", "prg_code", inst.settings.prg_code);
			var prg_sub_code = CreateElement_Input(upload_form, "hidden", "prg_sub_code", inst.settings.prg_sub_code);
			var  prg_group_idx = CreateElement_Input(upload_form, "hidden", "prg_group_idx", inst.settings.prg_group_idx);
	
		
		$("body").append(upload_form);
		
		if(inst.settings.test){
			$("body").append($("<textarea id='file_plugin_testboard' style='width: 100%; height: 600px;'></textarea>"));
		}
		
		var parameters = inst.settings.post_parameters;
	
	
		if(parameters.length>0){
			$.each(parameters,function(i, arr){
				$.formuploader.CreateElement_Input(upload_form, "hidden", arr.name, arr.value);
			});
		}
		
		$(target).addClass("multiFileUpload");
		
		var mfu_top = document.createElement("div");
		$(mfu_top).addClass("mfu-top");
		$(mfu_top).attr('id', 'mfu-top'+inst.settings.prg_sub_code);
		$(target).append(mfu_top);
	
		
			var mfu_fileselect_btn = document.createElement("button");
			$(mfu_fileselect_btn).addClass("mfu-fsel-bt");
			$(mfu_fileselect_btn).attr("type", "button");
			$(mfu_fileselect_btn).html("Attached File");
		
			$(mfu_fileselect_btn).bind("click", function(){ File_Element.click(); });
			$(mfu_top).append(mfu_fileselect_btn);
			inst.settings.select_file_btn = mfu_fileselect_btn;
		
			var mfu_uploadlimit_info = document.createElement("div");
			$(mfu_uploadlimit_info).addClass("mfu-limit-info");
			$(mfu_uploadlimit_info).addClass("info");
			$(mfu_uploadlimit_info).attr('id', 'mfu-limit-info'+inst.settings.prg_sub_code);
			$(mfu_top).append(mfu_uploadlimit_info);
			
				var mfu_fsizeinfo_div = document.createElement("div");
				$(mfu_fsizeinfo_div).addClass("mfu-fsize-info");
				$(mfu_uploadlimit_info).attr('id', 'mfu-fsize-info'+inst.settings.prg_sub_code);
				$(mfu_fsizeinfo_div).append(mfu_fsizeinfo_div);
		
					var mfu_fsizeinfo_usesize = document.createElement("span");
					$(mfu_fsizeinfo_usesize).addClass("mfu-use-size");
					$(mfu_fsizeinfo_usesize).attr('id', 'mfu-use-size'+inst.settings.prg_sub_code);
					$(mfu_fsizeinfo_usesize).html("0");
					inst.settings.mfu_fsizeinfo_usesize = mfu_fsizeinfo_usesize;
		
					var mfu_fsizeinfo_maxfsize = document.createElement("span");
					$(mfu_fsizeinfo_maxfsize).addClass("mfu-max-fsize");
					$(mfu_fsizeinfo_maxfsize).attr('id', 'mfu-max-fsize"'+inst.settings.prg_sub_code);
					$(mfu_fsizeinfo_maxfsize).html("0");
					inst.settings.mfu_fsizeinfo_maxfsize = mfu_fsizeinfo_maxfsize;
					
				
				$(mfu_fsizeinfo_div)
					.append("Limit capacity per file:")
					//.append(mfu_fsizeinfo_usesize)
					//.append(" / ")
					.append(mfu_fsizeinfo_maxfsize)
					.append(", ");
		
				var mfu_uploadlimit_div = document.createElement("div");
				$(mfu_uploadlimit_div).addClass("mfu-fcnt-info");
				$(mfu_uploadlimit_info).attr('id', 'mfu-top');
				$(mfu_uploadlimit_info).append(mfu_uploadlimit_div);
		
		
					var mfu_uploadlimit_usecnt = document.createElement("span");
					$(mfu_uploadlimit_usecnt).addClass("mfu-use-cnt");
					$(mfu_uploadlimit_usecnt).attr('id', 'mfu-use-cnt'+inst.settings.prg_sub_code);
					$(mfu_uploadlimit_usecnt).html("0");
		
					inst.settings.mfu_uploadlimit_usecnt = mfu_uploadlimit_usecnt;
					
		
					var mfu_uploadlimit_maxcnt = document.createElement("span");
					$(mfu_uploadlimit_maxcnt).addClass("mfu-max-cnt");
					$(mfu_uploadlimit_maxcnt).attr('id', "mfu-max-cnt"+inst.settings.prg_sub_code);
					$(mfu_uploadlimit_maxcnt).html("0");
					inst.settings.mfu_uploadlimit_maxcnt = mfu_uploadlimit_maxcnt;
				
				$(mfu_uploadlimit_div)
					.append("Possible to attach :")
					.append(mfu_uploadlimit_usecnt)
					.append(" / ")
					.append(mfu_uploadlimit_maxcnt)
					.append("cnt");
			
		var mfu_file_list = document.createElement("ul");
		$(mfu_file_list).addClass("mfu-file-list");
		$(mfu_file_list).attr('id', 'mfu-file-list'+inst.settings.prg_sub_code);
		$(target).append(mfu_file_list);
		$(mfu_file_list).sortable({placeholder: "placeholder-highlight", update : function(event, ui) { $.formuploader._sortableSerialize(inst); } });
		inst.settings.mfu_file_list = mfu_file_list;
		
			var no_file = document.createElement("li");
			$(no_file).addClass("no-file");
			$(no_file).html("No files selected.");
			$(mfu_file_list).append(no_file);
			inst.settings.no_file = no_file;
	}
	, _sortableSerialize : function(inst){
		var li_list = $(inst.settings.mfu_file_list).find("li").not("li[class='no-file']");
		var array = [];
		$.each(li_list, function(i, li){
			var add_array = {};
			add_array[ "idx" ] = $(li).data("idx");
			add_array[ "f_sort" ] = i + 1;
			var item = $.extend({}, $(li).data("file_item"), add_array);
			array.push(item);
		});
		var v_data =  {root:array};
		
		$.formuploader._LogPrint(inst, "sortable-update", window.JSON.stringify(v_data));
		
	
		
		$.ajax({
			type:"post",
			url:"/"+inst.settings.site_code+"/ajx_json/UploadMgr/sortFiles.json",
			cache: false,
			data: {
				file_sort : window.JSON.stringify(v_data)
			},
			dataType:"text", // TEXT 형의 JSON으로 받음 
			success : function(data) {
				$.formuploader._LogPrint(inst, "sortable-update-ajax", data);
				var obj = jQuery.parseJSON(data);
			},
			complete : function(data) {},		// 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.
			error : function(xhr, status, error) {//alert("에러발생:" + error + status + xhr);
				$.formuploader._LogPrint(inst, "sortable-update-ajax", error);
			}
		});
	}
	, _LogPrint : function(inst, t, me){
		if(inst.settings.test){
			var d = new Date();
			var g = function(n, digits) { var zero = ''; n = n.toString(); if(n.length < digits) { for (i = 0; i < digits - n.length; i++) zero += '0';} return zero + n; };
			var s = g(d.getFullYear(), 4) + '-' +g(d.getMonth() + 1, 2) + '-' + g(d.getDate(), 2) + ' ' + g(d.getHours(), 2) + ':' + g(d.getMinutes(), 2) + ':' + g(d.getSeconds(), 2);
			$("#file_plugin_testboard").append("[ " + s + " " + t + " ] " + me + "\n");
		}
			
	}
	, _LoadFileConfig : function(inst){	// 자동 옵션 & 기존 파일 로드
		$(inst.settings.select_file_btn).hide();
		var idx = inst.settings.prg_modify_idx;
		if(idx == 0 || idx == 0){
			idx = inst.settings.prg_group_idx;	
		}
		
		$.ajax({
			type:"post",
			url:"/upload/ajx_json/UploadMgr/loadFileconfig.json",
			//timeout: 5000,
			cache: false,
			data: {
				prg_code : inst.settings.prg_code
				, prg_sub_code : inst.settings.prg_sub_code
				, prg_group_idx :idx
				, prg_group_new_idx : inst.settings.prg_group_idx
			},
			dataType:"JSON", 
			success : function(response){
				$.formuploader._LogPrint(inst, "_LoadFileConfig", response);
				var file_config_info = response.dataMap.file_config_info;
				var org_file_list = response.dataMap.org_file_list;
				inst.settings.file_config_info = file_config_info;
				inst.settings.org_file_items = org_file_list;
				
		
				
				if(inst.settings.org_file_items.length > 0){
					inst.settings.org_file_items.result = "O";
					$.formuploader._FileSubmitProc(inst, inst.settings.org_file_items);
				}else{
					$.formuploader._UpdateFileUploadCount(inst, 0);
				}
				
				if(inst.settings.isHelpInfo){
					var mfu_mfu_info = document.createElement("div");
					$(mfu_mfu_info).addClass("mfu-info");
					$(mfu_mfu_info).attr('id', 'mfu_mfu_info'+inst.settings.prg_sub_code);
					$(inst.settings.target).append(mfu_mfu_info);
					inst.settings.mfu_mfu_info = mfu_mfu_info;
					
					var mfu_bt_help = document.createElement("button");
					
					$(mfu_bt_help).addClass("bt-help");
					$(mfu_bt_help).attr('id', 'bt-help'+inst.settings.prg_sub_code);
					$(mfu_bt_help).attr("type", "button");
					$(mfu_bt_help).html("Do not upload files?");
				
					$(mfu_mfu_info).append(mfu_bt_help);
					inst.settings.mfu_bt_help = mfu_bt_help;
					
					var mfu_helpinfo_div = document.createElement("div");
					$(mfu_helpinfo_div).addClass("info-box")
					$(mfu_helpinfo_div).attr('id', 'info-box'+inst.settings.prg_sub_code);
					$(inst.settings.target).append(mfu_helpinfo_div);
					inst.settings.mfu_helpinfo_div = mfu_helpinfo_div;
					
					var mfu_helpinfo_ul = document.createElement("ul");
					$(mfu_helpinfo_div).append(mfu_helpinfo_ul);					
					$(mfu_helpinfo_ul).append("<li> You can attach a total of '" + file_config_info.prg_file_tot_upl_cnt + "' files.</li>");
					$(mfu_helpinfo_ul).append("<li>The capacity limit per file is ''" + file_config_info.prg_file_upl_size + "MB'. </li>");
					$(mfu_helpinfo_ul).append("<li>Upload is only possible with  [" + file_config_info.prg_file_app_exe.split(";").join(", ")+ "]</li>");
					if(file_config_info.prg_img_limit_width != 0 && file_config_info.prg_img_limit_height != 0){
						$(mfu_helpinfo_ul).append("<li>For image files, only  '" + file_config_info.prg_img_limit_width + "px Ⅹ " + file_config_info.prg_img_limit_height + "px  can be uploaded. </li>");
					}
					$(mfu_helpinfo_ul).append("<li>Please contact your administrator to remove upload file restrictions.</li>");
					
					var bt_del = document.createElement("button");
		
			
					
					$(mfu_bt_help).bind("click", function(){ $(mfu_helpinfo_div).toggle(); });
				}				
				
			},
			complete : function(data) {
				$(inst.settings.select_file_btn).show();
			},		// 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.
			error : function(xhr, status, error) { //alert("에러발생:" + error + status + xhr);
				$.formuploader._LogPrint(inst, "_LoadFileConfig", error);
				alert("An error occurred while loading the file upload module. \nPlease contact your administrator.");
			}
		});
	}
	, _FileSubmitProc : function(inst, response){	//성공후 서버에서 받은 데이터 처리
	  	var obj = response;
	  	$.each(obj,function(i, item){
	  		
	  		var result = item.result;
	  		
	  		if(result == null || result == "undefined"){
	  			result = response.result;
	  		}
	  		
	  		var messaged = item.result_message;
	  		
	  		item.status = "Upload failed:"+messaged
	  		
	  		if(result == "U"){
	  			item.status = "Uploading...";
	  			var obj_itmobj_itm = $.formuploader._AddFileItem(inst, item, result);
	  			$.formuploader._FileItemStateChange(inst, item, result, obj_itmobj_itm);
	  		}else if(result == "E" || result == "WE"){
	  			$.formuploader._FileItemStateChange(inst, item, result);
	  		}else if(result == "Y"){
	  			item.status = "Upload Complete";
	  			$.formuploader._FileItemStateChange(inst, item, result);
	  		}else if(result == "O"){
	  			item.status = "Existing file";
	  			var obj_itmobj_itm = $.formuploader._AddFileItem(inst, item, result);
	  			$.formuploader._FileItemStateChange(inst, item, result, obj_itmobj_itm);
	  		}	  		
	  	});
	  	
	}
	, _FileItemStateChange : function(inst, item, state, li_itm){

		var data_target = null;
		var f_cnt_add = 0;
		
		if(li_itm == null || li_itm == "undefined"){
			$.each(inst.settings.data_list, function(i, data_item){
				if($(data_item.file_name).html() == item.file_name){
					//alert(item.file_name);
					data_target = data_item;
				}
			});
		}else{
			data_target = li_itm;
		}
		
		
		if(state == "Y"){
			
			//function 함수 가 있을경우
			if(inst.settings.functionName != null && typeof inst.settings.functionName  == "function"){
				if(inst.settings.upload_sucess_file_cnt == item.f_sort)
					inst.settings.functionName();
			}
			

			$(data_target.li).data("idx", item.idx);
			if(item.main_file == 'Y'){
				$(data_target.li).addClass("chk-img");
			}
	
			$(data_target.file_img).prop("src", "/resources/_Plugin/FileManager.v4.0/lib/img/" + getFileTypeIcon(item.file_exe));
			$(data_target.file_img).prop("alt", item.file_exe + "File icon image");
			
			$(data_target.file_stat).html("RegDate : " + item.reg_date.substr(0, 16));
			$(data_target.file_size).html(file_size(item.file_size));
			$(data_target.file_imgWidth).prop("id", "");
			$(data_target.file_ctrls).show();
			if(isFileTypeImage(item.file_exe)){
				if(inst.settings.isUseEditor){
					$(data_target.obj_bt_add_cont).unbind("click");
					$(data_target.obj_bt_add_cont).bind("click", function(){ $.formuploader._OnClick_AddImgOnEditor(inst, $(data_target.cont_add_file_alt), item.file_path, item.file_physical_name,item.img_width); });
					$(data_target.obj_bt_cont).show();
					$(data_target.obj_bt_add_cont).show();
				}
				if(inst.settings.isMainImg){
					$(data_target.obj_bt_main).show();
				}
			}
			if(inst.settings.isFileView){
				$(data_target.obj_bt_view).show();
			}
			
			$(data_target.obj_bt_down).unbind("click");
			$(data_target.obj_bt_down).bind("click", function(){ $.formuploader._OnClick_DownloadBtn(inst, item.download_url, inst.settings.prg_code)});
			$(data_target.obj_bt_down).show();
			$(data_target.obj_bt_del).show();
			
			
			$(data_target.obj_bt_del).unbind("click");
			$(data_target.obj_bt_del).bind("click", function(){ $.formuploader._OnClick_DeleteBtn(inst, data_target, item.download_url) });
			$(data_target.obj_bt_del).show();
			$(data_target.obj_bt_del).show();
			
			
			$(data_target.obj_bt_ctrl_more).css("display", "");
		}else if(state == "E" || state == "WE"){
			$(data_target.li).data("idx", 0);
			$(data_target.file_img).prop("src", "/resources/_Plugin/FileManager.v4.0/lib/img/fail.png");
			$(data_target.file_img).prop("alt", "File upload failed.");
			$(data_target.file_size).html("Failed");
			$(data_target.file_stat).css("color", "red");
			//alert(" " + item.result_message);
			$(data_target.file_stat).html(" " + item.result_message);
			$(data_target.file_ctrls).show();
			$(data_target.obj_bt_ctrl_more).css("display", "");
			$(data_target.obj_bt_del).hide();
			//$(data_target.li).remove();
			f_cnt_add--;
			
			if(state == "WE"){
				window.open(item.popUrl,"ErrorPopup","width=500, height=500, scrollbars=0, toolbar=0, menubar=no");
			}
			
		}else if(state == "U"){
			$(data_target.li).data("idx", 0);
			$(data_target.file_img).prop("src", "/resources/_Plugin/FileManager.v4.0/lib/img/ing.gif");
			$(data_target.file_img).prop("alt", "Uploading file");
			$(data_target.file_size).html(file_size(0));
			$(data_target.file_stat).html("Uploading...");
			$(data_target.file_ctrls).hide();
			$(data_target.obj_bt_ctrl_more).hide();
			f_cnt_add++;
		}else if(state == "D"){

			if($(data_target.li).data("idx")> 0)f_cnt_add--;
			var fileCnt = inst.settings.upload_sucess_file_cnt-1
			$(data_target.li).remove();
			var t = $.inArray(data_target, inst.settings.data_list);
			inst.settings.data_list.splice(t, 1);
			$("#mfu-top"+inst.settings.prg_sub_code).remove();
			$("#mfu-file-list"+inst.settings.prg_sub_code).remove();
			$("#mfu-use-cnt"+inst.settings.prg_sub_code).remove();
			$("#mfu-info"+inst.settings.prg_sub_code).remove();
			$("#bt-help"+inst.settings.prg_sub_code).remove();
			$("#info-box"+inst.settings.prg_sub_code).remove();
			if(fileCnt > 0){
				inst.settings.upload_sucess_file_cnt  = 1;
			}
	
			this._CreateUploadStyle(inst.settings.target, inst);
		    this._LoadFileConfig(inst);
			
		
			
		}else if(state == "O"){
			$(data_target.li).data("idx", item.idx);
			if(item.main_file == 'Y'){
				$(data_target.li).addClass("chk-img");
			}
			$(data_target.file_img).prop("src", "/resources/_Plugin/FileManager.v4.0/lib/img/" + getFileTypeIcon(item.file_exe));
			$(data_target.file_img).prop("alt", item.file_exe + "File icon image");

			$(data_target.file_size).html(file_size(item.file_size));
			$(data_target.file_stat).html("RegDate : " + item.reg_date.substr(0, 16));
			if(isFileTypeImage(item.file_exe)){
				if(inst.settings.isUseEditor){
					$(data_target.obj_bt_add_cont).unbind("click");
					$(data_target.obj_bt_add_cont).bind("click", function(){ $.formuploader._OnClick_AddImgOnEditor(inst, $(data_target.cont_add_file_alt), item.file_path, item.file_physical_name,item.img_width); });
					$(data_target.obj_bt_cont).show();
					$(data_target.obj_bt_add_cont).show();
				}
				if(inst.settings.isMainImg){
					$(data_target.obj_bt_main).show();
				}
			}
			if(inst.settings.isFileView)			$(data_target.obj_bt_view).show();
			$(data_target.obj_bt_down).unbind("click");
			$(data_target.obj_bt_down).bind("click", function(){ $.formuploader._OnClick_DownloadBtn(inst, item.download_url, inst.settings.prg_code)});
			$(data_target.obj_bt_down).show();
			$(data_target.obj_bt_del).show();
			
			
			$(data_target.obj_bt_del).unbind("click");
			$(data_target.obj_bt_del).bind("click", function(){ $.formuploader._OnClick_DeleteBtn(inst, data_target, item.download_url) });
			$(data_target.obj_bt_del).show();
			$(data_target.obj_bt_del).show();
			
			f_cnt_add++;
		}
		
		$.formuploader._UpdateFileUploadCount(inst, f_cnt_add);
		
		if(inst.settings.data_list.length > 0){
  			$(inst.settings.no_file).hide();
  		}else if(inst.settings.data_list.length == 0){
  			$(inst.settings.no_file).show();
  		}
		
	}
	, _AddFileItem : function(inst, item, state){	// 기존 파일 등록 또는 업로드 시 사용
	
		var mfu_file_list = inst.settings.mfu_file_list;
		
		var FILE_OBJ = {};
		inst.settings.data_list.push(FILE_OBJ); 
		
		var file_item = document.createElement("li");
		$(file_item).addClass("file-item");
		$(mfu_file_list).append(file_item);
		FILE_OBJ.li = file_item;
		$(file_item).data("idx", item.idx);

		
			var isFileTypeIcon = document.createElement("span");
			$(isFileTypeIcon).addClass("isFileTypeIcon");
			$(file_item).append(isFileTypeIcon);
			
				var img_ico = document.createElement("img");
				$(img_ico).prop("src", "/resources/_Plugin/FileManager.v4.0/lib/img/ico_txt.gif");
				$(img_ico).prop("alt", "File icon image");					
				$(isFileTypeIcon).append(img_ico);
				FILE_OBJ.file_img = img_ico;
		
			var mfu_face = document.createElement("div");
			$(mfu_face).addClass("mfu-face");
			$(file_item).append(mfu_face);
			
				var mfu_finfo = document.createElement("div");
				$(mfu_finfo).addClass("mfu-finfo");
				$(mfu_face).append(mfu_finfo);
					
					var isFileName = document.createElement("span");
					$(isFileName).addClass("isFileName");
					//$(isFileName).data("file_name", item.file_name);
					$(isFileName).html(item.file_name);
					$(mfu_finfo).append(isFileName);
					FILE_OBJ.file_name = isFileName;
					
					var isFileInfo = document.createElement("div");
					$(isFileInfo).addClass("isFileInfo");
					$(mfu_finfo).append(isFileInfo);
					
						var mfu_fsize = document.createElement("span");
						$(mfu_fsize).addClass("mfu-fsize");
						$(isFileInfo).append(mfu_fsize);
						FILE_OBJ.file_size = mfu_fsize;
						
						var mfu_state = document.createElement("span");
						$(mfu_state).addClass("mfu-state");
						$(isFileInfo).append(mfu_state);
						FILE_OBJ.file_stat = mfu_state;
						
				var bt_menu_open = document.createElement("button");
				$(bt_menu_open).addClass("bt-menu-open");
				$(bt_menu_open).attr("type", "button");
				$(bt_menu_open).html("<span>Open menu</span>");
				$(bt_menu_open).bind("click", function(){ $.formuploader._FaceChange(inst, FILE_OBJ, "mode-menu"); });
				$(mfu_face).append(bt_menu_open);
				FILE_OBJ.bt_menu_open = bt_menu_open;
						
				var mfu_ctrls = document.createElement("div");
				$(mfu_ctrls).addClass("mfu-ctrls");
				$(mfu_face).append(mfu_ctrls);
				FILE_OBJ.file_ctrls = mfu_ctrls;
					
					var mfu_menu = document.createElement("span");
					$(mfu_menu).addClass("mfu_menu");
					$(mfu_ctrls).append(mfu_menu);
					FILE_OBJ.mfu_menu = mfu_menu;
				
						var bt_main = document.createElement("button");
						$(bt_main).addClass("bt-chkimg");
						$(bt_main).attr("type", "button");
						$(bt_main).html("<span>Main File</span>")
						$(bt_main).bind("click", function(){ $.formuploader._OnClick_MainImage(inst, FILE_OBJ)});
						$(bt_main).hide();
						$(mfu_menu).append(bt_main);
						FILE_OBJ.obj_bt_main = bt_main;	
					
						var bt_cont = document.createElement("button");
						$(bt_cont).addClass("bt-cont");
						$(bt_cont).attr("type", "button");
						$(bt_cont).html("<span>Add body</span>");
						$(bt_cont).bind("click", function(){ $.formuploader._FaceChange(inst, FILE_OBJ, "mode-cont", FILE_OBJ.cont_add_file_alt); });
						$(bt_cont).hide();
						$(mfu_menu).append(bt_cont);
						FILE_OBJ.obj_bt_cont = bt_cont;	
						
						var bt_view = document.createElement("button");
						$(bt_view).addClass("bt-view");
						$(bt_view).attr("type", "button");
						$(bt_view).html("<span>File view</span>");
						$(bt_view).hide();
						$(mfu_menu).append(bt_view);
						FILE_OBJ.obj_bt_view = bt_view;
						
						var bt_down = document.createElement("button");
						$(bt_down).addClass("bt-down");
						$(bt_down).attr("type", "button");
						$(bt_down).html("<span>Download</span>")
						$(bt_down).hide();
						$(mfu_menu).append(bt_down);
						FILE_OBJ.obj_bt_down = bt_down;
						
						var bt_del = document.createElement("button");
						$(bt_del).addClass("bt-del");
						$(bt_del).attr("type", "button");
						$(bt_del).html("<span>Delete</span>");
						$(bt_del).hide();
						$(mfu_menu).append(bt_del);
						FILE_OBJ.obj_bt_del = bt_del;
					
					var bt_menu_close = document.createElement("button");
					$(bt_menu_close).addClass("bt-menu-close");
					$(bt_menu_close).attr("type", "button");
					$(bt_menu_close).html("<span>Close Menu</span>");
					$(bt_menu_close).bind("click", function(){ $.formuploader._FaceChange(inst, FILE_OBJ, "mode-normal"); });
					$(mfu_ctrls).append(bt_menu_close);
					FILE_OBJ.obj_bt_ctrl_more = bt_menu_close;
				
				var mfu_fcont = document.createElement("div");
				$(mfu_fcont).addClass("mfu-fcont");
				$(mfu_face).append(mfu_fcont);
				FILE_OBJ.file_fcont = mfu_fcont;
					
					var mfu_fcont_content = document.createElement("div");
					$(mfu_fcont_content).addClass("mfu-fcont-content");
					$(mfu_fcont).append(mfu_fcont_content);
					FILE_OBJ.file_fcont_content = mfu_fcont_content;
				
						var isFileAlt = document.createElement("span");
						$(isFileAlt).addClass("isFileAlt");
						$(mfu_fcont_content).append(isFileAlt);
						
							var text = document.createElement("input");
							$(text).addClass("text");
							$(text).attr("type", "text");
							$(text).attr("placeholder", "File description");
							$(isFileAlt).append(text);
							FILE_OBJ.cont_add_file_alt = text;
										
							var bt_add_cont = document.createElement("button");
							$(bt_add_cont).addClass("bt-add-cont");
							$(bt_add_cont).attr("type", "button");
							$(bt_add_cont).html("<span>Add body</span>");
							$(bt_add_cont).hide();
							//$(bt_add_cont).bind("click", function(){ $.formuploader._OnClick_AddImgOnEditor(inst, $(text), item.file_path, item.file_physical_name); });
							$(mfu_fcont_content).append(bt_add_cont);
							FILE_OBJ.obj_bt_add_cont = bt_add_cont;
						
					var bt_cont_close = document.createElement("button");
					$(bt_cont_close).addClass("bt-cont-close");
					$(bt_cont_close).attr("type", "button");
					$(bt_cont_close).html("<span>Cancel</span>");
					$(bt_cont_close).bind("click", function(){ $.formuploader._FaceChange(inst, FILE_OBJ, "mode-menu", FILE_OBJ.obj_bt_cont); });
					$(mfu_fcont).append(bt_cont_close);
				
			
			
		return FILE_OBJ;
	}
	, _UpdateFileUploadCount : function(inst, T){	// 파일 업로드 카운트 표시
		inst.settings.upload_sucess_file_cnt = inst.settings.upload_sucess_file_cnt + T ;
		$(inst.settings.mfu_fsizeinfo_maxfsize).html(file_size(inst.settings.file_config_info.prg_file_upl_size * 1048576));
		$(inst.settings.mfu_uploadlimit_usecnt).html(inst.settings.upload_sucess_file_cnt);
		$(inst.settings.mfu_uploadlimit_maxcnt).html(inst.settings.file_config_info.prg_file_tot_upl_cnt);
	}
	, _FaceChange : function(inst, FILE_OBJ, mode, return_target){
		
		if(mode == "mode-normal"){
			$(FILE_OBJ.li).removeClass("ctrl-open");
			$(FILE_OBJ.file_fcont).removeClass("open");
		}else if(mode == "mode-menu"){
			if($(window).width() < 640){
				$(FILE_OBJ.li).addClass("ctrl-open");
			}
			$(FILE_OBJ.file_fcont).removeClass("open");
		}else if(mode == "mode-cont"){
			$(FILE_OBJ.li).removeClass("ctrl-open");
			$(FILE_OBJ.file_fcont).addClass("open");
		}
		
		$.each(inst.settings.data_list,function(i, e_obj){
			if(!$(e_obj.li).is($(FILE_OBJ.li))){
				$(e_obj.li).removeClass("ctrl-open");
				$(e_obj.file_fcont).removeClass("open");
			}
		});
		
		if(return_target != null && typeof return_target != "undefined"){
			setTimeout(function() { $(return_target).focus(); }, 210);
		}
		
	}
	, _OnClick_MainImage : function(inst, FILE_OBJ){
		
		var flag = "N";
		
		if($(FILE_OBJ.li).hasClass("chk-img")){
			$(FILE_OBJ.li).removeClass("chk-img");
			flag = "N";
		}else{
			$(FILE_OBJ.li).addClass("chk-img");
			flag = "Y";
		}
		
		var idx = $(FILE_OBJ.li).data("idx");
		
		$.formuploader._LogPrint(inst, "_OnClick_MainImage", "idx:" + idx + " / main_file : " + flag);
		
		$.ajax({
			type:"post",
			url:"/"+inst.settings.site_code+"/ajx_json/UploadMgr/mainFile.json",
			cache: false,
			data: {
				idx : idx
				, main_file : flag
			},
			dataType:"text", // TEXT 형의 JSON으로 받음 
			success : function(data) {
				$.formuploader._LogPrint(inst, "_OnClick_MainImage", data);
			},
			complete : function(data) {},		// 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.
			error : function(xhr, status, error) {//alert("에러발생:" + error + status + xhr);
				$.formuploader._LogPrint(inst, "_OnClick_MainImage", error);
			}
		});
	}
	, _OnClick_FileSelector : function(inst){
		$(inst.settings.upload_form).ajaxForm({
	        beforeSubmit: function (data, form, option) {
	            //validation체크, 막기위해서는 return false를 잡아주면됨
	        	var file_cnt = 0;
	        	for(var obj in data){
	        		if(data[obj].type === "file"){
	        			file_cnt++;
	        		}
	        	}
	        	
	        	
	        	if((inst.settings.upload_sucess_file_cnt + file_cnt)<= inst.settings.file_config_info.prg_file_tot_upl_cnt){
	        		var items = new Array;
	        		for(var obj in data){
		        		if(data[obj].type === "file"){
		        			var item = {};
		        			item.file_exe = data[obj].value.type;
		        			item.file_name = data[obj].value.name;
		        			item.file_size = data[obj].value.size;item.reg_date = "업로드중...";
		        			item.result = "U";
		        			items.push(item);
		        		}
		        	}
	        		$.formuploader._FileSubmitProc(inst, items);
	        		return true;
	        	}else{
	        		alert("Can not add file. \n There are '" + (inst.settings.file_config_info.prg_file_tot_upl_cnt - inst.settings.upload_sucess_file_cnt)+ "' files to add. ");
	        		return false;
	        	}
	        },
	        success: function(response,status){
	        	var obj = response.dataMap.file_infos;
	        	$.formuploader._FileSubmitProc(inst, obj, status);
	        },
	        complete : function(param) { /*alert("complete");*/},
	        error: function(){ /*에러발생을 위한 code페이지*/ }                         
	    });
		$(inst.settings.upload_form).submit();
	}
	, _OnClick_DeleteBtn : function(inst, item, download_url){	// 파일삭제
	
		if(confirm("Are you sure you want to delete this file?")){
			if($(item.li).data("idx") == 0){
				$.formuploader._FileItemStateChange(inst, null, "D", item );
			}else{
				$.ajax({
					type:"post",
					url:"/"+inst.settings.site_code+"/ajx_json/UploadMgr/deleteFile.json",
					cache: false,
					data: {
						qcode : download_url
						, prg_code : inst.settings.prg_code
						, phisycal_del : "Y"
					},
					dataType:"text", // TEXT 형의 JSON으로 받음 
					success : function(data) {
						$.formuploader._LogPrint(inst, "_OnClick_DeleteBtn", data);
						var obj = jQuery.parseJSON(data);
						if(obj.result == "Y"){
							$.formuploader._FileItemStateChange(inst, null, "D", item );
						}else{
							alert(obj.message);
						}
					},
					complete : function(data) {},		// 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.
					error : function(xhr, status, error) {//alert("에러발생:" + error + status + xhr);
						$.formuploader._LogPrint(inst, "_OnClick_DeleteBtn", error);
						alert("Deletion failed. Please contact the administrator.");
					}
				});
			}
		}
		
	}
	, _OnClick_AddImgOnEditor : function(inst, file_alt, val1, val2, val3){ // 본문추가 기능
		
		if($(file_alt).val() == ''){
			alert("You must enter a replacement text.");
			$(file_alt).focus();
			return false;
		}
		$("#" + inst.settings.editor_name).tinymce().execCommand('mceInsertContent', false, "<img src='"+val1+val2+"' alt='"+ $(file_alt).val() +"' style='width:80%;max-width:1000px;min-width:100px;' />");
	
		
	}
	
	
	
	, _OnClick_DownloadBtn : function(inst, qcode, prg_code){	// 파일 다운로드 기능

		$.ajax({
			type:"get",
			url:"/"+inst.settings.site_code+"/ajx_json/UploadMgr/download.json",
			cache: false,
			data: {
				qcode : qcode
				, prg_code : prg_code
			},
			dataType:"text", // TEXT 형의 JSON으로 받음 
			success : function(data) {
				$.formuploader._LogPrint(inst, "_OnClick_DownloadBtn", data);
				var obj = jQuery.parseJSON(data);
				if(obj.result == "Y"){
					window.location.href = "/"+inst.settings.site_code+"/ajx_json/UploadMgr/downloadRun.do?qcode=" + qcode;	
				}else{
					alert(obj.message);
					$.formuploader._LogPrint(inst, "sortable-update", window.JSON.stringify(obj));
				}
			},
			complete : function(data) {},		// 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.
			error : function(xhr, status, error) {//alert("에러발생:" + error + status + xhr);
				$.formuploader._LogPrint(inst, "_OnClick_DownloadBtn", error);
				alert("Download failed. Please contact the administrator.");
			}
		});
	}
	

	
});



$.fn.formuploader = function(options){
	
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if(typeof options === "string" && (options === "getSucessCount" || options === "submitMode")) {
		return $.formuploader["_" + options + "_FormUploader"].
			apply($.formuploader, [this[0]].concat(otherArgs));
	}else return this.each(function() {
		$.formuploader._attachFormUploader(this, options);
		$.formuploader._ConfigOperation(this, options);
	});
}

$.formuploader = new FormUploader(); // singleton instance
$.formuploader.uuid = new Date().getTime();
$.formuploader.version = "1.01";

var formuploader = $.formuploader;

}));