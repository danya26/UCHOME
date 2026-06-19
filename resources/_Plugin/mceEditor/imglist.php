<?php
include_once $_SERVER["DOCUMENT_ROOT"] . "/_common.php";

$IMG_PATH = $_PATH["DOC_ROOT"]."/_Img/Content";
$IMG_URL = $_URL["IMG"]."/Content";

$IMG_FLIST = get_dirFiles($IMG_PATH);
foreach($IMG_FLIST as $_fname){
	$fname_str = str_replace("ctpl_","",$_fname);
	$filelist[] = Array("title"=>$fname_str,"value"=>$IMG_URL."/".$_fname);
}
echo json_encode($filelist);
//PRINT_R($IMG_FLIST);
?>