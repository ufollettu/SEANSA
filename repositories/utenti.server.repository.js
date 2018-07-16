const db = require('../models');

class Repository {

    findAll() {
        return db.utenti.findAll()
    }

    create(data) {
        return db.utenti.create(data)
    }

    findById(id) {
        return db.utenti.findById(id)
    }

    findOne(data) {
        return db.utenti.findOne(data);
    }

    destroy(data) {
        return db.utenti.destroy(data)
    }

}

var repository = new Repository();

module.exports = repository;