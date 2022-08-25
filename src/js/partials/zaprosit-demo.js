$(document).ready(function() {
	function toggleInput(){
		if(this.value){
			$(this).parent('.input-wrapper').addClass('active');
		}else{
			$(this).parent('.input-wrapper').removeClass('active');
		}
	}
	$('.form-item-anim__input').each(toggleInput);
	$('.form-item-anim__input').on('input',toggleInput);
})