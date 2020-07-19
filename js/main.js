
"use strict";

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
	Android: function Android() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function any() {
		return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
	}
};

function checkIsIE() {
	ua = navigator.userAgent;
	let isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return isIE;
}

if (checkIsIE()) {
	document.querySelector('body').classList.add('is-IE');
}

if (isMobile.any()) {
	document.querySelector('body').classList.add('is-touch');
}

function testWebP(callback) {
	let webPTestImg = new Image();
	webPTestImg.onload = webPTestImg.onerror = function () {
		callback(webPTestImg.height == 2);
	};
	webPTestImg.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp-compatible');
	}
});

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('wrapper--was-loaded');
} 

//=================
//ActionsOnHash
if (location.hash) {
	var hsh = location.hash.replace('#', '');

	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		gotoElm(document.querySelector('.' + hsh), 500, '');
	}
}

var bodyElm = document.querySelector('body');
var blockSectors = document.querySelectorAll('._scr-sector');
var itemsSectors = document.querySelectorAll('._scr-item');
let sectorMinHeight = 750;

//ScrollOnScroll
window.addEventListener('scroll', scrollOnDemaind);

function scrollOnDemaind() {
	bodyElm.setAttribute('data-scroll', pageYOffset);
	var headerElm = document.querySelector('header.header');
	bodyElm.setAttribute('data-scroll', pageYOffset);

	if (pageYOffset > 10) {
		headerElm.classList.add('_scroll');
	} else {
		headerElm.classList.remove('_scroll');
	}

	if (blockSectors.length > 0) {
		for (var i = 0; i < blockSectors.length; i++) {
			let itemBlock = blockSectors[i];
			var itemBlockOoffset = offset(itemBlock).top;
			var itemBlockHeight = itemBlock.offsetHeight;

			if (pageYOffset > itemBlockOoffset - window.innerHeight / 1.5 && pageYOffset < itemBlockOoffset + itemBlockHeight - window.innerHeight / 1.5) {
				itemBlock.classList.add('_scr-sector--active');
			} else {
				if (itemBlock.classList.contains('_scr-sector--active')) {
					itemBlock.classList.remove('_scr-sector--active');
				}
			}
			if (pageYOffset > itemBlockOoffset - window.innerHeight / 2 && pageYOffset < itemBlockOoffset + itemBlockHeight - window.innerHeight / 2) {
				if (!itemBlock.classList.contains('_scr-sector--current')) {
					itemBlock.classList.add('_scr-sector--current');
				}
			} else {
				if (itemBlock.classList.contains('_scr-sector--current')) {
					itemBlock.classList.remove('_scr-sector--current');
				}
			}
		}
	}

	if (itemsSectors.length > 0) {
		for (var i = 0; i < itemsSectors.length; i++) {
			let currentSector = itemsSectors[i];
			let currentSectorOffset = offset(currentSector).top;
			let currentSectorHeight = currentSector.offsetHeight;

			if (pageYOffset > currentSectorOffset - window.innerHeight / 1.5 && pageYOffset < currentSectorOffset + currentSectorHeight - window.innerHeight / 1.5) {
				currentSector.classList.add('is-activated');
				scrollOnLoadItem(currentSector);
			} else {
				currentSector.classList.remove('is-activated');
			}
		}
	}
}

setTimeout(function () {
	scrollOnDemaind();
}, 100);

function scrollOnLoadItem(itemSector) {
	if (itemSector.classList.contains('_load-map') && !itemSector.classList.contains('_loaded-map')) {
		let mapItem = document.getElementById('map');

		if (mapItem) {
			itemSector.classList.add('_loaded-map');
			map();
		}
	}
}


let linksGotoBlock = document.querySelectorAll('._goto-block');

