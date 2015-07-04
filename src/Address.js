'use strict'

var _ = require('lodash');
var utilities = require('Utilities');

var Address = function(parameters) {
  try {
    switch(typeof parameters) {  // Capable of handling JSON, Array or String
      case 'Object':
        this.Street = parameters.Street;
        this.City = parameters.City;
        this.State = parameters.State;
        this.Zip = parameters.Zip;
        break;
      case 'String':
        parseAddressFromString(parameters);
        break;
      default:
        switch(parameters.length) {
          case 4:
            this.Street = parameters[0];
            this.City = parameters[1];
            this.State = parameters[2];
            this.Zip = parameters[3];
            break;
          case 3:
            this.City = parameters[0];
            this.State = parameters[1];
            this.Zip = parameters[2];
            break;
          case 2:
            this.State = parameters[0];
            this.Zip = parameters[1];
            break;
          case 1:
            if(_.isNumber(parameters[0])) {  //If it can be parsed to a number, it must be the zip else it is the state
              this.Zip = parameters[0];
            }
            else {
              this.State = parameters[0];
            }
            break;
          default:
            throw 'Arrays of %SIZE% size aren\'t parseable!'.replace('%SIZE%', paramsters.size);
        }
    }
  }
  catch(Exception e) {
    throw e;
  }
}

Address.prototype.parseAddressFromString = function(addressString) {
  try {
    var addressSplit = addressString.split(',');
    switch(addressSplit.length) {
      case 4:
        this.Street = addressSplit[0];
        this.City = addressSplit[1];
        this.State = addressSplit[2];
        this.Zip = addressSplit[3];
        break;
      case 3:
        this.City = addressSplit[0];
        this.State = addressSplit[1];
        this.Zip = addressSplit[2];
        break;
      case 2:
        this.State = addressSplit[0];
        this.Zip = addressSplit[1];
        break;
      case 1:
        if(_.isNumber(addressString[0])) {  //If it can be parsed to a number, it must be the zip else it is the state
          this.Zip = addressString[0];
        }
        else {
          this.State = addressString[0];
        }
        break;

    }
  }
  catch(Exception e) {
    throw e;
  }
}

module.exports = Address;
