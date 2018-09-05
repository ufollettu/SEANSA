const db = require('../models');

class Repository {

    findAll() {
        return db.customStyles.findAll()
    }

    create(data) {
        return db.customStyles.create(data)
    }

    findById(id) {
        return db.customStyles.findById(id)
    }

    // findOne(data) {
    //     return db.customStyles.findOne(data);
    // }

}

var repository = new Repository();

module.exports = repository;