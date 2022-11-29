(function ($) {
	$(document).ready(function() {
		function toggleInput(){
			if(this.value){
				$(this).parent('.input-wrapper').addClass('active');
			}else{
				$(this).parent('.input-wrapper').removeClass('active');
			}
		}
		$('.webform-submission-zaprosit-demo-form .form-item.form-no-label input').each(toggleInput);
		$('.webform-submission-zaprosit-demo-form .form-item.form-no-label input').on('input',toggleInput);
	});
})(jQuery);
