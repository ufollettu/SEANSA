const db = require('../models');

class Repository {

    findAll() {
        return db.sks.findAll()
    }

    create(data) {
        return db.sks.create(data)
    }

    findById(id) {
        return db.sks.findById(id)
    }

    findOne(data) {
        return db.sks.findOne(data);
    }

    destroy(id) {
        return db.sks.destroy({
            where: {
                SS_ID: id
            }
        })
    }

}

var repository = new Repository();

module.exports = repository;