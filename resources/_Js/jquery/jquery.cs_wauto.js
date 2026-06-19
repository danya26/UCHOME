function setMinWidthAutoScrollBox(){
	$(".is-wauto-box").each(function(){
		var obj = $(">*",$(this)).eq(0);
		var minW = parseInt(obj.css("min-width"));
		var objW = parseInt(obj.width());

		if(minW<=0) minW = objW;
		var this_s = $(this);

		if ( $(this).width() < minW ) {
			if ( !$(this).parent().hasClass("wauto-wrap") ) {
				$(this).css("overflow-x", "auto");
				$(this).wrap("<div class='wauto-wrap'></div>");
				$(this).before("<div class='rsv-info'><p class='ico'>좌우로 스크롤하시면 내용이 보입니다.</p></div>");

				// 섹션 보이면 3초 후 숨김
				const target = $(this)[0];

				const observer = new IntersectionObserver((entries) => {

					entries.forEach(entry => {

						if (entry.isIntersecting) {

							setTimeout(() => {
								$(target).siblings(".rsv-info").fadeOut(300);
							}, 3000);

							observer.unobserve(target);
						}

					});

				}, {
					threshold: 0.3
				});

				observer.observe(target);
			}
		} else {
			if ( $(this).parent().hasClass("wauto-wrap") ) {
				$(".rsv-info", $(this).parent() ).remove();
				$(this).unwrap();
			}
			$(this).css({"overflow-x":"initial"});
		}
	});
}



