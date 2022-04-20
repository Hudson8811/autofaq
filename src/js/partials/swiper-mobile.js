window.addEventListener('load', () => {
	const breakpoint = 1280;
	let languageSliderEl = document.querySelectorAll('.__js_slider-language');
	let tableSliderEl = document.querySelectorAll('.__js_slider-table');
	let width = document.documentElement.clientWidth;
	let carousel = null;
	let isInit = false;

	const checkResolutionForSlider = (elements, spaceB) => {
		if (elements) {
			elements.forEach((element) => {
				if (width < breakpoint) {
					initCarousel(element, spaceB);
					isInit = true;
				}

				window.addEventListener('resize', () => {
					width = document.documentElement.clientWidth;

					if (width < breakpoint && !isInit) {
						initCarousel(element);
						isInit = true;
					} else if (width >= breakpoint && isInit) {
						carousel.destroy();
						isInit = false;
					}
				});

				function initCarousel(el, spaceB) {
					carousel = new Swiper(el, {
						slidesPerView: 'auto',
						speed: 300,
						spaceBetween: spaceB
					});
				}
			});
		}
	}

	if (languageSliderEl) {
		checkResolutionForSlider(languageSliderEl, 4);
	}

	if (tableSliderEl) {
		checkResolutionForSlider(tableSliderEl, 8)
	}
});