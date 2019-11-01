//Подключение счетчика
import './__item/dropdown__item';
//Активация dropdown
$(".dropdown").selectX();

// //Инкримент
// var peopleCounter=0;
// $('.increment').click(function () {
//   peopleCounter++;
//   document.querySelector('.value').innerHTML = peopleCounter;
// });
// //Декремент
// $('.decrement').click(function () {
//   if (peopleCounter > 0) {
//     peopleCounter--;
//     document.querySelector('.value').innerHTML = peopleCounter;
//   }
// });
// //Сброс, обнуляет счетчики и выводит стандартныую надпист в заголовок dd
// $('.list__item_reset').click(function () {
//   peopleCounter = 0;
//   document.querySelector('.value').innerHTML = '0';
//   document.querySelector('.text').innerHTML = 'Сколько гостей';
// });
// //Подсчет и вывод количества гостей в заголовок dd
// $('.list__item_apply').click(function () {
//   if(peopleCounter == 0) {
//     document.querySelector('.text').innerHTML = 'Сколько гостей';
//   } else if(peopleCounter == 1) {
//     document.querySelector('.text').innerHTML = peopleCounter + ' гость';
//   } else if(peopleCounter > 1 && peopleCounter < 5) {
//     document.querySelector('.text').innerHTML = peopleCounter + ' гостя';
//   } else if(peopleCounter > 4 && peopleCounter < 21) {
//     document.querySelector('.text').innerHTML = peopleCounter + ' гостей';
//   }
// });

// (function($) {
//   $.fn.selectX = function(options) {
//     var base = this;
//     this.foo
//     this.data("selectX", base);
//   };
// })(jQuery);




//Закрытие при нажатии "очистить"
// $('.reset').on("click.selectX", function () {
//   $(".jq-selectx").each(function () {
//     $(this).data("SelectX").close();
//   });
// });
//Закрытие при нажатии "применить"
// $('.apply').on("click.selectX", function () {
//   $(".jq-selectx").each(function () {
//     $(this).data("SelectX").close();
//   });
// });



// $(function() {
//   var exampleDefault = $("#example-default");
//   exampleDefault.selectX({
//     onSelect: function (value) {
//       console.log(this);
//       console.log(value);
//     }
//   });

//   var exampleAnimationFade = $("#example-animation-fade");
//   exampleAnimationFade.selectX({
//     animate: "fade"
//   });

//   var exampleAnimationSlide = $("#example-animation-slide");
//   exampleAnimationSlide.selectX({
//     animate: "slide"
//   });

//   var exampleOpened = $("#example-opened");
//   exampleOpened.selectX({
//     open: true
//   });

//   var exampleSelectedIndex = $("#example-selected-index");
//   exampleSelectedIndex.selectX({
//     selected: 1
//   });

//   var exampleSelectedValue = $("#example-selected-value");
//   exampleSelectedValue.selectX({
//     selected: "option1"
//   });
// });

//Закрытие при нажатии "очистить"
// $('.reset').on("click.selectX", function () {
//   $(".jq-selectx").each(function () {
//     $(this).data("SelectX").close();
//   });
// });
//Закрытие при нажатии "применить"
// $('.apply').on("click.selectX", function () {
//   $(".jq-selectx").each(function () {
//     $(this).data("SelectX").close();
//   });
// });



$(function() {
//Закрытие при нажатии "применить"
// $('.apply').on("click.selectX", function () {
//   $(".jq-selectx").each(function () {
//     $(this).data("SelectX").close();
//   });
// });

});