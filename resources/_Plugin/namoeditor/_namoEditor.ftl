<#ftl encoding="UTF-8"/>
<script type="text/javascript" src="/resources/_Plugin/namoeditor/js/namo_scripteditor.js"></script>

<script type="text/javascript" language="javascript">
	var CrossEditor = new NamoSE("${editor_name!}");
	CrossEditor.params.Width = "100%";
	CrossEditor.params.UserLang = "auto";
	CrossEditor.params.Csslist = "/resources/_Css/common/common.css,/resources/_Css/common/style.default.css,/resources/_Plugin/namoeditor/ezencustom/style.rspnsv.css,";
	CrossEditor.params.FullScreen = false;
	
	
	$(document).ready(function(){
		CrossEditor.params.ParentEditor = document.getElementById("NAMO_EDITOR_ELEMENT");
		CrossEditor.EditorStart();
	});
	
	function OnInitCompleted(e){
		e.editorTarget.SetBodyValue(document.getElementById("${editor_name!}").value);
	}
	
	function NAMOEDITOR_insertContent_OnCourser(content){
		CrossEditor.InsertValue(1, content);
	}
</script>

<div id="NAMO_EDITOR_ELEMENT"></div>

 <div class="info-box02">
	<ul>
		<li>* IE10~ 이상 지원</li>
		<li>* 제공된 에디터로 직접 작성한 내용은 웹 표준 및 장애인 접근성을 100% 보장할 수 없습니다.</li>
		<li>* 제공된 에디터로 작성한 내용은 여백, 크기등의 설정이 상이하게 적용될 수 있으므로 실제 적용된 출력물을 확인해 주시기 바랍니다.</li>
		<li>* 컨텐츠 고급설정으로 지정된 CSS내용은 미리보기시에 적용되지 않습니다. </li>
	</ul>
</div>