function placeholderInit(){
	var placeholder = $("input[type=text],input[type=password],textarea");
	
	placeholder.each(function(){
		var _this = $(this);
		var placeholderAttr = 'placeholder';
		var placeholderText = _this.attr(placeholderAttr);
		var prevGuideText = _this.prev("label.blind");		
		
		if(_this.val() == ''){
                prevGuideText.show();
            }
            prevGuideText.addClass('placeholder_text');

            _this.bind('mousedown focus', function(e){
                prevGuideText.hide();
            }).bind('blur', function(e){
                if($(this).val() == ''){
                    prevGuideText.show();
                }
            });

            prevGuideText.bind('mousedown', function(e){
                $(this).hide();
                setTimeout(function(){
                    _this.focus();
                }, 100);
            });		
	});
}