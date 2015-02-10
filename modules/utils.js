/**
 * Converts any string to a slug (This is the slug => this-is-the-slug)
 *
 * @param {string} text
 * @returns {string}
 */
exports.toSlug = function(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Converts a javascript date object into a readable date string
 * @param {date} d
 * @returns {string}
 */
exports.prettyDate = function(d) {
  var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

/**
 * Removes duplicate items in an array
 * @param {array} arr
 */
exports.uniqueArray = function(arr) {
  var u = {}
  var uniques = [];
  for (var i = 0; i < arr.length; i++) {
    if (u.hasOwnProperty(arr[i])) {
      continue;
    }
    uniques.push(arr[i]);
    u[arr[i]] = 1;
  }
}

/**
 * Looks up the notebook and returns the corresponding logo for that notebook
 * @param {string} notebook
 * @returns {string}
 */
exports.getNotebookIcon = function(notebook) {
  var dict = {
    'Programming': '<i class="fa fa-gears"></i>',
    'Miscellaneous': '<i class="fa fa-pencil"></i>',
    'Music': '<i class="fa fa-headphones"></i>',
    'Sports': '<i class="fa fa-futbol-o"></i>'
  };
  return dict[notebook];
}

/**
 * Converts plain text to html
 * @param {string} text
 * @returns {string}
 */
exports.toHtml = function(text) {
  return text
    .replace(/\t/g, '    ')
    .replace(/  /g, '&nbsp; ')
    .replace(/  /g, ' &nbsp;')
    .replace(/\r\n|\n|\r/g, '<br>');
}