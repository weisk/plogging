$(function() {
  $('#subject')[0].focus();

  $('#add-form').on('keydown', '#verb', addMod);
  $('#add-form').submit(submitAdd);
  $('.delete-form').submit(submitDelete);
});

var modCount = 0;

function addMod(e) {
  if ( e.which === 9 && !e.shiftKey ) {
    $('#mods').append(createModLine(modCount));
    $('#mod-' + modCount).on('keydown', '#value-' + modCount, addMod);
    modCount++;
  }
}

function createModLine(modCount) {
  return '<div id="mod-' + modCount + '">' +
         createTag(modCount) +
         createValue(modCount) +
         '</div>\n';
}

function createTag(modCount) {
  var id = '"tag-' + modCount + '"'
  return '<input class="add-line tag" id=' + id +
         'type="text" name=' + id +
         ' placeholder="for" required autocapitalize="none">\n';
}

function createValue(modCount) {
  var id = '"value-' + modCount + '"'
  return '<input class="add-line value" id=' + id +
         'type="text" name=' + id +
         ' placeholder="lulz" required autocapitalize="none">\n';
}

function submitAdd() {
  var raw = {};
  $('#add-form').serializeArray().forEach(function(elem) {
    raw[elem.name] = elem.value;
  });
  var mods = [];
  var i;
  for ( i = 0; ('tag-' + i) in raw; i++ ) {
    mods.push({
      tag:   raw['tag-' + i],
      value: raw['value-' + i]
    });
  }
  console.log(raw);
  var data = {
    subject: raw.subject,
    verb:    raw.verb,
    mods:    mods
  };

  $.post('/add', data, function(json) {
    console.log(json);
    location.reload(true);
  }, 'json');

  return false;
}

function submitDelete(e) {
  var uuid = $(this).children('.delete-uuid').val();

  $.post('/delete', {uuid: uuid}, function(json) {
    console.log(json);
    location.reload(true);
  }, 'json');

  return false;
}
