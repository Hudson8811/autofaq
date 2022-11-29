(function ($) {
	$(document).ready(function() {
		const benefits = $('.benefits__progress');

		if (benefits && benefits.length > 0) {
			if (window.matchMedia('(min-width: 1280px)').matches) {
				const benefitsAccordionItem = $('.benefits__accordion-item');
				const benefitsBtn = $('.benefits__btn');
				const circle = new ProgressBar.Circle('.benefits__progress', {
					color: '#ffffff',
					trailColor: '#cfcfcf',
					strokeWidth: 1,
					trailWidth: 1
				});

				/**
				 * Аккордеон для блока Benefits
				 */
				if (window.matchMedia('(min-width: 1280px)').matches) {
					benefitsAccordionItem.click(function () {
						if (!$(this).hasClass('active')) {
							benefitsAccordionItem.removeClass('active');
							benefitsAccordionItem.find('.benefits__accordion-wrapper p:last-child').slideUp(300);
							$(this).addClass('active');
							$(this).find('.benefits__accordion-wrapper p:last-child').slideDown(300);
						}
					});
				}

				benefitsBtn.click(function () {
					changeItem();
				});

				function changeItem() {
					if ($('.benefits__accordion-item.active').next().length > 0) {
						$('.benefits__accordion-item.active p:last-child').slideUp(300);
						$('.benefits__accordion-item.active')
							.removeClass('active')
							.next()
							.addClass('active')
							.find('p:last-child')
							.slideDown(300);
					} else {
						$('.benefits__accordion-item.active p:last-child').slideUp(300);
						$('.benefits__accordion-item.active')
							.removeClass('active')
							.siblings('.benefits__accordion-item:first-child')
							.addClass('active');
						$('.benefits__accordion-item.active').find('p:last-child').slideDown(300);
					}
				}

				function loop() {
					changeItem();
					circle.set(0);
					circle.animate(1, {
						duration: 5000
					}, function () {
						changeItem();
						circle.set(0);
						circle.animate(1, {
							duration: 5000
						}, loop);
					});
				}

				loop();
			}
		}
	});
})(jQuery);
