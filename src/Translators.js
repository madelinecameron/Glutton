/*jslint node: true */

var config = require('./config.json');
var _ = require('lodash');
var Order = require('./Order');
// This is all just so stupid. Please don't read this.

var _this = this;

module.exports.translateCustomer = function (data, provider) {
    var customerObject = config[provider].Objects.Customer;
    var translatedObject = {};

    var keys = Object.keys(data);
    keys.forEach(function(key) {
        if (key !== "Address") {
          var translatedKey = customerObject[key];
          translatedObject[translatedKey] = data[key];
        }
        else {
          translatedObject[customerObject["Address"]] = _this.translateAddress(data[key], "NoSplitLines", provider);
        }
    });

    return translatedObject;
}

module.exports.reverseTranslateCustomer = function (data, provider) {
    var reverseCustomerObj = _.invert(config[provider].Objects.Customer),
        translatedObject = {},
        keys = Object.keys(reverseCustomerObj);

    keys.forEach(function(key) {
        if(data.hasOwnProperty(key)) {  //Check provider names
            if(reverseCustomerObj[key].toUpperCase() === 'ADDRESS') {  //Returns PizzaPI name uppercase
                translatedObject['Address'] = {};
                translatedObject['Address'] = _this.reverseTranslateAddress(data[key], 'NoSplitLines', provider);
            }
            else {
                translatedObject[reverseCustomerObj[key]] = data[key];
            }
        }
    });

    return translatedObject;
}

module.exports.translateAddress = function (data, type, provider) {
    var translatedObject = {},
        keys = Object.keys(data),
        addressObj = config[provider].Objects.Address[type];

    if (type === "NoSplitLines") {
        keys.forEach(function(key) {
            translatedObject[addressObj[key]] = data[key];
        });
    }
    else {
        console.log("TrySplit");
    }

    if (addressObj["Additional"]) { _.assign(translatedObject, addressObj["Additional"]) }
    return translatedObject;
}

module.exports.reverseTranslateAddress = function (data, type, provider) {
    var reverseAddressObj = _.invert(config[provider].Objects.Address[type]),
        addressObj = config[provider].Objects.Address[type],
        translatedObject = { },
        keys = Object.keys(reverseAddressObj);

    keys.forEach(function(key) {
        if(data.hasOwnProperty(key)) {  //Check provider names
            translatedObject[reverseAddressObj[key]] = data[key];
        }
    });

    return translatedObject;
}

module.exports.translateOrder = function (data, provider) {
    var orderObject = config[provider].Objects.Order,
        translatedObject = { 'Address': {} },
        keys = Object.keys(data);

    keys.forEach(function(key) {
        if (key === "Customer" || key === "Items") {
            if (key === "Customer") {
                var translatedCustomer = _this.translateCustomer(data["Customer"], provider);
                var customerKeys = Object.keys(translatedCustomer);
                _.assign(translatedObject["Address"], translatedCustomer["Address"]);
                delete translatedCustomer.Address;
                for(var attr in translatedCustomer) {
                    translatedObject[attr] = translatedCustomer[attr];
                }
            }
            else {
                var translatedItems = [];
                if(data['Items'].length > 0) {
                    for(var item in data['Items']) {
                        translatedItems.push(_this.translateItem(data['Items'][item], provider));
                    }
                }
                translatedObject[orderObject[key]] = translatedItems;
            }
        }
        else {
            if(key !== "Provider" && key !== "Type") {
                translatedObject[orderObject[key]] = data[key];
            }
        }
    });

    if (orderObject["Additional"]) { _.assign(translatedObject, orderObject["Additional"]) }
    return translatedObject;
}

module.exports.reverseTranslateOrder = function (data, provider) {
    var reverseOrderObj = _.invert(config[provider].Objects.Order),
        orderObj = config[provider].Objects.Order,
        customerObj = config[provider].Objects.Customer,
        translatedObject = { },
        keys = Object.keys(reverseOrderObj);

    keys.forEach(function(key) {
        if(data.hasOwnProperty(key)) {  //Check provider names
            var translateResult;
            switch(reverseOrderObj[key].toUpperCase()) {  //Returns PizzaPI name uppercase
                case 'ADDRESS':
                case 'FIRSTNAME':
                case 'LASTNAME':
                case 'PHONE':
                case 'EMAIL':
                    var customerJson = {
                        'FirstName': data[customerObj['FirstName']],
                        'LastName': data[customerObj['LastName']],
                        'Phone': data[customerObj['Phone']],
                        'Email': data[customerObj['Email']],
                        'Address': data[orderObj['Address']]
                    };
                    var translateResult = _this.reverseTranslateCustomer(customerJson, provider);
                    delete data[orderObj['Email']];
                    delete data[orderObj['Phone']];
                    delete data[orderObj['LastName']];
                    delete data[orderObj['FirstName']];
                    delete data[orderObj['Address']];

                    translatedObject['Customer'] = {};
                    translatedObject['Customer'] = translateResult;
                    break;

                default:
                    translatedObject[reverseOrderObj[key]] = data[key];
                    break;
            }
        }
    });

    translatedObject['Type'] = "Order";
    translatedObject['Provider'] = provider;
    return translatedObject;
}

module.exports.translateItem = function (data, provider) {
    var itemObject = config[provider].Objects.Item,
        translatedObject = {},
        keys = Object.keys(data);

    keys.forEach(function(key) {
        if(key !== 'Name' && key !== 'Size') {
            translatedObject[itemObject[key]] = data[key];
        }
    });

    if (itemObject["Additional"]) { _.assign(translatedObject, itemObject["Additional"]) }
    return translatedObject;
}