if (linksGotoBlock) {
	let blocksNames = [];

	var loopGotoBlock = function loop7(itemBlock) {
		let elm = linksGotoBlock[itemBlock];
		let blockNameToGo = elm.getAttribute('href').replace('#', '');

		if (blockNameToGo != '' && !~blocksNames.indexOf(blockNameToGo)) {
			blocksNames.push(blockNameToGo);
		}

		elm.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body--is-activated')) {
				closeMenu();
				removeLockFromBody(500);
			}
			let targetBlock = document.querySelector('.' + blockNameToGo);
			gotoElm(targetBlock, 300);
			e.preventDefault();
		});
	};

	for (var i = 0; i < linksGotoBlock.length; i++) {
		loopGotoBlock(i);
	}

	window.addEventListener('scroll', function (el) {
		let oldLink = document.querySelectorAll('._goto-block.is-activated');

		if (oldLink) {
			for (var i = 0; i < oldLink.length; i++) {
				let currentElm = oldLink[i];
				currentElm.classList.remove('is-activated');
			}
		}

		for (var i = 0; i < blocksNames.length; i++) {
			let itemBlockName = blocksNames[i];
			let itemBlockElm = document.querySelector('.' + itemBlockName);

			if (itemBlockElm) {
				let itemBlockOffset = offset(itemBlockElm).top;
				let itemBlockHeight = itemBlockElm.offsetHeight;

				if (pageYOffset > itemBlockOffset - window.innerHeight / 3 && pageYOffset < itemBlockOffset + itemBlockHeight - window.innerHeight / 3) {
					let currentLinks = document.querySelectorAll('._goto-block[href="#' + itemBlockName + '"]');

					for (var i = 0; i < currentLinks.length; i++) {
						let currentLink = currentLinks[i];
						currentLink.classList.add('is-activated');
					}
				}
			}
		}
	});
} 

//ScrollOnClick (Simple)
var gotoLinks = document.querySelectorAll('.goto-on-click');

if (gotoLinks) {
	var loopGoto = function _loop8(elm) {
		let gotoLink = gotoLinks[elm];
		gotoLink.addEventListener('click', function (e) {
			let targetBlockClass = gotoLink.getAttribute('href').replace('#', '');
			let targetElm = document.querySelector('.' + targetBlockClass);
			gotoElm(targetElm, 300);
			e.preventDefault();
		});
	};

	for (var i = 0; i < gotoLinks.length; i++) {
		loopGoto(i);
	}
}

function gotoElm(target_block, speed) {
	var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	var header = ''; //OffsetHeader

	header = 'header';
	var options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset
	};
	var scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
} //SameFunctions


function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft
	};
}

function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, {
		passive: false
	}); // Disable scrolling in Chrome

	window.onwheel = preventDefault; // modern standard

	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE

	window.ontouchmove = preventDefault; // mobile

	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, {
		passive: false
	}); // Enable scrolling in Chrome

	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault) e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		  preventDefault(e);
		  return false;
	}*/
}

	baguetteBox.run('.gallery', {
		// Custom options
	});

var buttons = document.querySelectorAll('button[type="submit"],input[type="submit"]');

if (buttons) {
   for (var i = 0; i < buttons.length; i++) {
      let itemBtn = buttons[i];
      itemBtn.addEventListener('click', doSubmit);
   }
}

function doSubmit() {
   var errorCount = 0;
   var btn = event.target;
   var form = btn.closest('form');
   var requiredElements = form.querySelectorAll('.data-required');

   if (requiredElements) {
      for (var i = 0; i < requiredElements.length; i++) {
         errorCount += validateForm(requiredElements[i]);
      }
   }

   if (errorCount == 0) {
      //SendForm
      cleanForm(form);
      // popup_close();
      //popup_open('message');
      //event.preventDefault();
   } else {
      let errors = form.querySelectorAll('.validating-error');

      if (errors && form.classList.contains('goto-error')) {
         gotoElm(errors[0], 1000, 50);
      }

      event.preventDefault();
   }
}

function validateForm(input) {
   var error = 0;
   var input_g_value = input.getAttribute('data-value');

   if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
      if (input.value != input_g_value) {
         var em = input.value.replace(" ", "");
         input.value = em;
      }

      if (validateEmail(input) || input.value == input_g_value) {
         form_add_error(input);
         error++;
      } else {
         form_remove_error(input);
      }
   } else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
      form_add_error(input);
      error++;
   } else {
      if (input.value == '' || input.value == input_g_value) {
         form_add_error(input);
         error++;
      } else {
         form_remove_error(input);
      }
   }

   return error;
}

function validateEmail(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}


function form_add_error(input) {
   input.classList.add('_error');
   input.parentElement.classList.add('_error');
   var input_error = input.parentElement.querySelector('.form__error');

   if (input_error) {
      input.parentElement.removeChild(input_error);
   }

   var input_error_text = input.getAttribute('data-error');

   if (input_error_text && input_error_text != '') {
      input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
   }
}

function form_remove_error(input) {
   input.classList.remove('_error');
   input.parentElement.classList.remove('_error');
   var input_error = input.parentElement.querySelector('.form__error');

   if (input_error) {
      input.parentElement.removeChild(input_error);
   }
}

