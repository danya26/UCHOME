function csCMSURLConverter(url, node, on_save, name) {
	if ( typeof(editorSiteURL) != "undefined" ) {
		var siteRootURL = editorSiteURL.root;
	} else {
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
	inline : false,
    theme: "modern",
	menubar: false,
	toolbar_items_size: 'small',
	content_css : ["/resources/_Css/common/editor.css"],
	siteURL:{},
    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak"
        , "searchreplace visualblocks visualchars code fullscreen"
        , "insertdatetime media nonbreaking save table contextmenu directionality"
        , " emoticons  paste textcolor colorpicker  simpleupload lineheight" //responsivefilemanager,textpattern
		, "imagetools"
    ],
	toolbar1: "undo redo |cut copy paste print | searchreplace |  fontselect | fontsizeselect | lineheightselect | forecolor backcolor | bold italic underline strikethrough | subscript superscript | alignleft aligncenter alignright alignjustify  ",
	toolbar2: "outdent indent | bullist numlist | link unlink anchor image media | table | hr charmap | nonbreaking |  removeformat |    visualchars visualblocks   restoredraft | cscont  | code preview ",
	setup: function(editor) {
		//브라우저 체크 후 한글입력 호환문구 출력
		//익스에서 inline-block + 한글 입력 오류
		//엣지 한글입력 오류
		editor.addButton('cscont', {
			text: 'Content +',
			icon: false,
			onclick: function() {
				// tinymce().getContentAreaContainer()
				var $container = $(editor.getContainer()).parents(".editor-container");
				if($('.quick-cpannel',$container).length>0){
					$('.quick-cpannel .quick-clist',$container).toggle();
				}
				var cont_css = (editor.settings.content_css.length>0)? editor.settings.content_css.join(";") : "";
				//	editor.windowManager.open({
				//		title:"Add Content",
				//		url: '/_Editor/mceEditor/content.php?css=' + cont_css+"&sCode="+getThisConfigSiteCode(),
				//		width: 620,height: 480
				//	}, {
				//		custom_param: 1
				//	});
               // editor.insertContent('Main button');
            }
        });
		editor.addButton('csgap', {  text: 'gap', icon: false,        onclick: function() { editor.insertContent("<p class='gap'></p>");    }      });
		editor.addButton('csgaps', {  text: 'sgap', icon: false,        onclick: function() { editor.insertContent("<p class='sgap'></p>");    }      });
		editor.addButton('csgapss', {  text: 'ssgap', icon: false,        onclick: function() { editor.insertContent("<p class='ssgap'></p>");    }      });
    },
	contextmenu : "link image inserttable | tableprops deletetable | cell row column",
	/*
	toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
	toolbar2: "table | preview media | forecolor backcolor | template",
	*/
	//object_resizing : true,	//드래그 리사이징 적용 여부
	//object_resizing : "img",//"img", //드래그 리사이징 적용 여부(드래그 리사이징 적용할 대상태그만 지정하도록)
	//convert_fonts_to_spans : true,
	element_format : "xhtml",
	schema: "html5",
	extended_invalid_elements : "b,i",
	valid_children : "*[*],+a[*],+a[div|p|span|ul|li|ol|img|strong|dt|dd|dl],+p[*],+div[*],+span[*]",	//전체 태그를 valid 설정함!, A > SPAN, A > DIV 등 태그 내부의 요소 사용 제한을 두지 않음
	valid_elements:"*[*]",
	extended_valid_elements : "+a[*],+span[*],+img[alt|src|style|class|border|org_width|org_height|width|height|ocont_w|ocont_h|zoomview|id|usemap]",
	// force_br_newlines : true,
	// force_p_newlines : false,
	// forced_root_block : '',// Needed for 3.x
	forced_root_block : '',
	end_container_on_empty_block: true,
	gecko_spellcheck: false,
	// end_container_on_empty_block: true,
	// allow_conditional_comments: false,
	// allow_html_in_named_anchor
	fix_list_elements : true,	//li 구조깨짐 방지
	//URL 적용 옵션
	//convert_urls: false,	//도메인 치환여부
	//document_base_url: 'http://csdemo3.withein.com/', // relative_urls, remove_script_host, and convert_urls 옵션에 적용
	remove_script_host: true,	//"http://www.example.com/somedir/somefile.htm" ->"/somedir/somefile.htm".
	relative_urls : false,	//절대경로로 이미지 경로 사용여부,
	urlconverter_callback : 'csCMSURLConverter',
	font_formats: "맑은 고딕=Malgun Gothic;돋움=Doutm;굴림=Gulim;Andale Mono=andale mono,times;"+
        "Arial=arial,helvetica,sans-serif;"+
        "Arial Black=arial black,avant garde;"+
        "Book Antiqua=book antiqua,palatino;"+
        "Comic Sans MS=comic sans ms,sans-serif;"+
        "Courier New=courier new,courier;"+
        "Georgia=georgia,palatino;"+
        "Helvetica=helvetica;"+
        "Impact=impact,chicago;"+
        "Symbol=symbol;"+
        "Tahoma=tahoma,arial,helvetica,sans-serif;"+
        "Terminal=terminal,monaco;"+
        "Times New Roman=times new roman,times;"+
        "Trebuchet MS=trebuchet ms,geneva;"+
        "Verdana=verdana,geneva;"+
        "Webdings=webdings;"+
        "Wingdings=wingdings,zapf dingbats"
	,
	//fontsize_formats: "8px 9px 10px 11px 12px 13px 14px 15px 18px 24px 36px",
	fontsize_formats: "85% 90% 95% 100% 110% 120% 130% 150% 180% 200% 11px 12px 13px 14px 15px 18px 24px 36px",
	lineheight_formats: "1em 1.3em 1.5em 130% 150% 160% 170% 180% 190% 200% 300%",
	//indentation : '18px',	//들여쓰기 폭 설정
	//플러그인 관련 설정
	link_title: true,
	link_list: [
		{title: 'HOME', value: '/'},
		{title: '바로가기 링크', menu: [
			{title: '본문바로가기', value: '#contents'},
			{title: '문서처음으로', value: '#doc'}
		]}
	],
	/*// 클래스명 직접 입력과 충돌, 지정하지 말것
	link_class_list: [
		{title: '직접입력', value: ''},
		{title: '버튼01', value: 'editor-c-btn01'},
		{title: '버튼02', value: 'editor-c-btn02'}
	],
	*/
	//테이블
	// table_grid:false,
	// table_add_caption:true,
	table_default_attributes: {
		"width": '100%',
		"class" : 'edit-tbl031'
	},
	table_setcss_list:[
		{title: '지정안함', value: ''},
		{title: '강사소개', value: 'edit-tbl01'},
		{title: '강의계획서', value: 'edit-tbl02'},
		{title: '일반테이블', value: 'edit-tbl03'}
	],
	/*
	//사용안함..ㅠㅠ 클래스 목록 지정할 경우 다른 스타일 추가 할수 없음,ㅠㅠ
	table_class_list: [
		{title: '직접입력', value: ''},
		{title: 'tbl-basic01', value: 'tbl-basic01'},
		{title: 'tbl-basic02', value: 'tbl-basic02'}
	],
	*/
	//filemanager_title:"Filemanager",
	//file_upload_form_path : "/resources/_Plugin/mceEditor/plugins/simpleupload"
	//, file_browser_callback : ""
	//, filemanager_subfolder:""
	//image_advtab: true,	//이미지 확장설정
	//image_preview : true,
	//이미지 목록
	//image_list: "/Editor/ImageList.do",
	images_upload_handler : example_image_upload_handler,
}

