(function($) {
    $.fn.oneLineMenu = function(options) {

        var settings = $.extend({
            minWidth  : 640,
            lastClass : 'dropdown-wrap',
            left: -25,
            ulClass: 'dropdown-ul'
        }, options);

        return this.each(function() {
            var $this      = $(this),
                $li        = $this.find('>li'),
                destroyed  = false,
                windoWidth = $(window).width(); 

            $(window).resize(function(){
                windoWidth = $(window).width();

                if (windoWidth <= settings.minWidth) {
                    if (!destroyed) destroy();
                    return true;
                }

                destroy();
                init();
            });

            if (windoWidth > settings.minWidth) {
            	init();
            }

            function init() {
                var liWidth = 0,
                    ulWidth   = $this.outerWidth(),
                    copy, toHide;

                $li.each(function(i){
                    var itemWidth   = $(this).outerWidth(),
                        marginLeft  = parseFloat($(this).css('marginLeft')),
                        marginRight = parseFloat($(this).css('marginRight'));

                    itemWidth = itemWidth + marginLeft + marginRight;

                    liWidth += itemWidth;

                    var nextWidth       = 0,
                        nextMarginLeft  = 0,
                        nextMarginRight = 0,
                        from            = i;

                    if ($(this).next().get(0)) {
                        nextWidth       = $(this).next().outerWidth(),
                        nextMarginLeft  = parseFloat($(this).next().css('marginLeft')),
                        nextMarginRight = parseFloat($(this).next().css('marginRight'));
                        from += 1;
                    }

                    nextWidth = nextWidth + nextMarginLeft + nextMarginRight;

                    if (ulWidth < (liWidth + nextWidth)) {
                        copy   = $li.slice(0);
                        
                        toHide = copy.splice(from, ($li.length - from));

                        return false;
                    }
                });

                var res = {
                    copy : copy,
                    toHide : toHide
                };

                if (res.copy && res.toHide) {
                	$this.html(res.copy);

	                var $newLi = $('<li></li>').addClass(settings.lastClass).append('<ul></ul>');
	                $newLi.find('ul').append(res.toHide);
	                $this.append($newLi);
	                
	                var row = $this.find('>li'),
	                	rowWidth   = 0;
                        
                    row.each(function(){
	                	var eWidth   = $(this).outerWidth(),
                        	eMarginLeft  = parseFloat($(this).css('marginLeft')),
                        	eMarginRight = parseFloat($(this).css('marginRight'));
                        	
                        rowWidth += (eWidth + eMarginLeft + eMarginRight);
                        
                        if (rowWidth >= $this.width()) {
                        	var rowHide = $(this);
                        	
                        	if ($(this).hasClass(settings.lastClass)) {
                        		rowHide = $(this).prev();
                        	}
                        	
                        	rowHide.detach();
                        	
                        	$newLi.find('ul:first').prepend(rowHide);
                        }
                    });
	
	                var $newUl = $newLi.find('ul:first');
	
	                $this.on('click', '.' + settings.lastClass, function(){
	                	$newLi.toggleClass('active');
	                    $newUl.toggleClass(settings.ulClass).toggle();
	                    
	                    var ulWidth = $newUl.width(),
	                    	ulPosition = $newUl.offset().left ,
	                    	liWidth = $newLi.width();
	                    	
                    	if (windoWidth<ulWidth+ulPosition) {
                    		$newUl.css('left', -(ulWidth-liWidth));
                    	} else {
                    		$newUl.css('left', settings.left);
                    	}
	                });
	                
	                $(document).on('click touchstart', function(event){
			        	if ($(event.target).closest($newLi).length) return;
			        	
			        	$newUl.removeAttr('style');
			        	$newLi.removeClass('active');
			        });
                }

                destroyed = false;
            }

            function destroy() {
                $('.' + settings.lastClass).unbind('click');

                $this.html($li);

                destroyed = true;
            }
            
            setTimeout(function(){
            	$(window).trigger('resize');
            }, 100);
        });
    };
    
    $.fn.menuLP = function(options) {

        var settings = $.extend({
        	fixedClass: 'fixed-menu',
        	menuHeight: 0  // Высота фиксированного меню.
        }, options);
        
        return this.each(function(){
        	var $this = $(this),
        		$win = $(window),
        		$thisLinks = $this.find('a'),
        		$thisParent = $this.closest('[data-block-layout]'),
        		thisFixedMenu = $thisParent.data('fixed-menu'),
        		thisParentHeight = $thisParent.outerHeight(),
        		thisParentOffsetTop = $thisParent.offset().top,
        		thisScrollTop = thisParentHeight + thisParentOffsetTop,
        		activeClass = 'active',
        		k = true,
        		thisHash;
        		
        	$this.on('click.menuLP', 'a', function(event){
        		
        		var $this = $(this);
        		
        		thisHash = $this.attr('href');
        		
        		var hashFirstChar = thisHash.charAt(0),
        			thisHashBlock = $(thisHash);
        			
        		if ($('html, body').is(':animated')) return;
        		
        		if (hashFirstChar == '#' && thisHashBlock.length) {
        			event.preventDefault();

        			
        			var thisHashBlockOffsetTop = thisHashBlock.offset().top;
        			
        			if (thisFixedMenu) {
	        			$thisLinks.removeClass(activeClass);
	        			$this.addClass(activeClass);
	        			
	        			if (thisScrollTop < thisHashBlockOffsetTop) thisHashBlockOffsetTop -= settings.menuHeight;
        			}
        			
        			k = false;
        			
        			$('html, body').animate({
						scrollTop : thisHashBlockOffsetTop
					}, 600, function() {
						setTimeout(function() {k = true; history.pushState(null, null, thisHash);}, 100);
					});
        			
        		}
        	});

        	if (thisFixedMenu) {
    			var $doc = $(document),
    				docScrollTop = $doc.scrollTop(),
    				fixedElement = settings.fixedMenuElement,
    				getResult = $doc.height();
    				
	
                if (docScrollTop >= thisScrollTop) {
                	fixedElement ? $thisParent.find(fixedElement).addClass(settings.fixedClass) : $thisParent.addClass(settings.fixedClass);
                	
                	if (settings.parentFixed) {
                		$thisParent.addClass(settings.fixedClass);
                	}
                	
                	if (settings.afterFixed) {
                		settings.afterFixed();
                	}
                	
                } else {
                    fixedElement ? $thisParent.find(fixedElement).removeClass(settings.fixedClass) : $thisParent.removeClass(settings.fixedClass);
                    
                    if (settings.parentFixed) {
                		$thisParent.removeClass(settings.fixedClass);
                	}
                    
                    if (settings.afterNotFixed) {
                		settings.afterNotFixed();
                	}
                };
	            
        		$win.scroll(function() {
        			docScrollTop = $doc.scrollTop();
        			
        			if (docScrollTop >= thisScrollTop) {
        				fixedElement ? $thisParent.find(fixedElement).addClass(settings.fixedClass) : $thisParent.addClass(settings.fixedClass);
	                	
	                	if (settings.parentFixed) {
	                		$thisParent.addClass(settings.fixedClass);
	                	}
	                	
	                	if (settings.afterFixed) {
	                		settings.afterFixed();
	                	}
	                } else {
	                    fixedElement ? $thisParent.find(fixedElement).removeClass(settings.fixedClass) : $thisParent.removeClass(settings.fixedClass);
                 
	                	if (settings.parentFixed) {
	                		$thisParent.removeClass(settings.fixedClass);
	                	}
	                	
	                	if (settings.afterNotFixed) {
	                		settings.afterNotFixed();
	                	}
	                };
	                
					if (k) {
						for (var i = 0; i < $thisLinks.length; i++) {
							hash = $thisLinks.eq(i).attr('href');
							var hashFirstChar = hash.charAt(0),
								winScrollTop = $win.scrollTop();
							
							if (hash.split('#').length > 1 && hashFirstChar=='#') {
								var thisBlockOffsetTop = $(hash).offset().top - settings.menuHeight;
								if (winScrollTop >= thisBlockOffsetTop) {
									if (winScrollTop - thisBlockOffsetTop < getResult) {
										$thisLinks.removeClass(activeClass);
										$thisLinks.eq(i).addClass(activeClass);
										
										getResult = winScrollTop - thisBlockOffsetTop;
									}
								};
							};
						};
						getResult = $doc.height();
					}
                });
        	}
        });
    };
})(jQuery);