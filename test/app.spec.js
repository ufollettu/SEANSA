const app = require('../app.js');
const supertest = require('supertest')
const expect = require('chai').expect;
const assert = require('assert');
const superactivator = require('../helpers/superactivator');


describe('superactivator test', () => {
  it('should decode non string', () => {
    const testStr = superactivator.decodeToMortal('8887f24112c1f341a998a2420a3f234087766140ad30e340388763421d29a241e8a570400587e0405b4271427816f041a4604102')
    assert.equal(testStr, 'stringaditest');
  });
  it('should encode non string', () => {
    const testStr = superactivator.codeToGod('stringaditest')
    assert.equal(testStr, 'd404304272f3f34049b82141965ca0404f642040112062439467e14255da61400407334091b6a04183a132431047b040b8434300');
  });
})