function cleanForm(form) {
   var inputs = form.querySelectorAll('input,textarea');

   for (var _index14 = 0; _index14 < inputs.length; _index14++) {
      var _el10 = inputs[_index14];

      _el10.parentElement.classList.remove('_focus');

      _el10.classList.remove('_focus');

      _el10.value = _el10.getAttribute('data-value');
   }

   var selects = form.querySelectorAll('select');

   if (inputs.length > 0) {
      for (var _index15 = 0; _index15 < selects.length; _index15++) {
         var select = selects[_index15];
         var select_default_value = select.getAttribute('data-default');
         select.value = select_default_value;
         select_item(select);
      }
   }
}

var selects = document.querySelectorAll('select');

if (selects.length > 0) {
   selects_init();
} //Select


function selects_init() {
   for (var _index16 = 0; _index16 < selects.length; _index16++) {
      var select = selects[_index16];
      select_init(select);
   } //select_callback();


   document.addEventListener('click', function (e) {
      selects_close(e);
   });
   document.addEventListener('keydown', function (e) {
      if (e.which == 27) {
         selects_close(e);
      }
   });
}

function selects_close(e) {
   var selects = document.querySelectorAll('.select');

   if (!e.target.closest('.select')) {
      for (var _index17 = 0; _index17 < selects.length; _index17++) {
         var select = selects[_index17];
         select.classList.remove('_active');
      }
   }
}

function select_init(select) {
   var select_parent = select.parentElement;
   var select_modifikator = select.getAttribute('class');
   var select_selected_option = select.querySelector('option:checked');
   select.setAttribute('data-default', select_selected_option.value);
   select.style.display = 'none';
   select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');
   var new_select = select.parentElement.querySelector('.select');
   new_select.append(select);
   select_item(select);
}

function select_item(select) {
   var select_parent = select.parentElement;
   var select_items = select_parent.querySelector('.select__item');
   var select_options = select.querySelectorAll('option');
   var select_selected_option = select.querySelector('option:checked');
   var select_selected_text = select_selected_option.text;
   var select_type = select.getAttribute('data-type');

   if (select_items) {
      select_items.remove();
   }

   var select_type_content = '';

   if (select_type == 'input') {
      select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
   } else {
      select_type_content = '<div class="select__value icon-select-arrow">' + select_selected_text + '</div>';
   }

   select_parent.insertAdjacentHTML('beforeend', '<div class="select__item">' + '<div class="select__title">' + select_type_content + '</div>' + '<div class="select__options">' + select_get_options(select_options) + '</div>' + '</div></div>');
   select_actions(select, select_parent);
}

function select_actions(original, select) {
   var select_item = select.querySelector('.select__item');
   var select_body_options = select.querySelector('.select__options');
   var select_options = select.querySelectorAll('.select__option');
   var select_type = original.getAttribute('data-type');
   var select_input = select.querySelector('.select__input');
   select_item.addEventListener('click', function () {
      var selects = document.querySelectorAll('.select');

      for (var _index18 = 0; _index18 < selects.length; _index18++) {
         var _select = selects[_index18];

         if (_select != select_item.closest('.select')) {
            _select.classList.remove('_active');
         }
      }

      slideToggle(select_body_options, 100);
      select.classList.toggle('_active');
   });

   var _loop5 = function _loop5(_index19) {
      var select_option = select_options[_index19];
      var select_option_value = select_option.getAttribute('data-value');
      var select_option_text = select_option.innerHTML;

      if (select_type == 'input') {
         select_input.addEventListener('keyup', select_search);
      } else {
         if (select_option.getAttribute('data-value') == original.value) {
            select_option.style.display = 'none';
         }
      }

      select_option.addEventListener('click', function () {
         for (var _index20 = 0; _index20 < select_options.length; _index20++) {
            var _el11 = select_options[_index20];
            _el11.style.display = 'block';
         }

         if (select_type == 'input') {
            select_input.value = select_option_text;
            original.value = select_option_value;
         } else {
            select.querySelector('.select__value').innerHTML = select_option_text;
            original.value = select_option_value;
            select_option.style.display = 'none';
         }
      });
   };

   for (var _index19 = 0; _index19 < select_options.length; _index19++) {
      _loop5(_index19);
   }
}

