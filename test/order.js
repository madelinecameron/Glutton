'use strict'

var expect = require('chai').expect;
var Order = require('../src/Order');
var Address = require('../src/Address');
var Customer = require('../src/Customer');
var Item = require('../src/Item');
var request = require('request-promise');
var promise = require('promise');

describe('Order', function() {
  describe('Dominos', function() {
    it('should create order', function(done) {
      var address = new Address({
        Street: '900 N Bishop Ave',
        City: 'Rolla',
        State: 'MO',
        Zip: '65401'
      });

      var customer = new Customer({
        FirstName: 'Madeline',
        LastName: 'Cameron',
        Email: 'madeline@madelinecameron.net',
        Phone: '911-911-9111',
        Address: address
      });

      var order = new Order({
        Customer: customer,
        Items: [],
        StoreID: 1546,
        Provider: 'Dominos',
        DeliveryMethod: 'Delivery'
      });

      expect(order).to.exist;
      expect(order.Customer).to.equal(customer);
      expect(order.Items.length).to.equal(0);
      expect(order.StoreID).to.equal(1546);
      expect(order.Provider).to.equal('Dominos');
      expect(order.DeliveryMethod).to.equal('Delivery');

      done();
    });

    it('should add item', function(done) {
      var address = new Address({
        Street: '900 N Bishop Ave',
        City: 'Rolla',
        State: 'MO',
        Zip: '65401'
      });

      var customer = new Customer({
        FirstName: 'Madeline',
        LastName: 'Cameron',
        Email: 'madeline@madelinecameron.net',
        Phone: '911-911-9111',
        Address: address
      });

      var order = new Order({
        Customer: customer,
        Items: [],
        StoreID: 1,
        Provider: 'Dominos',
        DeliveryMethod: 'Delivery'
      });

      var item = new Item({
        Name: 'Not supposed to be initialized',
        Code: '14SCREEN',
        Size: 'Large'
      });

      order.addItem(item);

      expect(order.Items.length).to.equal(1);
      expect(order.Items[0]).to.equal(item);

      done();
    });

    it('should remove item by index', function(done) {
      var address = new Address({
        Street: '900 N Bishop Ave',
        City: 'Rolla',
        State: 'MO',
        Zip: '65401'
      });

      var customer = new Customer({
        FirstName: 'Madeline',
        LastName: 'Cameron',
        Email: 'madeline@madelinecameron.net',
        Phone: '911-911-9111',
        Address: address
      });

      var order = new Order({
        Customer: customer,
        Items: [],
        StoreID: 1,
        Provider: 'Dominos',
        DeliveryMethod: 'Delivery'
      });

      var item = new Item({
        Name: 'Not supposed to be initialized',
        Code: '14SCREEN',
        Size: 'Large'
      });

      order.addItem(item);

      expect(order.Items.length).to.equal(1);
      expect(order.Items[0]).to.equal(item);

      order.removeItemByIndex(0)

      expect(order.Items.length).to.equal(0);

      done();
    });

    it('should remove item by name', function(done) {
      var address = new Address({
        Street: '900 N Bishop Ave',
        City: 'Rolla',
        State: 'MO',
        Zip: '65401'
      });

      var customer = new Customer({
        FirstName: 'Madeline',
        LastName: 'Cameron',
        Email: 'madeline@madelinecameron.net',
        Phone: '911-911-9111',
        Address: address
      });

      var order = new Order({
        Customer: customer,
        Items: [],
        StoreID: 1,
        Provider: 'Dominos',
        DeliveryMethod: 'Delivery'
      });

      var item = new Item({
        Name: 'Not supposed to be initialized',
        Code: '14SCREEN',
        Size: 'Large'
      });

      order.addItem(item);

      expect(order.Items.length).to.equal(1);
      expect(order.Items[0]).to.equal(item);

      order.removeItemByName('Not supposed to be initialized');

      expect(order.Items.length).to.equal(0);

      done();
    });

    it('should modify quantity of item', function(done) {
        var address = new Address({
          Street: '900 N Bishop Ave',
          City: 'Rolla',
          State: 'MO',
          Zip: '65401'
        });

        var customer = new Customer({
          FirstName: 'Madeline',
          LastName: 'Cameron',
          Email: 'madeline@madelinecameron.net',
          Phone: '911-911-9111',
          Address: address
        });

        var order = new Order({
          Customer: customer,
          Items: [],
          StoreID: 1,
          Provider: 'Dominos',
          DeliveryMethod: 'Delivery'
        });

        var item = new Item({
          Name: 'Not supposed to be initialized',
          Code: '14SCREEN',
          Size: 'Large'
        });

        order.addItem(item);

        expect(order.Items[0].Quantity).to.equal(1);
        expect(order.Items[0]).to.equal(item);

        order.addItem(item);

        expect(order.Items[0].Quantity).to.equal(2);

        done();
    });

    it('should validate order', function(done) {
        var address = new Address({
          Street: '2303 Coplin Ct Apt B',
          City: 'Rolla',
          State: 'MO',
          Zip: '65401-8375'
        });

        var customer = new Customer({
          FirstName: 'Madeline',
          LastName: 'Cameron',
          Email: 'madeline@madelinecameron.net',
          Phone: '6366998620',
          Address: address
        });

        var order = new Order({
          Customer: customer,
          Items: [],
          StoreID: '1546',
          Provider: 'Dominos',
          DeliveryMethod: 'Delivery'
        });

        var item = new Item({
          Name: 'Not supposed to be initialized',
          Code: '14SCREEN',
          Size: 'Large',
          Options: { 'C': { '1/1': '1'}, 'X': { '1/1' : '1' }}
        });

        order.addItem(item);

        console.log(order);
        var newOrder = order.validate();
        //console.log(newOrder);

        //done();
    });

    it.skip('should price order', function(done) {

    });
  })

  describe('Pizza Hut', function() {
    it.skip('should create order', function() {

    });

    it.skip('should add item', function(done) {

    });

    it.skip('should remove item', function(done) {

    });

    it.skip('should modify quantity of item', function(done) {

    });

    it.skip('should price order', function(done) {

    });
  })
})
