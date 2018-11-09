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

    findOne(userId) {
        return db.customStyles.findOne({ where: { SCZ_SU_ID: userId } });
    }

}

var repository = new Repository();

module.exports = repository;