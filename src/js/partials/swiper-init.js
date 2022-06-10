$(window).on('load', function () {
	let featuresSlider = document.querySelectorAll('.__js_slider-features');
	let newsSlider = document.querySelectorAll('.__js_slider-news');
	let publishSlider = document.querySelectorAll('.__js_slider-publish');
	let aboutSlider = document.querySelectorAll('.__js_slider-about');
	const current = document.querySelector('.features__counter .current');
	const all = document.querySelector('.features__counter .all');
	const current2 = document.querySelector('.about-page__counter .current');
	const all2 = document.querySelector('.about-page__counter .all');

	const options = {
		speed: 500,
		pagination: false
	}

	if (featuresSlider.length > 0) {
		featuresSlider.forEach(elem => {
			const mq = $('.js-marquee-features').marquee({
				duration: 20000,
				delayBeforeStart: 0,
				duplicated: true,
				gap: 150,
				startVisible: true
			});

			const slider = new Swiper(elem, {
				...options,
				slidesPerView: 1,
				spaceBetween: 1,
				navigation: {
					nextEl: '.features__nav .slider-arrows__right',
					prevEl: '.features__nav .slider-arrows__left',
				},
				breakpoints: {
					1280: {
						effect: 'fade',
						fadeEffect: {
							crossFade: true
						}
					}
				},
				on: {
					slideChange: function () {
						mq.marquee('destroy');

						$('.js-marquee-features').marquee({
							duration: 20000,
							delayBeforeStart: 0,
							duplicated: true,
							gap: 150,
							startVisible: true
						});

						current.textContent = String(slider.realIndex + 1).padStart(2, '0');
						$('.js-marquee-features .js-marquee').text(slider.slides[slider.realIndex].dataset.marquee);

						if (slider.realIndex === 2) {
							$('.features').css('background-image', 'url("images/features/3.png")');
						} else {
							$('.features').css('background-image', 'none');
						}
					}
				}
			});

			all.textContent = String(slider.slides.length).padStart(2, '0');
		});
	}

	if (newsSlider.length > 0) {
		newsSlider.forEach(elem => {
			new Swiper(elem, {
				...options,
				slidesPerView: 1.4,
				spaceBetween: 16,
				breakpoints: {
					768: {
						slidesPerView: 2.4,
					},
					1280: {
						slidesPerView: 3.5,
						spaceBetween: 40
					}
				},
			})
		});
	}

	if (publishSlider.length > 0) {
		publishSlider.forEach(elem => {
			new Swiper(elem, {
				...options,
				slidesPerView: 1.4,
				spaceBetween: 16,
				breakpoints: {
					768: {
						slidesPerView: 2.4,
					},
					1280: {
						slidesPerView: 3.5,
						spaceBetween: 40
					}
				},
			})
		});
	}

	if (aboutSlider.length > 0) {
		aboutSlider.forEach(elem => {
			const slider = new Swiper(elem, {
				...options,
				slidesPerView: 1,
				spaceBetween: 0,
				navigation: {
					nextEl: '.about-page__nav .slider-arrows__right',
					prevEl: '.about-page__nav .slider-arrows__left',
				},
				breakpoints: {
					768: {
						slidesPerView: 2
					},
					1290: {
						slidesPerView: 1
					},
					1500: {
						slidesPerView: 2
					}
				},
				on: {
					slideChange: function () {
						current2.textContent = String(slider.realIndex + 1).padStart(2, '0');
					}
				}
			});
			all2.textContent = String(slider.slides.length - 1).padStart(2, '0');
		});
	}
})