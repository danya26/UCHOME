<#ftl encoding="UTF-8"/>
<#assign tiles=JspTaglibs["http://tiles.apache.org/tags-tiles"]/>
<#assign custum=JspTaglibs["http://www.withein.com/resources/custom"]/>
<#assign currentMonthDay=.now?string("MM.dd")>
<#include "/WEB-INF/views/_Layout/program/Function.ftl">
<link rel="stylesheet" type="text/css" href="/resources/Main/${tmplSiteCode!}mainModule.css?styleCss=${custum.getBase64Encode(widgetMainCss())}">
<main id="mcontainer-wrap">
	<div id="mcontainer">
		<div class="mVisual-wr">
			<div id="mVisual">
				<div class="dataList owl-carousel">
					<#if MainPopupZoneInfoList?? && MainPopupZoneInfoList!?size &gt; 0 >
						<#list MainPopupZoneInfoList as visual>
							<#if visual.popupFileList?? && visual.popupFileList!?size &gt; 0 && visual.popupFileList[0].idx! != 0 >
								<#if visual.pop_link_type! == "S" >
									<div class="item" data-idx="${visual_index+1}" data-title="${visual.pop_title?default('')}">
										<a href="${visual.pop_link!?default('#n')}">
											<#if visual.pop_etc?default('') !='' >
												<div class="txtBox">
													<div class="txtCore">
														<span class="pTxt1">${visual.pop_title?default('')?replace("&gt;", ">")?replace("&lt;", "<") }</span>
														<p class="pTxt2">
															${visual.pop_etc?default('')?replace("&gt;", ">")?replace("&lt;", "<") }
														</p>
													</div>
												</div>
											</#if>
											<div class="imgBox">
												<img src="${visual.popupFileList[0].file_path!}${visual.popupFileList[0].file_physical_name!}" alt="${visual.pop_image_alt!}" class="pimg" width="1720" height="520">
											</div>
										</a>
									</div>
								<#elseif visual.pop_link_type! == "P" >
									<div class="item" data-idx="${visual_index+1}" data-title="${visual.pop_title?default('')}">
										<a href="${visual.pop_link!?default('#n')}" target="_blank" title="새창열림">
											<#if visual.pop_etc?default('') !='' >
												<div class="txtBox">
													<div class="txtCore">
														<span class="pTxt1">${visual.pop_title?default('')?replace("&gt;", ">")?replace("&lt;", "<") }</span>
														<p class="pTxt2">
															${visual.pop_etc?default('')?replace("&gt;", ">")?replace("&lt;", "<") }
														</p>
													</div>
												</div>
											</#if>
											<div class="imgBox">
												<img src="${visual.popupFileList[0].file_path!}${visual.popupFileList[0].file_physical_name!}" alt="${visual.pop_image_alt!}" class="pimg" width="1720" height="520">
											</div>
										</a>
									</div>
								<#elseif visual.pop_link_type! == "O" >
									<div class="item" data-idx="${visual_index+1}" data-title="${visual.pop_title?default('')}">
										<a href="wpop${pCount!}" onclick="open_popMain('${tmplSiteCode!}','${visual.pop_width!}', '${visual.pop_height!}', '${visual.pop_left!}', '${visual.pop_top!}', '${visual.pop_seq!}');" title="새창열림">
											<#if visual.pop_etc?default('') !='' >
												<div class="txtBox">
													<div class="txtCore">
														<span class="pTxt1">${visual.pop_title?default('')?replace("&gt;", ">")?replace("&lt;", "<") }</span>
														<p class="pTxt2">
															${visual.pop_etc?default('')?replace("&gt;", ">")?replace("&lt;", "<") }
														</p>
													</div>
												</div>
											</#if>
											<div class="imgBox">
												<img src="${visual.popupFileList[0].file_path!}${visual.popupFileList[0].file_physical_name!}" alt="${visual.pop_image_alt!}" class="pimg" width="1720" height="520">
											</div>
										</a>
									</div>
								<#elseif visual.pop_link_type! == "N" >
									<div class="item" data-idx="${visual_index+1}" data-title="${visual.pop_title?default('')}">
										<#if visual.pop_etc?default('') !='' >
											<div class="txtBox">
												<div class="txtCore">
													<span class="pTxt1">${visual.pop_title?default('')?replace("&gt;", ">")?replace("&lt;", "<") }</span>
													<p class="pTxt2">
														${visual.pop_etc?default('')?replace("&gt;", ">")?replace("&lt;", "<") }
													</p>
												</div>
											</div>
										</#if>
										<#if visual.popupFileList[0].file_exe?lower_case == 'mp4'>
											<div class="vdoBox">
												<iframe src="https://www.youtube.com/embed/nnjlVK5Gwhc?controls=0&autoplay=1&mute=1&loop=1&autohide=0&modestbranding=1&fs=0&showinfo=0&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
											</div>
										<#elseif ( visual.popupFileList[0].file_exe?lower_case == 'jpg' || visual.popupFileList[0].file_exe?lower_case == 'gif' || visual.popupFileList[0].file_exe?lower_case == 'png' || visual.popupFileList[0].file_exe?lower_case == 'mp4' || visual.popupFileList[0].file_exe?lower_case == 'jpeg' )>
											<div class="imgBox">
												<img src="${visual.popupFileList[0].file_path!}${visual.popupFileList[0].file_physical_name!}" alt="${visual.pop_image_alt!}" class="pimg" width="1720" height="520">
											</div>
										</#if>
									</div>
								</#if>
							<#else>
								<#if visual.pop_link_type! == "N" >
									<#if visual.pop_link!?contains(".mp4")>
										<div class="item" data-idx="${visual_index+1}" data-title="${visual.pop_title?default('')}">
											<video autoplay muted loop>
												<source src="${visual.pop_link!}" type="video/mp4">
											</video>
										</div>
									</#if>
								</#if>
							</#if>
						</#list>
					<#else>
						<div class="item hasNoData">
							<p class="no-data">등록된 데이터가 없습니다.</p>
						</div>
					</#if>
				</div>
				<div class="dataCtrl">
					<div class="visUtil">
						<div class="dataAuto">
							<button class="btn-stop" type="button"><span class="blind">정지</span></button>
							<button class="btn-play" type="button"><span class="blind">재생</span></button>
						</div>
						<div class="dataPkgs">
							<div class="dataPkg1">
								<div class="dataNums">
									<span class="press">1</span> / <span class="total"></span>
								</div>
							</div>
							<div class="dataPkg2">
								<div class="dataDots"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<script>
				$(function() {
					mVisual.init();
				});
				var mVisual = {
					init : function(){
						this.mVisSlide();
					},
					mVisSlide : function() {
						var mVis = $("#mVisual");
						var mVisSld = $(".dataList", mVis );
						var mVisLen = $(".item", mVisSld ).length;
						var mVisCtrl = $(".dataCtrl", mVis );
						var mVisAuto = $(".dataAuto", mVisCtrl );
						var mVisDots = $(".dataDots", mVisCtrl );
						var mVisPress = $(".press", mVisCtrl);
						var mVisTotal = $(".total", mVisCtrl);
						var mVisDelay = 5000;
						var mVisSpeed = 750;
						var mVisIsAuto = true;
						mVisTotal.text( mVisLen );
						if ( mVisLen == 1 || $(".item", mVisSld ).hasClass("no-data") ) {
							// no-data
							var mVisUtilLoop = false;
							var mVisUtilAuto = false;
						} else {
							// not-no-data
							var mVisUtilLoop = true;
							var mVisUtilAuto = true;
						}
						mVisTotal.text( mVisLen );
						mVisSld.owlCarousel({
							items : 1
							, loop : mVisUtilLoop
							, autoplay : mVisUtilAuto
							, nav : true
							, navText: ["<span class='blind'>이전 장면</span>", "<span class='blind'>다음 장면</span>"]
							, autoplayTimeout : mVisDelay
							, autoplayHoverPause : false
							, dots : true
							, dotsContainer : mVisDots
							, smartSpeed : mVisSpeed
							, responsiveRefreshRate : 0
							, onInitialized : onInitd
							, onTranslate : onTranse
							, onTranslated : onTransed
							, onResized : onResized
						});
						$(".btn-stop", mVisAuto ).on("click",function(){
							mVisIsAuto = false;
							$(this).hide();
							$(this).next().show().focus();
							mVisSld.trigger("stop.owl.autoplay");
						});
						$(".btn-play", mVisAuto ).on("click",function(){
							mVisIsAuto = true;
							$(this).hide();
							$(this).prev().show().focus();
							mVisSld.trigger("play.owl.autoplay", [mVisDelay]);
						});
						function onInitd ( event ) {
							var element = $(event.target);
							$("button", mVisDots ).each( function( index, item ) {
								$("span", $(this) ).html( (index+1) + "번째 장면 <span class='isSel'>선택됨</span>" );
							});
						}
						function onTranse( event ) {	// ** auto trans 타이밍시 수동전환후 연속 2회 슬라이딩 방지
							var element = $(event.target);
							mVisSld.trigger("stop.owl.autoplay");
						}
						function onTransed( event ) {	// ** auto trans 타이밍시 수동전환후 연속 2회 슬라이딩 방지
							var element = $(event.target);
							var mVisIdx = $(".owl-item.active .item", element ).data("idx");
							mVisPress.text( mVisIdx );
							if ( mVisIsAuto ) {
								mVisSld.trigger("play.owl.autoplay", [mVisDelay]);
							}
						}
						function onResized( event ) {
							var element = $(event.target);
							if ( mVisIsAuto ) {
								mVisSld.trigger("play.owl.autoplay", [mVisDelay]);
							} else {
								mVisSld.trigger("stop.owl.autoplay");
							}
						}
					}
				}
			</script>
		</div>
		<div class="mPkg1-wr">
			<div class="sideL">
				<#include "/WEB-INF/views/_Templet/Mwidget/micban/${widgetTmplCode('micban')}/_init.ftl">
			</div>
			<div class="sideR">
				<#include "/WEB-INF/views/_Templet/Mwidget/micban2/${widgetTmplCode('micban2')}/_init.ftl">
			</div>
		</div>
		<div class="mPkg1-wr">
			<div class="sideL">
				<#include "/WEB-INF/views/_Templet/Mwidget/mimban/${widgetTmplCode('mimban')}/_init.ftl">
			</div>
			<div class="sideR">
				<#include "/WEB-INF/views/_Templet/Mwidget/mimban2/${widgetTmplCode('mimban2')}/_init.ftl">
			</div>
		</div>
		<div class="mPkg1-wr">
			<div class="sideL">
				<#include "/WEB-INF/views/_Templet/Mwidget/mlinks/${widgetTmplCode('mlinks')}/_init.ftl">
			</div>
			<div class="sideR">
				<#include "/WEB-INF/views/_Templet/Mwidget/mlinks2/${widgetTmplCode('mlinks2')}/_init.ftl">
			</div>
		</div>
		<div class="mPkg2-wr">
			<div class="sideL">
				<#include "/WEB-INF/views/_Templet/Mwidget/mlinks3/${widgetTmplCode('mlinks3')}/_init.ftl">
			</div>
			<div class="sideR">
				<div id="mPopup">
					<h3 class="dataTit"><span>Popup Zone</span></h3>
					<div class="dataList owl-carousel">
						<#if MiddlePopupZoneInfoList?? && MiddlePopupZoneInfoList?size &gt; 0>
							<#list MiddlePopupZoneInfoList as popInfo>
								<div class="item">
									<#if popInfo.popupFileList?? && popInfo.popupFileList?size &gt; 0 >
										<#if popInfo.pop_link_type! == "S" >
											<a href="${popInfo.pop_link!?default('#n')}" target="_self">
												<img src="${popInfo.popupFileList[0].file_path!}${popInfo.popupFileList[0].file_physical_name!}" alt="${popInfo.pop_image_alt!}" />
											</a>
										<#elseif popInfo.pop_link_type! == "P" >
											<a href="${popInfo.pop_link!?default('#n')}" target="_blank" title="새창열림">
												<img src="${popInfo.popupFileList[0].file_path!}${popInfo.popupFileList[0].file_physical_name!}" alt="${popInfo.pop_image_alt!}" />
											</a>
										<#elseif popInfo.pop_link_type! == "O" >
											<a href="#wpop${pCount!}" onclick="open_popTop('${popInfo.pop_width!}', '${popInfo.pop_height!}', '${popInfo.pop_left!}', '${popInfo.pop_top!}', '${popInfo.pop_seq!}');" title="새창열림">
												<img src="${popInfo.popupFileList[0].file_path!}${popInfo.popupFileList[0].file_physical_name!}" alt="${popInfo.pop_image_alt!}"  />
											</a>
										<#elseif popInfo.pop_link_type! == "N" >
											<img src="${popInfo.popupFileList[0].file_path!}${popInfo.popupFileList[0].file_physical_name!}" alt="${popInfo.pop_image_alt!}" />
										</#if>
									</#if>
								</div>
							</#list>
						<#else>
								<div class="item hasNoData">
									<p class="no-data">등록된 데이터가 없습니다.</p>
								</div>
						</#if>
					</div>
					<div class="dataCtrl">
						<div class="dataNavi"></div>
						<div class="dataAuto">
							<button class="btn-stop" type="button"><span class="blind">정지</span></button>
							<button class="btn-play" type="button"><span class="blind">재생</span></button>
						</div>
					</div>
					<div class="dataDots"></div>
					<script>
						$(function(){
							mPopup.init();
						});
						var mPopup = {
							init : function(){
								this.mPopupSlide();
							},
							mPopupSlide : function() {
								var mPopup = $("#mPopup");
								var mPopupSld = $(".dataList", mPopup );
								var mPopupItem = $(".item", mPopupSld );
								var mPopupLen = mPopupItem.length;
								var mPopupCtrl = $(".dataCtrl", mPopup );
								var mPopupAuto = $(".dataAuto", mPopupCtrl );
								var mPopupDots = $(".dataDots", mPopupCtrl );
								var mPopupDelay = 5000;
								var mPopupSpeed = 750;
								var mPopupIsAuto = true;
								if ( mPopupLen == 1 && mPopupItem.hasClass("hasNoData") ) {
									// no-data
									var mPopupUtilLoop = false;
									var mPopupUtilAuto = false;
								} else {
									// not-no-data
									if ( mPopupLen >= 1 ) {
										mPopupCtrl.addClass("active");
										if ( mPopupLen < 2 ) {
											var mPopupUtilLoop = false;
											var mPopupUtilAuto = false;
										} else {
											var mPopupUtilLoop = true;
											var mPopupUtilAuto = true;
										}
									}
								}
								mPopupSld.owlCarousel({
									items : 1
									, loop : mPopupUtilLoop
									, autoplay : mPopupUtilAuto
									, nav : true
									, navText : ["이전", "다음"]
									, autoplayTimeout : mPopupDelay
									, autoplayHoverPause : false
									, dots : true
									, dotsContainer : mPopupDots
									, smartSpeed : mPopupSpeed
									, onInitialized : onInitd
									, onTranslate : onTranse
									, onTranslated : onTransed
								});
								$(".btn-stop", mPopupAuto ).on("click",function(){
									mPopupIsAuto = false;
									$(this).hide();
									$(this).next().show().focus();
									mPopupSld.trigger("stop.owl.autoplay");
								});
								$(".btn-play", mPopupAuto ).on("click",function(){
									mPopupIsAuto = true;
									$(this).hide();
									$(this).prev().show().focus();
									mPopupSld.trigger("play.owl.autoplay", [mPopupDelay]);
								});
								function onInitd ( event ) {
									var element = $(event.target);
									$("button", mPopupDots ).each( function( index, item ) {
										$("span", $(this) ).html( (index+1) + "번째 장면 <span class='isSel'>선택됨</span>" );
									});
								}
								function onTranse( event ) {	// ** auto trans 타이밍시 수동전환후 연속 2회 슬라이딩 방지
									var element = $(event.target);
									mPopupSld.trigger("stop.owl.autoplay");
								}
								function onTransed( event ) {	// ** auto trans 타이밍시 수동전환후 연속 2회 슬라이딩 방지
									var element = $(event.target);
									if ( mPopupIsAuto ) {
										mPopupSld.trigger("play.owl.autoplay", [mPopupDelay]);
									}
								}
							}
						}
					</script>
				</div>
			</div>
		</div>
		<div class="mPkg1-wr">
			<div class="sideL">
				<#include "/WEB-INF/views/_Templet/Mwidget/mnotice/${widgetTmplCode('mnotice')}/_init.ftl">
			</div>
			<div class="sideR">
				<#include "/WEB-INF/views/_Templet/Mwidget/mtabboard/${widgetTmplCode('mtabboard')}/_init.ftl">
			</div>
		</div>
		<div class="mPkg1-wr">
			<div class="sideL">
				<#include "/WEB-INF/views/_Templet/Mwidget/mtabgallery/${widgetTmplCode('mtabgallery')}/_init.ftl">
			</div>
			<div class="sideR">
				<#include "/WEB-INF/views/_Templet/Mwidget/mtabvideo/${widgetTmplCode('mtabvideo')}/_init.ftl">
			</div>
		</div>
	</div>
</main>