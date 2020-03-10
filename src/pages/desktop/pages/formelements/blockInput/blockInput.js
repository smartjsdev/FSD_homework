//Подключение маски
$("*[class*='__blockInput_masked']").mask('00.00.0000', {'translation': {0: {pattern: /[0-9*]/}}});

; (function ($, document, window) {
    'use strict';
    
    // // close select extended on clicking anywhere
    // $(document).on('click.selectX', function () {
        //   $('.jq-selectx').each(function () {
            //     $(this).data('SelectX').close();
            //   });
            // });
            
            // close on pressing 'esc'
            $(window).on('keyup.selectX', function (event) {
                if (event.which === 27) {
                    console.log($('form[class*="__blockInput_dropdown"]'));
                    $('form[class*="__blockInput_dropdown"]').each(function () {
                        $(this).data('SelectX').close();
                    });
                }
            });
            
            // Select Extended Class
            let SelectX = function (element, config) {
                
                let defaults = {
                    selected: null,
                    animate: false,
                    open: false,
                    onClose: function () { },
                    onOpen: function () { },
                    // onSelect: function () { }
                };
                
                // extend default options, apply custom options
                config = $.extend(defaults, config);
                
                // adding jQuery wrapper, add plugin class
                let $element = $(element);
                let parentName = $element.parent().attr('class').split(' ')[0];
                let elementName = $element.attr('class').split(' ')[0];
                let elementClass = 'jq-' + parentName + '__' + elementName;
                $element.addClass(elementClass);
                
                // self referencing element
                $element.data('SelectX', this);
                
                // catching elements for binding and referencing
                let $input = $element.find('input');
                let $trigger = $element;
                let $list = $element.find('.list');
                let $text = $($trigger).find('input');
                let $items = $list.find('.item');
                
                // selected option
                let selected = {
                    value: null,
                    index: null,
                    label: null
                };
                
                // adding to this
                let select = this;
                this.$items = $items;
                this.$text = $text;
                this.selected = selected;
                this.$element = $element;
                this.elementClass = elementClass;
                this.$list = $list;
                this.config = config;
                this.$input = $input;
                // this.update = update;
                
                /* check configuration */          
                // check to start opened
                if (config.open) {
                    $list.addClass('open');
                }
                
                // // select selected option
                // if (config.selected !== null) {
                //     this.selectOption(config.selected);
                // }
                
                /* binding events */
                
                // open / close
                $element.click(toggle);
                
                // // get all options and bind event
                // update();
                
                function toggle(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    
                    // console.log($(this));
                // // closing every other dropdown
                // $(this).each(function () {
                //     if ($(this).has($trigger).length === 0 && $(this).find('ul').is('.open')) {
                //         $(this).data('SelectX').close();
                //     }
                // });
        
        // toggle list
        if (config.open === true) {
            select.close();
        } else {
            // console.log(select);
            select.open();
        }
    }
    
    // function update() {
    //     /*jshint validthis: true */
    //     $items = $list.find('.item');
    //     $items.on('click', function (event) {
            
    //         let $item = $(this);
    //         // get index of item
    //         let index = $item.index();
    //         select.selectOption(index);
            
    //         if (typeof config.onSelect === 'function') {
    //             config.onSelect.call($item, select.selected);
    //         }
    //     });
        
    // }
};

// SelectX.prototype.selectOption = selectOption;
SelectX.prototype.close = close;
SelectX.prototype.open = open;

$.fn.selectX = init;

function init() {
    
    this.fadeIn('normal', function () {
        // Обьявление переменных и создание элементов
        // для кнопок очистить и применить
        let $this = $(this);
        let $list = $this.find('.list');
        let text = $this.find('.blockTitle').html();
        let $items = $list.find('.item');
        let apply = document.createElement('input');
        let applyClass = $this.find('input').attr('value');
        console.log(applyClass);
        apply.className = applyClass;
        //Добавить видимость 'очистить' при клике по increment
        $list.find('.increment.itemCounter__increment').click(function (event) {
            $($this).find('.reset.list__reset').addClass('list__reset_visible');
        });
        //Убирает видимость 'очистить' при клике по decrement, когда сумма = 0
        $list.find('.decrement.itemCounter__decrement').click(function (event) {
            let valueArr = $($this).find('.blockTitle.value__blockTitle').text().split('').map(Number);
            let valueSum = valueArr.reduce((a, b) => a + b, 0);
            if(valueSum == 0) {
                $($this).find('.reset.list__reset').removeClass('list__reset_visible');
            }
        });
        // Расчет суммы, заполнение заголовка
        // и закрытие панели при клике по 'применить'
        $list.find('.apply.list__apply').click(function (event) {
            $list.find('.reset.list__reset').removeClass('.list__reset_visible');
            let $value = $items.find('.blockTitle.value__blockTitle:not([value])');
            let valueArr = $value.text().split('');
            let $unique = $items.find('[value]');
            let uniqueArr = $unique.text().split('');
            let valueSum = 0;
            let uniqueSum = {};
            let strArr = [];
            //Функция создания строки
            let titleString = function(arr, sum, val){
                let str = '';
                for (let k = 0; k < arr.length; k++) {
                    let data = JSON.parse($(val[k]).attr('data-plural'));
                    if (val.attr('value')) {
                        sum = {};
                        sum[k] = arr[k];
                        sum = sum[k];
                        madeStr(sum);
                    } else {
                        if((k + 1)==arr.length) {
                            sum += +arr[k];
                            madeStr(sum);
                        } else {
                            sum += +arr[k];
                        }
                    }
                    
                    function madeStr() {
                        str = '';
                        if(sum == 0){
                            str += '';
                        }else if(sum == 1) {
                            str += sum + ' ' + data.single;
                            strArr.push(str);
                        } else if(sum > 1 && sum < 5) {
                            str += sum + ' ' + data.numbering;
                            strArr.push(str);
                        } else if(sum > 4 && sum < 21) {
                            str += sum + ' ' + data.plural;
                            strArr.push(str);
                        }
                    };
                }
                return str;
            };
            
            titleString(valueArr,  valueSum, $value);
            titleString(uniqueArr,  uniqueSum, $unique);
            
            let title = strArr.join(', ');
            if(title !== title || title == '') {
                apply.innerHTML = text; 
            } else {
                apply.innerHTML = title;
            }
            // console.log(apply); 
            $this.find('input').replaceWith(apply);
            $('form[class*="__blockInput_dropdown"]').each(function () {
                $(this).data('SelectX').close();
            });
        });
        //Сброс счетчиков и закрытие панели, при клике по 'очистить'
        $list.find('.reset.list__reset').click(function (event) {
            //Добавление и сбросс классов подсветки и видимости
            $(this).removeClass('list__reset_visible');
            $($this).find('.blockTitle.decrement__blockTitle').removeClass('decrement__blockTitle_darkShade050');
            $($this).find('.blockTitle.decrement__blockTitle').addClass('decrement__blockTitle_darkShade025');
            $($this).find('.blockTitle.increment__blockTitle').removeClass('increment__blockTitle_darkShade025');
            $($this).find('.blockTitle.increment__blockTitle').addClass('increment__blockTitle_darkShade050');
            
            for(let i = 0; i < $items.length; i++) {
                let reset = document.createElement('div');
                reset.className = 'blockTitle value__blockTitle value__blockTitle_montserratBold';
                reset.innerHTML = '0';
                let item =  $items[i];
                let $value = $(item).find('.blockTitle.value__blockTitle');
                let valueAttr = $value.attr('value');
                let valueData = $value.attr('data-plural');
                $(reset).attr('value', valueAttr);
                $(reset).attr('data-plural', valueData);
                $value.replaceWith(reset);
            }
            $this.find('input').replaceWith(apply);
            apply.innerHTML = text;
            $this.each(function () {
                $(this).data('SelectX').close();
            });
        })
    })
    
    
    /*jshint validthis: true */
    let args = arguments;
    return this.each(function () {
        if ($(this).data('SelectX')) {
            if (typeof args[0] === 'string') {
                try {
                    $(this).data('SelectX')[args[0]](args[1]);
                }
                catch (err) {
                    console.error('Select Extended has no method ' + args[0]);
                }
            } else {
                console.warn('Select Extended already initialized');
            }
        } else {
            if (typeof args[0] === 'object' || args[0] === undefined || args[0] === null) {
                new SelectX(this, args[0]);
            }
        }
    });
}

// function selectOption(value) {
//     /*jshint validthis: true */
//     let $items = this.$items;
//     let $text = this.$text;
//     let selected = this.selected;
//     let $input = this.$input;
//     let $option = null;
    
//     // find selected option
//     if (value === parseInt(value, 10)) {
//         // find option by index
//         $option = $items.eq(value);
//         selected.index = value;
//     } else {
//         // find option by value
//         $items.each(function (index) {
//             if ($(this).attr('value') === value) {
//                 $option = $(this);
//                 selected.index = index;
//                 return true;
//             }
//         });
//     }
    
//     // // set selected
//     // selected.value = $option.attr('value');
//     // selected.label = $option.text();
    
//     // // set input value
//     // $input.val(selected.value || selected.index);
    
//     // // change trigger text and change item class
//     // // $text.text(selected.label);
//     // $option.addClass('selected').siblings().removeClass('selected');
// }

function open() {
    /*jshint validthis: true */
    if (this.config.open === false) {
        console.log('was closed');
        this.config.open = true;
        this.$list.addClass('open');
        let valueArr = this.$list.find('.blockTitle.blockTitle.value__blockTitle').text().split('').map(Number);
        let valueSum = valueArr.reduce((a, b) => a + b, 0);
        if(valueSum > 0) {
            this.$list.find('.reset.list__reset').addClass('list__reset_visible');
        }
        //Скрытие apply и reset в случае, когда все item уникальны
        if(this.$list.find('.blockTitle.value__blockTitle').length == this.$list.find('[value]').length) {
            this.$list.find('.apply.list__apply').attr('style', 'display: none;');
            this.$list.find('.reset.list__reset').attr('style', 'display: none;');
        }
        this.$element.addClass(this.$element.parent().attr('class').split(' ')[0] + '__blockInput_expanded');
        if (typeof this.config.onOpen === 'function') {
            this.config.onOpen.call(this.$element);
        }
    }
}

function close() {
    /*jshint validthis: true */
    if (this.config.open === true) {
        console.log('was opened');
            this.config.open = false;
            this.$list.removeClass('open');
            this.$list.find('.reset.list__reset').removeClass('list__reset_visible');
            this.$element.removeClass(this.$element.parent().attr('class').split(' ')[0] + '__blockInput_expanded');
            if (typeof this.config.onClose === 'function') {
                this.config.onClose.call(this.$element);
            }
        }
    }
    
}(jQuery || window.jQuery, document, window));

//Подключение счетчика
import './__item/blockInput__item';
//Активация dropdown
// $('form[class*="__blockInput_dropdown"]').selectX();


$(function() {
    // var exampleDefault = $('form[class*="__blockInput_default"]');
    // exampleDefault.selectX({
    //   onSelect: function (value) {
    //     console.log(this);
    //     console.log(value);
    //   }
    // });

    // var exampleAnimationFade = $("#example-animation-fade");
    // exampleAnimationFade.selectX({
    //   animate: "fade"
    // });

    // var exampleAnimationSlide = $("#example-animation-slide");
    // exampleAnimationSlide.selectX({
    //   animate: "slide"
    // });

    var exampleOpened = $('form[class*="__blockInput_opened');
    exampleOpened.selectX({
      open: true
    });
    var exampleOpened = $('form[class*="__blockInput_default');
    exampleOpened.selectX({
      open: false
    });

    // var exampleSelectedIndex = $("#example-selected-index");
    // exampleSelectedIndex.selectX({
    //   selected: 1
    // });

    // var exampleSelectedValue = $("#example-selected-value");
    // exampleSelectedValue.selectX({
    //   selected: "option1"
    // });
  });