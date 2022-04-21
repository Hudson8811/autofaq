$(document).ready(function() {
	var benefitsAccordionItem = $('.benefits__accordion-item');
	var clientsAccordItem = $('.clients-card__client-logo');
	var servicesThumbs = $('.services__tabs-item');
	var servicesContents = $('.services__content-item');
	var textColorChanged = $('.brands__text');
	var moveToLeftText = $('.clients__title p');
	var inputRange = document.querySelectorAll('.calculate__calc-item input');
	var optionsMarquee = {
		duration: 20000,
		delayBeforeStart: 0,
		duplicated: true,
		gap: 0,
		startVisible: true
	}

	$('.lang-switcher select').select2({
		minimumResultsForSearch: Infinity
	});

	$('.js-marquee-1').marquee({
		...optionsMarquee,
		direction: 'left'
	});

	$('.js-marquee-2').marquee({
		...optionsMarquee,
		direction: 'right'
	});

	$('.forecast__marquee').marquee({
		duration: 20000,
		delayBeforeStart: 0,
		duplicated: true,
		gap: 150,
		direction: 'right',
		startVisible: true
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

	/**
	 * Аккордеон для блока Clients
	 */
	clientsAccordItem.click(function () {
		$(this).toggleClass('active');
		$(this).next().slideToggle(300);
	});

	/**
	 * Ползунок калькулятора
	 * @param el
	 */
	function changeRangeValue(el) {
		el.forEach(function (elem) {
			elem.addEventListener('input', function () {
				const newValue = Number((elem.value - elem.min) * 100 / (elem.max - elem.min));
				const newPosition = 9 - (newValue * 0.2);

				elem.previousElementSibling.textContent = elem.value;
				elem.previousElementSibling.style.left = `calc(${newValue}% + ${newPosition}px)`;
			});
		});
	}

	changeRangeValue(inputRange);

	/**
	 * Переключатели значений таблицы в мобильной версии
	 */
	$('.nlu__btn-check').each(function () {
		const btn = $(this);

		btn.closest('.nlu__slider').next().find('tbody tr').each(function () {
			$(this).find('td').eq(btn.index() + 1).attr('data-label', btn.text());
		});
	});

	$('.nlu__btn-check').click(function () {
		const btn = $(this);
		const data = btn.closest('.nlu__slider').next().find('td[data-label]');
		const currentData = btn.closest('.nlu__slider').next().find('td[data-label="' + btn.text() + '"]');

		data.hide();

		currentData.each(function () {
			$(this).show();
		});
	});

	/**
	 * Табы
	 */
	if (window.matchMedia('(min-width: 1280px)').matches) {
		servicesThumbs.on('mouseenter', function () {
			servicesThumbs.removeClass('active');
			$(this).addClass('active');
			servicesContents.hide().eq($(this).index()).fadeIn(300).css('display', 'flex');
		});
	}

	/**
	 * Смена цвета текста при скролле
	 */
	function setTextColor(el) {
		$(window).scroll(function () {
			var scroll = $(this).scrollTop();
			var winH = $(this).innerHeight();

			el.each(function () {
				var elH = $(this).outerHeight();
				var elOffset = $(this).offset().top;
				var centerScroll = (winH - elH) / 2 + scroll;

				if (centerScroll >= elOffset && centerScroll <= elH + elOffset) {
					el.removeClass('white-text');
					$(this).addClass('white-text');
				}
			});
		});
	}

	setTextColor(textColorChanged);
	setTextColor($('.calculate__title'));

	/**
	 * Движение текста влево при появлении блока
	 */
	$(window).scroll(function () {
		var scroll = $(this).scrollTop();
		var winH = $(this).innerHeight();
		var elH = moveToLeftText.outerHeight();
		var elOffset = moveToLeftText.offset().top;
		var centerScroll = (winH - elH) / 2 + scroll;

		if (centerScroll >= elOffset && centerScroll <= elH + elOffset) {
			moveToLeftText.css('transform', 'translateX(0)')
		}
	})
})