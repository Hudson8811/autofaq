(function ($) {
	$(document).ready(function() {
		var range1 = $('#range-1');
		var range2 = $('#range-2');
		var result1 = $('#result-1');
		var result2 = $('#result-2');

		range1.on('input', function () {
			result1.text(calcEconomy($(this).val()));
		});

		range2.on('input', function () {
			var value = $(this).val();
			var label = $(this).prev();

			if (value <= 10e3) {
				label.text('до 10 тыс.');
			} else if (value > 10e3 && value <= 20e3) {
				label.text('до 20 тыс.');
			} else if (value > 20e3 && value <= 40e3) {
				label.text('до 40 тыс.');
			} else if (value > 40e3 && value <= 100e3) {
				label.text('до 100 тыс.');
			} else if (value > 100e3) {
				label.text('выше 100 тыс.');
			}
		});

		range2.on('input', function () {
			result2.text(calcRoi());
		});

		let calcEconomy = (val) => {
			return val * 25000 * 12 * 2 / 1e6;
		}

		let calcRoi = () => {
			return Math.trunc(+result1.text() * 1e6 / getRate() * 100);
		}

		let getRate = () => {
			var value = range2.val();

			if (value <= 10e3) {
				return 1200e3;
			} else if (value > 10e3 && value <= 20e3) {
				return 1800e3;
			} else if (value > 20e3 && value <= 40e3) {
				return 2900e3;
			} else if (value > 40e3 && value <= 100e3) {
				return 4900e3;
			} else if (value > 100e3) {
				return 6e6;
			}
		}
	});
})(jQuery);