function select_get_options(select_options) {
   if (select_options) {
      var select_options_content = '';

      for (var _index21 = 0; _index21 < select_options.length; _index21++) {
         var select_option = select_options[_index21];
         var select_option_value = select_option.value;

         if (select_option_value != '') {
            var select_option_text = select_option.text;
            select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
         }
      }

      return select_options_content;
   }
}

function select_search(e) {
   var select_block = e.target.closest('.select ').querySelector('.select__options');
   var select_options = e.target.closest('.select ').querySelectorAll('.select__option');
   var select_search_text = e.target.value.toUpperCase();

   for (var _i4 = 0; _i4 < select_options.length; _i4++) {
      var select_option = select_options[_i4];
      var select_txt_value = select_option.textContent || select_option.innerText;

      if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
         select_option.style.display = "";
      } else {
         select_option.style.display = "none";
      }
   }
}

function selects_update_all() {
   var selects = document.querySelectorAll('select');

   if (selects) {
      for (var _index22 = 0; _index22 < selects.length; _index22++) {
         var select = selects[_index22];
         select_item(select);
      }
   }
} //Placeholers


var inputs = document.querySelectorAll('input[data-value],textarea[data-value]');

if (inputs.length > 0) {
   var _loop6 = function _loop6(_index23) {
      var input = inputs[_index23];
      var input_g_value = input.getAttribute('data-value');

      if (input.value == '' && input_g_value != '') {
         input.value = input_g_value;
      }

      if (input.value != '' && input.value != input_g_value) {
         input_focus_add(input);
      }

      input.addEventListener('focus', function (e) {
         if (input.value == input_g_value) {
            input_focus_add(input);
            input.value = '';
         }

         if (input.classList.contains('_date')) {
            input.classList.add('_mask');
            Inputmask("99-99-9999", {
               //"placeholder": '',
               clearIncomplete: true,
               clearMaskOnLostFocus: true,
               onincomplete: function onincomplete() {
                  input_clear_mask(input, input_g_value);
               }
            }).mask(input);
         }

         if (input.classList.contains('_phone')) {
            //'+7(999) 999 9999'
            //'+38(999) 999 9999'
            //'+375(99)999-99-99'
            input.classList.add('_mask');
            Inputmask("+375 (99) 9999999", {
               //"placeholder": '',
               clearIncomplete: true,
               clearMaskOnLostFocus: true,
               onincomplete: function onincomplete() {
                  input_clear_mask(input, input_g_value);
               }
            }).mask(input);
         }

         if (input.classList.contains('_digital')) {
            input.classList.add('_mask');
            Inputmask("9{1,}", {
               "placeholder": '',
               clearIncomplete: true,
               clearMaskOnLostFocus: true,
               onincomplete: function onincomplete() {
                  input_clear_mask(input, input_g_value);
               }
            }).mask(input);
         }

         form_remove_error(input);
      });
      input.addEventListener('blur', function (e) {
         if (input.value == '') {
            input.value = input_g_value;
            input_focus_remove(input);

            if (input.classList.contains('_mask')) {
               input_clear_mask(input, input_g_value);
            }
         }
      });

      if (input.classList.contains('_date')) {
         datepicker(input, {
            customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            formatter: function formatter(input, date, instance) {
               var value = date.toLocaleDateString();
               input.value = value;
            }
         });
      }
   };

   for (var _index23 = 0; _index23 < inputs.length; _index23++) {
      _loop6(_index23);
   }
}

function input_focus_add(input) {
   input.classList.add('_focus');
   input.parentElement.classList.add('_focus');
}

function input_focus_remove(input) {
   input.classList.remove('_focus');
   input.parentElement.classList.remove('_focus');
}

function input_clear_mask(input, input_g_value) {
   input.inputmask.remove();
   input.value = input_g_value;
   input_focus_remove(input);
} 

var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  // direction: 'vertical',
  autoheight: false,
  loop: true,
   speed: 400,
   slidesPerView: 3,
   navigation: {
        nextEl: '.block-04__button-next',
        prevEl: '.block-04__button-prev',
      },
    breakpoints: {
       
        330: {
          slidesPerView: 4,
        }, 430: {
          slidesPerView: 5,
        },
        640: {
          slidesPerView: 6,
          // spaceBetween: 20,
        },
        768: {
          slidesPerView: 6,
        },
        1024: {
          slidesPerView: 7,
        },
        1100: {
          slidesPerView: 8,
        },
        1280: {
          slidesPerView: 9,
        },
        1400: {
          slidesPerView: 10,
        },
    }


})
