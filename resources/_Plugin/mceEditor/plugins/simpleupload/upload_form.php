<?
include_once $_SERVER["DOCUMENT_ROOT"]."/_common.php";
?>
<!doctype html>
<html lang="ko">

  <head>

    <meta charset="UTF-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<meta name="author" content="이엔아이, 상담전화1644-7759" />
	<meta name="description" content="" />
	<meta name="keywords" content="" />
	<meta name="robots" content="INDEX" />

<title>이엔아이&gt;File Upload</title>
<link rel="stylesheet" media="all" href="/_Css/common.css" />
<link rel="stylesheet" media="all" href="/_Css/style.common.css" />
<script  type="text/javascript" src="/_Js/jquery-1.12.4.min.js"></script>
<script  type="text/javascript" src="/_Js/common.simple.js"></script>
<script  type="text/javascript" src="/_Js/userfunc.js"></script>
<script  type="text/javascript" src="/_Js/formcheck.js"></script>
<!--[if lt IE 9]>
<script type="text/javascript" src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->


<!--[if IE 6]>
<link rel="stylesheet" media="all" href="/_Css/ie6.css" />
<style type="text/css">
html {  filter: expression(document.execCommand("BackgroundImageCache", false, true));}
</style>

<![endif]-->

<!--[if lt IE 9]>

<![endif]-->


<SCRIPT>
var uploader = parent.tinymce.activeEditor.windowManager.getParams();
<? if($_REQUEST["errstr"]){?>
	alert("<?=$_REQUEST["errstr"]?>");
<?}else if($_REQUEST["sFileURL"]){?>
	uploader.setUrl("<?=$_REQUEST["sFileURL"]?>");
<?}?>
</SCRIPT>


</head>



<body class="">
<?
//print_r($_REQUEST);
$fileType = (int)($_REQUEST["type"]);
$sCode = $_REQUEST["sCode"];
//echo $fileType;
switch($fileType){
	case 1:	//image
		$able_file_ext = _CS_FILE_UPLOAD_IMG_EXT_;
		break;
	case 3:	//media
		$able_file_ext = _CS_FILE_UPLOAD_MV_EXT_;
		break;
}
?>
<div class="pad20a">
<form name="frm_file_upload" method="post" action="upload_prc.php" enctype="multipart/form-data" onsubmit="return FormCheck(this);">
<input type="hidden" name="callback" value="<?=$_SERVER["PHP_SELF"]?>"/>
<input type="hidden" name="ftype" value="<?=$fileType?>"/>
<input type="hidden" name="setFolder" value="<?=$sCode?>"/>
<input type="file" name="Filedata" hname="첨부파일" frequired="required" class="file" style="border:1px solid #DDD;padding:2px;width:190px;font-size:12px;"/>

<button type="submit" class="" style="border:1px solid #DDD;background:#F8F8F8;padding:5px 10px;vertical-align:middle;"><span>업로드</span></button>
<br/>
<span style="font-size:12px;"><?=$able_file_ext?> 파일만 업로드 가능</span>
</div>
</form>


</body>
</html>
