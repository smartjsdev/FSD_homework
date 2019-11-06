; (function ($, document, window) {
  "use strict";

  // // close select extended on clicking anywhere
  // $(document).on("click.selectX", function () {
  //   $(".jq-selectx").each(function () {
  //     $(this).data("SelectX").close();
  //   });
  // });

  // close on pressing "esc"
  $(window).on("keyup.selectX", function (event) {
    if (event.which === 27) {
      $(".jq-selectx").each(function () {
        $(this).data("SelectX").close();
      });
    }
  });

  // Select Extended Class
  var SelectX = function (element, config) {

    var defaults = {
      selected: null,
      animate: false,
      open: false,
      onClose: function () { },
      onOpen: function () { },
      onSelect: function () { }
    };

    // extend default options, apply custom options
    config = $.extend(defaults, config);

    // adding jQuery wrapper, add plugin class
    var $element = $(element).addClass("jq-selectx");

    // self referencing element
    $element.data("SelectX", this);

    // catching elements for binding and referencing
    var $input = $element.find("input");
    var $trigger = $element.find(".buttonDropdown");
    var $list = $element.find(".list");
    var $text = $trigger.children().first();
    var $items = $list.find(".item");

    // selected option
    var selected = {
      value: null,
      index: null,
      label: null
    };

    // adding to this
    var select = this;
    this.$items = $items;
    this.$text = $text;
    this.selected = selected;
    this.$element = $element;
    this.$list = $list;
    this.config = config;
    this.$input = $input;
    this.update = update;

    /* check configuration */

    // adding animation class
    if (config.animate) {
      $list.addClass("jq-selectx-" + config.animate);
    }

    // check to start opened
    if (config.open) {
      $list.addClass("open");
    }

    // select selected option
    if (config.selected !== null) {
      this.selectOption(config.selected);
    }

    /* binding events */

    // open / close
    $trigger.click(toggle);

    // get all options and bind event
    update();

    function toggle(event) {
      event.stopPropagation();
      event.preventDefault();

      // closing every other dropdown
      $(".jq-selectx").each(function () {
        if ($(this).has($trigger).length === 0 && $(this).find("ul").is(".open")) {
          $(this).data("SelectX").close();
        }
      });

      // toggle list
      if (config.open === true) {
        select.close();
      } else {
        select.open();
      }
    }

    function update() {
      /*jshint validthis: true */
      $items = $list.find(".item");

      $items.on("click", function (event) {

        var $item = $(this);
        // get index of item
        var index = $item.index();
        select.selectOption(index);

        if (typeof config.onSelect === "function") {
          config.onSelect.call($item, select.selected);
        }
      });

    }
  };

  SelectX.prototype.selectOption = selectOption;
  SelectX.prototype.close = close;
  SelectX.prototype.open = open;

  $.fn.selectX = init;

  function init() {

    this.fadeIn('normal', function () {
      // Обьявление переменных и создание элементов
      // для кнопок очистить и применить
      let $this = $(this);
      let list = $this.find('.list');
      let text = $this.find('.text').html();
      let items = list.find('.item');
      let apply = document.createElement('div');
      
      
      apply.className = 'text buttonDropdown__text';
      
      // Расчет суммы, заполнение заголовка
      // и закрытие панели при клике по "применить"
      list.find('.list__item_apply').click(function (event) {
        console.log('------------------NEW CLICK-------------------')
        let value = items.find('.value:not([value])');
        let valueArr = value.text().split("");
        let unique = items.find('[value]');
        let uniqueArr = unique.text().split("");
        let valueSum = 0;
        let uniqueSum = {};
        // let uniqueStr = '';
        // let valueStr = '';
        let strArr = [];

        let titleString = function(arr, sum, val){
          let str = '';
          for (let k = 0; k < arr.length; k++) {
            console.log('K ' + k);
            
            let data = JSON.parse($(val[k]).attr('data-plural'));
            // console.log(arr);
            if (val.attr('value')) {
              sum = {};
              sum[k] = arr[k];
              sum = sum[k];
              // console.log('SumU ' + sum);
              madeStr(sum);
            } else {
              console.log('arrL ' + k + '==' + arr.length);
              if((k + 1)==arr.length) {
                sum += +arr[k];
                madeStr(sum);
              } else {
                sum += +arr[k];
              }
              console.log('SumV ' + sum);
              
            }
            console.log('SUM ' + sum);
            
            function madeStr() {
              str = '';
              if(sum == 0){
                str += '';
                // strArr.push(str);
                // console.log('StrArr ' + strArr);
              }else if(sum == 1) {
                str += sum + ' ' + data.single;
                console.log('str: ' + str);
                strArr.push(str);
                console.log('StrArr ' + strArr);
              } else if(sum > 1 && sum < 5) {
                str += sum + ' ' + data.numbering;
                console.log('str: ' + str);
                strArr.push(str);
                console.log('StrArr ' + strArr);
              } else if(sum > 4 && sum < 21) {
                str += sum + ' ' + data.plural;
                console.log('str: ' + str);
                strArr.push(str);
                console.log('StrArr ' + strArr);
              }
              return str = strArr.join(', ');
            };
            
          }
          
            
            // console.log('Str ' + str);
            
          return str;
        };

        // for (let k = 0; k < uniqueArr.length; k++) {
        //   let uniqueData = JSON.parse($(unique[k]).attr('data-plural'));
        //   uniqueSum = uniqueArr[k];
        //   if(uniqueSum == 1) {
        //     uniqueStr += ', ' + uniqueSum + ' ' + uniqueData.single;
        //   } else if(uniqueSum > 1 && uniqueSum < 5) {
        //     uniqueStr += uniqueSum + ' ' + uniqueData.numbering;
        //   } else if(uniqueSum > 4 && uniqueSum < 21) {
        //     uniqueStr += uniqueSum + ' ' + uniqueData.plural;
        //   }
        // }

        // for (let k = 0; k < valueArr.length; k++) {
        //   let valueData = JSON.parse($(value[k]).attr('data-plural'));
        //   valueSum += +valueArr[k];
        //     if(valueSum == 1) {
        //     valueStr = valueSum + ' ' + valueData.single;
        //   } else if(valueSum > 1 && valueSum < 5) {
        //     valueStr = valueSum + ' ' + valueData.numbering;
        //   } else if(valueSum > 4 && valueSum < 21) {
        //     valueStr = valueSum + ' ' + valueData.plural;
        //   }
        // }
        // let title =
        titleString(valueArr,  valueSum, value);
        // + 
        titleString(uniqueArr,  uniqueSum, unique);
        console.log(strArr);
        let title = strArr.join(', ');
        // let title = valueStr + uniqueStr;
        // console.log(title);
        if(title !== title || title == '') {
          apply.innerHTML = text;  
        } else {
          apply.innerHTML = title;
        }
        $this.find('.text').replaceWith(apply);
        $(".jq-selectx").each(function () {
          $(this).data("SelectX").close();
        });
      });
      //Сброс счетчиков и закрытие панели, при клике по "очистить"
      list.find('.list__item_reset').click(function (event) {
        for(let i = 0; i < items.length - 2; i++) {
          let reset = document.createElement('div');
          reset.className = 'value itemCounter__value';
          reset.innerHTML = '0';
          let item =  items[i];
          let $value = $(item).find('.value');
          let $valueAttr = $value.attr('value');
          let $valueData = $value.attr('data-plural');
          $(reset).attr('value', $valueAttr);
          $(reset).attr('data-plural', $valueData);
          $value.replaceWith(reset);
        }
        $this.find('.text').replaceWith(apply);
        apply.innerHTML = text;
        $(".jq-selectx").each(function () {
          $(this).data("SelectX").close();
        });
      })
    })
    

    /*jshint validthis: true */
    var args = arguments;
    return this.each(function () {
      if ($(this).data("SelectX")) {
        if (typeof args[0] === "string") {
          try {
            $(this).data("SelectX")[args[0]](args[1]);
          }
          catch (err) {
            console.error("Select Extended has no method " + args[0]);
          }
        } else {
          console.warn("Select Extended already initialized");
        }
      } else {
        if (typeof args[0] === "object" || args[0] === undefined || args[0] === null) {
          new SelectX(this, args[0]);
        }
      }
    });
  }

  function selectOption(value) {
    /*jshint validthis: true */
    var $items = this.$items;
    var $text = this.$text;
    var selected = this.selected;
    var $input = this.$input;
    var $option = null;

    // find selected option
    if (value === parseInt(value, 10)) {
      // find option by index
      $option = $items.eq(value);
      selected.index = value;
    } else {
      // find option by value
      $items.each(function (index) {
        if ($(this).attr("value") === value) {
          $option = $(this);
          selected.index = index;
          return true;
        }
      });
    }

    // set selected
    selected.value = $option.attr("value");
    selected.label = $option.text();

    // set input value
    $input.val(selected.value || selected.index);

    // change trigger text and change item class
    // $text.text(selected.label);
    $option.addClass("selected").siblings().removeClass("selected");
  }

  function open() {
    /*jshint validthis: true */
    if (this.config.open === false) {
      this.config.open = true;
      this.$list.addClass("open");

      if (typeof this.config.onOpen === "function") {
        this.config.onOpen.call(this.$element);
      }
    }
  }

  function close() {
    /*jshint validthis: true */
    if (this.config.open === true) {
      this.config.open = false;
      this.$list.removeClass("open");

      if (typeof this.config.onClose === "function") {
        this.config.onClose.call(this.$element);
      }
    }
  }

}(jQuery || window.jQuery, document, window));