$(document).ready(function() {
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

	$('.js-calculate-select').select2({
		minimumResultsForSearch: Infinity
	});

	$('.cases-single__marquee').marquee({
		duration: 20000,
		delayBeforeStart: 0,
		duplicated: true,
		gap: 200,
		direction: 'right',
		startVisible: true
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

				if (elem.id === 'range-2' && elem.value < 40000) {
					elem.previousElementSibling.style.left = `calc(${newValue}% + ${newPosition}px + 40px)`;
				} else {
					elem.previousElementSibling.style.left = `calc(${newValue}% + ${newPosition}px)`;
				}
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
		$(this).siblings().removeClass('active');
		$(this).addClass('active');

		currentData.each(function () {
			$(this).show();
		});
	});

	/**
	 * Табы
	 */
	/*if (window.matchMedia('(min-width: 1280px)').matches) {
		servicesThumbs.on('mouseenter', function () {
			servicesThumbs.removeClass('active');
			$(this).addClass('active');
			servicesContents.hide().eq($(this).index()).fadeIn(300).css('display', 'flex');
		});
	}*/

	/**
	 * Смена табов при скролле
	 */
	if (window.matchMedia('(min-width: 1280px)').matches) {
		function changeTabs(currentIndex) {
			let curThumb = servicesThumbs[currentIndex];

			if (!$(curThumb).hasClass('active')) {
				servicesThumbs.removeClass('active');
				$(curThumb).addClass('active');
				servicesContents.hide().eq(currentIndex).fadeIn(300).css('display', 'flex');
			}
		}

		var tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.services',
				start: 'top top',
				end: '+=250%',
				scrub: true,
				pin: true,
				onUpdate: (self) => {
					if (self.progress <= 0.25) {
						changeTabs(0);
					} else if (self.progress > 0.25 && self.progress <= 0.50) {
						changeTabs(1);
					} else if (self.progress > 0.50 && self.progress <= 0.75) {
						changeTabs(2);
					} else if (self.progress > 0.75) {
						changeTabs(3);
					}
				}
			}
		});
	}

	/**
	 * Параллакс блока
	 */
	if (window.matchMedia('(min-width: 1280px)').matches) {
		$(window).on("load scroll", function() {
			var parallaxElement = $('.about-card--blue');
			var parallaxQuantity = parallaxElement.length;

			window.requestAnimationFrame(function() {
				for (var i = 0; i < parallaxQuantity; i++) {
					var currentElement = parallaxElement.eq(i),
						windowTop = $(window).scrollTop(),
						elementTop = currentElement.offset().top,
						elementHeight = currentElement.height(),
						viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
						scrolled = windowTop - elementTop + viewPortHeight;

					currentElement.css({
						transform: 'translate3d(0,' + scrolled * -0.45 + 'px, 0)'
					});
				}
			});
		});
	}

	/**
	 * Смещение блоков сверху вниз
	 */
	if (window.matchMedia('(min-width: 1280px)').matches) {
		if ($('.advantages-card') && $('.advantages-card').length > 0) {
			$(window).scroll(function () {
				var scroll = $(this).scrollTop();
				var winH = $(this).innerHeight();
				var elH = $('.advantages').outerHeight();
				var elOffset = $('.advantages').offset().top - 500;
				var centerScroll = (winH - elH) / 2 + scroll;

				if (centerScroll >= elOffset && centerScroll <= elH + elOffset) {
					$('.advantages-card').each(function (index, elem) {
						switch (index) {
							case 1:
								TweenMax.to(elem, 1, {y: 178, ease: Linear.easeNone});
								break;
							case 2:
								TweenMax.to(elem, 1, {y: 340, ease: Linear.easeNone}, 0.6);
								break;
						}
					});
				}
			});
		}
	}

	/**
	 * Анимация роста столбцов при скролле
	 */
	if (window.matchMedia('(min-width: 1280px)').matches) {
		var diagForecast = gsap.utils.toArray('.forecast__diag');

		if (diagForecast && diagForecast.length > 0) {
			$(window).scroll(function () {
				var scroll = $(this).scrollTop();
				var winH = $(this).innerHeight();
				var elH = $('.forecast').outerHeight();
				var elOffset = $('.forecast').offset().top - 900;
				var centerScroll = (winH - elH) / 2 + scroll;

				if (centerScroll >= elOffset && centerScroll <= elH + elOffset) {
					diagForecast.forEach((elem, index) => {
						switch (index) {
							case 0:
								setTimeout(function () {
									TweenMax.to(elem, 1, {height: '56%', ease: Linear.easeNone}, 0);
								}, 1300);
								break;
							case 1:
								setTimeout(function () {
									TweenMax.to(elem, 1, {height: '70%', ease: Linear.easeNone}, 0);
								}, 700);
								break;
							case 2:
								TweenMax.to(elem, 1, {height: '82%', ease: Linear.easeNone}, 0);
								break;
						}
					});
				}
			});
		}
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

	if (textColorChanged && textColorChanged.length > 0) {
		setTextColor(textColorChanged);
	}

	if ($('.calculate__title') && $('.calculate__title').length > 0) {
		setTextColor($('.calculate__title'));
	}

	/**
	 * Движение текста влево при появлении блока
	 */
	$(window).scroll(function () {
		var scroll = $(this).scrollTop();
		var winH = $(this).innerHeight();

		if (moveToLeftText && moveToLeftText.length > 0) {
			var elH = moveToLeftText.outerHeight();
			var elOffset = moveToLeftText.offset().top;
			var centerScroll = (winH - elH) / 2 + scroll;

			if (centerScroll >= elOffset && centerScroll <= elH + elOffset) {
				moveToLeftText.css('transform', 'translateX(0)')
			}
		}
	});

	/**
	 * Разноцветная бегущая строка
	 */
	$('.forecast__marquee--white-1').css('margin-left', -$('.forecast__col').outerWidth());
	$('.forecast__marquee--white-2').css('margin-left', -$('.forecast__col').outerWidth() * 2);

	$(window).on('resize', () => {
		$('.forecast__marquee--white-1').css('margin-left', -$('.forecast__col').outerWidth());
		$('.forecast__marquee--white-2').css('margin-left', -$('.forecast__col').outerWidth() * 2);
	});

	$('img.lazyloadImages').lazyload({
		effect: "fadeIn",
	});

	$('.sidebar__menu-plus').click(function(event) {
		$(this).toggleClass('_active').next().slideToggle(500);
	});
})
