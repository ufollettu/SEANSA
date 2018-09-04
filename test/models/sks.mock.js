// Import the mock library
const SequelizeMock = require('sequelize-mock');
// Setup the mock database connection
const DBConnectionMock = new SequelizeMock();
// Define our Model
const SksMock = DBConnectionMock.define('sa_sks', {
    // 'SS_ID': '33',
    'SS_KEY': 'uMuxbIjBqMQTrf6iRoAYXraz7',
    'SS_OEM': '12',
    'SS_ACTIVATION_DATE': '2018-03-05 08:22:12',
    'SS_EXPIRE': '2020-01-01',
    'SS_CREATED': '2017-02-22 15:33:16',
    'SS_LAST_EDIT': '2018-09-04 13:32:53',
    'SS_MISMATCH_COUNT': '5',
    'SS_STATUS': '0',
    'SS_SC_ID': '9',
    'SS_SP_ID': '7',
    'SS_ACTIVATED_BY': 'GR s.r.l.',
    'SS_ACTIVATION_REFERENT': 'Daniele Parazza -'
}, {});

const sksMock = new SksMock()

module.exports = sksMock;