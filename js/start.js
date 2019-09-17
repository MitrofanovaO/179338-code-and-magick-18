'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var TEXT_X = 140;
var TEXT_Y = 260;
var BAR_Y = 240;
var GAP = 10;
var FONT_Y = 40;
var FONT_GAP = 20;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var STATS_GAP = 235;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderText = function (ctx) {
  ctx.font = '16px PT Mono';
  ctx.textBaseLine = 'hanging';
  ctx.fillText('Ура вы победили!', TEXT_X, FONT_Y);
  ctx.fillText('Список результатов:', TEXT_X, FONT_Y + FONT_GAP);
};

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function getRandomColor() {
  var s = rand(0, 100);
  var l = rand(0, 100);
  return 'hsl(219,' + s + '%,' + l + '%)';
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  renderText(ctx);

  var maxTime = getMaxElement(times);


  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomColor();
    ctx.fillRect(TEXT_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y, BAR_WIDTH, ((-BAR_MAX_HEIGHT * times[i]) / maxTime) + GAP);

    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], TEXT_X + (BAR_WIDTH + BAR_GAP) * i, TEXT_Y);

    ctx.fillStyle = '#000000';
    ctx.fillText(Math.floor(times[i]), TEXT_X + (BAR_WIDTH + BAR_GAP) * i, ((-BAR_MAX_HEIGHT * times[i]) / maxTime) + STATS_GAP);
  }
};
