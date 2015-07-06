'use strict'

var assert = require('chai').expect;
var utilities = require('../src/Utilities');

describe.skip('Utilities', function() {
  describe('Find Stores', function() {

  })
  it.skip('should return nearby stores for Dominos', function(done) {
    var newAddress = new Address([ '900 N Bishop Ave', 'Rolla', 'MO', '65401' ]);

    utilities.findStores(newAddress, 'Dominos').then(function(result) {
      console.log(result);
    });
  });

  it.skip('should return nearby stores for Pizza Hut', function(done) {
    var newAddress = new Address([ '900 N Bishop Ave', 'Rolla', 'MO', '65401' ]);

    utilities.findStores(newAddress, 'PizzaHut').then(function(result) {
      console.log(result)
    });
  });

  it.skip('should return nearby stores via callback', function(done) {
    var newAddress = new Address([ '900 N Bishop Ave', 'Rolla', 'MO', '65401' ]);

    utilities.findStores(newAddress, 'PizzaHut', function(result) {
      console.log(result);
    });
  });
  describe('Object translate', function() {
    describe('Customer', function() {
      it.skip('should translate object from PizzaPI to Dominos', function(done) {

      });
      it.skip('should translate object from PizzaPI to Pizza Hut', function(done) {

      });
      it.skip('should translate object from Pizza Hut to PizzaPI', function(done) {

      });
      it.skip('should translate object from Dominos to PizzaPI', function(done) {

      });
    });

    describe('Address', function() {
      it.skip('should translate object from PizzaPI to Dominos', function(done) {

      });
      it.skip('should translate object from PizzaPI to Pizza Hut', function(done) {

      });
      it.skip('should translate object from Pizza Hut to PizzaPI', function(done) {

      });
      it.skip('should translate object from Dominos to PizzaPI', function(done) {

      });
    });

    describe('Order', function() {
      it.skip('should translate object from PizzaPI to Dominos', function(done) {

      });
      it.skip('should translate object from PizzaPI to Pizza Hut', function(done) {

      });
      it.skip('should translate object from Pizza Hut to PizzaPI', function(done) {

      });
      it.skip('should translate object from Dominos to PizzaPI', function(done) {

      });
    });

    describe('Item', function() {
      it.skip('should translate object from PizzaPI to Dominos', function(done) {

      });
      it.skip('should translate object from PizzaPI to Pizza Hut', function(done) {

      });
      it.skip('should translate object from Pizza Hut to PizzaPI', function(done) {

      });
      it.skip('should translate object from Dominos to PizzaPI', function(done) {

      });
    });
  });
  it.skip('should return failing error message', function(done) {
    var failMessage = utilities.errorMessage(false, "Test");

    expect(failMessage.success).to.equal(false);
    expect(failMessage.message).to.equal("Test");
  });
});
