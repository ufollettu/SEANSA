const db = require('../models');

class Repository {

    findAll() {
        return db.clienti.findAll()
    }

    findNotDeleted() {
        return db.clienti.findAll({
            where: {
                SC_DELETED: 0
            }
        });
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

    destroy(id) {
        return db.clienti.destroy({
            where: {
                SC_ID: id
            }
        })
    }

}

var repository = new Repository();

module.exports = repository;