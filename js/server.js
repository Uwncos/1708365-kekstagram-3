import { isEscapeKey } from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

const errorEscapeKey = (e) => {
  if (isEscapeKey(e)) {
    e.preventDefault();
    closeError();
  }
};

const successEscapeKey = (e) => {
  if (isEscapeKey(e)) {
    e.preventDefault();
    closeSuccess();
  }
};

export function openSuccess(){
  document.addEventListener('click', closeSuccess);
  successButton.addEventListener('click', () => {
    closeSuccess();
  });
  successMessage.classList.remove('hidden');
  document.body.append(successMessage);
  document.body.addEventListener('keydown', successEscapeKey);
}

export function closeSuccess() {
  successMessage.classList.add('hidden');
  document.removeEventListener('click', closeSuccess);
  document.removeEventListener('keydown', successEscapeKey);
}

export function openError(){
  errorButton.addEventListener('click', () => {
    closeError();
  });
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  errorMessage.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.body.append(errorMessage);
  document.body.addEventListener('keydown', errorEscapeKey);
}

export function closeError() {
  errorMessage.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.removeEventListener('keydown', errorEscapeKey);
}
