const app = require('../app.js');
const supertest = require('supertest')
const expect = require('chai').expect;
const sinon = require('sinon');
const assert = require('assert');
const superactivator = require('../helpers/superactivator');
const proxyquire = require('proxyquire');

const {
  checkHookDefined,
  checkModelName,
  checkNonUniqueIndex,
  checkPropertyExists,
  checkUniqueCompoundIndex,
  checkUniqueIndex,
  dataTypes,
  listModels,
  makeMockModels,
  sequelize
} = require('sequelize-test-helpers');

const SksModel = require('../models/sks');

// 
//  Test Suites

// test sks model
describe('sks model test', () => {
  const Model = SksModel(sequelize, dataTypes)
  const instance = new Model()

  checkModelName(Model)('sa_sks')

  context('properties', () => {
    ;['SS_KEY', 'SS_OEM'].forEach(checkPropertyExists(instance))
  })
});

// test repository
const mockModels = makeMockModels({ Sks: { findOne: sinon.stub() } })

const create = proxyquire('../controllers/sks.server.controller.js', {
  '../models': mockModels
});

const fakeRepo = { create: sinon.stub() }

// test sks repo
describe('sks repo findOne', () => {
  const data = {
    SS_KEY: 'uMuxbIjBqMQTrf6iRoAYXraz7',
  }
  const resetStubs = () => {
    mockModels.Sks.create.resetHistory()
    fakeRepo.create.resetHistory()
  }
  let result
  // test sks does not exist
  context('sks does not exist', () => {
    before(async () => {
      mockModels.Sks.create.resolves(undefined)
      result = await findOne(data)
    })
    after(resetStubs)

    it('called Sks.findOne', () => {
      expect(mockModels.Sks.findOne).to.have.been.called
    })
    it("didn't call fakeRepo.create", () => {
      expect(fakeRepo.create).not.to.have.been.called
    })
    it('returned null', () => {
      expect(result).to.be.null
    })
  })
  // test sks exists
  context('sks exists', () => {
    before(async () => {
      fakeRepo.create.resolves(fakeRepo)
      mockModels.Sks.findOne.resolves(fakeRepo)
      result = await create(data)
    })
    after(resetStubs)
    it('called Sks.findOne', () => {
      expect(mockModels.Sks.findOne).to.have.been.called
    })
    it('called fakeRepo.create', () => {
      expect(fakeRepo.create).to.have.been.calledWith(
        sinon.match(data))
    })
    it('returned the sks', () => {
      expect(result).to.deep.equal(fakeRepo)
    })
  })
})

describe('superactivator decodeToMortal test', () => {
  it('should decode reqcode string 1', () => {
    const testStr = superactivator.decodeToMortal('c405f242c063c3032d04214088c383016792334098508201f8c73040f851c20193c03041c07043013c85704100410101be50714348a2420299daa3424cd042028a5ca341c0b143027bf4234180f10202ed6023417080c002')
    assert.equal(testStr, 'teststringa');
  });
  it('should decode reqcode string 2', () => {
    const testStr = superactivator.decodeToMortal('1086334168310002b526a1432c5001029b70f340e05300015cf6704258e342023752f34268a38301b4d6b240048200027ea3b04298818303052be04140f141036a3f214128734302db4462406cd081013532e04120e1c001')
    assert.equal(testStr, 'teststringa');
  });
  it('should decode reqcode string 3', () => {
    const testStr = superactivator.decodeToMortal('38863240180083004de66342bc5343015b73324350e20002d8c6f0430cf2c1000f2132400072c303b0167043e0f0010372a3b2432860820171c86241a4e28200165ca341c0e3c3018b54a2402003c202d1a0e041e4038300')
    assert.equal(testStr, 'teststringa');
  });
  it('should decode reqcode string 4', () => {
    const testStr = superactivator.decodeToMortal('6807b14270e2c102ad54a140f8e34003e3e17041e49041035ca63042941381023352b340e8b142022095b242acd20302fa403341f0730103a57ba04024e2c202ce3ce2404851c203d73663431ce10103bd012242e800c300')
    assert.equal(testStr, 'teststringa');
  });
  it('should decode reqcode string 5', () => {
    const testStr = superactivator.decodeToMortal('f894f340e0d2c10235b5604348b04101e7a3334144b3430168a6f1427060800317533042a8f24200dcb53242fc9142035e53b140a8124101556be1438c628003c6ade14360038202cb64e0432cf2c0036522e141aca30003')
    assert.equal(testStr, 'teststringa');
  });
  // it('should return empty string', () => {
  //   const testStr = superactivator.decodeToMortal('')
  //   assert.equal(testStr, '');
  // });
  // it('should encode non string', () => {
  //   const testStr = superactivator.codeToGod('teststringa')
  //   assert.equal(testStr, 'f09733424472c1026905e043b02000007750724124500203c0c6b242188042027fe2734230a1000014953043ec4243007640f043f8d14001c519a04220008100d28e214010f1c3002705224304420202c54260433c410102');
  // });
})