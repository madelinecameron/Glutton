var config = require('./config.json');

// This is all just so stupid. Please don't read this.

module.exports.translateCustomer = function(data, provider) {
  var dataStr = JSON.stringify(data);
  var removeEndBrackets = dataStr.substring(1, data.length - 1);
  var splitByNewline = dataStr.split(',');

  console.log(splitByNewline);
}

module.exports.translateAddress = function(data, provider) {

}

module.exports.translate = function(data, provider) {

}
