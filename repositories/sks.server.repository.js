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

    destroy(data) {
        return db.sks.destroy(data)
    }

}

var repository = new Repository();

module.exports = repository;