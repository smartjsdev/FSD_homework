; (function ($) {
    //Плагин счетчик для увеличения/уменьшения количества единиц
    $.fn.counter = function () {

        // нет необходимости писать $(this), так как "this" - это уже объект jQuery
        // выражение $(this) будет эквивалентно $($('#element'));

        this.fadeIn('normal', function () {

            // тут "this" - это элемент дерева DOM

            let $this = $(this);
            let $increment = $this.find('.increment');
            let $decrement = $this.find('.decrement');
            //Увеличение счетчика максимум до 6ти
            $increment.click(function () {
                let $value = $this.find('.value');
                let valueAttr = $value.attr('value');
                let valueData = $value.attr('data-plural');
                let value = +$value.text();
                let valueArr = $($this).find('.value').text().split("").map(Number);
                let valueSum = valueArr.reduce((a, b) => a + b, 0) + 1;
                if(valueSum >= 6) {
                    $this.find('.increment').removeClass('itemCounter__increment_visible');
                }
                $this.find('.decrement').addClass('itemCounter__decrement_visible');
                if(value >= 6) {
                    value = 6;
                } else {
                value += 1;
                }
                let incrementValue = document.createElement('div');
                incrementValue.className = 'value itemCounter__value';
                incrementValue.innerHTML = value;
                $(incrementValue).attr('value', valueAttr);
                $(incrementValue).attr('data-plural', valueData);
                $value.replaceWith(incrementValue);
            });
            //Уменьшение счетчика, но не менее нуля
            $decrement.click(function () {
                let $value = $this.find('.value');
                let valueAttr = $value.attr('value');
                let valueData = $value.attr('data-plural');
                let value = +$value.text();
                let valueArr = $($this).find('.value').text().split("").map(Number);
                let valueSum = valueArr.reduce((a, b) => a + b, 0) - 1;
                if(valueSum == 0) {
                    $this.find('.decrement').removeClass('itemCounter__decrement_visible');
                }
                if(value < 1) {
                    value = 0;
                } else {
                value -= 1;
                }
                let decrementValue = document.createElement('div');
                decrementValue.className = 'value itemCounter__value';
                decrementValue.innerHTML = value;
                $(decrementValue).attr('value', valueAttr);
                $(decrementValue).attr('data-plural', valueData);
                $value.replaceWith(decrementValue);
            });

        });

    };
})(jQuery);

$('.itemCounter').counter();