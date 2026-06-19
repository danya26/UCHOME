<?php

include_once $_SERVER["DOCUMENT_ROOT"]."/_common.php";

	//$_UP_PATH_ ="/_Data/Editor/".date("Y-m-d");

	
	//setFolder 체크

	if($_REQUEST["setFolder"]){	validator($_REQUEST["setFolder"] ,"idpass",0,20,"사이트코드","stop");}
	if($_REQUEST["setFolder"]){


		$_UP_PATH_ =$_PATH["DATA"]."/SiteFiles/".$_REQUEST["setFolder"];
		$_UP_URL_ =$_URL["DATA"]."/SiteFiles/".$_REQUEST["setFolder"];

	}else{
		
		$_UP_PATH_ =$_PATH["DATA"]."/Editor";
		$_UP_URL_ =$_URL["DATA"]."/Editor";

	}
	ini_set("html_errors", "0");


	echo $_REQUEST["htImageInfo"];


	//업로드 가능한 파일 체크하세요
	$fileType = (int)($_REQUEST["ftype"]);

	$url = $_REQUEST["callback"] .'?sCode='.$_REQUEST["setFolder"].'&type='.$fileType.'&callback_func='. $_REQUEST["callback_func"];

	switch($fileType){
		case 1:	//image
			$able_file_ext = _CS_FILE_UPLOAD_IMG_EXT_;
			break;
		case 3:	//media
			$able_file_ext = _CS_FILE_UPLOAD_MV_EXT_;
			break;
	}

	$able_file_ext_arr = @explode(",",$able_file_ext);


	If (!is_dir($_UP_PATH_)) {
		if(!$Wapp->mk_dir($_UP_PATH_, 0707)) { $url .= '&errstr=디렉토리 생성오류!'; }
	}
	else if (!isset($_FILES["Filedata"]) || !is_uploaded_file($_FILES["Filedata"]["tmp_name"]) || $_FILES["Filedata"]["error"] != 0) {	// Check the upload
		//print_r($_FILES);
		$url .= '&errstr=업로드에 실패했습니다. 다시 시도해주세요!';
	}else if ($fileType="" || ( $able_file_ext!="" && !checkExt($_FILES["Filedata"]["name"] ,$able_file_ext_arr) ) || ($fileType==1 && !is_image($_FILES["Filedata"]["tmp_name"])) ){
		$url .= '&errstr=업로드에 가능한 파일이 아닙니다!';

	}
	else{

		$F_DATA["filename_org"] = $_FILES["Filedata"]["name"];
		$save_file_name = md5(session_id().$_FILES["Filedata"]["name"]).".".getFileExt($_FILES["Filedata"]["name"]);
		$F_DATA["filename"] =upload($_FILES["Filedata"],$save_file_name, $_UP_PATH_);

		if($F_DATA["filename"] !=-1){
			$url .= "&bNewLine=true";
			$url .= "&sFileName=".$F_DATA["filename"] ;

			//$url .= "&size=". $_FILES['Filedata']['size'];
			//아래 URL을 변경하시면 됩니다.
			$url .= "&sFileURL=".$_UP_URL_."/".$F_DATA["filename"];
		}



	}

//기본 리다이렉트
/*
$bSuccessUpload = is_uploaded_file($_FILES['Filedata']['tmp_name']);
if ($bSuccessUpload) { //성공 시 파일 사이즈와 URL 전송

	$tmp_name = $_FILES['Filedata']['tmp_name'];
	$name = $_FILES['Filedata']['name'];
	$new_path = "../upload/".urlencode($_FILES['Filedata']['name']);
	@move_uploaded_file($tmp_name, $new_path);
	$url .= "&bNewLine=true";
	$url .= "&sFileName=".urlencode(urlencode($name));
	//$url .= "&size=". $_FILES['Filedata']['size'];
	//아래 URL을 변경하시면 됩니다.
	$url .= "&sFileURL=/upload/".urlencode(urlencode($name));
} else { //실패시 errstr=error 전송
	$url .= '&errstr=error_'.$_FILES['Filedata']['tmp_name'];
}
*/



header('Location: '. $url);
?>