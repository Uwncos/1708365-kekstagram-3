let chosenEffect = document.querySelector('.img-upload__effects').querySelectorAll('input[name="effect"]:checked');
const imgElement = document.querySelector('.img-upload__preview');
const sliderValue = document.querySelector('.effect-level__value');
export let oldEffect = 'effects__preview--none';
export const sliderElement = document.querySelector('.effect-level__slider');

const radios = document.querySelector('.img-upload__effects').querySelectorAll('input[name="effect"]');
radios.forEach((radio) => {
  radio.addEventListener('input', (evt) => { setChosenEffect(evt); });
});

function setChosenEffect(evt) {
  for (const radio of radios) {
    if (radio.checked) {
      chosenEffect = radio;
      imgElement.classList.remove(oldEffect);
      imgElement.classList.add(`effects__preview--${chosenEffect.value}`);
      oldEffect = `effects__preview--${chosenEffect.value}`;
      setSlider(evt.target.value);
    }
  }
}

function changeStyle(value) {
  for (const className of imgElement.classList) {
    if (className === 'effects__preview--chrome') {
      imgElement.style = `filter: grayscale(${value})`;
    }
    if (className === 'effects__preview--sepia') {
      imgElement.style = `filter: sepia(${value})`;
    }
    if (className === 'effects__preview--marvin') {
      imgElement.style = `filter: invert(${value}%)`;
    }
    if (className === 'effects__preview--phobos') {
      imgElement.style = `filter: blur(${value}px)`;
    }
    if (className === 'effects__preview--heat') {
      imgElement.style = `filter: brightness(${value})`;
    }
  }
}


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.classList.add('visually-hidden');
sliderValue.value = 100;

sliderElement.noUiSlider.on('update', () => {
  sliderValue.value = sliderElement.noUiSlider.get();
  changeStyle(sliderValue.value);
});

function setSlider(arg) {
  if (arg === 'none') {
    sliderElement.classList.add('visually-hidden');
    imgElement.style.filter = '';
  }
  if (arg === 'chrome') {
    sliderElement.classList.remove('visually-hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
  }
  if (arg === 'sepia') {
    sliderElement.classList.remove('visually-hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
  }
  if (arg === 'marvin') {
    sliderElement.classList.remove('visually-hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    });
  }
  if (arg === 'phobos') {
    sliderElement.classList.remove('visually-hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  }
  if (arg === 'heat') {
    sliderElement.classList.remove('visually-hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  }
}
