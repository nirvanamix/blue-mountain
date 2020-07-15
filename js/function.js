jQuery(document).ready(function($) {
	/*-------------windowd scale--------------*/
	var maximum_scale = {
		fun: function(){
			function count(){
				if($(window).outerWidth() < 992) $('head meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1');
					else $('head meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1');
			}
			count();
			jQuery(window).resize(function() {
				count();
			});
		}
	}
	maximum_scale.fun()
	/*-----------edn windowd scale------------*/
	/*--------------count input--------------*/
	var count_input = {
		fun: function(){
			jQuery('.conunt-input').each(function(index, el) {
				jQuery(this).prepend('<div class="minus"> <button>-</button></div>');
				jQuery(this).append('<div class="plus"><button>+</button></div>');
				/*add data-add*/
				var data_add = jQuery(this).find('input').attr('data-add');
				if (typeof data_add !== typeof undefined && data_add !== false) {
					var th_val = jQuery(this).find('input').attr('value');
					jQuery(this).find('input').val(th_val + data_add);
				}
			});
			jQuery('.conunt-input div button').click(function(event) {
				// getting value from input
				var val_input = jQuery(this).parents('.conunt-input').find('input').val();
				var val_input = parseInt(val_input);
				// check the number
				val_input =+ val_input;
				var audit_input = jQuery.isNumeric(val_input);
				// if input value not number
				if(audit_input == false){
					var val_input = 0;
				}
				// if click on plus
				var has_plus = jQuery(this).parent('div').hasClass('plus');
				if(has_plus == true){
					val_input =+ val_input + 1;
				}
				// if click on minus
				var has_minus = jQuery(this).parent('div').hasClass('minus');
				if(has_minus == true){
					var value_p = jQuery(this).parents('.conunt-input').find('input').val();
					value_p = parseInt(value_p);
					value_p  =+ value_p;
					if(value_p >= 2){
						val_input =+ val_input - 1;
					}
				}
				// output in input
				/* add content for data-add*/
				jQuery(this).parents('.conunt-input').find('input').val(val_input);
				jQuery(this).parents('.conunt-input').find('input').attr('value', val_input);
				/* add content for data-add*/
				var th_val = jQuery(this).parents('.conunt-input').find('input').val();
				th_val = parseInt(th_val);
				var data_add = jQuery(this).parents('.conunt-input').find('input').attr('data-add');
				if (typeof data_add !== typeof undefined && data_add !== false) {
					var th_val = jQuery(this).parents('.conunt-input').find('input').val(th_val + data_add);
				}
				/*data-min and data-max*/
				var has_min = jQuery(this).parents('.conunt-input').find('input').attr('data-min');
				if(has_min != undefined){
					has_min =+ has_min;
					if(val_input < has_min) jQuery(this).parents('.conunt-input').find('input').val(has_min)
				}
				
				var has_max = jQuery(this).parents('.conunt-input').find('input').attr('data-max');
				if(has_max != undefined){
					has_max =+ has_max;
					if(val_input > has_max) jQuery(this).parents('.conunt-input').find('input').val(has_max)
				}
			});
			jQuery('.conunt-input input').focus(function(event) {
				jQuery(this).select();
			});
			jQuery('.conunt-input input').focusout(function(event) {
				var val_input = jQuery(this).val();
				val_input = parseInt(val_input);
				val_input =+ val_input;
				var val_string = jQuery.isNumeric(val_input);
				if(val_string == false){
					jQuery(this).val(1);
					jQuery(this).attr('value', '1');
				}
				if(val_input < 1){
					jQuery(this).val(1);
					jQuery(this).attr('value', '1');
				}
				/* add content for data-add*/
				var th_val = jQuery(this).val();
				th_val = parseInt(th_val);
				var data_add = jQuery(this).attr('data-add');
				if (typeof data_add !== typeof undefined && data_add !== false) {
					jQuery(this).val(th_val + data_add);
				}
				/*data-min and data-max*/
				if($(this).attr('data-min') != undefined){
					if(parseInt(val_input) < parseInt($(this).attr('data-min'))){
						jQuery(this).val($(this).attr('data-min'));
					}
				}
				if($(this).attr('data-max') != undefined){
					if(parseInt(val_input) > parseInt($(this).attr('data-max'))){
						jQuery(this).val($(this).attr('data-max'));
					}
				}
			});
			// add nav keydown
			$(".conunt-input input" ).not('input[type=number]').on("keydown", function( event ) {
				if(event.which == 38) $(this).parents('.conunt-input').find('.plus button').trigger('click');
				if(event.which == 40) $(this).parents('.conunt-input').find('.minus button').trigger('click');
			});
		}
	}
	count_input.fun();
	/*--------- end count input--------------*/
	/*--------- visible-grid ----------------*/
	var visible_grid = {
		fun: function(){
			$('.visible-grid button').click(function() {
				$('.visible-grid button').removeClass('active');
				$(this).addClass('active');
				if($(this).hasClass('table') == true){
					$('.items-goods').addClass('grid-table');
					localStorage.setItem("grid-table", true);
				}
				else{
					$('.items-goods').removeClass('grid-table');
					localStorage.setItem("grid-table", false);
				}
			});
			// get lodaSrorage
			var status = localStorage.getItem("grid-table");
			if(status == 'true'){
				$('.items-goods').addClass('grid-table');
				$('.visible-grid button.table').addClass('active');
			}
			if(status == 'false' || status == null){
				$('.visible-grid button.list').addClass('active');
			}
		}
	}
	visible_grid.fun();
	/*--------- end visible-grid ------------*/
	/*------------ mobile menu --------------*/
	var mobile_menu = {
		fun: function(){
			$('.mobile-menu').click(function(event) {
				$(this).toggleClass('active');
				$('.wrapper').toggleClass('active');
				$('body, html').toggleClass('overflow-body');
			});
			jQuery(document).click( function(event){
				if(jQuery(event.target).closest(".mobile-menu").length ) 
				return;
					$('.wrapper, .mobile-menu').removeClass('active');
					$('body, html').removeClass('overflow-body');
				event.stopPropagation();
			});
		}
	}
	mobile_menu.fun();
	/*------------ edn mobile menu ----------*/
	/*---------------- acardion -------------*/
	var acardion = {
		fun: function(){
			$('.acardion-swich .item').click(function(event) {
				$(this).parents('.acardion-swich').find('.item').removeClass('active');
				$(this).addClass('active');
				$('.acardion-items .item').hide(0);
				$('.acardion-items .item').eq($(this).index()).show(0);
			});
		}
	}
	acardion.fun();
	/*-------------- end acardion -----------*/
	/*-------------- upload file ------------*/
	var upload = {
		fun: function(){
			$('.upload-file input[type=file]').change( function(event) {
				var tmppath = URL.createObjectURL(event.target.files[0]);
				$(this).parents('.upload-file').removeClass('default').find('img').attr('src', tmppath);
			});
			$('.upload-file .delate').click(function(event) {
				$(this).parents('.upload-file').addClass('default').find('img').attr('src', $(this).attr('data-default-img'));
			});
		}
	}
	upload.fun();
	/*----------- end upload file -----------*/
	/*----------- table orders --------------*/
	var orders_table = {
		fun: function() {
			$('.orders-table .show-detals').click(function(event) {
				$('.orders-table .show-detals').not($(this)).removeClass('active').parents('tr').next('.hide-tr').removeClass('active');
				$(this).toggleClass('active');
				$(this).parents('tr').next('.hide-tr').toggleClass('active');
			});
			$('.orders-table tbody tr:not(.hide-tr) td').each(function(index, el) {
				$(this).prepend('<div class="mobile-td">' + $.trim($('.orders-table thead td').eq($(this).index()).text()) + '</div>');
			});
		}
	}
	orders_table.fun();
	/*----------- end table orders ----------*/
	/*------------- modal window ------------*/
	var modal_window = {
		fun: function(){
			$('body').on('click', 'a[data-modal]', function(event){
				event.preventDefault();
				$('.modal-window').fadeOut(400).removeClass('active');
				var data_modal = $(this).attr('data-modal');
				$('.modal-window[data-modal="' + data_modal +'"]').fadeIn(400).addClass('active');
				$('html, body').addClass('overflow-modal');
			});
			$('body').on('click', '.close', function(event){
				$('.modal-window').fadeOut(400);
				$('.modal-window').removeClass('active');
				$('html, body').removeClass('overflow-modal');
			});
			jQuery(".modal-window").click( function(event){
				if(jQuery(event.target).closest(".window").length ) 
				return;
					$('.modal-window').fadeOut(400).removeClass('active');
					$('html, body').removeClass('overflow-modal');
				event.stopPropagation();
			});
		}
	}
	modal_window.fun();
	/*--------- end  modal window -----------*/
	/*--------- mobile table-cart -----------*/
	var table_cart = {
		fun: function(){
			$('.table-cart tbody td').each(function(index, el) {
				$(this).prepend('<div class="mobile-title">' + $('.table-cart thead td').eq($(this).index()).text() + '</div>');
			});
		}
	}
	table_cart.fun();
	/*------- end mobile table-cart ---------*/
	/*-------------- checkbox ---------------*/
	var checkbox = {
		fun: function(){
			function check_fun(th){
				if(th.find('input').prop('checked')) return  th.addClass('active')
					else return th.removeClass('active');
			}
			$('.label-checkbox').click(function(event) {
				$('.label-checkbox').each(function(index, el) {
					check_fun($(this));
				});
			});
			$('.label-checkbox').each(function(index, el) {
				check_fun($(this));
			});
		}
	}
	checkbox.fun();
	/*------------- end checkbox ------------*/
	/*------------- payment-select ----------*/
	var payment = {
		fun: function(){
			$('.payment-select .item').each(function(index, el) {
				if($(this).hasClass('active')){
					$(this).find('.top').addClass('active');
					$(this).find('.bottom').slideDown(0);
					$(this).find('label').removeAttr('data-no-valid');
				}
			});
			$('.payment-select .top').click(function(event) {
				$('.payment-select .top').not($(this)).removeClass('active');
				$('.payment-select .top').not($(this)).parent('.item').find('.bottom').slideUp(400);
				$('.payment-select .top').not($(this)).parent('.item').find('label').attr('data-no-valid', 'no');

				$(this).parent('.item').find('label').removeAttr('data-no-valid');
				$(this).addClass('active');
				$(this).parent('.item').find('.bottom').slideDown(400);

				$(this).parent('.item').find('.bottom label:first() input').focus();
			});
		}
	}
	payment.fun();
	/*--------- end payment-select ----------*/
	/*----------- watch password ------------*/
	var watch_password = {
		fun: function(){
			$('.password-watch .watch').click(function(event) {
				$(this).toggleClass('active');
				if($(this).hasClass('active')) $(this).parents('label').find('input').attr('type', 'text');
					else $(this).parents('label').find('input').attr('type', 'password');
			});
		}
	}
	watch_password.fun();























	/*--------- edn watch password ----------*/
});