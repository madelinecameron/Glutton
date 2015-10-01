'use strict'

var request = require('request');
var promise = require('promise');
var config = require('./config.json');
var translators = require('./translators');

var _this = this;

module.exports.translateObject = function(data, type, provider) {
    if(provider !== 'Dominos' && provider !== 'PizzaHut' && provider !== 'PizzaPI') {
        return _this.errorMessage('Invalid provider parameter!');
    }

    switch(type.toUpperCase()) {
        case "CUSTOMER":
            return translators.translateCustomer(data, provider);
            break;
        case "ADDRESS-SPLIT":
            return translators.translateAddress(data, "SplitLines", provider);
            break;
        case 'ADDRESS-NOSPLIT':
            return translators.translateAddress(data, "NoSplitLines", provider);
            break;
        case 'ORDER':
            return translators.translateOrder(data, provider);
            break;
    }
}

module.exports.reverseTranslateObject = function(data, type, provider) {
    if(provider !== 'Dominos' && provider !== 'PizzaHut' && provider !== 'PizzaPI') {
        return _this.errorMessage('Invalid provider parameter!');
    }

    switch(type.toUpperCase()) {
        case "CUSTOMER":
            return translators.reverseTranslateCustomer(data, provider);
            break;
        case "ADDRESS-SPLIT":
            return translators.reverseTranslateAddress(data, "SplitLines", provider);
            break;
        case 'ADDRESS-NOSPLIT':
            return translators.reverseTranslateAddress(data, "NoSplitLines", provider);
            break;
        case 'ORDER':
            return translators.reverseTranslateOrder(data, provider);
            break;
    }
}

//Dominos:
 //Pizza Hut: Zip (Town + State or ZIP), address: line 1, address_two: line 2
var findStores = function(Address, provider, callback) {  //Finds stores
    var translatedAddress = this.translateObject(Address, 'Address', provider)
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
      if(err) reject(errorMessage(err));
      else resolve(body);
    });
  });

  return promise;
}

module.exports.post = function(data, action) {
    if(!data['Provider']) {
        return _this.errorMessage('A provider must be supplied in the object or the method call!');
    }

    if(data['Type'] && data['Provider']) {
        var translatedObject = _this.translateObject(data, data.Type, data.Provider);
        console.log(config[data.Provider]['Actions'][action]);
        console.dir({ "Order": translatedObject });
        console.dir(translatedObject['Items']);
        var stringify = JSON.stringify({ "Order": translatedObject });
        var body = {
                    uri: config[data.Provider]['Actions'][action],
                    headers: {
                        Referer:'https://order.dominos.com/en/pages/order/',
                        'Content-Type': 'application/json'
                    },
                    body: stringify
                };
        request.post(body, function(err, res, body) {
                console.log(res.statusCode);
                console.log("Done!");
                    //console.log(err.message);
                    //console.log(res);
                    //console.log(body);
        });
    }
    else {
        return _this.errorMessage('No type was declared!');
    }
}

module.exports.errorMessage = function(message) {  //This is used to keep all messages formatted the same
  return new Promise(function(resolve) {
    resolve({ success: false, message: message });
  })
}