function example_image_upload_handler (blobInfo, success, failure, progress) {
	var xhr, formData;
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
	formData.append('upload', blobInfo.blob(), blobInfo.filename());
	xhr.send(formData);
};
////////////////////////////////////////////////////////////////////////////////
var mceEditorFullConf = $.extend({},mceEditorConf,{
	plugins: [
		"advlist autolink lists link image charmap print preview hr anchor pagebreak",
		"searchreplace visualblocks visualchars code fullscreen",
		"insertdatetime media nonbreaking save table contextmenu directionality",
		"emoticons template paste textcolor colorpicker textpattern responsivefilemanager simpleupload" //simpleupload
	]
	, toolbar1: "undo redo |cut copy paste | searchreplace |  fontselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | subscript superscript | alignleft aligncenter alignright alignjustify  "
	, toolbar2: "outdent indent | bullist numlist | link unlink anchor | responsivefilemanager |  image media | table | hr charmap | nonbreaking | pagebreak |  removeformat |    visualchars visualblocks   restoredraft | cscont template | code preview "
	, external_filemanager_path:"/Share/FileManager/"
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

if ( typeof(setEditorWidth) != "function" ) {
	function setEditorWidth( id, w ) {
		//var testc = $("#" + id).tinymce().getBody();
		try{
			var testc = $("#" + id).tinymce().getContentAreaContainer();
			var obj = $("iframe",$(testc));
			var toW = w + 27;
			$(obj).css({"margin-left":"auto","margin-right":"auto"});
			//$(obj).stop().animate({width:w});
			$(obj).width(toW);
		} catch(e) {
		}
	}
}
if ( typeof(setEditorWidthAll) != "function" ) {
	function setEditorWidthAll(to_w){
		if(to_w==undefined) var to_w = 0;
		$(".editor-container").each(function(){
				var editor_obj_id = $(this).attr("id").replace("edtCtrls_","");
				var w = (to_w > 0)? to_w : parseInt($(this).attr("cont_w"));
				setEditorWidth(editor_obj_id,w);
		});
	}
}
if ( typeof(setEditorTypeInit) != "function" ) {
	function setEditorTypeInit(id,t){
		// alert($("#" + id).tinymce());
		switch(t){
			case "R":
				setEditorWidth(id,960);break;
			case "M":
				setEditorWidth(id,300);
				break;
			default:
				setEditorWidth(id,760);break;
		}
	}
}
if ( typeof(addSourceToEditor) != "function" ) {
	function addSourceToEditor(to,temp){
		var tmp_url = "/_Editor/mceEditor/template/" + temp+".html";
		$.get(tmp_url,function(r){
			addHtmlToEditor(to,r);
		});
	}
}
if ( typeof(addHtmlToEditor) != "function" ) {
	function addHtmlToEditor(to,str){
		$("#"+to).tinymce().execCommand("mceInsertContent",false,str);
		$(".quick-cpannel .quick-clist").hide();
	}
}
function setEditrQuickCont() {
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
					case "tit" : htmlStr = "<h4 class='"+tmp_code+"'>제목</h4>";					break;
					case "line": htmlStr = "<hr class='"+tmp_code+"'/>";					break;
					case "button": htmlStr = "<a href='#' class='"+tmp_code+"'><span>링크버튼</span></a>";					break;
					case "ibutton":
						var cls = tmp_code.split(",");
						htmlStr = "<a href='#' class='"+cls[0]+"'><span class='txt'>링크버튼</span><span class='ico "+cls[1]+"'></span></a>";
						break;
				}
				if(htmlStr!="") addHtmlToEditor(editor_id,htmlStr);
			}else if(tmp_code!=undefined && tmp_code!=""){
				addSourceToEditor(editor_id,tmp_code);
			}else{
				alert("지정된 템플릿이 없습니다");
			}
			return false;
		});
	});
}