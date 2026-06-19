var cImgMaps;
if(cImgMaps == undefined) {	
	cImgMaps = function (el,o) {
		var cfg = $.extend({wrap:null}, o||{});	this.init(el, cfg); }; 
}

cImgMaps.prototype.init = function(el,o){
	this.map = $(el);	this.cfg = o; this.map_osize = {w:this.cfg.org_w,h:this.cfg.org_h};
	this.iconwrap = $(".mk-wrap",this.map);

}
cImgMaps.prototype.getMapSize = function(){
	return {w:$(this.map).width(), h:$(this.map).height(),rate: ($(this.map).width() / this.map_osize.w)  };
}
cImgMaps.prototype.setMapIcon = function(icons){
	var realSize = this.getMapSize();
	var toPos =this.getRelPos(icons,realSize.rate);
	//alert(toPos.x +"/" + toPos.y);
	var $iconwrap = $(this.iconwrap);
	var $icon = $("<li class='picon'></li>");
	$icon.attr("id",icons.id).attr("pos_x",icons.x).attr("pos_y",icons.y);
	if(icons.img){
		$icon.append("<span class='pic-mk'><img src='"+icons.img+"' alt=\""+icons.alt+"\"/></span>");
	}else{
		$icon.append("<span class='pnum-mk'>"+icons.num+"</span>");
		if(icons.title!=""){
			$icon.append("<p class='ptit'><span>"+icons.title+"</span></p>");
		}

	}
	if(icons.vtype) $icon.addClass("fix");
	$icon.css({"left":toPos.x,"top":toPos.y});
	$iconwrap.append($icon);

	//타이틀 위치 보정
	this.setTitlePos();

}
cImgMaps.prototype.setMapOverlay = function(layers){
	var realSize = this.getMapSize();
	var toPos =this.getRelPos(layers,realSize.rate);
	var toSize =this.getRelSize(layers,realSize.rate);
	//alert(toPos.x +"/" + toPos.y);
	var $layerwrap = $(this.map);
	var $layer = $("<span class='layer'></span>");
	$layer.attr("id",layers.id+"_layer").attr("pos_x",layers.x).attr("pos_y",layers.y).attr("org_w",layers.w).attr("org_h",layers.h);
	if(layers.img){
		$layer.append("<span class='layerimg'><img src='"+layers.img+"' alt=\"\"/></span>");
	}else{

	}
	if(layers.vtype) $layer.addClass("fix");

//	$layer.on("mouseover",function(){$(".layer-bg").addClass("over");});
//	$layer.on("mouseout",function(){$(".layer-bg").removeClass("over");});
	$layer.css({"left":toPos.x,"top":toPos.y,"width":toSize.w,"height":toSize.h});
	$layerwrap.append($layer);
}
cImgMaps.prototype.setTitlePos = function(obj){
	if(obj==undefined) var titObj = $(".picon .ptit",this.iconwrap);
	else titObj =titObj = $(".ptit",obj);
	titObj.each(function(){
		var w = $(this).outerWidth();
		$(this).css({"margin-left":Math.ceil(w/2) * -1});

	});
}
cImgMaps.prototype.getRelPos = function(opos,r){
	var rpos = {"x":Math.floor(opos.x * r),"y":Math.floor(opos.y * r)};
	return rpos;
}
cImgMaps.prototype.getRelSize = function(osize,r){
	var rsize = {"w":Math.floor(osize.w * r),"h":Math.floor(osize.h * r)};
	return rsize;
}
cImgMaps.prototype.resetIconsPosition=function(){
	var $this = this;
	var $icon = $("li",this.iconwrap);
	var realSize = this.getMapSize();
	$icon.each(function(){
		var n_pos = {x:$(this).attr("pos_x"),y:$(this).attr("pos_y")};
		var toPos =$this.getRelPos(n_pos,realSize.rate);
		$(this).css({"left":toPos.x,"top":toPos.y});
	});
}


