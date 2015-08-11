'use strict'

var Item = function(parameters) {
  this.Name = parameters.Name;
  this.Code = parameters.Code;
  this.Size = parameters.Size;
  this.Options = parameters.Options;
}

Item.prototype.getFriendlyName = function() {

}
module.exports = Item;
