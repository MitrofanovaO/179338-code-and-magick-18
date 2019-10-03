'use strict';

var WIZARD_QUANTITY = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var inputWizardCoat = document.querySelector('input[name="coat-color"]');
var inputWizardEyes = document.querySelector('input[name="eyes-color"]');
var inputFireball = document.querySelector('input[name="fireball-color"]');

var similarListBlock = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARD_QUANTITY; i++) {
    var wizard = {
      name: getRandomArrayElement(names) + ' ' + getRandomArrayElement(lastNames),
      coatColor: getRandomArrayElement(coatColor),
      eyeColor: getRandomArrayElement(eyesColor)
    };
    wizards.push(wizard);
  }
  return wizards;
};

var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
};

var renderWizards = function () {
  var wizards = getWizards();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    var el = createWizard(wizards[i]);

    fragment.appendChild(el);
  }

  return fragment;
};

var onWizardCoatClick = function () {
  var wizardCoatColor = getRandomArrayElement(coatColor);
  wizardCoat.style.fill = wizardCoatColor;
  inputWizardCoat.value = wizardCoatColor;
};

var onWizardEyesClick = function () {
  var wizardEyesColor = getRandomArrayElement(eyesColor);
  wizardEyes.style.fill = wizardEyesColor;
  inputWizardEyes.value = wizardEyesColor;
};

var onFireballClick = function () {
  var wizardFireballColor = getRandomArrayElement(fireballColor);
  wizardFireball.style.background = wizardFireballColor;
  inputFireball.value = wizardFireballColor;
};

wizardEyes.addEventListener('click', onWizardEyesClick);
wizardCoat.addEventListener('click', onWizardCoatClick);
wizardFireball.addEventListener('click', onFireballClick);

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.querySelector('.setup-user-name') !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupUserName.addEventListener('invalid', onUserNameInvalid);
  userDialog.querySelector('.setup-submit').addEventListener('click', onsetupSubmitClick);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupUserName.removeEventListener('invalid', onUserNameInvalid);
  userDialog.querySelector('.setup-submit').addEventListener('click', onsetupSubmitClick);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var onUserNameInvalid = function () {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Обязательное поле');
  } else {
    setupUserName.setCustomValidity('');
  }
};

var onsetupSubmitClick = function () {
  var form = document.querySelector('.setup-wizard-form');
  if (form.checkValidity()) {
    form.submit();
    wizardEyes.removeEventListener('click', onWizardEyesClick);
    wizardCoat.removeEventListener('click', onWizardCoatClick);
    wizardFireball.removeEventListener('click', onFireballClick);
  }
};

similarListElement.appendChild(renderWizards());

similarListBlock.classList.remove('hidden');
