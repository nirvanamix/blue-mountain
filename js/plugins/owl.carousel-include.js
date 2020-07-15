jQuery(document).ready(function($) {
	/*----------------owl-product----------------*/
	$('.owl-product').after('<div class="dods-slider"></div>');
	$('.owl-product .item').each(function(index, el) {
		$(this).parents('.owl-product').next('.dods-slider').append('<div class="item"><img src="' + $(this).attr('data-img-dods') +  '" alt=""></div>');
	});
	var owl =  $('.owl-product').owlCarousel({
		loop:true,
		margin:10,
		nav:true,
		items:1,
		dotsContainer: '.dods-slider',
	});
	$('.dods-slider .item').click(function () {
		var index_th = $(this).index();
		owl.trigger('to.owl.carousel', [index_th, 400]);
	});
	/*----------------owl-product----------------*/
});