exports.toSlug = function(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

exports.prettyDate = function(d) {
  var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

exports.uniqueArray = function(arr, cb) {
  var u = {}
  var uniques = [];
  for (var i = 0; i < arr.length; i++) {
    if (u.hasOwnProperty(arr[i])) {
      continue;
    }
    uniques.push(arr[i]);
    u[arr[i]] = 1;
  }
  if (cb) {
    cb(uniques);
  } else {
    return uniques;
  }
}

exports.getNotebookIcon = function(notebook) {
  var dict = {
    'Programming' : '<i class="fa fa-gears fa-lg"></i>',
    'Miscellaneous' : '<i class="fa fa-pencil"></i>',
    'Music' : '<i class="fa fa-headphones"></i>',
    'Sports' : '<i class="fa fa-futbol-o"></i>'
  };
  return dict[notebook];
}
