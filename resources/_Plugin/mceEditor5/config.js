
function csCMSURLConverter(url, node, on_save, name) {
	
	if(typeof(editorSiteURL)!="undefined"){
		var siteRootURL = editorSiteURL.root;
	}
	else{
		var siteRootURL = "";
	}
  // Do some custom URL conversion
 // url = url.substring(3);
	var re_url = url.replace("{_SITE_URL_}",siteRootURL);
	return re_url;
}


var mceEditorConf = {
	selector : "textarea",
	language : 'ko_KR',
	
	content_css : ["/resources/_Css/common/editor.css"],

    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
	contextmenu : "link image inserttable | tableprops deletetable | cell row column",

	extended_invalid_elements : "b,i",
	
	valid_children : "*[*],+a[*],+a[div|p|span|ul|li|ol|img|strong|dt|dd|dl],+p[*],+div[*],+span[*]",	//전체 태그를 valid 설정함!, A > SPAN, A > DIV 등 태그 내부의 요소 사용 제한을 두지 않음
	valid_elements:"*[*]",
	extended_valid_elements : "+a[*],+span[*],+img[alt|src|style|class|border|org_width|org_height|width|height|ocont_w|ocont_h|zoomview|id|usemap]",

	font_formats: '맑은 고딕=Malgun Gothic;돋움=Doutm;굴림=Gulim;Andale Mono=andale mono,times;',
	images_upload_handler : example_image_upload_handler,
}

function example_image_upload_handler (blobInfo, success, failure, progress) {
	  var xhr, formData;

	  var blob = blobInfo.blob();
	  var mimetype = blob.type;
	  
	  var type = '1';
	  if(mimetype.indexOf('image') > 0){
		  type = '1';
	  }else if(mimetype.indexOf('file') > 0){
		  type = '2';
	  }else if(mimetype.indexOf('video') > 0){
		  type = '3';
	  }
	  
	  var filename = blobInfo.filename();
	  var name = blobInfo.name();
	  
	  xhr = new XMLHttpRequest();
	  xhr.withCredentials = false;
	  xhr.open('POST', '/Editor/uploadFile.json');

	  xhr.upload.onprogress = function (e) {
	    progress(e.loaded / e.total * 100);
	  };

	  xhr.onload = function() {
	    var json;

	    if(xhr.status === 403) {
	      failure('HTTP Error: ' + xhr.status, { remove: true });
	      return;
	    }

	    if(xhr.status < 200 || xhr.status >= 300) {
	      failure('HTTP Error: ' + xhr.status);
	      return;
	    }

	    json = JSON.parse(xhr.responseText);

	    if(!json || typeof json.result.fileName != 'string') {
	      failure('Invalid JSON: ' + xhr.responseText);
	      return;
	    }

	    success(json.result.fileName);
	  };

	  xhr.onerror = function () {
	    failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
	  };

	  formData = new FormData();
	  formData.append('Filedata', blobInfo.blob(), blobInfo.filename());
	  formData.append('type', type);
	  
	  xhr.send(formData);
};

	
////////////////////////////////////////////////////////////////////////////////

var mceEditorFullConf = $.extend({},mceEditorConf,{
	
   plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        " emoticons template paste textcolor colorpicker textpattern responsivefilemanager simpleupload" //simpleupload
    ],

	toolbar1: "undo redo |cut copy paste | searchreplace |  fontselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | subscript superscript | alignleft aligncenter alignright alignjustify  ",
	toolbar2: "outdent indent | bullist numlist | link unlink anchor | responsivefilemanager |  image media | table | hr charmap | nonbreaking | pagebreak |  removeformat |    visualchars visualblocks   restoredraft | cscont template | code preview ",
	
	 external_filemanager_path:"/Share/FileManager/"
	, external_plugins: { "filemanager" : "/Share/FileManager/plugin.js"}


});



var mceEditorInlineConf = $.extend({},mceEditorConf,{
	selector: ".cs-inline-editable",
	inline: true,

	menubar: false,
	toolbar_items_size: 'small',
	content_css : ["/resources/_Plugin/mceEditor/css/editor.css"],

    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern responsivefilemanager" //simpleupload
    ],

	toolbar1: "save | undo redo |  fontselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | subscript superscript ",
	toolbar2: " alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link unlink anchor image media | table | hr charmap | nonbreaking |   removeformat |  cscont |  code"
	

});

