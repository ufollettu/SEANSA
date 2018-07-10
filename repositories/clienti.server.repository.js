const db = require('../models');

class Repository {

    findAll() {
        return db.clienti.findAll()
    }

    create(data) {
        return db.clienti.create(data)
    }

    findById(id) {
        return db.clienti.findById(id)
    }

    destroy(data) {
        return db.clienti.destroy(data)
    }

}

var repository = new Repository();

module.exports = repository;