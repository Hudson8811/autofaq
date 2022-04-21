$(document).ready(function() {
	var header = $('.header');
	var headerOffset = header.offset().top;
	var headerHeight = header.outerHeight();
	var scroll = $(window).scrollTop();
	var isScroll = false;
	var isRelativePos = !!header.hasClass('header--relative');

	/**
	 * Фиксированный хэдер
	 */
	$(window).on('scroll', function () {
		if (window.matchMedia('(min-width: 1200px)').matches) {
			scroll = $(window).scrollTop();

			if (scroll >= headerOffset + headerHeight) {
				isScroll = true;

				headerHeight = isScroll ? header.outerHeight() : null;
				header.addClass('header--fixed header--theme-dark');

				if (!header.hasClass('is-fixed')) {
					header.css({'top': -headerHeight + 'px', 'transform': 'translateY(' + headerHeight + 'px)'}).addClass('is-fixed');

					if (isRelativePos) {
						$('body').css('padding-top', headerHeight + 'px');
						header.addClass('header--theme-dark');
					}
				}
			} else {
				isScroll = false;
				header.removeClass('header--fixed header--theme-dark' + ' is-fixed').removeAttr('style');
				$('body').css('padding-top', 0);

				if (isRelativePos) {
					header.addClass('header--theme-dark');
				}
			}
		}
	});
});