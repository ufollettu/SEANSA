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
    
    findOne(data) {
        return db.clienti.findOne(data);
    }

    destroy(data) {
        return db.clienti.destroy(data)
    }

}

var repository = new Repository();

module.exports = repository;