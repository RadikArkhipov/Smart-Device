import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();

    function addMask(currentTelInput) {
      window.iMaskJS(currentTelInput, {mask: '+{7}(000)000-00-00'});
    }

    let currentOpenedSection = '';
    function manageSections(evt, currentSection) {

      if (currentOpenedSection && currentOpenedSection !== evt.target.closest('.opened')) {
        currentOpenedSection.classList.remove('opened');
      }

      currentSection.classList.toggle('opened');
      currentOpenedSection = currentSection;
    }


    const footerNav = document.querySelector('[data-footer-nav]');
    const showNavBtn = document.querySelector('[data-show-nav]');

    function onShowNavBtnClick(evt) {
      evt.preventDefault();
      manageSections(evt, footerNav);
    }

    if (showNavBtn) {
      showNavBtn.addEventListener('click', onShowNavBtnClick);
    }

    const footerContacts = document.querySelector('[data-footer-contacts]');
    const showContactsBtn = document.querySelector('[data-show-contacts]');

    function onShowContactsBtnClick(evt) {
      evt.preventDefault();
      manageSections(evt, footerContacts);
    }

    if (showContactsBtn) {
      showContactsBtn.addEventListener('click', onShowContactsBtnClick);
    }

    const aboutUs = document.querySelector('[data-about-us]');
    const showAboutBtn = document.querySelector('[data-show-about]');
    const closeAboutBtn = document.querySelector('[data-close-about]');

    function onShowAboutBtnClick(evt) {
      evt.preventDefault();
      manageSections(evt, aboutUs);
    }

    if (showAboutBtn) {
      showAboutBtn.addEventListener('click', onShowAboutBtnClick);
    }

    function onCloseAboutBtnClick(evt) {
      evt.preventDefault();
      manageSections(evt, aboutUs);
    }

    if (closeAboutBtn) {
      closeAboutBtn.addEventListener('click', onCloseAboutBtnClick);
    }

    const ESC_KEYCODE = 27;
    const MAX_NUMBERS = 16;

    const body = document.querySelector('body');
    const overlay = document.querySelector('div[data-close-modal]');
    const callBackPopup = document.querySelector('[data-modal="feedback"]');
    const closeButton = callBackPopup.querySelector('button[data-close-modal]');
    const callBackButton = document.querySelector('[data-open-modal]');
    const input = callBackPopup.querySelector('input[type="text"]');
    const formElement = document.querySelector('[data-form="feedback"]');
    const modalForm = callBackPopup.querySelector('[data-form-modal]');

    if (formElement) {
      formElement.addEventListener('submit', function (evt) {
        const telInput = formElement.querySelector('input[type="tel"]');
        const telValue = telInput.value;
        if (telValue.length < MAX_NUMBERS) {
          evt.preventDefault();
        }
      });
    }

    if (modalForm) {
      modalForm.addEventListener('submit', function (evt) {
        const telInput = modalForm.querySelector('input[type="tel"]');
        const telValue = telInput.value;
        if (telValue.length < MAX_NUMBERS) {
          evt.preventDefault();
        }
      });
    }

    const closePopup = function () {
      callBackPopup.classList.remove('is-active');
      body.classList.remove('body-lock');
      document.removeEventListener('keydown', onEscButtonPress);
    };

    const onEscButtonPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    };

    const openPopup = function () {
      callBackPopup.classList.add('is-active');
      body.classList.add('body-lock');
      setTimeout(function () {
        input.focus();
      }, 1000);

      const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
      const focusableElements = callBackPopup.querySelectorAll(focusableElementsString);
      const firstTabStop = focusableElements[0];
      const lastTabStop = focusableElements[focusableElements.length - 1];

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 9) {

          if (evt.shiftKey) {

            if (document.activeElement === firstTabStop) {
              evt.preventDefault();
              lastTabStop.focus();
            }
          } else {
            if (document.activeElement === lastTabStop) {
              evt.preventDefault();
              firstTabStop.focus();
            }
          }
        }
      });

      document.addEventListener('keydown', onEscButtonPress);
    };

    callBackButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup();
    });

    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      closePopup();
    });

    overlay.addEventListener('click', function () {
      closePopup();
    });


    // mask

    (function () {
      const writeFormModal = document.querySelector('.write__form--modal input[type="tel"]');
      const phone = document.querySelector('.write__form  input[type="tel"]');

      if (phone) {
        addMask(phone);
      }

      if (writeFormModal) {
        addMask(writeFormModal);
      }
    })();
  });
});


// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
