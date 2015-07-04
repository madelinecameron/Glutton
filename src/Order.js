'use strict'

var utility = require('Utilities');

var Order = function(parameters) {
  this.Customer = parameters.Customer;
  this.Items = parameters.Items;
  this.StoreID = parameters.StoreID;
  this.Type = parameters.Type;
  this.DeliveryMethod = parameters.DeliveryMethod ? parameters.DeliveryMethod : "Delivery"
}

Order.prototype.addItem = function(Item) {
  this.Items.push(Item);
}

Order.prototype.removeItemByName = function(name) {
  _.remove(this.Items, function(Item) {
    return Item.Name == name;
  });
}

Order.prototype.removeItemByIndex = function(index) {
  this.Items.splice(index, 1);
}

Order.prototype.modifyItemByName = function(name, modifyParams) {
  if()
  var itemToModify = _.findIndex(this.Items, function(Item) {
    return Item.Name == name;
  });


}

Order.prototype.modifyItemByIndex = function(index, modifyParams) {

}

Order.prototype.price = function() {
  if(!this.Type || this.StoreID)
}

Order.prototype.place = function() {

}

Order.prototype.check = function() {  //Dominos only
  if(this.Type !== "Dominos") return utility.errorMessage(false, "This method is only avaliable for Dominos orders!");
  else {

  }

}

module.exports = Address;
