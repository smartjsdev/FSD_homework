$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 15000,
      values: [ 5000, 10000 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.values[ 0 ].toLocaleString('ru-RU') + '₽' + " - " + ui.values[ 1 ].toLocaleString('ru-RU') + '₽' );
      }
    });
    $( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ).toLocaleString('ru-RU') +
      "₽ - " + $( "#slider-range" ).slider( "values", 1 ).toLocaleString('ru-RU') + '₽' );
  } );