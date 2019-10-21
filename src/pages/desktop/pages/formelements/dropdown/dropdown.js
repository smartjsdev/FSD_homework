$("#example").selectX();
var i=0;
$('.increment').click(function () {
  i++;
  document.getElementById('value').innerHTML = i;
});

$('.decrement').click(function () {
  if (i > 0) {
    i--;
    document.getElementById('value').innerHTML = i;
  }
});

$('#reset').click(function () {
  i = 0;
  document.getElementById('value').innerHTML = i;
});

$('#apply').click(function () {
  document.getElementById('value2').innerHTML = i;
});

$('.reset').on("click.selectX", function () {
  $(".jq-selectx").each(function () {
    $(this).data("SelectX").close();
  });
});

$('.accept').on("click.selectX", function () {
  $(".jq-selectx").each(function () {
    $(this).data("SelectX").close();
  });
});