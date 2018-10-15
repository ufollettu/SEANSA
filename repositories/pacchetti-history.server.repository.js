const db = require('../models');

class Repository {

    findAll() {
        return db.pacchettiHistory.findAll()
    }

    create(data) {
        return db.pacchettiHistory.create(data)
    }

    findById(id) {
        return db.pacchettiHistory.findById(id)
    }

    findOne(data) {
        return db.pacchettiHistory.findOne(data);
    }

    destroy(id) {
        return db.pacchettiHistory.destroy({
            where: {
                SPKH_ID: id
            }
        })
    }

}

var repository = new Repository();

module.exports = repository;