(function ($) {
$(document).ready(function() {

	$('img').each(function () {
		if ($(this).attr('data-src')) {
			$(this).addClass('lazyload');
		}
	});
	lazyload();

});
})(jQuery);
