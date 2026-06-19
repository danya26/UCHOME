<? if(!defined("_EDITOR_RSPNSV_CTRLS_")){ DEFINE("_EDITOR_RSPNSV_CTRLS_",TRUE); ?>
<div class="rspnsv-cpannel pad15lr pad10tf" style="background:#f9f9f9;">
	<div class="" style="padding-top:3px;"><strong class="c2">반응형 가로폭 변경 미리보기</strong>&nbsp;&nbsp;<span class="f11 c9"> / 마우스로 드래그하여 에디터의 가로폭을 변경해보세요</span> </div>
	<div class="pad5t pad10f f11 vcen"><div class="editor-w-slider" style="display:inline-block;width:300px;"></div>&nbsp;&nbsp;&nbsp;&nbsp;(가로폭 : <span class="editor-w-str"><?=$conf["cont_w"]?>px</span>)</div>
	<div class="f11 tlh130"><span class="cred">※ 적용된 사이트의 디자인 템플릿 및 접속단말기의 설정에 따라 <strong>글자모양, 글자크기, 줄간격등이 다르게 적용 될 수 있으므로</strong> 화면 출력결과가 에디터 화면과 일부 다르게 적용될 수 있습니다!</span>
	</div>

</div>

<script>
$(document).ready(function(){

try{
$( ".editor-container").each(function(){
	var editor_obj_id = $(this).attr("id").replace("edtCtrls_","");
	$(".editor-w-slider",this).slider({
		value:<?=$conf["cont_w"]?>,      min: 300,      max: <?=$conf["cont_max_w"]?>,
      step: 5,range:"min",
      slide: function( event, ui ) {
		setEditorWidthAll(ui.value);
		 //setEditorWidth(editor_obj_id,ui.value);
		 var w = ui.value;

		 /*
		 var s = "기본";
		 if(w<=480) s = "모바일";
		 else if(w<=680) s = "모바일 or 태블릿";
		 else  s = "태블릿 or PC";
		 */
		 var s = "";
        $(".editor-w-str" ).html(  ui.value +"px" + s);

      }

	});

});
}catch(e){

}
});

function setEditorWidthAll(to_w){
	if(to_w==undefined) var to_w = 0;
	$( ".editor-container").each(function(){
			var editor_obj_id = $(this).attr("id").replace("edtCtrls_","");
			var w = (to_w > 0)? to_w : parseInt($(this).attr("cont_w"));
			setEditorWidth(editor_obj_id,w);
	});
}
//docLoading(function(){ setEditorWidthAll(); });
//docLoading(function(){setEditorWidth('<?=$EDITOR_OBJ_ID?>', <?=$conf["cont_w"]?>);});
</script>

<?}?>