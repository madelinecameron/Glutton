'use strict'

var expect = require('chai').expect,
    utilities = require('../src/Utilities'),
    Address = require('../src/Address'),
    Customer = require('../src/Customer'),
    Order = require('../src/Order'),
    Item = require('../src/Item'),
    config = require('../src/config.json');

    describe('Utilities', function() {
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
                console.log(result);
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
            it('should translate from PizzaPI to Dominos', function(done) {
                var newAddress = new Address({
                                  Street: '900 N Bishop Ave',
                                  City: 'Rolla',
                                  State: 'MO',
                                  Zip: '65401' }),
                    newCustomer = new Customer({
                      FirstName: 'Madeline',
                      LastName: 'Cameron',
                      Email: 'madeline@madelinecameron.net',
                      Phone: '911-911-9111',
                      Address: newAddress
                    }),
                    customerTranslation = config['Dominos'].Objects.Customer,
                    addressTranslation = config['Dominos'].Objects.Address.NoSplitLines,
                    translatedObject = utilities.translateObject(newCustomer, 'Customer', 'Dominos');

                //Forgive me for what I have done...
                //This is disgusting and likely overkill, but this *should* prove these work.
                expect(translatedObject[customerTranslation['FirstName']]).to.equal(newCustomer.FirstName);
                expect(translatedObject[customerTranslation['LastName']]).to.equal(newCustomer.LastName);
                expect(translatedObject[customerTranslation['Phone']]).to.equal(newCustomer.Phone);
                expect(translatedObject[customerTranslation['Email']]).to.equal(newCustomer.Email);
                expect(translatedObject[customerTranslation['Address']][addressTranslation['Street']]).to.equal(newAddress.Street);
                expect(translatedObject[customerTranslation['Address']][addressTranslation['City']]).to.equal(newAddress.City);
                expect(translatedObject[customerTranslation['Address']][addressTranslation['State']]).to.equal(newAddress.State);
                expect(translatedObject[customerTranslation['Address']][addressTranslation['Zip']]).to.equal(newAddress.Zip);

                done();
            });
            it.skip('should translate from PizzaPI to Pizza Hut', function(done) {
                var newAddress = new Address({
                                Street: '900 N Bishop Ave',
                                City: 'Rolla',
                                State: 'MO',
                                Zip: '65401' }),
                  customerTranslation = config['PizzaHut'].Objects.Customer,
                  addressTranslation = config['PizzaHut'].Objects.Address.NoSplitLines;

                var newCustomer = new Customer({
                    FirstName: 'Madeline',
                    LastName: 'Cameron',
                    Email: 'madeline@madelinecameron.net',
                    Phone: '911-911-9111',
                    Address: newAddress
                });

                var translatedObject = utilities.translateObject(newCustomer, 'Customer', 'PizzaHut');

                //Forgive me for what I have done...
                //This is disgusting and likely overkill, but this *should* prove these work.
                expect(translatedObject[customerTranslation['FirstName']]).to.equal(newCustomer.FirstName);
                expect(translatedObject[customerTranslation['LastName']]).to.equal(newCustomer.LastName);
                expect(translatedObject[customerTranslation['Phone']]).to.equal(newCustomer.Phone);
                expect(translatedObject[customerTranslation['Email']]).to.equal(newCustomer.Email);
                expect(translatedObject[customerTranslation['Address']][addressTranslation['Street']]).to.equal(newAddress.Street);
                expect(translatedObject[customerTranslation['Address']][addressTranslation['City']]).to.equal(newAddress.City);
                expect(translatedObject[customerTranslation['Address']][addressTranslation['State']]).to.equal(newAddress.State);
                expect(translatedObject[customerTranslation['Address']][addressTranslation['Zip']]).to.equal(newAddress.Zip);

                done();
            });

        it.skip('should translate from Pizza Hut to PizzaPI', function(done) {

        });
        it('should translate from Dominos to PizzaPI', function(done) {
            var newAddress = new Address({
                              Street: '900 N Bishop Ave',
                              State: 'MO',
                              City: 'Rolla',
                              Zip: '65401' }),
                newCustomer = new Customer({
                  FirstName: 'Madeline',
                  LastName: 'Cameron',
                  Email: 'madeline@madelinecameron.net',
                  Phone: '911-911-9111',
                  Address: newAddress
                }),
                customerTranslation = config['Dominos'].Objects.Customer,
                addressTranslation = config['Dominos'].Objects.Address.NoSplitLines,
                translatedObject = utilities.translateObject(newCustomer, 'Customer', 'Dominos'),
                reverseTranslatedObject = utilities.reverseTranslateObject(translatedObject, 'Customer', 'Dominos');

            expect(reverseTranslatedObject.FirstName).to.equal(newCustomer.FirstName);
            expect(reverseTranslatedObject.LastName).to.equal(newCustomer.LastName);
            expect(reverseTranslatedObject.Email).to.equal(newCustomer.Email);
            expect(reverseTranslatedObject.Phone).to.equal(newCustomer.Phone);
            expect(reverseTranslatedObject.Address.State).to.equal(newCustomer.Address.State);  //Only need to test one attribute to verify correctness

            done();
        });
    });

    describe('Address', function() {
        it('should translate from PizzaPI to Dominos', function(done) {
            var newAddress = new Address({
                            Street: '900 N Bishop Ave',
                            City: 'Rolla',
                            State: 'MO',
                            Zip: '65401' }),
                addressTranslation = config['Dominos'].Objects.Address.NoSplitLines,
                translatedObject = utilities.translateObject(newAddress, 'Address-NoSplit', 'Dominos');

            expect(translatedObject[addressTranslation['Street']]).to.equal(newAddress.Street);
            expect(translatedObject[addressTranslation['City']]).to.equal(newAddress.City);
            expect(translatedObject[addressTranslation['State']]).to.equal(newAddress.State);
            expect(translatedObject[addressTranslation['Zip']]).to.equal(newAddress.Zip);

            done();
        });
        it.skip('should translate from PizzaPI to Pizza Hut', function(done) {
            var newAddress = new Address({
                            Street: '900 N Bishop Ave',
                            City: 'Rolla',
                            State: 'MO',
                            Zip: '65401' }),
                addressTranslation = config['PizzaHut'].Objects.Address.NoSplitLines,
                translatedObject = utilities.translateObject(newCustomer, 'Address', 'PizzaHut');

            expect(translatedObject[addressTranslation['Street']]).to.equal(newAddress.Street);
            expect(translatedObject[addressTranslation['City']]).to.equal(newAddress.City);
            expect(translatedObject[addressTranslation['State']]).to.equal(newAddress.State);
            expect(translatedObject[addressTranslation['Zip']]).to.equal(newAddress.Zip);

            done();
        });
        it.skip('should translate from Pizza Hut to PizzaPI', function(done) {

        });
        it('should translate from Dominos to PizzaPI', function(done) {
            var newAddress = new Address({
                            Street: '900 N Bishop Ave',
                            City: 'Rolla',
                            State: 'MO',
                            Zip: '65401' }),
                addressTranslation = config['Dominos'].Objects.Address.NoSplitLines,
                translatedObject = utilities.translateObject(newAddress, 'Address-NoSplit', 'Dominos'),
                reverseTranslatedObject = utilities.reverseTranslateObject(translatedObject, 'Address-NoSplit', 'Dominos');

            expect(reverseTranslatedObject.Street).to.equal(newAddress.Street);
            expect(reverseTranslatedObject.City).to.equal(newAddress.City);
            expect(reverseTranslatedObject.State).to.equal(newAddress.State);
            expect(reverseTranslatedObject.Zip).to.equal(newAddress.Zip);

            done();
        });
    });

    describe('Order', function() {
      it('should translate from PizzaPI to Dominos', function(done) {
          var newAddress = new Address({
                          Street: '900 N Bishop Ave',
                          City: 'Rolla',
                          State: 'MO',
                          Zip: '65401' }),
          newCustomer = new Customer({
              FirstName: 'Madeline',
              LastName: 'Cameron',
              Email: 'madeline@madelinecameron.net',
              Phone: '911-911-9111',
              Address: newAddress
          }),
          newOrder = new Order({
              Customer: newCustomer,
              Items: [ new Item({
                  Name: 'Test',
                  Code: '14SCREEN',
                  Quantity: 1,
                  Options: {}
              })],
              StoreID: 1546,
              Provider: 'Dominos'
          }),
          orderTranslation = config['Dominos'].Objects.Order,
          customerTranslation = config['Dominos'].Objects.Customer,
          addressTranslation = config['Dominos'].Objects.Address.NoSplitLines,
          translatedObject = utilities.translateObject(newOrder, 'Order', 'Dominos');

          //Verify customer translated
          expect(translatedObject[customerTranslation['FirstName']]).to.equal(newCustomer.FirstName);
          expect(translatedObject[customerTranslation['LastName']]).to.equal(newCustomer.LastName);
          expect(translatedObject[customerTranslation['Phone']]).to.equal(newCustomer.Phone);
          expect(translatedObject[customerTranslation['Email']]).to.equal(newCustomer.Email);

          expect(translatedObject[orderTranslation['Items']][0].Code).to.equal(newOrder.Items[0].Code);
          expect(translatedObject[orderTranslation['StoreID']]).to.equal(newOrder.StoreID);

          done();
      });
      it.skip('should translate from PizzaPI to Pizza Hut', function(done) {

      });
      it.skip('should translate from Pizza Hut to PizzaPI', function(done) {

      });
      it('should translate from Dominos to PizzaPI', function(done) {
          var newAddress = new Address({
                          Street: '900 N Bishop Ave',
                          City: 'Rolla',
                          State: 'MO',
                          Zip: '65401' }),
          newCustomer = new Customer({
              FirstName: 'Madeline',
              LastName: 'Cameron',
              Email: 'madeline@madelinecameron.net',
              Phone: '911-911-9111',
              Address: newAddress
          }),
          newOrder = new Order({
              Customer: newCustomer,
              Items: [],
              StoreID: '1546',
              Provider: 'Dominos'
          }),
          orderTranslation = config['Dominos'].Objects.Order,
          customerTranslation = config['Dominos'].Objects.Customer,
          addressTranslation = config['Dominos'].Objects.Address.NoSplitLines,
          translatedObject = utilities.translateObject(newOrder, 'Order', 'Dominos'),
          reverseTranslatedObject = utilities.reverseTranslateObject(translatedObject, 'Order', 'Dominos');

          expect(reverseTranslatedObject.Items.length).to.equal(newOrder.Items.length);
          expect(reverseTranslatedObject.StoreID).to.equal(newOrder.StoreID);
          expect(reverseTranslatedObject.FirstName).to.equal(newOrder.FirstName);

          done();
      });
    });

    describe('Item', function() {
      it('should translate from PizzaPI to Dominos', function(done) {
          var newAddress = new Address({
                          Street: '900 N Bishop Ave',
                          City: 'Rolla',
                          State: 'MO',
                          Zip: '65401' }),
              newCustomer = new Customer({
                  FirstName: 'Madeline',
                  LastName: 'Cameron',
                  Email: 'madeline@madelinecameron.net',
                  Phone: '911-911-9111',
                  Address: newAddress
              }),
              newOrder = new Order({
                  Customer: newCustomer,
                  Items: [
                      new Item({
                          Name: 'Test',
                          Code: '14SCREEN',
                          Quantity: 1,
                          Options: {}
                      }),
                      new Item({
                          Name: 'Test2',
                          Code: '15SCREEN',
                          Quantity: 2,
                          Options: {}
                      })
                  ],
                  StoreID: '1546',
                  Provider: 'Dominos'
              }),
              itemTranslation = config['Dominos'].Objects.Item,
              orderTranslation = config['Dominos'].Objects.Order;


          var translatedObject = utilities.translateObject(newOrder, 'Order', 'Dominos');

          expect(translatedObject[orderTranslation['Items']][0].Code).to.equal(newOrder.Items[0].Code);
          expect(translatedObject[orderTranslation['Items']][0].Qty).to.equal(newOrder.Items[0].Quantity);
          expect(translatedObject[orderTranslation['Items']][0].Options).to.equal(newOrder.Items[0].Options);

          expect(translatedObject[orderTranslation['Items']][1].Code).to.equal(newOrder.Items[1].Code);
          expect(translatedObject[orderTranslation['Items']][1].Qty).to.equal(newOrder.Items[1].Quantity);
          expect(translatedObject[orderTranslation['Items']][1].Options).to.equal(newOrder.Items[1].Options);

          done();
      });
      it.skip('should translate from PizzaPI to Pizza Hut', function(done) {

      });
      it.skip('should translate from Pizza Hut to PizzaPI', function(done) {

      });
      it.skip('should translate from Dominos to PizzaPI', function(done) {

      });
    });
  });
  it.skip('should return failing error message', function(done) {
    var failMessage = utilities.errorMessage(false, "Test");

    expect(failMessage.success).to.equal(false);
    expect(failMessage.message).to.equal("Test");
  });
});
