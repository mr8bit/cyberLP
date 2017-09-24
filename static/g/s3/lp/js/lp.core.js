var s3LP = {
	init: function(options) {
		if (options){
			this.is_cms = options.is_cms ? true : false;
		}
		this.initForms();

		lp_init($('body'));
	},
	initForms: function(parent) {
		var self = this;
		if (!parent) parent = document;
		if (!$(parent).is('[data-api-url][data-api-type=form]')) {
			parent = $(parent).find('[data-api-url][data-api-type=form]');
		}

		$(parent).each(function() {
			var obj = $(this);
			var form = obj.is("form") ? obj : obj.find("form");

			if (self.is_cms) {
				form.attr('title', JS_LP_FORM_NOTE).tooltip();
				form.submit(function() {
					return false;
				});
			} else {
				form.submit(function(event) {
					$.post(obj.data('api-url'), form.serialize(), function(response) {
						if (response.result.success && response.result.redirect_url) {
							document.location.href = response.result.redirect_url.replace(/&amp;/g, '&');
						} else {
							if (response.result.html) {

								var replacement = $(response.result.html.replace(/[\r\n]/g, '').replace(/<script[^>]*>.*?<\/script>/g, ''));

								if (!$(replacement).is('[data-api-url][data-api-type=form]')) {
									replacement = $(replacement).find('[data-api-url][data-api-type=form]');
								}
								
								obj.replaceWith(replacement);
								
								var inputMask = $('input[data-mask="mask"]');
								if (inputMask.length) {
									$.getScript('/g/libs/jquery-maskedinput/1.3.1//jquery.maskedinput.min.js', function() {
										inputMask.mask("+7 (999) 999-99-99");
									});
								}
								
								var inputDates = $('input[data-calendar="calendar"], input[data-calendar="calendar-interval"]');
								
								if (inputDates.length) {
									$.getScript('/g/s3/lp/js//datepicker.min.js', function() {
										var inputCalender = $('input[data-calendar="calendar"]'),
											inputCalenderInterval = $('input[data-calendar="calendar-interval"]');
											
										inputCalender.datepicker({
											minDate: new Date(),
											autoClose: true
										});
										
										inputCalenderInterval.datepicker({
											minDate: new Date(),
											range: true,
											multipleDatesSeparator: ' - '
										});
									});
								}
								
								var $captcha = replacement.find('input[name=_cn]');
								if ($captcha.length) {
									$.getScript('http://captcha.oml.ru/static/captcha.js?2', function() {
										var $d = replacement.find("[id^=s3_captcha_cn]");
										mgCaptcha.draw("/my/s3/captcha/get.php", ($d.length ? $d.get(0) : null));
									});
								}
								
								self.initForms(replacement);
							}
						}
					});
					event.preventDefault();
				});
			}
		})
	}
}