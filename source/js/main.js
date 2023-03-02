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
  });
});

let currentOpenedSection = '';
function manageSections(evt, currentSection) {

  if (currentOpenedSection && currentOpenedSection !== evt.target.closest('.opened')) {
    currentOpenedSection.classList.remove('opened');
  }

  currentSection.classList.toggle('opened');
  currentOpenedSection = currentSection;
}


const footerRightNav = document.querySelector('.footer-right__nav');
const showNavBtn = document.querySelector('.js-show-nav');

function onShowNavBtnClick(evt) {
  evt.preventDefault();
  manageSections(evt, footerRightNav);
}

if (showNavBtn) {
  showNavBtn.addEventListener('click', onShowNavBtnClick);
}

const footerRightContacts = document.querySelector('.footer-right__contacts');
const showContactsBtn = document.querySelector('.js-show-contacts');

function onShowContactsBtnClick(evt) {
  evt.preventDefault();
  manageSections(evt, footerRightContacts);
}

if (showContactsBtn) {
  showContactsBtn.addEventListener('click', onShowContactsBtnClick);
}

const aboutUsWrapper = document.querySelector('.about-us__wrapper');
const showAboutBtn = document.querySelector('.js-show-about');
const closeAboutBtn = document.querySelector('.js-close-about');

function onShowAboutBtnClick(evt) {
  evt.preventDefault();
  manageSections(evt, aboutUsWrapper);
}

if (showAboutBtn) {
  showAboutBtn.addEventListener('click', onShowAboutBtnClick);
}

function onCloseAboutBtnClick(evt) {
  evt.preventDefault();
  manageSections(evt, aboutUsWrapper);
}

if (closeAboutBtn) {
  closeAboutBtn.addEventListener('click', onCloseAboutBtnClick);
}

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
