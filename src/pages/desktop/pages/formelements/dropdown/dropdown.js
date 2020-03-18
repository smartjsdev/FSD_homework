; (function ($, document, window) {
    'use strict';
    
    $.fn.dropdown = init;
    
    function init() {

        this.fadeIn('normal', function () {
            let $this = $(this);
            let $input = $this.find('.input');
            // Open and close dd  
            $input.click(function() {
                console.log($this);
                if($this.is('.box__dropdown_closed')) {
                    $this.removeClass('box__dropdown_closed');
                    $this.addClass('box__dropdown_expanded');
                } else if($this.is('.box__dropdown_expanded')) {
                    $this.removeClass('box__dropdown_expanded');
                    $this.addClass('box__dropdown_closed');
                }    
            });
            
            
            // //Сброс счетчиков и закрытие панели, при клике по 'очистить'
            // $list.find('.reset.list__reset').click(function (event) {
            //     //Добавление и сбросс классов подсветки и видимости
            //     $(this).removeClass('list__reset_visible');
            //     $($this).find('.blockTitle.decrement__blockTitle').removeClass('decrement__blockTitle_darkShade050');
            //     $($this).find('.blockTitle.decrement__blockTitle').addClass('decrement__blockTitle_darkShade025');
            //     $($this).find('.blockTitle.increment__blockTitle').removeClass('increment__blockTitle_darkShade025');
            //     $($this).find('.blockTitle.increment__blockTitle').addClass('increment__blockTitle_darkShade050');
    
            //     for(let i = 0; i < $items.length; i++) {
            //         let reset = document.createElement('div');
            //         reset.className = 'blockTitle value__blockTitle value__blockTitle_montserratBold';
            //         reset.innerHTML = '0';
            //         let item =  $items[i];
            //         let $value = $(item).find('.blockTitle.value__blockTitle');
            //         let valueAttr = $value.attr('value');
            //         let valueData = $value.attr('data-plural');
            //         $(reset).attr('value', valueAttr);
            //         $(reset).attr('data-plural', valueData);
            //         $value.replaceWith(reset);
            //     }


            //     $this.find('input').replaceWith(apply);
            //     apply.innerHTML = text;
            //     $this.each(function () {
            //         $(this).data('SelectX').close();
            //     });
            // })
            // // Made a title
            // let text = $this.find('.blockTitle').html();
            // let $items = $list.find('.item');
            // let apply = document.createElement('input');
            // let applyClass = $this.find('input').attr('value');
            // console.log(applyClass);
            // apply.className = applyClass;
            // //Добавить видимость 'очистить' при клике по increment
            // $list.find('.increment.itemCounter__increment').click(function () {
            //     $($this).find('.reset.list__reset').addClass('list__reset_visible');
            // });
            // //Убирает видимость 'очистить' при клике по decrement, когда сумма = 0
            // $list.find('.decrement.itemCounter__decrement').click(function (event) {
            //     let valueArr = $($this).find('.blockTitle.value__blockTitle').text().split('').map(Number);
            //     let valueSum = valueArr.reduce((a, b) => a + b, 0);
            //     if(valueSum == 0) {
            //         $($this).find('.reset.list__reset').removeClass('list__reset_visible');
            //     }
            // });
            // // Расчет суммы, заполнение заголовка
            // // и закрытие панели при клике по 'применить'
            // $list.find('.apply.list__apply').click(function (event) {
            //     $list.find('.reset.list__reset').removeClass('.list__reset_visible');
            //     let $value = $items.find('.blockTitle.value__blockTitle:not([value])');
            //     let valueArr = $value.text().split('');
            //     let $unique = $items.find('[value]');
            //     let uniqueArr = $unique.text().split('');
            //     let valueSum = 0;
            //     let uniqueSum = {};
            //     let strArr = [];
            //     //Функция создания строки
            //     let titleString = function(arr, sum, val){
            //         let str = '';
            //         for (let k = 0; k < arr.length; k++) {
            //             let data = JSON.parse($(val[k]).attr('data-plural'));
            //             if (val.attr('value')) {
            //                 sum = {};
            //                 sum[k] = arr[k];
            //                 sum = sum[k];
            //                 madeStr(sum);
            //             } else {
            //                 if((k + 1)==arr.length) {
            //                     sum += +arr[k];
            //                     madeStr(sum);
            //                 } else {
            //                     sum += +arr[k];
            //                 }
            //             }
    
            //             function madeStr() {
            //                 str = '';
            //                 if(sum == 0){
            //                     str += '';
            //                 }else if(sum == 1) {
            //                     str += sum + ' ' + data.single;
            //                     strArr.push(str);
            //                 } else if(sum > 1 && sum < 5) {
            //                     str += sum + ' ' + data.numbering;
            //                     strArr.push(str);
            //                 } else if(sum > 4 && sum < 21) {
            //                     str += sum + ' ' + data.plural;
            //                     strArr.push(str);
            //                 }
            //             };
            //         }
            //         return str;
            //     };
    
            //     titleString(valueArr,  valueSum, $value);
            //     titleString(uniqueArr,  uniqueSum, $unique);
    
            //     let title = strArr.join(', ');
            //     if(title !== title || title == '') {
            //         apply.innerHTML = text; 
            //     } else {
            //         apply.innerHTML = title;
            //     }
            //     // console.log(apply); 
            //     $this.find('input').replaceWith(apply);
            //     $('form[class*="__blockInput_dropdown"]').each(function () {
            //         $(this).data('SelectX').close();
            //     });
            // });
            
        // })
              
            
            
        });}

    } (jQuery || window.jQuery, document, window));

    
    $('.box__dropdown').dropdown();

//Подключение счетчика
import './__item/dropdown__item';