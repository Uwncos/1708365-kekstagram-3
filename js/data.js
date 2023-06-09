const BACKEND_URL = 'https://27.javascript.pages.academy/kekstagram-simple/data';

export function getDescription (onSuccess, onError) {
  fetch(BACKEND_URL)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onError);
}
