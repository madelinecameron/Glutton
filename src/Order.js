'use strict'

var _ = require('lodash');
var utility = require('./Utilities');
var promise = require('promise');

var Order = function(parameters) {
    this.Type = "Order";
    this.Customer = parameters.Customer;
    this.Items = parameters.Items;

    if(this.Items !== []) {
        var index = 0;
        for(var item in this.Items) {
            this.Items[index++].ID = index;
        }
    }

    this.StoreID = parameters.StoreID;
    this.Provider = parameters.Provider.trim();
    this.DeliveryMethod = parameters.DeliveryMethod ? parameters.DeliveryMethod : 'Delivery'
}

Order.prototype.addItem = function(Item) {
    //If an identical item already exists
    var itemIndex = this.Items.indexOf(Item);
    Item.ID = this.Items.length + 1;
    if (itemIndex !== -1) {
        var modifiedItem = this.Items[itemIndex];
        modifiedItem.Quantity += 1;
        this.Items = this.Items.splice(itemIndex, 1, modifiedItem);
    }
    else {
      this.Items.push(Item);
    }
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
  // if()
  // var itemToModify = _.findIndex(this.Items, function(Item) {
  //   return Item.Name == name;
  // });

}

Order.prototype.modifyItemByIndex = function(index, modifyParams) {

}

Order.prototype.price = function() {
}

Order.prototype.place = function() {
    return utility.post(this, 'Dominos', 'Price');
}

Order.prototype.validate = function() {  //Dominos only
  if(this.Provider !== 'Dominos') return utility.errorMessage(false, 'This method is only avaliable for Dominos orders!');
  else {
      console.log("Validating..."); 
      return utility.post(this, 'Validate');
  }
}

module.exports = Order;
