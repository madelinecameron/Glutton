'use strict'

var _ = require('lodash');
var utilities = require('./Utilities');
var cleanInput = utilities.cleanInput

var Address = function(parameters) {
  try {
    switch(typeof parameters) {  // Capable of handling JSON, Array or String
      case 'object':
        if(parameters[0]) {  // If this exists, it is *not* JSON
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
              if(parameters[0].match(/(\d{5})(-{1}\d{4}){0,1}/g)) {  //If it can be parsed to a number, it must be the zip else it is the state
                this.Zip = parameters[0];
              }
              else {
                this.State = parameters[0];
              }
              break;
            default:
              throw 'Arrays of %SIZE% size aren\'t parseable!'.replace('%SIZE%', parameters.size);
          }
        }
        else {
          this.Street = parameters.Street;
          this.City = parameters.City;
          this.State = parameters.State;
          this.Zip = parameters.Zip;
        }
        break;
      case 'string':
        this.parseAddressFromString(parameters);
        break;
    }
  }
  catch(e) {
    throw e;
  }

  for(var t in this) {  //Clean up input, removing any 'bad' characters
    if(!_.isFunction(this[t])) {
      this[t] = cleanInput(this[t]);
    }
  }
}

Address.prototype.parseAddressFromString = function(addressString) {
  try {
    var addressSplit = addressString.split(',');
    switch(addressSplit.length) {
      case 4:
        this.Street = addressSplit[0].trim();
        this.City = addressSplit[1].trim();
        this.State = addressSplit[2].trim();
        this.Zip = addressSplit[3].trim();
        break;
      case 3:
        this.City = addressSplit[0].trim();
        this.State = addressSplit[1].trim();
        this.Zip = addressSplit[2].trim();
        break;
      case 2:
        this.State = addressSplit[0].trim();
        this.Zip = addressSplit[1].trim();
        break;
      case 1:
        if(addressString.match(/(\d{5})(-{1}\d{4}){0,1}/g)) {  //If it can be parsed to a number, it must be the zip else it is the state
          this.Zip = addressString.trim();
        }
        else {
          this.State = addressString.trim();
        }
        break;

    }
    return;
  }
  catch(e) {
    throw e;
  }
}

module.exports = Address;
