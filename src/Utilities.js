'use strict'

var request = require('request');
var promise = require('promise');
var config = require('./config.json');
var translators = require('./translators');

module.exports.translateObject = function(data, type, provider) {
  if(provider !== 'Dominos' && provider !== 'PizzaHut' && provider !== 'PizzaPI') {
    return errorMessage(false, 'Invalid provider parameter!');
  }

  switch(type.toUpperCase()) {
    case "CUSTOMER":
      return translators.translateCustomer(data)
    case "ADDRESS":
      return translators.translateAddress(data);

  }
}

//Dominos:
 //Pizza Hut: Zip (Town + State or ZIP), address: line 1, address_two: line 2
var findStores = function(Address, provider, callback) {  //Finds stores
  return post(Address, provider, 'Stores').nodeify(callback);
}

module.exports.cleanInput = function(data) {
  return data.replace(/(\\|,|\{|\}|;|\(|\))*/g, '');
}

module.exports.get = function(provider, action) {
  if(!provider) {
    return errorMessage(false, 'A provider must be supplied in the object or the method call!');
  }

  var promise = new Promise(function(resolve, reject) {
    request({
    method: 'GET',
    uri: config[provider]['Actions'][action]
    }, function(err, res, body) {
      if(err) reject(errorMessage(false, err));
      else resolve(body);
    });
  });

  return promise;
}

module.exports.post = function(data, provider, action) {
  if(!provider) {
    return errorMessage(false, 'A provider must be supplied in the object or the method call!');
  }
  if(!data['type'] && provider) {
    var translatedObject = translateObject(data, provider);
  }
  else {
    var translatedObject = translateObject(data, data.type)
  }

  try {
    var parsedBody = JSON.parse(translatedObject);
  }
  catch(e) {
    return errorMessage(false, 'Body parsing failed!');
  }

  var promise = new Promise(function(resolve, reject) {
    request({
    method: 'POST',
    body: parsedBody,
    uri: config[provider]['Actions'][action]
    }, function(err, res, body) {
      if(err) reject(errorMessage(false, err));
      else resolve(body);
    });
  });

  return promise;
}

module.exports.errorMessage = function(success, message) {  //This is used to keep all messages formatted the same
  return { success: success, message: message };
}
