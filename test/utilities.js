'use strict'

var assert = require('chai').expect;
var utilities = require('../src/Utilities');

describe('Utilities', function() {
  it('should return stores', function(done) {

  });
  describe('Object translate', function() {
      it('should translate object from PizzaPI to Dominos', function(done) {

      });
      it('should translate object from PizzaPI to Pizza Hut', function(done) {

      });
      it('should translate object from Pizza Hut to PizzaPI', function(done) {

      });
      it('should translate object from Dominos to PizzaPI', function(done) {

      });
  });
  it('should return failing error message', function(done) {
    var failMessage = utilities.errorMessage(false, "Test");

    expect(failMessage.success).to.equal(false);
    expect(failMessage.message).to.equal("Test");
  })
});
