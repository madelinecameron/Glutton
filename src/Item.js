'use strict'

var Item = function(parameters) {
  this.ID = parameters.ID;
  this.Name = parameters.Name;
  this.Code = parameters.Code;
  this.Size = parameters.Size;
  this.Quantity = parameters.Quantity ? parameters.Quantity : 1;
  this.Options = parameters.Options;
}

Item.prototype.getFriendlyName = function() {

}
module.exports = Item;
