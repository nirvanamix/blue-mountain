jQuery(document).ready(function($) {
		$(function (){
			$('.valid-form').validForm({
				serch_in: 'form',
			});
		})
	/*
		field value:
		1) data-valid - required value
			data-error-empty="The field must be filled"
		2) data-test="text" - checking for correct input, possible values: (text, first-last-name, email, number)
			data-error-input="field is incorrect"
		3) data-concurrences="password" - The fields do not match
			data-error-concurrences="the fields do not match"
		4) data-minlength="6" - check for minimum characters
			data-error-minlength="Minimum number of characters 6"
		------------------------------Simples-------------------------------
		<label>
			<input type="text"
				data-valid
				data-test="text"
				data-error-empty="The field must be filled"
				data-error-input="The field was filled incorrectly"
			>
		</label>
		<label>
			<input type="checkbox"
			data-valid
			data-error-empty="You must select a checkbox"
			>
		</label>
		<label>
			<select
			data-valid
			data-error-empty="You must select from the list"
			>
				<option>
					1
				</option>
				<option>
					2
				</option>
				<option>
					3
				</option>
			</select>
		</label>
		<label>
			<input type="password"
				data-valid
				data-minlength="6"
				data-error-concurrences="The fields do not match"
				data-error-minlength="Minimum number of characters 6"
			>
		</label>
	*/
	;(function($) {
		var defaults = {
			serch_in: 'form', // where to search (locally for example in an .item or globally in your form)
			error_empty: 'The field must be filled', // default text if input is empty (value for input in html "data-error-empty")
			error_checkbox: 'defaulr text eroor checkbox', // the default text in checkbox (value for input in html "data-error-empty")
			error_select: 'You must select from the list', // the default text in select (value for input in html "data-error-empty")
			error_valid: 'The field was filled incorrectly', // default text if text in input is not valid (value for input in html "data-error-input")
			error_concurrences: 'defaulr text eroor concurrences', // the default value if the fields do not match (value for input in html "data-concurrences")
			error_minlength: 'minimum number of characters 6', // the default text in min length (value for input in html "data-error-minlength")
		};
		function ValidForm(element, options){
			this.config = $.extend({}, defaults, options);
			this.element = element;
			this.init();
		}
		ValidForm.prototype.init = function(){
			// this element
			th = this.element;
			// this config
			this_config = this.config
			/*input entering text into the input/textarea*/
			th.find('label input, label textarea').focus(function(event) {
				$(this).parents('label').removeClass('error-label').find('.error-span').remove();
				$(this).parents(this_config.serch_in).removeClass('error-block');
			});
			th.find('label input, label textarea').focusout(function(event) {
				var t_v = $.trim($(this).val());
				$(this).val(t_v);
			});
			// do not valid the form with html
			th.attr('novalidate', 'novalidate');
			/*---click sumbmit---*/
			th.find('.submit input, .submit button').click(function(event) {
				// fucton for error
				function error_function (th_el, data_text_error, text_error_default) {
					// add error class for label
					th_el.addClass('error-label');
					// find text in data-error-empty
					var d_e = th_el.find('input, select, textarea').attr(data_text_error);
					// if label has not data-error-empty then add default text
					if(d_e == undefined) th_el.append('<span class="error-span">' + text_error_default + '</span>');
					// if label has default text then we take the text from this data
					else th_el.append('<span class="error-span">' + d_e + '</span>');
					// add eroor class from parents element (form or cactom class)
					th_el.parents(this_config.serch_in).addClass('error-block');
				}
				$(this).parents(this_config.serch_in).find('label:not([data-no-valid])').each(function(index, el) {
					// default for click
					$(this).find('.error-span').remove();
					$(this).removeClass('error-label');
					// check for empty field
					var h_d = $(this).find('input, textarea, select').attr('data-valid');
					if(h_d != undefined){
						// input
						if($.trim($(this).find('input, textarea').val()) == '') error_function($(this), 'data-error-empty', this_config.error_empty);
						// checkbox
						if($(this).find('input[type="checkbox"]').prop('checked') == false) error_function($(this), 'data-error-empty', this_config.error_checkbox);
						// select
						if($(this).find('select').length > 0){
							$(this).removeClass('error-label').find('.error-span').remove();
							if($(this).find('select option:first-child').is(':selected') == true) error_function($(this), 'data-error-empty', this_config.error_select);
						}
					}
					// check for correct input
					var d_t = $(this).find('input, textarea').attr('data-test');
					var th_val = $(this).find('input, textarea').val();
					if(d_t != undefined && $.trim(th_val) != ''){
						var result;
						// text input
						if(d_t == 'text'){
							result = th_val.match('^[а-яА-ЯёЁa-zA-Z ]+$');
						}
						// text input
						if(d_t == 'text-number'){
							result = th_val.match('^[а-яА-ЯёЁa-zA-Z ]+$');
						}
						// first/last name
						if(d_t == 'first-last-name'){
							result = th_val.match('^[а-яА-ЯёЁa-zA-Z ]+ [а-яА-ЯёЁa-zA-Z ]+$');
						}
						// email input
						if(d_t == 'email'){
							result = th_val.match('^[a-za-zA-Z0-9][-_.a-za-zA-Z0-9]+@(?:[a-za-zA-Z0-9][-a-za-zA-Z0-9]+\.)+[a-zA-Z]{2,}$');
						}
						// number input
						if(d_t == 'number'){
							result = th_val.match('^[+0-9 ]+$');
						}
						if(result == null) error_function ($(this), 'data-error-input', this_config.error_valid);
					}
					// check for minimum characters
					var d_m = $(this).find('input, textarea').attr('data-minlength');
					if(d_m != undefined && $(this).hasClass('error-label') == false){
						if($(this).find('input').val().length < d_m) error_function($(this), 'data-error-minlength', this_config.error_minlength);
					}
				});
				/*concurrences input*/
				$('input[data-concurrences]').each(function(index, el) {
					var th_val = $(this).val();
					var th_attr = $(this).attr('data-concurrences');
					var val_valid = $('input[data-concurrences=' + th_attr + ']').val();
					if($('input[data-concurrences=' + th_attr + ']').parents('label').hasClass('error-label') == true) return false;
					if(val_valid != th_val){
						$('input[data-concurrences=' + th_attr + ']').parents('label').each(function(index, el) {
							error_function ($(this), 'data-error-concurrences', this_config.error_concurrences);
						});
					}
				});
				// fuctoin event click
				$(this).parents(this_config.serch_in).find('label').each(function(index, el) {
					if($(this).hasClass('error-label') == true){
						event.preventDefault();
						return false;
					}
				});
			});
		}
		$.fn.validForm = function(options){
			new ValidForm(this.first(), options);
			return this.first()
		};
	}(jQuery));
});
/*--------------------mask--------------------*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
jQuery(function($){
	$(".mask-card").mask("9999-9999-9999-9999");
	$(".mask-mm-yy").mask("99/99");
});






