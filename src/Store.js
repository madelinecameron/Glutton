'use strict'

var utility = require('Utilities');

var Store = function(parameters) {
  this.Address = parameters.Address;
  this.ID = parameters.ID;
  this.Provider = parameters.Provider;
}

Store.prototype.getHours = function() {
  return utility.get(this.Provider, "Hours");  //Returns promise
}

Store.prototype.getMenu = function() {
  return utility.get(this.Provider, "Menu");  //Returns promise
}

Store.prototype.getCoupons = function() {
  return utility.errorMessage(false, "Currently disabled");
  //utility.get(this.Provider, "Coupons")
}

module.exports = Address;