var mceEditorSimpleConf = $.extend({},mceEditorConf,{

	plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        " emoticons template paste textcolor colorpicker textpattern  simpleupload" //simpleupload
    ],

	toolbar1: "undo redo |cut copy paste | searchreplace |  fontselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | subscript superscript | alignleft aligncenter alignright alignjustify  ",
	toolbar2: "outdent indent | bullist numlist | link unlink anchor |   table | hr charmap | nonbreaking | pagebreak |  removeformat |    visualchars visualblocks   restoredraft |  code preview ",
	
});





////////////////////////////////////////////////////////////////////////////////



if(typeof(setEditorWidth)!="function") {
function setEditorWidth(id,w){
	//var testc = $("#" + id).tinymce().getBody();
	try{
	var testc = $("#" + id).tinymce().getContentAreaContainer();
	var obj = $("iframe",$(testc));
	var toW = w + 27;
	$(obj).css({"margin-left":"auto","margin-right":"auto"});
	//$(obj).stop().animate({width:w});
	$(obj).width(toW);
	}catch(e){}
}}
if(typeof(setEditorWidthAll)!="function") {
function setEditorWidthAll(to_w){
	if(to_w==undefined) var to_w = 0;
	$(".editor-container").each(function(){
			var editor_obj_id = $(this).attr("id").replace("edtCtrls_","");
			var w = (to_w > 0)? to_w : parseInt($(this).attr("cont_w"));
			setEditorWidth(editor_obj_id,w);
	});
}
}


if(typeof(setEditorTypeInit)!="function") {
function setEditorTypeInit(id,t){
//	alert($("#" + id).tinymce());
	switch(t){
		case "R":
			setEditorWidth(id,960);break;
		case "M":
			setEditorWidth(id,300);
			break;
		default:
			setEditorWidth(id,760);break;

	}

}}
if(typeof(addSourceToEditor)!="function"){
	function addSourceToEditor(to,temp){
		var tmp_url = "/_Editor/mceEditor/template/" + temp+".html";
		$.get(tmp_url,function(r){
			addHtmlToEditor(to,r);
		});
	}

}
if(typeof(addHtmlToEditor)!="function"){
	function addHtmlToEditor(to,str){
		$("#"+to).tinymce().execCommand("mceInsertContent",false,str);
		$(".quick-cpannel .quick-clist").hide();
	}
}
function setEditrQuickCont(){
	$(".quick-cpannel ").each(function(){
	var this_s = this;
	//$(this).draggable();
	$(".is-handel",this).on("click",function(){
		$(".quick-clist",$(this_s)).toggle();
	});
	$("dt a",$(this_s)).on("click",function(){
		var $dl = $($(this).parents("dl").get(0));
		$("dl",$(this).parents(".quick-clist").get(0)).not($dl).removeClass("isOn");
		$dl.addClass("isOn");
		return false;
	});
	$("dd a",$(this_s)).on("click",function(){
		var editor_id = $($(this).parents(".editor-container").get(0)).attr("rel-editor");
		var tmp_code =$(this).attr("rel-code");
		var tpl_type = $(this).attr("rel-type");
		if(tpl_type!=undefined && tpl_type!=""){
			var htmlStr = "";
			switch(tpl_type){
				case "tit":					htmlStr = "<h4 class='"+tmp_code+"'>제목</h4>";					break;
				case "line":					htmlStr = "<hr class='"+tmp_code+"'/>";					break;
				case "button":					htmlStr = "<a href='#' class='"+tmp_code+"'><span>링크버튼</span></a>";					break;
				case "ibutton":
					var cls = tmp_code.split(",");
					htmlStr = "<a href='#' class='"+cls[0]+"'><span class='txt'>링크버튼</span><span class='ico "+cls[1]+"'></span></a>";
					break;
			}
			if(htmlStr!="")		addHtmlToEditor(editor_id,htmlStr);

		}else if(tmp_code!=undefined && tmp_code!=""){
			addSourceToEditor(editor_id,tmp_code);
		}else{
		
			alert("지정된 템플릿이 없습니다");
		}
		return false;
	});
});


}