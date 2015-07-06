'use strict'

var _ = require('lodash');
var cleanInput = require('./Utilities').cleanInput;

var Customer = function(parameters) {
  this.FirstName = parameters.FirstName;
  this.LastName = parameters.LastName;
  this.Address = parameters.Address;
  this.Email = parameters.Email;
  this.Phone = parameters.Phone;
}

Customer.prototype.getFullName = function() {
  return this.FirstName + ' ' + this.LastName;
}

module.exports = Customer;
