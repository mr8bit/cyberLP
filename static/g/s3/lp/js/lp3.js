;(function($) {

	lp_init = function (block_wrapper) {
                var iOs = /iPhone|iPad|iPod/i.test(navigator.userAgent),
                IOs = /iPhone|iPad|iPod/i.test(navigator.userAgent),
                	clickEvent = iOs ? 'touchend' : 'click';
                	
                block_wrapper.find('table').wrap('<div class="table-wrapper"></div>');	
		setTimeout(function() {
            block_wrapper.find('[data-api-type=popup-form]').on(clickEvent, function(e) {
                var $this = $(this);

                if (myo.show) {
                    myo.show({
                        json: $this.data('api-url'),
                        onContentLoad: function(w) {
                            s3LP.initForms($(this.bodyDiv));
                        },
                        afterOpen: function() {
                        	$('html').addClass('overflowHidden');
                        	if (iOs) {
                        		$('body').addClass('overflowHidden')
                        	}
                        },
                        afterClose: function() {
                            $('html, body').removeClass('overflowHidden');
                        }
                    });
                } else if (myo.open) {
                    myo.open({
                        json: $this.data('api-url'),
                        onLoad: function(w) {
                            s3LP.initForms($(this.bodyDiv));
                        },
                        afterOpen: function() {
                        	$('html').addClass('overflowHidden');
                        	if (iOs) {
                        		$('body').addClass('overflowHidden')
                        	}
                        },
                        afterClose: function() {
                            $('html, body').removeClass('overflowHidden');
                        }
                    });
                }
                e.preventDefault();
            });
        }, 200);
        
        block_wrapper.find('.tariff-blocks_wrapper .block .button').goodNameForForm({
			parent: '.block',
			title: '.tariff-name',
			price: '.tariff-rate'
		});
		
		(function(){
			var headerFix = block_wrapper.find('.header--theme5[data-fixed-menu="true"]');
			
			if (headerFix.length) {
				headerFix.each(function(){
					var $this = $(this),
						thisHeight = $this.outerHeight(),
						thisPositionTop = $this.offset().top,
						thisButton = $this.find('.menu-button'),
						thisButtonFixClass = 'fixed-button',
						windowScrollTop = $(window).scrollTop();
					
					$(window).on('resize', function(){
						thisHeight = $this.outerHeight();
						thisPositionTop = $this.offset().top;
						windowScrollTop = $(window).scrollTop();
					}).on('scroll', function(){
						windowScrollTop = $(window).scrollTop();
						windowScrollTop > thisPositionTop + thisHeight ? thisButton.addClass(thisButtonFixClass) : thisButton.removeClass(thisButtonFixClass);
					});
					
					windowScrollTop > thisPositionTop + thisHeight ? thisButton.addClass(thisButtonFixClass) : thisButton.removeClass(thisButtonFixClass);
				});
			}
			
			block_wrapper.find('.top-menu').on('click', 'a', function(){
				$(this).closest('.menu-fixed').removeClass('opened');
				$('html').removeClass('overflowHidden');
			});
		})();
		
		block_wrapper.find('.products--theme5 .button-wrap a').on('click', function(){
			var $this = $(this),
				$thisTitle = $this.parents('.text-part').find('.title').text(),
				interval;
			
			interval = setInterval(function(){
				var $target = $('.popover-body').find('.input-product_name input[type=text]');
				
				if ($target.length) {
					$target.val($thisTitle);
					clearInterval(interval);
				}
			}, 100);
		});
		
		(function(){
	    	var linkTop = block_wrapper.find('.link-top')
				documentScroll = $(document).scrollTop();
				
			documentScroll>200? linkTop.addClass('show'): linkTop.removeClass('show');
			
			$(document).on('scroll', function(){
				var nowScroll = $(document).scrollTop();
				
				nowScroll>200? linkTop.addClass('show'):linkTop.removeClass('show');
			});
			linkTop.on('click', function(e){
				e.preventDefault();
				$('html, body').animate({scrollTop: 0});
			});
	    })();
    	
    	block_wrapper.find('.one-good-wrapper .good-desc-block .buy-good').on('click', function(){
			var $this = $(this),
				$thisTitle = $this.parents('.good-desc-block').find('.good-title').text(),
				interval;
			
			interval = setInterval(function(){
				var $target = $('.popover-body').find('.input-product_name input[type=text]');
				
				if ($target.length) {
					$target.val($thisTitle);
					clearInterval(interval);
				}
			}, 100);
		});
		
		block_wrapper.find('.multy_blocks .service-item').on('click', function(){
			var $this = $(this),
				$thisTitle = $this.find('.service-title').text(),
				interval;
			interval = setInterval(function(){
				var $target = $('.popover-body').find('.input-product_name input[type=text]');
				if ($target.length) {
					$target.val($thisTitle);
					clearInterval(interval);
				}
			}, 100);
		});
		
		(function(){
			var sertSlider = block_wrapper.find('.sertificats-slider-two');
		
			if (sertSlider.length) {
				sertSlider.each(function(){
					var $this = $(this),
						thisSlidesLength = $this.find('.item').length;
		
					if (thisSlidesLength > 1) {
						$this.owlCarousel({
							items: 2,
							loop: true,
							nav: true,
							dots: false,
							responsive: {
								0: {
									items: 1.9,
									margin: 20,
									center: true
								},
								440: {
									items: 2.45,
									margin: 16,
									center: true
								},
								600 : {
									items: 3,
									margin: 16
								},
								720 : {
							        items: 4,
							        margin: 16
							    },
							    940 : {
							    	items: 5,
							        margin: 16
							    }
							}
							
						});
					}
				});
			}
		})();
		
		block_wrapper.find('.one-good-icon__list .one-good-icon__buy').on('click', function(){
			var $this = $(this),
				$thisTitle = $this.parents('.one_good_wrap').find('.one-good-icon__title').text(),
				interval;
			
			interval = setInterval(function(){
				var $target = $('.popover-body').find('.input-product_name input[type=text]');
				
				if ($target.length) {
					$target.val($thisTitle);
					clearInterval(interval);
				}
			}, 100);
		});
		
		block_wrapper.find('.one-good-horizontal__wrapper .buy-good').on('click', function(){
			var $this = $(this),
				$thisTitle = $this.parents('.one-good-horizontal__wrapper').find('.good-title').text(),
				interval;
				
			interval = setInterval(function(){
				var $target = $('.popover-body').find('.input-product_name input[type=text]');
				
				if ($target.length) {
					$target.val($thisTitle);
					clearInterval(interval);
				}
			}, 100);
		});
		
	    block_wrapper.on(iOs ? "touchend" : "click", '.faq_ver2 .button_read' , function(){
	      $(this).removeClass('active');
	      $(this).siblings('.button_hide').addClass('active');
	      $(this).parent().prev('.faq-item_text').slideToggle(200);
	      $(this).closest('.faq-item').addClass('shadow');
	    });
	
	
	    block_wrapper.on(iOs ? "touchend" : "click", '.faq_ver2 .button_hide' , function(){
	      $(this).removeClass('active');
	      $(this).siblings('.button_read').addClass('active');
	      $(this).parent().prev('.faq-item_text').slideToggle(200);
	      $(this).closest('.faq-item').removeClass('shadow');
	    });
	    
	    
	        /*one-good-form BEGIN*/

		
		   var slickSlider = block_wrapper.find('.one-good-form_productSlider'),
		        slickNav = block_wrapper.find('.one-good-form_pager-wrap');
		
		
		    slickSlider.slick({
		      slidesToShow: 1,
		      slidesToScroll: 1,
		      arrows: false,
		      fade: true,
		      asNavFor: slickNav
		    });
		    slickNav.slick({
		      infinite: true,
		      slidesToShow: 3,
		      slidesToScroll: 1,
		      asNavFor: slickSlider,
		      dots: false,
		      autoplay:false,
		      autoplaySpeed:1500,
		      centerMode: false,
		      vertical: true,
		      focusOnSelect: true,
		      responsive: [
		        {
		          breakpoint: 940,
		          settings: {
		            slidesToShow: 4,
		            vertical: true,
		            centerMode: false
		          }
		        },
		
		        {
		          breakpoint: 750,
		          settings: {
		            vertical: false,
		            slidesToShow: 4,
		            centerMode: false
		
		          }
		        },
		        {
		          breakpoint: 721,
		          settings: {
		            slidesToShow: 3,
		            vertical: false,
		            centerMode: false,
		            infinite: true
		          }
		        },
		        {
		          breakpoint: 450,
		          settings: {
		            slidesToShow: 4,
		            vertical: false,
		            centerMode: false,
		            infinite: true,
		          }
		        },
		        {
		          breakpoint: 400,
		          settings: {
		            slidesToShow: 3,
		            slidesToScroll: 1,
		            vertical: false,
		            infinite: true,
		
		          }
		        }
		
		      ]
		    });
		
		    block_wrapper.find('.one-good-form_inner .button').on(iOs ? "touchend" : "click", function(){
		      $(this).closest('.one-good-form_inner').find('.tpl-anketa-popup').addClass('expand');
		    });
		
		    block_wrapper.find(".one-good-form_inner .tpl-anketa_close").on(iOs ? "touchend" : "click", function(){
		     $(this).closest(".one-good-form_inner").find(".tpl-anketa-popup").removeClass("expand");
		    });
		
		    block_wrapper.find('.one-good-form2_inner .button').on(iOs ? "touchend" : "click", function(){
		      $(this).closest('.one-good-form2_inner').find('.tpl-anketa-popup').addClass('expand');
		    });
		
		    block_wrapper.find(".one-good-form2_inner .tpl-anketa_close").on(iOs ? "touchend" : "click", function(){
		     $(this).closest(".one-good-form2_inner").find(".tpl-anketa-popup").removeClass("expand");
		    });
		
		    $(document).on(iOs ? "touchend" : "click", function(formClose) {
		      if ($(formClose.target).closest('.tpl-anketa_wrap').length || $(formClose.target).closest('.button').length) {
		        return
		      } else {
		        $('.tpl-anketa-popup').removeClass('expand');
		      }
		    });
		
		    $(this).keydown(function(eventObject){
		        if (eventObject.which == 27)
		          $(".tpl-anketa-popup").removeClass("expand");
		    });

		
		    /*one-good-form END*/

	    block_wrapper.find(".horizontal-gallery").lightGallery({
			thumbnail: false,
			download: false,
			loop: false,
			selector: '.horizontal-gallery .picture'
		});
		
		block_wrapper.find('.vertical-gallery').lightGallery({
			thumbnail: false,
			download: false,
			loop: false,
			selector: '.vertical-gallery a' 
		});
	    
	    block_wrapper.find('.good-img').lightGallery({
		  thumbnail: false,
		  download: false,
		  loop: false,
		  selector: '.good-img a',
		  counter: false 
		});
		
		block_wrapper.find('.one-good-icon__img').lightGallery({
		  thumbnail: false,
		  download: false,
		  loop: false,
		  selector: '.one-good-icon__img a',
		  counter: false 
		});
		
		block_wrapper.find('.pic-part').lightGallery({
		  thumbnail: false,
		  download: false,
		  loop: false,
		  selector: '.pic-part a',
		  counter: false 
		});
		
		block_wrapper.find('.roundpic_inner').lightGallery({
		  thumbnail: false,
		  download: false,
		  loop: false,
		  selector: '.roundpic-part a'
		});
		
		block_wrapper.find(".popup_video_block_wrap").lightGallery({
		  thumbnail: false,
		  download: false,
		  loop: false,
		  zoom: false,
		  actualSize: false,
		  selector: '.button',
		  youtubePlayerParams: {
		        autoplay: 0,
		        modestbranding: 1,
		        showinfo: 0,
		        rel: 0
		    },
		    vimeoPlayerParams: {
		        byline : 0,
		        portrait : 0,
		        color : 'A90707'     
		    }
		});
		
		block_wrapper.find(".service-item").lightGallery({
			thumbnail: false,
			download: false,
			loop: false,
			selector: '.service-img a',
		});
		
		
		block_wrapper.find(".square-photo-blocks_inner").lightGallery({
			thumbnail: false,
			selector: '.square-photo-blocks_picture'
		});
		
		    // Gallery with thumbnails slider begin
	
	(function(){

		var gallerySlider = block_wrapper.find('.gallery-with-preview');

		if (gallerySlider.length) {

			gallerySlider.each(function(){

				var $this = $(this),
					$pictureSlider = $this.find('.gallery-with-preview_Slider'),
					pictureSliderAutoplay = $pictureSlider.data('autoplay'),
					$pagers = $this.find('.gallery-with-preview_Pager'),
					$pagersChild = $pagers.find('.gallery-with-preview_pagerElement');
					
				resizeController([0, 950], function() {
					$pagersChild.unwrap();
				}); 

				var picSlider = $pictureSlider.bxSlider({
					controls: false,
					touchEnabled: false,
					pager: false,
					auto: pictureSliderAutoplay ? true : false,
					mode: 'fade'
				});


				if ($pagers.find('div').length > 1) {
					$pagers.owlCarousel({
						items:1,
						loop: true,
						nav: true,
						dots: false,
						navSpeed: 500
					});
				}
				
				resizeController([601, 950], function() {
				
				  $pagers.owlCarousel({
					items:4,
					loop: true,
					nav: true,
					dots: false,
					navSpeed: 500
				  });
				
				});
				
				resizeController([0, 600], function() {
				
				  $pagers.owlCarousel({
					items:3,
					loop: true,
					nav: true,
					dots: false,
					navSpeed: 500
				  });
				
				});
				
				block_wrapper.find(".gallery-with-preview_slider-wrap").lightGallery({
				  thumbnail: false,
				  download: true,
				  loop: true,
				  selector: '.gallery-with-preview_img a'
				}); 
				
				resizeController([951, Infinity], function() {

					$pagersChild.on(IOs ? "touchend" : "click", function(event){
						event.preventDefault();
						var $this = $(this),
							thisDataIndex = $this.data('slide-index');

						$pagersChild.removeClass('shadow');
						$this.addClass('shadow');
						picSlider.goToSlide(thisDataIndex);
					});

				});

				resizeController([0, 950], function() {

					$pagersChild.on(IOs ? "touchend" : "click", function(event){
						event.preventDefault();
						var $this = $(this),
							thisDataIndex = $this.data('slide-index');

						$pagersChild.removeClass('shadow');
						$this.addClass('shadow'); 
						picSlider.goToSlide(thisDataIndex);
					});
				});
			});
		}
	
	})();
  
	// Gallery with thumbnails slider end
    
		/*TABS with slider BEGIN*/
  
         block_wrapper.find(".tabs-block_wrap_box").lightGallery({
            thumbnail: false,
            download: true,
            loop: true,
            selector: '.box-inner .img_wrap a'
        });
        
            
    
        $(function () {
            var tabsWrapWidth = block_wrapper.find('.tabs-block_wrap_tabs').width(),
                tabsWidth = 0;
                tabsCountTotal = 0;
                tabAverage = 0;
                tabsCountInWrap = 0;
    
            block_wrapper.find(".tabs-block_wrap_tabs li").each(function(){
                tabsCountTotal+=1;
                tabsWidth+=$(this).outerWidth();
            });
            tabAverage = tabsWidth/tabsCountTotal;
            tabsCountInWrap = Math.floor(tabsWrapWidth/tabAverage);
    
            if (tabsWrapWidth <= tabsWidth) {
                setTimeout(function () {
                    block_wrapper.find('.tabs-block_wrap_tabs').slick({
                        infinite: false,
                        variableWidth: true,
                        slidesToShow: tabsCountInWrap
                    });
                },500);
            }
        });
    
    	/*TABS with slider END*/
		
		//Contacts with map, text and image BEGIN
	
	      block_wrapper.find(".multy_offices_map_button").on(iOs ? "touchend" : "click", function(){
	        block_wrapper.find(".multy_offices_map-wrap").addClass("expand");
	      });
	  
	      block_wrapper.find(".multy_offices_map_close").on(iOs ? "touchend" : "click", function(){
	        block_wrapper.find(".multy_offices_map-wrap").removeClass("expand");
	      });
	  
	      $(this).keydown(function(eventObject){
	          if (eventObject.which == 27)
	            block_wrapper.find(".multy_offices_map-wrap").removeClass("expand");
	      });
	  
	      block_wrapper.find(".single-office_inner").lightGallery({
	        thumbnail: false,
	        download: true,
	        loop: true,
	        selector: '.single-office_picture'
	      }); 
	  
	  //Contacts with map, text and image END
		
		
		resizeController([500, Infinity], function() {
		  setTimeout(function() {
		    var mainDivs = block_wrapper.find(".multy_blocks_block-height"); 
		    var maxHeight = 0;
		    for (var i = 0; i < mainDivs.length; ++i) {
		      if (maxHeight < $(mainDivs[i]).height()) { 
		        maxHeight = $(mainDivs[i]).height(); 
		      }
		    }
		    for (var i = 0; i < mainDivs.length; ++i) {
		      $(mainDivs[i]).height(maxHeight);
		    }
		  }, 250);
		});
	    
	    resizeController([650, Infinity], function() {
			setTimeout(function() {
				var mainDivs = block_wrapper.find(".tariff-blocks_block-height"); 
				var maxHeight = 0;
				for (var i = 0; i < mainDivs.length; ++i) {
					if (maxHeight < $(mainDivs[i]).height()) { 
					maxHeight = $(mainDivs[i]).height(); 
				}
				}
				for (var i = 0; i < mainDivs.length; ++i) {
					$(mainDivs[i]).height(maxHeight); 
				}
			}, 100);
		});
		
		(function(){
        	var reviewsSlider = block_wrapper.find('.reviews-and-feedback_inner');
        	
        	if (reviewsSlider) {
        		reviewsSlider.each(function(){
        			var $this = $(this),
	    				thisSlidesLength = $this.find('> div').length,
						thisAutoplay = $this.data('autoplay'),
						thisSpeed = $this.data('speed'),
						thisPause = $this.data('pause');
						
					if (thisSlidesLength > 1) {
						$this.owlCarousel({
				            items: 1,
				            loop: true,
				            nav: true,
				            dots: false,
				            smartSpeed: thisSpeed ? thisSpeed : 600,
							autoplay: thisAutoplay ? true : false,
							autoplayTimeout: thisPause ? thisPause : 5000,
				            navSpeed: 500
				        });
					}
        		});
        	}
        })();
	    
		
		block_wrapper.find('.products--theme9 .button a').on('click', function(){
			var $this = $(this),
				$thisTitle = $this.parents('.product-inner').find('.name').text(),
				interval;
				
			interval = setInterval(function(){
				var $target = $('.popover-body').find('.input-product_name input[type=text]');
				
				if ($target.length) {
					$target.val($thisTitle);
					clearInterval(interval);
				}
			}, 100);
		});
		
		block_wrapper.find('.products-with-pic--theme9 .button a').on('click', function(){
			var $this = $(this),
				$thisTitle = $this.parents('.bottom-part').find('.title').text(),
				interval;
				
			interval = setInterval(function(){
				var $target = $('.popover-body').find('.input-product_name input[type=text]');
				
				if ($target.length) {
					$target.val($thisTitle);
					clearInterval(interval);
				}
			}, 100);
		});
		
		block_wrapper.find('.only-one-product .button a').on('click', function(){
			var $this = $(this),
				$thisTitle = $this.parents('.text-part').find('.title').text(),
				interval;
				
			interval = setInterval(function(){
				var $target = $('.popover-body').find('.input-product_name input[type=text]');
				
				if ($target.length) {
					$target.val($thisTitle);
					clearInterval(interval);
				}
			}, 100);
		});

		if (block_wrapper.find(".header--theme5 .top-menu li").length<1) {
			block_wrapper.find(".header--theme5 .top-menu").hide();
			block_wrapper.find(".header--theme5 .menu-button").hide();
		};
		
		(function(){
			var menuBlock = block_wrapper.find('.top-menu');
			
			menuBlock.oneLineMenu({
				minWidth  : 750
			}).menuLP({
				menuHeight: 60,
				fixedClass: 'fix-menu',
		        fixedMenuElement: '.top-menu-wrapper'
			});
			
			menuBlock.on('click', 'a', function(){
				$(this).closest('[data-block-layout]').find('.menu-fixed').removeClass('opened');
				$('html').removeClass('overflowHidden');
			});
		})();
		
		block_wrapper.find('.arrow-down').on(iOs ? "touchend" : "click", function(){
       		var blockPosition = $(this).closest('.sale-block-two, .sale-block-three').offset().top,
    		blockHeight = $(this).closest('.sale-block-wrapper').height(),
    		newScroll = blockPosition + blockHeight;
                
    		$('html, body').animate({
    		scrollTop: newScroll
    		}, 850);
            
		});

		setTimeout(function(){
			block_wrapper.find('.products--theme5 .text-part').equalHeightResponsive();
		},50);

		block_wrapper.find('.header--theme5 .top-menu').menuLP({menuHeight: 60});
		
		block_wrapper.find('.menu-button').on(iOs?'touchend':'click', function(){
			$(this).closest('[id^="_lp_block"]').find('.menu-fixed').addClass('opened').addClass('animit');
			$('html').addClass('overflowHidden');
		});

		block_wrapper.find('.gallery-inline').lightGallery({
			selector: '.item .pic a',
			thumbnail: false,
			download: false
		});		

		block_wrapper.find('.menu-close').on('click', function(event){
			block_wrapper.find('.menu-fixed').removeClass('opened');
			$('html').removeClass('overflowHidden');
		});
		
		$('body').on('click', function(event){
			if ($(event.target).closest('.menu-button, .menu-fixed, .popover-body').length) return;
			block_wrapper.find('.menu-fixed').removeClass('opened');
			$('html').removeClass('overflowHidden');
		});

		block_wrapper.find('.header--theme5 .top-menu li a').on('click', function(){
			block_wrapper.find('.menu-fixed').removeClass('opened');
			$('html').removeClass('overflowHidden');
		});

		var timerDays,
			timerHours,
			$htmlLang = $('html').attr('lang'),
			timerMinutes,
			timerSeconds;

		if ($htmlLang=='en') {
			timerDays = 'days';
			timerHours = 'hours';
			timerMinutes = 'minutes';
			timerSeconds = 'seconds'
		} else if ($htmlLang=='de') {
			timerDays = 'Tage';
			timerHours = 'Stunden';
			timerMinutes = 'Minuten';
			timerSeconds = 'Sekunden'
		} else {
			timerDays = 'дней';
			timerHours = 'часов';
			timerMinutes = 'минут';
			timerSeconds = 'секунд'
		}

		block_wrapper.find('.countdown3').timer({
			format_in : "%d.%M.%y %h:%m",
			format_out : '<div class="item"><div class="time">%d</div><ins>' + timerDays + '</ins></div><div class="item"><div class="time">%h</div><ins>' + timerHours + '</ins></div><div class="item"><div class="time">%m</div><ins>' + timerMinutes + '</ins></div><div class="item"><div class="time">%s</div><ins>' + timerSeconds + '</ins></div>',            
			update_time: 1000,
			onEnd: function() {
				$(this).hide();
				$(this).next().show();
			}
		});

		block_wrapper.find('.countdown2').timer({
			format_in : "%d.%M.%y %h:%m",
			format_out : '<div class="item"><div class="time">%d</div><ins>' + timerDays + '</ins></div><div class="item"><div class="time">%h</div><ins>' + timerHours + '</ins></div><div class="item"><div class="time">%m</div><ins>' + timerMinutes + '</ins></div><div class="item"><div class="time">%s</div><ins>' + timerSeconds + '</ins></div>',            
			update_time: 1000,
			onEnd: function() {
				$(this).hide();
				$(this).next().show();
				$(this).parent().next('.popup-button').hide();
			}
		});

		block_wrapper.find('.show-map').on('click', function(event){
			event.preventDefault();
			$(this).next('.map-inner').addClass('fixed');
			$('html').addClass('overflowHidden');
		});
		
		block_wrapper.find('.all-map a').on('click', function(event){
			event.preventDefault();
			$(this).closest('.map-with-contacts-wrapper').find('.map-fixed').addClass('fixed');
			$('html').addClass('overflowHidden');
			$(window).trigger('resize');
		});
		
		block_wrapper.find('.close-map').on('click', function(event){
			block_wrapper.find('.map-inner').removeClass('fixed');
			$('html').removeClass('overflowHidden');
		});
		
		block_wrapper.find('.close-map2').on('click', function(event){
			block_wrapper.find('.map-fixed').removeClass('fixed');
			$('html').removeClass('overflowHidden');
		});
		
		block_wrapper.find('.header--theme5 .top-menu').on('click', 'a', function(){
			$(this).closest('.top-menu-inner').find('.menu-fixed').removeClass('opened');
			$('html').removeClass('overflowHidden');
		});
		
		(function(){
			var reviewsSlider = block_wrapper.find('.reviews-slider-two');
			if (reviewsSlider.length) {
				reviewsSlider.each(function(){
				var $this = $(this),
					thisSlidesCount = $this.find('.item').length;
					
					if (thisSlidesCount > 1) {
						$this.owlCarousel({
							items: 2,
							loop: true,
							nav: true,
							dots: false,
							responsive: {
								0: {
									items: 1.17,
									margin: 7,
									center: true
								},
								440: {
									items: 1.29,
									margin: 16,
									center: true
								},
								600 : {
									items: 1.41,
									margin: 16,
									center: true
								},
								720 : {
							        items: 2,
							        margin: 16
							    }
							}
							
						});
					}
				});
			}
		})();

		destroySliders();
	
		$(window).on('resize', function(){
			destroySliders();
		});
		function destroySliders(){
			var winWidth = $(window).width();
			
			if (winWidth > 959) {
				block_wrapper.find('.sertificats-slider, .reviews-slider, .clients-slider, .products-slider').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
				block_wrapper.find('.sertificats-slider, .reviews-slider, .clients-slider, .products-slider').find('.owl-stage-outer').children().unwrap();
			} else {
				block_wrapper.find('.sertificats-slider').owlCarousel({
					items: 2,
					loop: true,
					nav: true,
					dots: false,
					responsive: {
						0: {
							items: 1.9,
							margin: 20,
							center: true
						},
						440: {
							items: 2.45,
							margin: 16,
							center: true
						},
						600 : {
							items: 3,
							margin: 16
						},
						720 : {
					        items: 4,
					        margin: 16
					    }
					}
					
				});
				
				block_wrapper.find('.reviews-slider').owlCarousel({
					items: 2,
					loop: true,
					nav: true,
					dots: false,
					responsive: {
						0: {
							items: 1.17,
							margin: 7,
							center: true
						},
						440: {
							items: 1.29,
							margin: 16,
							center: true
						},
						600 : {
							items: 1.41,
							margin: 16,
							center: true
						},
						720 : {
					        items: 2,
					        margin: 16
					    }
					}
					
				});
				block_wrapper.find('.clients-slider').owlCarousel({
					items: 2,
					loop: true,
					nav: true,
					dots: false,
					responsive: {
						0: {
							items: 1,
							margin: 0
						},
						440: {
							items: 2,
							margin: 20,
						},
						720 : {
					        items: 3,
					        margin: 30
					    }
					}
					
				});
				block_wrapper.find('.products-slider').owlCarousel({
					items: 2,
					loop: true,
					nav: true,
					dots: false,
					autoWidth: true,
					center: true,
					responsive: {
						0: {
							margin: 15
						},
						440: {
							margin: 20
						},
						700: {
							margin: 16,
							center: false
						}
					}
				});
			}

			block_wrapper.find('.our-works-slider').lightGallery({
				selector: '.pic a',
				thumbnail: false,
				download: false
			});
			
			if (winWidth > 749) {
				block_wrapper.find('.our-works-slider').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
				block_wrapper.find('.our-works-slider').find('.owl-stage-outer').children().unwrap();

			} else {

				block_wrapper.find('.our-works-slider').owlCarousel({
					items: 2,
					loop: true,
					nav: true,
					dots: false,
					center: true,
					responsive: {
						0: {
							items: 1.17,
							margin: 9,
							center: true
						},
						479 : {
							items: 1.28,
							margin: 24
						},
						639 : {
					        items: 1.69,
					        margin: 24
					    }
					}
					
				});
			}
		}
		
		function blocksMatchHeight(arr) {
			for (var i = 0; i< arr.length; i++) {
				block_wrapper.find(arr[i]).matchHeight();
			}
		}
		
		if(!(/MSIE 10|rv:11.0/i.test(navigator.userAgent))) {
			blocksMatchHeight(['.products-with-pic--theme9 .product .pic', '.products-with-pic--theme9 .product .bottom-part .title', '.products-with-pic--theme9 .product .bottom-part .text', '.txt_bl3_wrapper_txt_item_text']);
		}
	}

	function coords(str) {
		return str.split(',');
	}


	function init(options) {
		options.center = coords(options.center);

		$.each(options.data, function(key, item) {
			item.coords = coords(item.coords);
		});

		if (options.type == 'google') {

			$(window).resize(function(){
				google.maps.event.trigger(mjsMap, 'resize');

				$('#' + options.id).parent().find('.close-map').on('click', function(event){
					google.maps.event.trigger(mjsMap, 'resize');
				});

				$('#' + options.id).parent().find('.close-map2').on('click', function(event){
					google.maps.event.trigger(mjsMap, 'resize');
				});
			});

			$('.all-map a').on('click', function(event){
				setTimeout(function(){
					google.maps.event.trigger(mjsMap, 'resize');
				}, 100);
			});

			//google.maps.event.addDomListener(window, 'load', function() {

			var map = new google.maps.Map(document.getElementById(options.id), {
				zoom: parseInt(options.zoom),
				center: new google.maps.LatLng(options.center[0], options.center[1]),
				scrollwheel: false
			});

			$.each(options.data, function(key, item) {


				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(item.coords[0], item.coords[1]),
					map: map,
					title: item.name
				});

				var infowindow = new google.maps.InfoWindow({
					content: '<div class="baloon-content" style="padding: 10px 20px">' +
					'<h3>' + item.name + '</h3>' +
					item.desc +
					'</div>'
				});

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);
				});

			});
			//});

		} else {

			function ymapsInit() {
				ymaps.ready(function() {

					var map = new ymaps.Map(options.id, {
						center: options.center,
						zoom: options.zoom,
						behaviors: ['drag', 'rightMouseButtonMagnifier'],
					});

					map.controls.add(
						new ymaps.control.ZoomControl()
					);

					$(window).resize(function(){
						map.container.fitToViewport();
						
						$('#' + options.id).parent().find('.close-map').on('click', function(event){
							map.container.fitToViewport();
						});
						
						$('#' + options.id).parent().find('.close-map2').on('click', function(event){
							map.container.fitToViewport();
						});
					});

					var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
						'<div class="baloon-content">' +
						'<h3>$[properties.name]</h3>' +
						'$[properties.desc]' +
						'</div>'
					);

					var myCollection = new ymaps.GeoObjectCollection();

					$.each(options.data, function(key, item) {
						myCollection.add(new ymaps.Placemark(
							item.coords,
							item,
							{balloonContentLayout: MyBalloonContentLayoutClass}
						));
					});

					map.geoObjects.add(myCollection);

				});
			}

			if (typeof(window['google']) == "undefined") {
				$.getScript( "http://api-maps.yandex.ru/2.0-stable/?load=package.full&lang=ru" ).done(function( script, textStatus ) {
					ymapsInit();
				});
			} else {
				ymapsInit();
			}

		}

	}

	window.mjsMap = init;

})(jQuery);