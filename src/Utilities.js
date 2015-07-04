'use strict'

var request = require('request');
var promise = require('promise');
var config = require('./config.json');

modules.exports = function() {
  translateObject: function(data, provider) {
    if(provider !== "Dominos" || provider !== "PizzaHut" || provider !== "PizzaPI") {
      return errorMessage(false, "Invalid provider parameter!");
    }
  }

  findStores: function(Address, provider) {  //Finds stores
    return post(Address, provider, "Stores");
  }

  get: function(provider, action) {
    if(!provider) {
      return errorMessage(false, "A provider must be supplied in the object or the method call!");
    }

    var promise = new Promise(function(resolve, reject) {
      request({
      method: "GET",
      uri: config[provider]["Actions"][action]
      }, function(err, res, body) {
        if(err) reject(errorMessage(false, err));
        else resolve(body);
      });
    });

    return promise;
  }

  post: function(data, provider, action) {
    if(!provider) {
      return errorMessage(false, "A provider must be supplied in the object or the method call!");
    }
    if(!data["type"] && provider) {
      var translatedObject = translateObject(data, provider);
    }
    else {
      var translatedObject = translateObject(data, data.type)
    }

    try {
      var parsedBody = JSON.parse(translatedObject);
    }
    catch(Exception e) {
      return errorMessage(false, "Body parsing failed!");
    }

    var promise = new Promise(function(resolve, reject) {
      request({
      method: "POST",
      body: parsedBody,
      uri: config[provider]["Actions"][action]
      }, function(err, res, body) {
        if(err) reject(errorMessage(false, err));
        else resolve(body);
      });
    });

    return promise;
  }

  errorMessage: function(success, message) {  //This is used to keep all messages formatted the same
    return { success: success, message: message };
  }
}
