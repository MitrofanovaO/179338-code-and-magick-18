'use strict';

var WIZARD_QUANTITY = 4;
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');

var similarListBlock = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARD_QUANTITY; i++) {
    var wizard = {
      name: getRandomValue(names) + ' ' + getRandomValue(lastNames),
      coatColor: getRandomValue(coatColor),
      eyeColor: getRandomValue(eyesColor)
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

similarListElement.appendChild(renderWizards());

userDialog.classList.remove('hidden');

similarListBlock.classList.remove('hidden');
