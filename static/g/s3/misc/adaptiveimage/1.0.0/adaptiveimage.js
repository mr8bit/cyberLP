;(function($) {

	$.fn.imagesLoaded = function(callback, fireOne) {
	  var
	    args = arguments,
	    elems = this.filter('img'),
	    elemsLen = elems.length - 1;
	
	  elems.each(function() {
	        // cached images don't fire load sometimes, so we reset src.
	        if (!this.complete) {
		        this.onload = function(e) {
			        if (fireOne) {
			            !elemsLen-- && callback.call(elems, e);
			        } else {
			            callback.call(this, e);
			        }
		        }
	        } else {
		        if (fireOne) {
		            !elemsLen-- && callback.call(elems, {});
		        } else {
		            callback.call(this, {});
		        }
	        }
	        
	        this.src = this.src;
	    });
	}
	
	function GetIEVersion() {
	  var sAgent = window.navigator.userAgent;
	  var Idx = sAgent.indexOf("MSIE");
	
	  // If IE, return version number.
	  if (Idx > 0) 
	    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
	
	  // If IE 11 then look for Updated user agent string.
	  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
	    return 11;
	
	  else
	    return 0; //It is not IE
	}

	$(function() {
		var cache = {};
		var isIE = (GetIEVersion() > 0 && GetIEVersion() < 12) ? true : false;
		
		function imageType() {
			$('.img-convert').each(function() {
				var $img = $(this).find('img');

				if ($img.length) {
					var img_src = $img.attr('src');

					if (cache.hasOwnProperty(img_src)) {
						convert(cache[img_src], $img);
					} else {
						$img.imagesLoaded(function() {
							cache[img_src] = {};
							convert(cache[img_src], $img);
						});
					}
				}
			});
		}

		function convert(cache_img, $img) {
			$img.css({"max-width": "100%", "max-height": "100%"});
			
			if ($img.parent().hasClass('img-cover')) {
				var img_width,
					img_height,
					img_prop;
					
				if (!cache_img.width || !cache_img.height) { 
					if ($img.attr('src').slice(-3) == 'svg') {
						$.get($img.attr('src'), function(svgxml) {
						    var attr_width = svgxml.documentElement.getAttribute("width"),
						    	attr_height = svgxml.documentElement.getAttribute("height"),
						    	attr_viewBox = svgxml.documentElement.getAttribute("viewBox");
						    
						    if (attr_width && attr_height) {
						    	img_width = attr_width;
						    	img_height = attr_height;
						    } else if (attr_viewBox) {
						    	var viewbox_arr = attr_viewBox.split(" ");
						    	img_width = parseInt(viewbox_arr[2]);
						    	img_height = parseInt(viewbox_arr[3]);
						    }
						    cache_img.width = img_width;
						    cache_img.height = img_height;
						    
						    setStyles($img, img_width, img_height);
						    
						}, "xml");
					} else {
						cache_img.width = img_width = $img[0].naturalWidth;
						cache_img.height = img_height = $img[0].naturalHeight;
					}	
				} else {
					img_width = cache_img.width;
					img_height = cache_img.height;
				}
				
				setStyles($img, img_width, img_height);

			}
		}
		
		function setStyles($img, img_width, img_height) {
			var $wrap = $img.parent();
			var wrap_width = parseInt($wrap.width()),
				wrap_height = parseInt($wrap.height()),
				wrap_prop = wrap_width/wrap_height;
				
			var min_width = wrap_height/img_height * img_width;
				
			if(img_width && img_height){
				img_prop = img_width/img_height;
				if (wrap_prop > img_prop) {
					$img.css({"max-width": "100%", "width": img_width > wrap_width ? wrap_width : img_width, "min-width": "0", "max-height": "none", "height": "auto"});
				} else {
					$img.css({"max-width": "none", "width": "auto", "min-width": min_width > img_width ? img_width : min_width, "max-height": "100%", "height": img_height > wrap_height ? wrap_height : img_height});
				}
				
				if (isIE) {
					var img_convert_direction = $wrap.css('flex-direction');
					if (img_convert_direction == "column") {
						if (img_height > wrap_height) {
							var overflow_side = (img_height-wrap_height)/2;
							$img.css({'margin-top': overflow_side*-1, 'margin-bottom': overflow_side*-1});
						}	
					} else {
						if (img_width > wrap_width) {
							var overflow_side = (img_width-wrap_width)/2;
							$img.css({'margin-left': overflow_side*-1, 'margin-right': overflow_side*-1});
						}
					}
				}
				
			}
		}

		var debounce = (function () {
			return function (fn, time) {
				var timer, func;
				func = function() {
					var args = [].slice.call(arguments, 0);
					window.clearTimeout(timer);
					timer = window.setTimeout(function () {
						window.requestAnimationFrame && window.requestAnimationFrame(function() {
							fn.apply(null, args);
						}) || fn.apply(null, args);
					}, time)
				};
				return func;
			}
		}());

		$(window).on('resize', debounce(imageType, 100));

		imageType();
	});
})(jQuery);