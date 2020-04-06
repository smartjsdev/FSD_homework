; (function ($) {
    //Плагин счетчик для увеличения/уменьшения количества единиц
    $.fn.counter = function () {

        // нет необходимости писать $(this), так как "this" - это уже объект jQuery
        // выражение $(this) будет эквивалентно $($('#element'));

        this.fadeIn('normal', function () {

            // тут "this" - это элемент дерева DOM

            let $this = $(this);
            let $increment = $this.find('.increment.itemCounter__increment');
            let $decrement = $this.find('.decrement.itemCounter__decrement');
            //Увеличение счетчика максимум до 6ти
            $increment.click(function () {
                let $value = $this.find('.blockTitle.value__blockTitle');
                let valueAttr = $value.attr('value');
                let valueData = $value.attr('data-plural');
                let value = +$value.text();
                let valueArr = $($this).find('.blockTitle.value__blockTitle').text().split("").map(Number);
                let valueSum = valueArr.reduce((a, b) => a + b, 0) + 1;
                if(valueSum >= 6) {
                    $increment.find('.blockTitle.increment__blockTitle').removeClass('increment__blockTitle_darkShade050');
                    $increment.find('.blockTitle.increment__blockTitle').addClass('increment__blockTitle_darkShade025');
                }
                $decrement.find('.blockTitle.decrement__blockTitle').removeClass('decrement__blockTitle_darkShade025');
                $decrement.find('.blockTitle.decrement__blockTitle').addClass('decrement__blockTitle_darkShade050');
                if(value >= 6) {
                    value = 6;
                } else {
                value += 1;
                }
                let incrementValue = document.createElement('div');
                incrementValue.className = 'blockTitle value__blockTitle value__blockTitle_montserratBold';
                incrementValue.innerHTML = value;
                $(incrementValue).attr('value', valueAttr);
                $(incrementValue).attr('data-plural', valueData);
                $value.replaceWith(incrementValue);
            });
            //Уменьшение счетчика, но не менее нуля
            $decrement.click(function () {
                let $value = $this.find('.blockTitle.value__blockTitle');
                let valueAttr = $value.attr('value');
                let valueData = $value.attr('data-plural');
                let value = +$value.text();
                let valueArr = $($this).find('.blockTitle.value__blockTitle').text().split("").map(Number);
                let valueSum = valueArr.reduce((a, b) => a + b, 0) - 1;
                if(valueSum == 0) {
                    $decrement.find('.blockTitle.decrement__blockTitle').removeClass('decrement__blockTitle_darkShade050');
                    $decrement.find('.blockTitle.decrement__blockTitle').addClass('decrement__blockTitle_darkShade025');
                }
                if(valueSum < 6) {
                    $increment.find('.blockTitle.increment__blockTitle').addClass('increment__blockTitle_darkShade050');
                    $increment.find('.blockTitle.increment__blockTitle').removeClass('increment__blockTitle_darkShade025');
                }
                if(value < 1) {
                    value = 0;
                } else {
                value -= 1;
                }
                let decrementValue = document.createElement('div');
                decrementValue.className = 'blockTitle value__blockTitle value__blockTitle_montserratBold';
                decrementValue.innerHTML = value;
                $(decrementValue).attr('value', valueAttr);
                $(decrementValue).attr('data-plural', valueData);
                $value.replaceWith(decrementValue);
            });

        });

    };
})(jQuery);

$('.itemCounter').counter();