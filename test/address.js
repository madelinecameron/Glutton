'use strict'

var expect = require('chai').expect;
var Address = require('../src/Address');

describe('Address', function() {
  describe('create from string', function() {
    it('should create full address from string', function(done) {
      var addressString = '900 N Bishop Ave, Rolla, MO, 65401'

      var newAddress = new Address(addressString);

      expect(newAddress.Street).to.equal('900 N Bishop Ave');
      expect(newAddress.City).to.equal('Rolla');
      expect(newAddress.State).to.equal('MO');
      expect(newAddress.Zip).to.equal('65401');

      done();
    });

    it('should create City, state, zip from string', function(done) {
      var addressString = 'Rolla, MO, 65401'

      var newAddress = new Address(addressString);

      expect(newAddress.City).to.equal('Rolla');
      expect(newAddress.State).to.equal('MO');
      expect(newAddress.Zip).to.equal('65401');

      done();
    });

    it('should create state, zip from string', function(done) {
      var addressString = 'MO, 65401'

      var newAddress = new Address(addressString);

      expect(newAddress.State).to.equal('MO');
      expect(newAddress.Zip).to.equal('65401');

      done();
    });

    it('should create zip from string', function(done) {
      var addressString = '65401'

      var newAddress = new Address(addressString);

      expect(newAddress.Zip).to.equal('65401');

      done();
    });

    it('should create state from string', function(done) {
      var addressString = 'Missouri'

      var newAddress = new Address(addressString);

      expect(newAddress.State).to.equal('Missouri');

      done();
    });
  })
  describe('create from json', function() {
    it('should create address from json', function(done) {
      var addressParams = {
        Street: '900 N Bishop Ave',
        City: 'Rolla',
        State: 'MO',
        Zip: '65401'
      };

      var newAddress = new Address(addressParams);

      expect(newAddress.Street).to.equal('900 N Bishop Ave');
      expect(newAddress.City).to.equal('Rolla');
      expect(newAddress.State).to.equal('MO');
      expect(newAddress.Zip).to.equal('65401');

      done();
    });

    it('should fail (gracefully!) create from json', function(done) {
      var addressParams = {
        what: 'this won\'t work!'
      };

      try {
        var newAddress = new Address(addressParams);
      }
      catch(e) {
        except(e).to.exist;
      }

      done();
    });
  })

  describe('create from array', function() {
    it('should create full address from array[4]', function(done) {
      var addressArray = [ '900 N Bishop Ave', 'Rolla', 'MO', '65401' ]

      var newAddress = new Address(addressArray);

      expect(newAddress.Street).to.equal('900 N Bishop Ave');
      expect(newAddress.City).to.equal('Rolla');
      expect(newAddress.State).to.equal('MO');
      expect(newAddress.Zip).to.equal('65401');

      done();
    });

    it('should create City, state, zip from array[3]', function(done) {
      var addressArray = ['Rolla', 'MO', '65401' ]

      var newAddress = new Address(addressArray);

      expect(newAddress.City).to.equal('Rolla');
      expect(newAddress.State).to.equal('MO');
      expect(newAddress.Zip).to.equal('65401');

      done();
    });

    it('should create state, zip from array[2]', function(done) {
      var addressArray = [ 'MO', '65401' ]

      var newAddress = new Address(addressArray);

      expect(newAddress.State).to.equal('MO');
      expect(newAddress.Zip).to.equal('65401');

      done();
    });

    it('should create zip from array[1]', function(done) {
      var addressArray = [ '65401' ]

      var newAddress = new Address(addressArray);

      expect(newAddress.Zip).to.equal('65401');

      done();
    });

    it('should create state from array[1]', function(done) {
      var addressArray = [ 'Missouri' ]

      var newAddress = new Address(addressArray);

      expect(newAddress.State).to.equal('Missouri');

      done();
    });

    it('should fail (gracefully!) create from array[5]', function(done) {
      var addressArray = ['1', '2', '3', '4', '5'];

      try {
        var newAddress = new Address(addressArray);
      }
      catch(e) {
        expect(e).to.exist;
      }

      done();
    });

    it('should fail (gracefully!) create from array[0]', function(done) {
      var addressArray = [];

      try {
        var newAddress = new Address(addressArray);
      }
      catch(e) {
        except(e).to.exist;
      }

      done();
    });
  })
})
