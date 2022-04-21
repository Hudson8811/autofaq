$(document).ready(function() {
	var sidebar = $('.sidebar');
	var burger = $('.sidebar__burger-wrapper');
	var subMenu = $('.sidebar__menu-inner');
	var hoveredOuter = $('.sidebar__menu > li > a');

	burger.click(function () {
		if (!sidebar.hasClass('open')) {
			sidebar.addClass('open');
			$('body').addClass('body-scroll-lock');
		} else {
			sidebar.removeClass('open');
			subMenu.removeClass('active');
			$('body').removeClass('body-scroll-lock');
		}
	});

	if (window.matchMedia('(min-width: 1024px)').matches) {
		hoveredOuter.hover(
			function () {
				hoveredOuter.next().removeClass('active');
				$(this).next().addClass('active');
			},
			function () {}
		);
	}
});