cImgMaps.prototype.resetLayersPosition=function(){
	var $this = this;
	var $layer = $(".layer",this.map);
	var realSize = this.getMapSize();
	$layer.each(function(){

		//$layer.attr("id",layers.id+"_layer").attr("pos_x",layers.x).attr("pos_y",layers.y).attr("org_w",layers.w).attr("org_h",layers.h);


		var n_pos = {x:$(this).attr("pos_x"),y:$(this).attr("pos_y")};
		var toPos =$this.getRelPos(n_pos,realSize.rate);
		var toSize =$this.getRelSize({w:$(this).attr("org_w"),h:$(this).attr("org_h")},realSize.rate);

		$(this).css({"left":toPos.x,"top":toPos.y,"width":toSize.w,"height":toSize.h});
	});
}
cImgMaps.prototype.viewOn=function(iconID, ContentID, depName, btn){
	var $iconwrap = $(this.iconwrap);	// [ul.mk-wrap, selector: ".mk-wrap", context: div.map-img]
	var $layerwrap = $(this.map);		// [div.map-img, selector: "", context: div.map-img]
	if(iconID!=""){
		var $icon = $("#" + iconID,$iconwrap);	// [li#icon1.picon, prevObject: m.fn.init(1), context: div.map-img, selector: ".mk-wrap #icon1"]
		$("li.picon",$iconwrap).not($icon).removeClass("over");
		$icon.addClass("over");

		// ----- 아래 학과일때는 추가로 건물에 over ----- //
		if(depName == "간호학과")			$("#icon4", $iconwrap).addClass("over");
		else if(depName == "기계계열")		$("#icon11", $iconwrap).addClass("over");
		else if(depName == "토목과")			$("#icon9", $iconwrap).addClass("over");
		//else if(depName == "식음료조리계열")	$("#icon4", $iconwrap).addClass("over");
		else if(depName == "디자인스쿨")		$("#icon3", $iconwrap).addClass("over");
		// ----- 아래 학과일때는 추가로 건물에 over // ----- //
		else if(depName == "카페")			$("#icon16", $iconwrap).addClass("over");
		else if(depName == "현금자동인출기")	$("#icon15", $iconwrap).addClass("over");
		else if(depName == "창업보육센터")	$("#icon18", $iconwrap).addClass("over");


		var $layer = $("#" + iconID+"_layer",$layerwrap);	// [prevObject: m.fn.init(1), context: div.map-img, selector: "#icon1_layer"]
		$(".layer",$layerwrap).not($layer).removeClass("over");
		$layer.addClass("over");
		$(".layer-bg").addClass("over");
	}else{
		$("li.picon",$iconwrap).removeClass("over");
		$(".layer",$layerwrap).removeClass("over");
		$(".layer-bg").removeClass("over");
	}

	if($(btn).closest(".minfo-list-wr").is("#map-dpt")){	// "학과"일때는 클릭된 학과만 over 클래스 삽입.
		$(btn).parent().addClass("over");
		$("#map-dpt.minfo-list-wr ul li button").not($(btn)).parent().removeClass("over");
	} else {
		var onContID = ContentID;
		if($(".map-info-list").length > 0){
			$(".map-info-list li").each(function() {
				var rdata = $(this).attr("data-rel").split(",");	// 디자인스쿨 4, 0
				if("icon" + rdata[0] == iconID){
					if(!onContID){
						onContID = rdata[1];
					}
					$(this).addClass("over");
				} else {
					$(this).removeClass("over");
				}
			});
		}
		if($(".map-info-contlist").length>0 && typeof(onContID)!="undefined" && onContID!=""){
			var $infocont = $(".map-info-contlist #mapInfo"+onContID);

			$infocont.addClass("over");
			$(".map-info-contlist .map-info-cont").not($infocont).removeClass("over");
			$(".map-info-contlist .map-info-cont.over").siblings().children().removeClass("is-open").removeAttr("tabindex style");
		}
		//var $icon = $("<li class='picon'></li>");
	}
}

//setMapIcon({x:210,y:480,img:"icon_bus1.png",alt:"통학버스정류장-입구쪽"});


function previewMapPoint(p, i, depName, btn){	// 간호학과의 경우 [5, 0], 학과명 parameter 추가
	cMaps.viewOn("icon"+p, i, depName, btn);
}

//캠퍼스 투어 맵타입 설정
function typeChange(obj) {	// 
	var mapType = obj.value;	
	
	$("."+mapType).css("display","");
	$(".campus-map-wr").not('.'+mapType).css("display","none");
	
	$("#location_x").val("");
	$("#location_y").val("");	
}





