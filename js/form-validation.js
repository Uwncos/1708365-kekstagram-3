import { isStringInSize } from './util.js';

const form = document.querySelector('.img-upload__form');
const pristine  = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});
const stringTester = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

pristine.addValidator(document.querySelector('.text__hashtags'),
  validateHashtag, 'Длина хэштэга не более 20 символов, начните с #');

pristine.addValidator(form.querySelector('.text__description'),
  validateComment, 'Длина комментария - от 20 до 140 символов');

form.addEventListener('submit', (e) => {
  if (!pristine.validate()) {
    e.preventDefault();
  }
});

export function validateComment(element) {
  return !isStringInSize(element, 19) && isStringInSize(element, 140);
}

export function validateHashtag(hash) {
  return stringTester.test(hash) || isStringInSize(hash, 0);
}
