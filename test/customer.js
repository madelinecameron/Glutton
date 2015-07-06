'use strict'

var expect = require('chai').expect;
var Customer = require('../src/Customer');
var Address = require('../src/Address');

describe('Customer', function() {
  it('should create customer', function(done) {
    var newAddress = new Address({
      Street: '900 N Bishop Ave',
      City: 'Rolla',
      State: 'MO',
      Zip: '65401'
    });

    var newCustomer = new Customer({
      FirstName: 'Madeline',
      LastName: 'Cameron',
      Email: 'madeline@madelinecameron.net',
      Phone: '911-911-9111',
      Address: newAddress
    });

    expect(newCustomer.FirstName).to.equal('Madeline');
    expect(newCustomer.LastName).to.equal('Cameron');
    expect(newCustomer.Email).to.equal('madeline@madelinecameron.net');
    expect(newCustomer.Phone).to.equal('911-911-9111');
    expect(newCustomer.Address.Street).to.equal('900 N Bishop Ave');
    expect(newCustomer.Address.City).to.equal('Rolla');
    expect(newCustomer.Address.State).to.equal('MO');
    expect(newCustomer.Address.Zip).to.equal('65401');

    done();

  });
  it('should retrieve full name', function(done) {
    var newAddress = new Address({
      Street: '900 N Bishop Ave',
      City: 'Rolla',
      State: 'MO',
      Zip: '65401'
    });

    var newCustomer = new Customer({
      FirstName: 'Madeline',
      LastName: 'Cameron',
      Email: 'madeline@madelinecameron.net',
      Phone: '911-911-9111',
      Address: newAddress
    });

    var fullName = newCustomer.getFullName();

    expect(fullName).to.equal('Madeline Cameron');

    done();

  });
})
