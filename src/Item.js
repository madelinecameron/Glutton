'use strict'

var Item = function(parameters) {
  this.Name = parameters.Name;
  this.Code = parameters.Code;
  this.Size = parameters.Size;
}

Item.prototype.getFriendlyName = function() {

}
module.exports = Item;
