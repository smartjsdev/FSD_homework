// //Подключение маски
$("*[class*='__input_masked']").find('input').mask('00.00.0000', { 'translation': { 0: { pattern: /[0-9*]/ } } });