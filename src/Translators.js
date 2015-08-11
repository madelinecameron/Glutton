var config = require('./config.json');
var _ = require('lodash');
// This is all just so stupid. Please don't read this.

var currentScope = this;  //Let's abuse JS scoping! :D

module.exports.translateCustomer = function(data, provider) {
  var translatedCustomer = {};
  var translatedKeys = {};
  switch(provider.toUpperCase()) {
    case "DOMINOS":
      translatedKeys = config["Dominos"].Objects.Customer;
      break;
    case "PIZZAHUT":
      translatedKeys = config["PizzaHut"].Objects.Customer;
      break;
    case "JIMMYJOHNS":
      translatedKeys = config["JimmyJohns"].Objects.Customer;
      break;
  }
  var keys = Object.keys(data);
  console.log(keys);
  for(var key in keys) {
    if(key !== "Address") {
      translatedCustomer[configkey] = data[keys];
    }
    else {
      var translatedAddress = currentScope.translateAddress(data[keys], provider);
      translatedCustomer["Address"] = translatedAddress;
    }
  }
  console.log(translatedCustomer)
  return translatedCustomer;
}

module.exports.translateAddress = function(data, provider) {
  return "STUFF";
}

module.exports.translate = function(data, provider) {

}
