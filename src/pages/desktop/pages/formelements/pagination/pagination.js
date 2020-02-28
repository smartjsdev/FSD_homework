$(function() {
    $('.bar.pagination__bar').pagination({
        pages: 15,
        displayedPages: 3,
        edges: 1,
        prevText: 'arrow_backward',
        nextText: 'arrow_forward',
        itemsOnPage: 12,
        cssStyle: 'pagination__bar_themeLight'
    });
});