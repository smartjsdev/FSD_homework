//Активация dropdown
$(".dropdownGuests").selectX();

//Инкримент
var peopleCounter=0;
$('.increment').click(function () {
  peopleCounter++;
  document.getElementById('value').innerHTML = peopleCounter;
});
//Декремент
$('.decrement').click(function () {
  if (peopleCounter > 0) {
    peopleCounter--;
    document.getElementById('value').innerHTML = peopleCounter;
  }
});
//Сброс, обнуляет счетчики и выводит стандартныую надпист в заголовок dd
$('.reset').click(function () {
  peopleCounter = 0;
  document.getElementById('value').innerHTML = '0';
  document.querySelector('.text').innerHTML = 'Сколько гостей';
});
//Подсчет и вывод количества гостей в заголовок dd
$('.apply').click(function () {
  if(peopleCounter == 0) {
    document.querySelector('.text').innerHTML = 'Сколько гостей';
  } else if(peopleCounter == 1) {
    document.querySelector('.text').innerHTML = peopleCounter + ' гость';
  } else if(peopleCounter > 1 && peopleCounter < 5) {
    document.querySelector('.text').innerHTML = peopleCounter + ' гостя';
  } else if(peopleCounter > 4 && peopleCounter < 21) {
    document.querySelector('.text').innerHTML = peopleCounter + ' гостей';
  }
});
//Закрытие при нажатии "очистить"
// $('.reset').on("click.selectX", function () {
//   $(".jq-selectx").each(function () {
//     $(this).data("SelectX").close();
//   });
// });
//Закрытие при нажатии "применить"
$('.apply').on("click.selectX", function () {
  $(".jq-selectx").each(function () {
    $(this).data("SelectX").close();
  });
});