<?
DEFINE("__NONE_AUTOMEM_MODULE__",TRUE);	//회원모듈 연동 자동설정 OFF
include $_SERVER["DOCUMENT_ROOT"]."/_common.php";	//메인 프로세스
?>
<!doctype html>
<html lang="ko">
	<head>
		 <meta charset="UTF-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<meta name="author" content="ezensoft Dev. LSH" />
	<meta name="description" content="" />
	<meta name="keywords" content="" />

	<meta name="viewport" content="width=device-width, initial-scale=1.0 ,maximum-scale=1.0, minimum-scale=1.0,user-scalable=no,target-densitydpi=medium-dpi" />


	<title>에디터 컨텐츠 삽입</title>
	<link rel="stylesheet" media="all" href="/_Css/common.css" />
	<link rel="stylesheet" media="all" href="/_Css/style.default.css" />
	<link rel="stylesheet" media="all" href="/_Css/content.default.css" />
	<? if($_REQUEST["css"]){	validator($_REQUEST["css"] ,"nopath",0,20,"CSS파일","stop");} ?>
	<? if($_REQUEST["css"]){?>
	<?
	$_CSS_FILES = _explode(";",$_REQUEST["css"]);
	?><?	if (count($_CSS_FILES)>0){		foreach($_CSS_FILES as $_css){?>
	<link rel="stylesheet"  media="all" href="<?=$_css?>" />
	<?}}?>
	<?}?>

