$.fn.datepicker.defaults.format = "yyyy-mm-dd";
$('.datepicker').datepicker();

$('#infogasignatur').click(function(e) {
  e.preventDefault();
  toastr.info('Signatur infogad');
  var namn = $('#user').text();
  var datum = moment().format('YYYY-MM-DD HH:mm:ss');
  var sign = namn + ' ' + datum + ": \n";
  $('#info').prepend(sign);
});

if ($('#edit_activity').length) {
  $('body').css('background-color', '#CADDEC');
}
