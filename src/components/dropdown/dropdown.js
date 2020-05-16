; (function ($, document, window) {
    'use strict';
    
    $.fn.dropdown = init;
    
    function init() {
        this.fadeIn('normal', function () {
            let $this = $(this);
            $this.click(function() {
                if($this.is('.dropdown_close')) {
                    $this.removeClass('dropdown_close');
                    $this.addClass('dropdown_open');
                } else if($this.is('.dropdown_open')) {
                    $this.removeClass('dropdown_open');
                    $this.addClass('dropdown_close');
                }    
            });           
        });
    }

    } (jQuery || window.jQuery, document, window));

    
$('.dropdown').dropdown();