<script  type="text/javascript" src="/_Js/jquery-1.12.4.min.js"></script>
<script  type="text/javascript" src="/_Js/common.simple.js"></script>
<script  type="text/javascript" src="/_Js/userfunc.js"></script>
<!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<style>

	.quick-clist  {position:relative;}
	.quick-clist dl {display:block;}
	.quick-clist dt {display:block;position:fixed;left:0;font-size:11px;}
	.quick-clist dt a {display:block;height:15px;width:50px;text-align:center;border-bottom:1px solid #DDD;line-height:16px;padding:7px 0;background:#eaeaea;}
	.quick-clist dd{display:block;margin-left:55px;display:none;background:#FFF;}
	.quick-clist .isOn dd{display:block;}
	.quick-clist .isOn dt a{background:#333;color:#FFF !important;}
	.quick-clist .isOn dt a span {color:#FFF !important;}
	.quick-clist li .li-sel-item {display:block;border:1px solid #ededed; margin:2px;padding:2px;}

	.quick-clist li .li-sel-item:hover {border-color:red;}
	.quick-clist li .li-sel-item .sel-tit {display:block;text-align:center;border-bottom:1px dashed #DDD;background:#EAEAEA;margin-bottom:5px;}
	.quick-clist li .li-sel-item .preview {display:block;}

	.quick-clist  .li-sel-ico  {display:inline-block;border:1px solid #EDEDED;}
	.bg-gray {background-color:#eaeaea;}
</style>
	</head>
<body class="">

<div class="quick-cpannel" >
	<div class="quick-clist">
		<dl class="isOn">
			<dt style="top:0;"><a href="#"><span >제목</span></a></dt>
			<dd>

				<ul>
					<li><a href="#"  class="li-sel-item" rel-code="c-tit01" rel-type="tit"><span class='sel-tit'>제목1</span><p class="preview"><h4 class="c-tit01">제목</h4></p></a></li>
					<li><a href="#"  class="li-sel-item" rel-code="c-tit02" rel-type="tit"><span class='sel-tit'>제목2</span><p class="preview"><h4 class="c-tit02">제목</h4></p></a></li>
					<!-- <li><a href="#"  class="li-sel-item" rel-code="c-tit02-n" rel-type="tit"><span class='sel-tit'>제목2-아이콘없음</span><p class="preview"><h4 class="c-tit02-n">제목</h4></p></a></li> -->
					<li><a href="#"  class="li-sel-item" rel-code="c-tit03" rel-type="tit"><span class='sel-tit'>제목3</span><p class="preview"><h4 class="c-tit03">제목</h4></p></a></li>
					<!-- <li><a href="#"  class="li-sel-item" rel-code="c-tit03-n" rel-type="tit"><span class='sel-tit'>제목3-아이콘없음</span><p class="preview"><h4 class="c-tit03-n">제목</h4></p></a></li> -->
					<!-- <li><a href="#"  class="li-sel-item" rel-code="c-tit04" rel-type="tit"><span class='sel-tit'>제목4</span><p class="preview"><h4 class="c-tit04">제목</h4></p></a></li> -->

				</ul>
			</dd>
		</dl>
		<dl>
			<dt style="top:30px;"><a href="#"><span >버튼</span></a></dt>
			<dd>
				<p  class="pad5t">
					<a href="#"  class="li-sel-item sw-btn" rel-code="sw-btn" rel-type="button"><span class=''>링크버튼</span></a>
					<a href="#"  class="li-sel-item sg-btn" rel-code="sg-btn" rel-type="button"><span class=''>링크버튼</span></a>
					<a href="#"  class="li-sel-item sp-btn" rel-code="sp-btn" rel-type="button"><span class=''>링크버튼</span></a>
					<a href="#"  class="li-sel-item sdp-btn" rel-code="sdp-btn" rel-type="button"><span class=''>링크버튼</span></a>
				</p>
				<!-- <p class="pad5t">
					<a href="#"  class="li-sel-item cw-btn" rel-code="cw-btn" rel-type="button"><span class=''>링크버튼</span></a>
					<a href="#"  class="li-sel-item cg-btn" rel-code="cg-btn" rel-type="button"><span class=''>링크버튼</span></a>
					<a href="#"  class="li-sel-item cdg-btn" rel-code="cdg-btn" rel-type="button"><span class=''>링크버튼</span></a>
					<a href="#"  class="li-sel-item cp-btn" rel-code="cp-btn" rel-type="button"><span class=''>링크버튼</span></a>
					<a href="#"  class="li-sel-item cdp-btn" rel-code="cdp-btn" rel-type="button"><span class=''>링크버튼</span></a>
				</p>

				<p class="pad5t">
					<a href="#"  class="li-sel-item cw-btn" rel-code="cw-btn,down" rel-type="ibutton2"><span class="down">링크버튼</span></a>
					<a href="#"  class="li-sel-item cw-btn" rel-code="cw-btn,link" rel-type="ibutton2"><span class="link">링크버튼</span></a>
					<a href="#"  class="li-sel-item cw-btn" rel-code="cw-btn,win" rel-type="ibutton2"><span class="win">링크버튼</span></a>
				</p>
				<p class="pad5t">
					<a href="#"  class="li-sel-item cg-btn" rel-code="cg-btn,down" rel-type="ibutton2"><span class="down">링크버튼</span></a>
					<a href="#"  class="li-sel-item cg-btn" rel-code="cg-btn,link" rel-type="ibutton2"><span class="link">링크버튼</span></a>
					<a href="#"  class="li-sel-item cg-btn" rel-code="cg-btn,win" rel-type="ibutton2"><span class="win">링크버튼</span></a>
				</p>
				<p class="pad5t">
					<a href="#"  class="li-sel-item cdg-btn" rel-code="cdg-btn,down" rel-type="ibutton2"><span class="down">링크버튼</span></a>
					<a href="#"  class="li-sel-item cdg-btn" rel-code="cdg-btn,link" rel-type="ibutton2"><span class="link">링크버튼</span></a>
					<a href="#"  class="li-sel-item cdg-btn" rel-code="cdg-btn,win" rel-type="ibutton2"><span class="win">링크버튼</span></a>
				</p>
				
				<p class="pad5t">
					<a href="#"  class="li-sel-item cp-btn" rel-code="cp-btn,down" rel-type="ibutton2"><span class="down">링크버튼</span></a>
					<a href="#"  class="li-sel-item cp-btn" rel-code="cp-btn,link" rel-type="ibutton2"><span class="link">링크버튼</span></a>
					<a href="#"  class="li-sel-item cp-btn" rel-code="cp-btn,win" rel-type="ibutton2"><span class="win">링크버튼</span></a>
				</p>
				<p class="pad5t">
					<a href="#"  class="li-sel-item cdp-btn" rel-code="cdp-btn,down" rel-type="ibutton2"><span class="down">링크버튼</span></a>
					<a href="#"  class="li-sel-item cdp-btn" rel-code="cdp-btn,link" rel-type="ibutton2"><span class="link">링크버튼</span></a>
					<a href="#"  class="li-sel-item cdp-btn" rel-code="cdp-btn,win" rel-type="ibutton2"><span class="win">링크버튼</span></a>
				</p> -->

				<p class="pad5t">
					<a href="#"  class="li-sel-item bw-btn" rel-code="bw-btn" rel-type="button"><span class=''>링크버튼</span></a>
					<a href="#"  class="li-sel-item bg-btn" rel-code="bg-btn" rel-type="button"><span class=''>링크버튼</span></a>
				</p>
				</p class="pad5t">
					<a href="#"  class="li-sel-item bp-btn" rel-code="bp-btn" rel-type="button"><span class=''>링크버튼</span></a>
					<a href="#"  class="li-sel-item bdp-btn" rel-code="bdp-btn" rel-type="button"><span class=''>링크버튼</span></a>
				</p>

				<p class="pad5t">
					<a href="#"  class="li-sel-item lw-btn" rel-code="lw-btn" rel-type="button"><span class=''>링크버튼</span></a>
					<a href="#"  class="li-sel-item lg-btn" rel-code="lg-btn" rel-type="button"><span class=''>링크버튼</span></a>
				</p>
				<p class="pad5t">
					<a href="#"  class="li-sel-item lp-btn" rel-code="lp-btn" rel-type="button"><span class=''>링크버튼</span></a>
					<a href="#"  class="li-sel-item ldp-btn" rel-code="ldp-btn" rel-type="button"><span class=''>링크버튼</span></a>
				</p>

			</dd>
		</dl>
		<dl  >
			<dt style="top:60px;"><a href="#"><span>구분선</span></a></dt>
			<dd>
				<ul>
					<li><a href="#"  class="li-sel-item"rel-code="c-line" rel-type="line"><span class='sel-tit'>구분선1</span><p class="preview "><hr class="c-line"/><div class="ssgap"></div></p></a>	</li>
					<li><a href="#"  class="li-sel-item"rel-code="c-line-g" rel-type="line"><span class='sel-tit'>구분선2</span><p class="preview "><hr class="c-line-g"/><div class="ssgap"></div></p></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="c-line-p1" rel-type="line"><span class='sel-tit'>구분선3</span><p class="preview "><hr class="c-line-p1"/><div class="ssgap"></div></p></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="c-line-p2" rel-type="line"><span class='sel-tit'>구분선4</span><p class="preview "><hr class="c-line-p2"/><div class="ssgap"></div></p></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="c-line-p3" rel-type="line"><span class='sel-tit'>구분선5</span><p class="preview "><hr class="c-line-p3"/><div class="ssgap"></div></p></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="c-line-p4" rel-type="line"><span class='sel-tit'>구분선6</span><p class="preview "><hr class="c-line-p4"/><div class="ssgap"></div></p></a></li>

				</ul>
			</dd>
		</dl>
		<dl >
			<dt  style="top:90px;"><a href="#"><span>내용,박스</span></a></dt>
			<dd>
				<ul>
					<li><a href="#"  class="li-sel-item"rel-code="c-tpl-arrlb1" rel-type="itextbox"><div class="preview pad5a"><div class="c-tpl-arrlb1">한줄내용</div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="c-tpl-arrlb2" rel-type="itextbox"><div class="preview pad5a"><div class="c-tpl-arrlb2">한줄내용</div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="c-tpl-arrlb3" rel-type="itextbox"><div class="preview pad5a"><div class="c-tpl-arrlb3">한줄내용</div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="info-ex" rel-type="box"><div class="preview pad5a"><div class="info-ex">내용</div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="info-ex02" rel-type="box"><div class="preview pad5a"><div class="info-ex02">내용</div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="info-ex03" rel-type="box"><div class="preview pad5a"><div class="info-ex03">내용</div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="g-box" rel-type="box"><div class="preview pad5a"><div class="g-box">박스내용</div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="r-box" rel-type="box"><div class="preview pad5a"><div class="r-box">박스내용</div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="w-box" rel-type="box"><div class="preview pad5a"><div class="w-box">박스내용</div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="line-box,inner ico01" rel-type="icbox"><div class="preview pad5a"><div class="line-box"><div class="inner ico01"><p>내용</p></div></div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="line-box,inner ico02" rel-type="icbox"><div class="preview pad5a"><div class="line-box"><div class="inner ico02"><p>내용</p></div></div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="line-box,inner ico03" rel-type="icbox"><div class="preview pad5a"><div class="line-box"><div class="inner ico03"><p>내용</p></div></div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="line-box,inner ico04" rel-type="icbox"><div class="preview pad5a"><div class="line-box"><div class="inner ico04"><p>내용</p></div></div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="line-box,inner ico05" rel-type="icbox"><div class="preview pad5a"><div class="line-box"><div class="inner ico05"><p>내용</p></div></div></div></a></li>
					<li><a href="#"  class="li-sel-item"rel-code="info-box,info-tit,c-list02" rel-type="infobox"><div class="preview pad5a"><div class="info-box"><div class="inner ico05"><p class="info-tit">안내박스</p><p>내용</p></div></div></div></a></li>
				</ul>
			</dd>
		</dl>
		<dl >
			<dt style="top:120px;"><a href="#"><span >아이콘</span></a></dt>
			<dd>
				
				<a href="#"  class="li-sel-ico " rel-code="c-tpl-ic ic120-01" rel-type="tplicon"><span class="c-tpl-ic ic120-01" ></span></a>
				<a href="#"  class="li-sel-ico " rel-code="c-tpl-ic ic120-02" rel-type="tplicon"><span class="c-tpl-ic ic120-02" ></span></a>
				<a href="#"  class="li-sel-ico " rel-code="c-tpl-ic ic120-03" rel-type="tplicon"><span class="c-tpl-ic ic120-03" ></span></a>
				<a href="#"  class="li-sel-ico bg-gray" rel-code="c-tpl-ic ic70-01" rel-type="tplicon"><span class="c-tpl-ic ic70-01" ></span></a>
				<a href="#"  class="li-sel-ico bg-gray" rel-code="c-tpl-ic ic70-02" rel-type="tplicon"><span class="c-tpl-ic ic70-02" ></span></a>

			</dd>
		</dl>

		



	</div>
</div>
<script>
try{
var targetEditor = parent.tinymce.activeEditor;
	}catch(e){var targetEditor = null;}

function addHtmlToEditor(to,str){
		targetEditor.execCommand("mceInsertContent",false,str);
		targetEditor.windowManager.close();

}
function addSourceToEditor(to,temp){
	var tmp_url = "/_Editor/mceEditor/template/" + temp+".html";
	$.get(tmp_url,function(r){
		var htmlStr = r +"<p>&nbsp;</p>";
		addHtmlToEditor(to,htmlStr);
	});
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
		var editor_id = $($(this).parents("").get(0)).attr("rel-editor");
		var tmp_code =$(this).attr("rel-code");
		var tpl_type = $(this).attr("rel-type");
		if(tpl_type!=undefined && tpl_type!=""){
			var htmlStr = "";
			switch(tpl_type){
				case "tplicon":					htmlStr = "<span class='"+tmp_code+"'></span>";					break;
				case "tit":					htmlStr = "<h3 class='"+tmp_code+"'>제목</h3>";					break;
				case "line":					htmlStr = "<div class='"+tmp_code+"'></div>";					break;
				case "box":					htmlStr = "<div class='"+tmp_code+"'>내용</div><p>&nbsp;</p>";					break;
				case "itextbox":					htmlStr = "<div class='"+tmp_code+"'>내용</div><p>&nbsp;</p>";					break;
				case "icbox":					
					var cls = tmp_code.split(",");
					htmlStr = "<div class='"+cls[0]+"'><div class='"+cls[1]+"'><p>내용</p></div></div><p>&nbsp;</p>";					
				break;
				case "infobox":
					var cls = tmp_code.split(",");
					htmlStr = "<div class='"+cls[0]+"'><p class='"+cls[1]+"'>안내문 제목</p><ul class="+cls[2]+"'><li>여러줄로 안내해야 할 내용 목록1</li><li>여러줄로 안내해야 할 내용 목록2</li></ul></div>";

					break;
				case "button":					htmlStr = "<a href='#' class='"+tmp_code+"'><span class='sel-tit'>링크버튼</span></a>";					break;
				case "ibutton":
					var cls = tmp_code.split(",");
					htmlStr = "<a href='#' class='"+cls[0]+"'><span class='txt'>링크버튼</span><span class='ico "+cls[1]+"'></span></a>";
					break;
				case "ibutton2":
					var cls = tmp_code.split(",");
					htmlStr = "<a href='#' class='"+cls[0]+"'><span class='"+cls[1]+"'>링크버튼</span></a>";
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

setEditrQuickCont();
</script>


</body>
</html>
