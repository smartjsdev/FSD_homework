; (function ($) {
    //Плагин счетчик для увеличения/уменьшения количества единиц
    $.fn.counter = function () {

        // нет необходимости писать $(this), так как "this" - это уже объект jQuery
        // выражение $(this) будет эквивалентно $($('#element'));

        this.fadeIn('normal', function () {

            // тут "this" - это элемент дерева DOM

            let $this = $(this);
            let $increment = $this.find('.itemCounter__blockTitle_increment');
            let $decrement = $this.find('.itemCounter__blockTitle_decrement');
            //Увеличение счетчика максимум до 6ти
            $increment.click(function () {
                let $value = $this.find('.itemCounter__blockTitle_value');
                let valueAttr = $value.attr('value');
                let valueData = $value.attr('data-plural');
                let value = +$value.text();
                let valueArr = $($this).find('.itemCounter__blockTitle_value').text().split("").map(Number);
                let valueSum = valueArr.reduce((a, b) => a + b, 0) + 1;
                if(valueSum >= 6) {
                    $this.find('.itemCounter__blockTitle_increment').removeClass('itemCounter__blockTitle_darkShade050');
                    $this.find('.itemCounter__blockTitle_increment').addClass('itemCounter__blockTitle_darkShade025');
                }
                $this.find('.itemCounter__blockTitle_decrement').addClass('itemCounter__blockTitle_darkShade050');
                $this.find('.itemCounter__blockTitle_decrement').removeClass('itemCounter__blockTitle_darkShade025');
                if(value >= 6) {
                    value = 6;
                } else {
                value += 1;
                }
                let incrementValue = document.createElement('div');
                incrementValue.className = 'blockTitle itemCounter__blockTitle itemCounter__blockTitle_value itemCounter__blockTitle_montserratBold';
                incrementValue.innerHTML = value;
                $(incrementValue).attr('value', valueAttr);
                $(incrementValue).attr('data-plural', valueData);
                $value.replaceWith(incrementValue);
            });
            //Уменьшение счетчика, но не менее нуля
            $decrement.click(function () {
                let $value = $this.find('.itemCounter__blockTitle_value');
                let valueAttr = $value.attr('value');
                let valueData = $value.attr('data-plural');
                let value = +$value.text();
                let valueArr = $($this).find('.itemCounter__blockTitle_value').text().split("").map(Number);
                let valueSum = valueArr.reduce((a, b) => a + b, 0) - 1;
                if(valueSum == 0) {
                    $this.find('.itemCounter__blockTitle_decrement').removeClass('itemCounter__blockTitle_darkShade050');
                    $this.find('.itemCounter__blockTitle_decrement').addClass('itemCounter__blockTitle_darkShade025');
                }
                if(valueSum < 6) {
                    $this.find('.itemCounter__blockTitle_increment').addClass('itemCounter__blockTitle_darkShade050');
                    $this.find('.itemCounter__blockTitle_increment').removeClass('itemCounter__blockTitle_darkShade025');
                }
                if(value < 1) {
                    value = 0;
                } else {
                value -= 1;
                }
                let decrementValue = document.createElement('div');
                decrementValue.className = 'blockTitle itemCounter__blockTitle itemCounter__blockTitle_value itemCounter__blockTitle_montserratBold';
                decrementValue.innerHTML = value;
                $(decrementValue).attr('value', valueAttr);
                $(decrementValue).attr('data-plural', valueData);
                $value.replaceWith(decrementValue);
            });

        });

    };
})(jQuery);

$('.itemCounter').counter();