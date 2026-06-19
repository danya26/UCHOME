<?
DEFINE("__NONE_AUTOMEM_MODULE__",TRUE);	//회원모듈 연동 자동설정 OFF
include $_SERVER["DOCUMENT_ROOT"]."/_common.php";	//메인 프로세스


include_once $_SERVER["DOCUMENT_ROOT"]."/common.php";


$moduleCode = "etcPrgr";
$setMode = "ctemplate.getcont";


if (is_file($_PATH["MODULE"]."/_Extend/".$moduleCode."/_mainModule.php")){
	require_once ($_PATH["MODULE"]."/_Extend/".$moduleCode."/_mainModule.php");
}


$DESIGN_OPT = "none";

include_once $_SERVER["DOCUMENT_ROOT"]."/_head.php";
///////////////////////////////////////////////////////////////////


if (count($_INC_FILE)>0){
	foreach($_INC_FILE as $_inc_file_name){
		include $_inc_file_name;
	}
}
///////////////////////////////////////////////////////////////////

include_once $_SERVER["DOCUMENT_ROOT"]."/_tail.php";

?>