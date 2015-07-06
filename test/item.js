'use strict'

var expect = require('chai').expect;
var Item = require('../src/Item');

describe('Item', function() {
  it('should create item', function(done) {
    var newItem = new Item({
      Name: 'Not supposed to be initialized',
      Code: '14SCREEN',
      Size: 'Large'
    });

    expect(newItem.Name).to.equal('Not supposed to be initialized');
    expect(newItem.Code).to.equal('14SCREEN');
    expect(newItem.Size).to.equal('Large');

    done();
  });
})
