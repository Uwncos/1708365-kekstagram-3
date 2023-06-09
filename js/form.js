import { isStringInSize } from './util.js';
import { oldEffect, sliderElement } from './effect.js';
import { scaleValueElement } from './scaling.js';
import { validateComment, validateHashtag } from './form-validation.js';
import { openSuccess, openError } from './server.js';

const BACKEND_URL = 'https://27.javascript.pages.academy/kekstagram-simple';
const imgElement = document.querySelector('.img-upload__preview');
const downloadButton = document.querySelector('#upload-file');
const cancellButton = document.querySelector('#upload-cancel');
const hashtag = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');

function cleanForm() {
  downloadButton.value = '';
  hashtag.value = '';
  comment.value = '';
  imgElement.classList.remove(oldEffect);
  imgElement.classList.add('effects__preview--none');
  scaleValueElement.value = '100%';
  imgElement.style = `transform: scale(${parseInt(scaleValueElement.value, 10) / 100})`;
  sliderElement.classList.add('visually-hidden');

}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!validateComment(comment.value) || !validateHashtag(hashtag.value)) {
    return;
  }
  const formData = new FormData(evt.target);
  fetch(
    BACKEND_URL,
    {
      method: 'POST',
      body: formData,
    }
  )
    .then((response) => {
      if (response.ok) {
        closeDownloadWindow();
        openSuccess();
      } else {
        openError();
      }
    })
    .catch(openError);
});

const onFormEscapeKeyDown = (e) => {
  if (isStringInSize(e)) {
    e.preventDefault();
    closeDownloadWindow();
  }
};

function openDownloadWindow() {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', onFormEscapeKeyDown);
}

function closeDownloadWindow() {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscapeKeyDown);
  cleanForm();
}

downloadButton.addEventListener('change', () => { openDownloadWindow(); });
cancellButton.addEventListener('click', () => {closeDownloadWindow(); });
