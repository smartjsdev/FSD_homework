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
      let text = $this.find('.blockTitle').html();
      let items = list.find('.item');
      let apply = document.createElement('div');
      let applyClass = $this.find('.buttonDropdown').children().first().attr('class');
      apply.className = applyClass;
      //Добавить видимость "очистить" при клике по increment
      list.find('.increment.itemCounter__increment').click(function (event) {
        $($this).find('.list__blockTitle_reset').addClass('list__blockTitle_resetVisible');
      });
      //Убирает видимость "очистить" при клике по decrement, когда сумма = 0
      list.find('.decrement.itemCounter__decrement').click(function (event) {
        let valueArr = $($this).find('.value.blockTitle__value').text().split("").map(Number);
        let valueSum = valueArr.reduce((a, b) => a + b, 0);
        if(valueSum == 0) {
          $($this).find('.list__blockTitle_reset').removeClass('list__blockTitle_resetVisible');
        }
      });
      // Расчет суммы, заполнение заголовка
      // и закрытие панели при клике по "применить"
      list.find('.list__blockTitle_apply').click(function (event) {
        list.find('.list__blockTitle_reset').removeClass('list__blockTitle_resetVisible');
        let value = items.find('.itemCounter__blockTitle_value:not([value])');
        let valueArr = value.text().split("");
        let unique = items.find('[value]');
        let uniqueArr = unique.text().split("");
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

        titleString(valueArr,  valueSum, value);
        titleString(uniqueArr,  uniqueSum, unique);

        let title = strArr.join(', ');
        if(title !== title || title == '') {
          apply.innerHTML = text;  
        } else {
          apply.innerHTML = title;
        }
        $this.find('.buttonDropdown').children().first().replaceWith(apply);
        $(".jq-selectx").each(function () {
          $(this).data("SelectX").close();
        });
      });
      //Сброс счетчиков и закрытие панели, при клике по "очистить"
      list.find('.list__blockTitle_reset').click(function (event) {
        //Добавление и сбросс классов подцветки и видимости
        $(this).removeClass('list__blockTitle_resetVisible');
        $($this).find('.itemCounter__blockTitle_decrement').removeClass('itemCounter__blockTitle_darkShade050');
        $($this).find('.itemCounter__blockTitle_decrement').addClass('itemCounter__blockTitle_darkShade025');
        $($this).find('.itemCounter__blockTitle_increment').removeClass('itemCounter__blockTitle_darkShade025');
        $($this).find('.itemCounter__blockTitle_increment').addClass('itemCounter__blockTitle_darkShade050');

        for(let i = 0; i < items.length; i++) {
          let reset = document.createElement('div');
          reset.className = 'blockTitle itemCounter__blockTitle itemCounter__blockTitle_value';
          reset.innerHTML = '0';
          let item =  items[i];
          let $value = $(item).find('.itemCounter__blockTitle_value');
          let $valueAttr = $value.attr('value');
          let $valueData = $value.attr('data-plural');
          $(reset).attr('value', $valueAttr);
          $(reset).attr('data-plural', $valueData);
          $value.replaceWith(reset);
        }
        $this.find('.buttonDropdown').children().first().replaceWith(apply);
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
      let valueArr = this.$list.find('.itemCounter__blockTitle_value').text().split("").map(Number);
      let valueSum = valueArr.reduce((a, b) => a + b, 0);
      if(valueSum > 0) {
          this.$list.find('.list__blockTitle_reset').addClass("list__blockTitle_resetVisible");
      }
      //Скрытие apply и reset в случае, когда все item уникальны
      if(this.$list.find('.itemCounter__blockTitle_value').length == this.$list.find('[value]').length) {
        this.$list.find('.list__blockTitle_apply').attr('style', 'display: none;');
        this.$list.find('.list__blockTitle_reset').attr('style', 'display: none;');
      }
      this.$element.addClass("expanded");
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
      this.$list.find('.list__blockTitle_reset').removeClass("list__blockTitle_resetVisible");
      this.$element.removeClass("expanded");
      if (typeof this.config.onClose === "function") {
        this.config.onClose.call(this.$element);
      }
    }
  }

}(jQuery || window.jQuery, document, window));