;(function( $, window, document, undefined ) {
	var defaults = {
		maxDepth : 6
		, accordionOn : true
		, rootElement : "admSideMenu"
		, tOrderedName : "ul"
		, tItemName : "li"
		, collapsedClass : "collapsed"
		, expandBtnHTML : '<button class="lm-tgl-btn plus" type="button" data-action="expand">open</button>'
		, collapseBtnHTML : '<button class="lm-tgl-btn minus" type="button" data-action="collapse">close</button>'
		, slideToggleBtn : "#admSideMenu_slide_toggle_btn"
	};
	function Plugin(element, options) {
		this.doc  = $(document);
		this.el = $(element);
		this.options = $.extend({}, defaults, options);
		this.init();
	}
	Plugin.prototype = {
		init : function() {
			var list = this;
			$.each(this.el.find(list.options.tItemName), function(k, el) { list.setParent($(el)); });
			list.collapseAll(0);
			list.expandOverAll(100);
			list.el.on('click', 'button', function(e) {
				var target = $(e.currentTarget);
				var action = target.data('action');
				var item   = target.parent().parent().parent(list.options.tItemName);
				if(list.options.accordionOn && action === 'expand'){
					var Ordered_items = item.parent(list.options.tOrderedName).children(list.options.tItemName).not(item);
					$.each(Ordered_items, function(k, el) { list.collapseItem($(el), 100); });
				}
				if(action === 'collapse') { list.collapseItem(item, 100); }
				else if(action === 'expand') { list.expandItem(item, 100); }
			});
			$("#adm-container .a-slide-ctrl-btns button").bind("click", function(e){
				var target = $(e.currentTarget);
				var action = target.data('action');
				var item   = target.parent();
				if ( action === 'collapse' ) { list.collapseSlide(item, 0); }
				else if ( action === 'expand' ) { list.expandSlide(item, 0); }
			});
			$(".sidemenu .mn_i1").mouseenter(function(e){
				if ( $(".side-close").length > 0 ) {
					$(".txt span", $(this) ).css({ "visibility":"visible" }).delay(3000).css({ "left":"75%", "opacity":1 });
				}
			}).mouseleave(function(e){
				if ( $(".side-close").length > 0 ) {
					$(".txt span", $(this) ).finish().css({ "left":"50%", "opacity":0 }).delay(3000).css({ "visibility":"hidden" });
				}
			});
		}
		, setParent : function(li) {
			if(li.children(this.options.tOrderedName).length){
				li.children("span").find(".lm-btn").prepend( $(this.options.expandBtnHTML) );
				li.children("span").find(".lm-btn").prepend( $(this.options.collapseBtnHTML) );
			}
		}
		, expandItem : function(li, ani) {
			li.children("span").find('[data-action="expand"]').hide();
			li.children("span").find('[data-action="collapse"]').show();
			li.children(this.options.tOrderedName).children().slideDown(ani);
		}
		, collapseItem : function(li, ani) {
			var lists = li.children(this.options.tOrderedName);
			if(lists.length) {
				li.children("span").find('[data-action="collapse"]').hide();
				li.children("span").find('[data-action="expand"]').show();
				li.children(this.options.tOrderedName).children().slideUp(ani);
			}
		}
		, expandAll : function(ani) {
			var list = this;
			list.el.find(list.options.tItemName).each(function() {
				list.expandItem($(this), ani);
			});
		}
		, collapseAll : function(ani) {
			var list = this;
			list.el.find(list.options.tItemName).each(function() {
				list.collapseItem($(this), ani);
			});
		}
		, expandOverAll : function(ani) {
			var list = this;
			list.el.find($(".over")).each(function(k, el) {
				list.expandItem($(el).parent(), ani);
			});
			list.el.find($(".over2")).each(function(k, el) {
				list.expandItem($(el).parent(), ani);
			});
		}
		, collapseSlide : function(el, ani) {
			$("#adm-container").parent().addClass("side-close");
		}
		, expandSlide : function(el, ani) {
			$("#adm-container").parent().removeClass("side-close");
			$("#container-wrap #adm-side-wrap .side-mn .sidemenu .mn_u1 .mn_i1 .mn_a1 span").removeAttr("style");
		}
    };

    $.fn.accordionMenu = function(params, a) {
		var lists  = this,
		retval = this;
		lists.each(function() {
			var plugin = $(this).data("accordionMenu");
			if ( !plugin ) {
				$(this).data("accordionMenu", new Plugin(this, params));
				$(this).data("accordionMenu-id", new Date().getTime());
			} else {
				if ( typeof params === 'string' && typeof plugin[params] === 'function' && typeof a === 'undefined' ) {
					retval = plugin[params]();
				} else if ( typeof params === 'string' && typeof plugin[params] === 'function' && typeof a === 'string' ) {
					retval = plugin[params](a);
				}
			}
		});
		return retval || lists;
	};
})(window.jQuery || window.Zepto, window, document);