<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
	<!--[if lte IE 9]>
	<script type="text/javascript">placeholderInit();</script>
	<![endif]-->
	<script>
	resetImgZoom();
	function resetImgZoom(){
		var zwObj =  $('.img-zoom');
		zwObj.each(function(){
			var this_s = $(this);
			var zwObjImg = this_s.children("img");
			var zwObjUrl = zwObjImg.attr("src");
			var win_w = $(window).innerWidth();

			if(win_w<=768){
				if($(".btn-zoom", $(this)).length<1 ){
					this_s.append("<a href='" + zwObjUrl + "' class='btn-zoom' target='_blank' title='새창열림'><span class='blind'>이미지 확대보기</span></a>");
					zwObjImg.addClass("zoom");
				}
			} else {
				$(".btn-zoom", $(this).parent()).remove();
				zwObjImg.removeClass("zoom");
			}
		});
	}
	</script>
</body>
</html>