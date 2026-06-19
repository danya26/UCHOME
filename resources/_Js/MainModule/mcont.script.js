var CfgWidgetBox, CfgWidgetBoxObj;
if(CfgWidgetBox == undefined) {
	CfgWidgetBox = function (settings) {
		this.init(settings);
	};
}
if(CfgWidgetBoxObj == undefined) {
	CfgWidgetBoxObj = function (settings) {
		this.init(settings);
	};
}
CfgWidgetBox.prototype.init = function (settings) {
	var this_s = this;
	var uuid = new Date().getTime();
	this.sCode = settings.sCode;
	var sWidgetData = settings.widgetData;
	// this.widgetData = ;
	this.obj = settings.obj;
	this.cfg_key = (this.obj!=null)? $(this.obj).attr("rel-key") : settings.cfg_key;
	this.boxCfg= new CfgWidgetBoxObj({"obj":this.obj,"sCode":this.sCode, "mCode":this.mCode,"widgetData":sWidgetData[this.cfg_key],"cfg_type":settings.cfg_type,"cfg":$.extend({},settings, "order:"+this.Order)});
	return this;
}

CfgWidgetBoxObj.prototype.init = function(o){
	this.obj = (o.obj!=null)? $(o.obj) : null;
	this.cfg = o.cfg;
	this.sCode = o.sCode;
	this.mCode = o.mCode;
	this.widgetData = o.widgetData;
	this.pKey = o.pKey;
	this.Order= o.Order;
	this.type = $(this.obj).attr("selWidgetList");
	this.prevType = $(this.obj).attr("selWidgetPrevType");
	if(this.prevType ==undefined) this.prevType  = "";
	this.cfg_type = o.cfg_type;
	var this_s = this;

	$(this.obj).unbind("mouseover");
	$("*",$(this.obj)).unbind("mouseover,click");
	$(this.obj).unbind("mouseout");
	$("*",$(this.obj)).unbind("mouseout,click");
	if(this.cfgLayer==undefined && this.obj!=null){
		this.setCfgLayer();
		$(this.obj).bind("mouseover",function(e){
			this_s.showCfgLayer(e);
		});
		$(this.obj).bind("mousemove",function(e){
			this_s.setCfgBtn(e);
		});
		$("*",$(this.obj)).bind("mouseover",function(e){
			this_s.showCfgLayer();
		});
		$(this.obj).bind("mouseout",function(){
			this_s.hideCfgLayer();
		});
		$("*",$(this.obj)).bind("mouseout",function(){
			this_s.hideCfgLayer();
		});
	}

	var selWidgetId =this.widgetData;
	if(selWidgetId==undefined) selWidgetId = "";
	this.updateSelWidget(selWidgetId);
	this.updatePreview(selWidgetId);
	if(this.cfg_type=="cont"){
		this.viewConfData();
	}
	return this_s;
}
CfgWidgetBoxObj.prototype.setCfgLayer = function(){
	var this_s = this;
	var boxSize = {w:$(this.obj).outerWidth(),h:$(this.obj).outerHeight()};
	var boxPos = $(this.obj).offset();
	var cfgLayer =  document.createElement("DIV");
	$(cfgLayer).addClass("widget-cfg-mask");
	$(cfgLayer).width(boxSize.w -0);
	$(cfgLayer).height(boxSize.h -0);
	$(cfgLayer).append("<a href='#' class='isCfgBtn'><span><img src='/resources/_Img/Admin/sbtn_mng.png' alt='관리'/></span></a>");
	$(this.obj).append(cfgLayer);
	$(this.obj).addClass("is-sel-widget");

	$(".isCfgBtn",$(cfgLayer)).click(function(){ this_s.openCfgLayer(); return false;});
	//$(".isCfgBtn",$(cfgLayer)).offset();
	$(cfgLayer).offset({left:boxPos.left,top:boxPos.top }).hide();
	this.cfgLayer = $(cfgLayer);

	//프리뷰 업데이트
	var selWidgetId = this.getWidgetId();
	// var selWidgetId = (this.obj!=null)? $(this.obj).attr("sel-widget-id") : this.cfg.sel_widget_id;
	if(selWidgetId==undefined) selWidgetId = "";
	this.updatePreview(selWidgetId);
}
CfgWidgetBoxObj.prototype.getWidgetId= function(){
	var widget_id = (this.obj!=null && $(this.obj).attr("sel-widget-id")!=undefined)? $(this.obj).attr("sel-widget-id") : this.cfg.sel_widget_id;
	if(widget_id==undefined) widget_id = "";
	return widget_id;
}
CfgWidgetBoxObj.prototype.updateSelWidget= function(widget_id){
	if(this.obj!=null) this.obj.attr("sel-widget-id",widget_id);
}
CfgWidgetBoxObj.prototype.updatePreview = function(widget_id){
	if(widget_id!=""){
		var widget_arr = widget_id.split("-");
		var widget_sid = widget_id.substring(widget_id.indexOf("-") +1,widget_id.length);
		var templateURL= "/WEB-INF/views/_Templet/Mwidget/" + widget_arr[0] + "/" + widget_sid ;
	}else{
		var templateURL = "/WEB-INF/views/_Templet/Mwidget";
	}
}
CfgWidgetBoxObj.prototype.showCfgLayer = function(e){
	this.cfgLayer.show();
	this.setCfgBtn(e);
}
CfgWidgetBoxObj.prototype.setCfgBtn = function(e){
	try{
		$(".isCfgBtn",$(this.cfgLayer)).offset({"left":e.pageX-12,"top":e.pageY-5});
	}catch(e){
	}
}
CfgWidgetBoxObj.prototype.hideCfgLayer = function(){
	this.cfgLayer.hide();
}
CfgWidgetBoxObj.prototype.openCfgLayer = function(){
	var cfgKey = (this.obj!=null)? $(this.obj).attr("rel-key") : this.cfg.cfg_key;
	var selWidgetId =  (this.obj!=null &&  $(this.obj).attr("sel-widget-id")!=undefined)?$(this.obj).attr("sel-widget-id") : this.cfg.sel_widget_id;
	if(selWidgetId==undefined) selWidgetId = "";
	var widget_sid = selWidgetId.substring(selWidgetId.indexOf("-") +1,selWidgetId.length);
	var order =(this.obj!=null)? $(this.obj).attr("rel-key2") : 0;
	if(this.cfg_type=="cont"){
		//컨텐츠 세부설정
		var widgetInfo = getWidgetTypeFormID(selWidgetId);
		var widgetType = widgetInfo.widget_type;
		//var cfg_url = "widget." + widgetType +".php";
		var cfg_url = (window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/MainModuleMgr/popup.do"
		switch(widgetType){
			case "mpopzone":
				openBannerZoneDataAdm('MIDDLE');
				break;
			case "mainvisual":
				openBannerZoneDataAdm('MAIN');
				break;
			case "bannerlogo":
				openBannerZoneDataAdm('BANNER');
				break;
			default:
				var url = cfg_url ;
				//openIframeLayer(url,1020,680,'메인모듈 컨텐츠 설정');
				var option = {
					url : url
					, title : "메인모듈 컨텐츠 설정 / <span class='selWidgetId'>" + selWidgetId + "</span>"
					, width : "1200"
					, height : "680"
					, parameter : {
						mcode : mCode
						, sCode : this.sCode
						, cfgKey : cfgKey
						, widgetID : selWidgetId
						, tmpl_code : tmplCode
						, widgetType : widgetType
						, main : main
						, ord : order
					}
				};
				$("body").layerPopup(option);
				break;
		}
	}
}
CfgWidgetBoxObj.prototype.viewConfData = function(){
	var this_s = this;
	var cfgKey =(this.obj!=null)? $(this.obj).attr("rel-key") : this.cfg.cfg_key;
	var selWidgetId = (this.obj!=null && $(this.obj).attr("sel-widget-id")!=undefined)?  $(this.obj).attr("sel-widget-id") : this.cfg.sel_widget_id;
	if(selWidgetId==undefined) selWidgetId = "";
	var widget_sid = selWidgetId.substring(selWidgetId.indexOf("-") +1,selWidgetId.length);

	//컨텐츠 세부설정
	//alert(selWidgetId);
	var widgetInfo = getWidgetTypeFormID(selWidgetId);
	var widgetType = widgetInfo.widget_type;
	var sTarget = $("#cfgView_" + cfgKey +"");
	var cfg_url = (window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/MainModuleMgr/list.do";
	var cfg_param = "sCode=" + this.sCode + "&cfgKey=" + cfgKey +"&widgetID=" + selWidgetId+"&widgetType="+widgetType+"&tmpl_code="+tmplCode+"&main"+main;
	var url = cfg_url + "?" + cfg_param;

	//sTarget.append("<div>"+url+"</div>");
	if(widgetType=="mpopzone"){
		// $(".cfg-view-cont",sTarget).html("<span>부가관리 &gt; 배너존관리 를 통해 배너설정이 가능합니다.</span>");
		$(".cfg-view-cont",sTarget).load((window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/PopupMgr/mainModuleList.do?sCode="+sCode+"&pop_type=MIDDLE&mcode="+mCode+"&tmpl_code="+tmplCode);
		$(".is-preview, button",sTarget).unbind("click").bind("click",function(){
			openBannerZoneDataAdm("MIDDLE");
		});
	}else if(widgetType=="mainvisual"){
		$(".cfg-view-cont",sTarget).load((window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/PopupMgr/mainModuleList.do?sCode="+sCode+"&pop_type=MAIN&mcode="+mCode+"&tmpl_code="+tmplCode);
		$(".is-preview, button",sTarget).unbind("click").bind("click",function(){
			openBannerZoneDataAdm("MAIN");
		});
	}else if(widgetType=="bannerlogo"){
		$(".cfg-view-cont",sTarget).load((window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/BannerMgr/mainModuleList.do?sCode="+sCode+"&mcode="+mCode+"&tmpl_code="+tmplCode);
		$(".is-preview, button",sTarget).unbind("click").bind("click",function(){
			openBannerZoneDataAdm("BANNER");
		});
	}else{
		$(".is-preview",sTarget).attr("src",widgetInfo.preview_url);
		$(".cfg-view-cont",sTarget).load(url);
		$(".is-preview, button",sTarget).unbind("click").bind("click",function(){ this_s.openCfgLayer();});
	}
	//sTarget.load(url);
}
function getWidgetTypeFormID(widget_id){
	var widget_arr ="";var widget_sid ="";
	if(widget_id!=""){
		var widget_arr = widget_id.split("-");
		var widget_sid = widget_id.substring(widget_id.indexOf("-") +1,widget_id.length);
		var templateURL= "/WEB-INF/views/_Templet/Mwidget/" + widget_arr[0] + "/" + widget_sid ;
	}else{
		var templateURL = "/WEB-INF/views/_Templet/Mwidget";
	}
	return {"widget_id":widget_id,"widget_type":widget_arr[0],"widget_sid":widget_sid,"wieget_url": templateURL,"preview_url":"" };
}
function openBannerZoneDataAdm(gbn){
	var aURL = "";
	if(gbn == "BANNER")
		aURL = (window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/BannerMgr/mainModuleWrite.do?sCode="+sCode+"&mcode="+mCode+"&tmpl_code="+tmplCode;
	else
		aURL = (window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/PopupMgr/mainModuleWrite.do?sCode="+sCode+"&pop_type="+gbn+"&mcode="+mCode+"&tmpl_code="+tmplCode+"&mainPopupSize="+mainPopupSize;
	window.open(aURL,"popInfo","Left=100,Top=100,Width=950,Height=930,menubar=no,directories=no,resizable=no,status=no,scrollbars=yes");
}