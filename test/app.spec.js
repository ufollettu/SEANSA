const app = require('../app.js');
const supertest = require('supertest')
const expect = require('chai').expect;
const assert = require('assert');
const superactivator = require('../helpers/superactivator');


describe('superactivator test', () => {
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
  it('should return empty string', () => {
    const testStr = superactivator.decodeToMortal('')
    assert.equal(testStr, '');
  });
  //   it('should encode non string', () => {
  //     const testStr = superactivator.codeToGod('teststringa')
  //     assert.equal(testStr, 'f09733424472c1026905e043b02000007750724124500203c0c6b242188042027fe2734230a1000014953043ec4243007640f043f8d14001c519a04220008100d28e214010f1c3002705224304420202c54260433c410102');
  //   });
})

// const app = require('../../server/app'),
//     supertest = require('supertest'),
//     mongoose = require('mongoose'),
//     dbConnection = 'mongodb://localhost:27017/course-users-webapp-test2',
//     User = require('../../server/domain/models/User');
//     expect = require('chai').expect;

// describe('App Tests', () => {
//     let request, mongooseConnection;
//     before((done) => {
//         mongoose.connect(dbConnection);
//         mongooseConnection = mongoose.connection
//             .on('error', console.error.bind(console, 'connection error:'))
//             .once('open', () => {
//                 request = supertest(app);
//                 mongooseConnection.db.dropCollection('users', (err, result) => {
//                     //if (err) throw err;
//                     let user = new User({
//                         name: 'ginetto',
//                         surname: 'driade',
//                         email: 'gino@fre.tr',
//                         age: 33
//                     });
//                     user.save(done())
//                 })
//             })
//     });

//     after(() => {
//         mongooseConnection.close(() => {
//             process.exit(0);
//         })
//     })

//     describe('User Tests', () => {
//         it('should return status code 404 on /other', (done) => {
//             request.get('/other').expect(404, done);
//         });

//         it('should display one user from db', (done) => {
//             request
//                 .get('/users')
//                 .expect(200)
//                 .end((err, res) => {
//                     if (err) return done(err);

//                     expect(res.text).to.have.string('ginetto');
//                     done()
//                 });
//         });
//     });
// });
